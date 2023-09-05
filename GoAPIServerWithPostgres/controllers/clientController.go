package controllers

import (
	"net/http"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ClientController struct {
	DB *gorm.DB
}

func (ctrl *ClientController) FindAll(c *gin.Context) {
	var clients []models.Client
	ctrl.DB.Find(&clients)
	c.JSON(http.StatusOK, clients)
}

func (ctrl *ClientController) Create(c *gin.Context) {
	var client models.Client
	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := client.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctrl.DB.Create(&client)
	c.JSON(http.StatusOK, client)
}

func (ctrl *ClientController) Delete(c *gin.Context) {
	id := c.Params.ByName("id")

	if tx := ctrl.DB.Delete(&models.Client{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "client not found"})
		return
	}
}

func (ctrl *ClientController) FindById(c *gin.Context) {
	id := c.Params.ByName("id")
	var client models.Client

	tx := ctrl.DB.First(&client, id)
	if tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
	} else {
		c.JSON(http.StatusOK, client)
	}
}

func (ctrl *ClientController) Update(c *gin.Context) {
	var client models.Client
	id := c.Params.ByName("id")

	if tx := ctrl.DB.First(&client, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
		return
	}

	if err := c.ShouldBindJSON(&client); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if tx := ctrl.DB.Model(&client).UpdateColumns(client); tx.Error != nil {
		c.JSON(http.StatusBadRequest, tx.Error.Error())
		return
	}

	c.JSON(http.StatusOK, client)
}

func (ctrl *ClientController) FindByCpf(c *gin.Context) {
	var client models.Client
	cpf := c.Params.ByName("cpf")

	ctrl.DB.Where(&models.Client{CPF: cpf}).First(&client)

	if client.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "client not found"})
		return
	}

	c.JSON(http.StatusOK, client)
}
