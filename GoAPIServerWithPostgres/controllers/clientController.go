package controllers

import (
	"net/http"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"github.com/gin-gonic/gin"
)

func FindAll(c *gin.Context) {
	var clients []models.Client
	database.DB.Find(&clients)
	c.JSON(http.StatusOK, clients)
}

func Create(c *gin.Context) {
	var client models.Client
	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&client)
	c.JSON(http.StatusOK, client)
}

func Delete(c *gin.Context) {
	id := c.Params.ByName("id")

	database.DB.Delete(&models.Client{}, id)
}

func FindById(c *gin.Context) {
	id := c.Params.ByName("id")
	var client models.Client

	tx := database.DB.First(&client, id)
	if tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
	} else {
		c.JSON(http.StatusOK, client)
	}

}

func Update(c *gin.Context) {
	var client models.Client
	id := c.Params.ByName("id")

	if tx := database.DB.First(&client, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
		return
	}

	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if tx := database.DB.Model(&client).UpdateColumns(client); tx.Error != nil {
		c.JSON(http.StatusBadRequest, tx.Error.Error())
		return
	}

	c.JSON(http.StatusOK, client)
}

func FindByCpf(c *gin.Context) {
	var client models.Client
	cpf := c.Params.ByName("cpf")

	database.DB.Where(&models.Client{CPF: cpf}).First(&client)

	if client.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
		return
	}

	c.JSON(http.StatusOK, client)
}
