package controllers

import (
	"net/http"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"github.com/gin-gonic/gin"
)

func FindAll(c *gin.Context) {
	var students []models.Student
	database.DB.Find(&students)
	c.JSON(http.StatusOK, students)
}

func Create(c *gin.Context) {
	var student models.Student
	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&student)
	c.JSON(http.StatusOK, student)
}

func Delete(c *gin.Context) {
	id := c.Params.ByName("id")

	database.DB.Delete(&models.Student{}, id)
}

func FindById(c *gin.Context) {
	id := c.Params.ByName("id")
	var student models.Student

	tx := database.DB.First(&student, id)
	if tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Student not found"})
	} else {
		c.JSON(http.StatusOK, student)
	}

}

func Update(c *gin.Context) {
	var student models.Student
	id := c.Params.ByName("id")

	if tx := database.DB.First(&student, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Student not found"})
		return
	}

	if err := c.ShouldBindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if tx := database.DB.Model(&student).UpdateColumns(student); tx.Error != nil {
		c.JSON(http.StatusBadRequest, tx.Error.Error())
		return
	}

	c.JSON(http.StatusOK, student)
}

func FindByCpf(c *gin.Context) {
	var student models.Student
	cpf := c.Params.ByName("cpf")

	database.DB.Where(&models.Student{CPF: cpf}).First(&student)

	if student.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, student)
}
