package controllers

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

type longCallConfig struct {
	quantityOfTasks   int
	quantityOfWorkers int
}

func HandleLongTaskCall(c *gin.Context) {
	var longCallConfig longCallConfig
	if err := c.ShouldBindJSON(&longCallConfig); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if longCallConfig.quantityOfTasks <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "quantityOfTasks must be positive"})
		return
	}

	if longCallConfig.quantityOfWorkers <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "quantityOfWorkers must be positive"})
		return
	}

	elapsedSeconds := runLongTasksCall(longCallConfig)

	c.JSON(http.StatusOK, elapsedSeconds)

}

func runLongTasksCall(longCallConfig longCallConfig) (durationInSeconds float64) {
	executionStart := time.Now()
	remainingTasks := make(chan int)
	producedResults := make(chan int)

	//produce tasks
	go func() {
		for i := 0; i < longCallConfig.quantityOfTasks; i++ {
			remainingTasks <- 1
		}
		close(remainingTasks)
	}()

	//produce workers
	waitGroup := sync.WaitGroup{}
	for i := 0; i < longCallConfig.quantityOfWorkers; i++ {
		waitGroup.Add(1)
		go func() {
			defer waitGroup.Done()
			for taskSize := range remainingTasks {
				//simulate a long task
				time.Sleep(time.Second * time.Duration(taskSize))
				//return the result of the long task
				producedResults <- taskSize
			}
		}()
	}

	//close producedResults channel when all workers finish
	go func() {
		waitGroup.Wait()
		close(producedResults)
	}()

	//read the results of the tasks and agregate them
	executedTasks := 0
	for resultOfTheTask := range producedResults {
		//consolidate the results of the tasks
		executedTasks += resultOfTheTask
	}

	durationInSeconds = time.Since(executionStart).Seconds()
	return durationInSeconds
}
