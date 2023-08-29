package controllers

import (
	"net/http"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"github.com/gin-gonic/gin"
)

func ExibeTodosAlunos(c *gin.Context) {
	var alunos []models.Aluno
	database.DB.Find(&alunos)
	c.JSON(http.StatusOK, alunos)
}

func CriaNovoAluno(c *gin.Context) {
	var aluno models.Aluno
	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&aluno)
	c.JSON(http.StatusOK, aluno)
}

func DeletaAluno(c *gin.Context) {
	id := c.Params.ByName("id")

	database.DB.Delete(&models.Aluno{}, id)
}

func FindbyId(c *gin.Context) {
	id := c.Params.ByName("id")
	var aluno models.Aluno

	tx := database.DB.First(&aluno, id)
	if tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Aluno não encontrado"})
	} else {
		c.JSON(http.StatusOK, aluno)
	}

}

func EditaAluno(c *gin.Context) {
	var aluno models.Aluno
	id := c.Params.ByName("id")

	if tx := database.DB.First(&aluno, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Aluno não encontrado"})
		return
	}

	if err := c.ShouldBindJSON(&aluno); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	if tx := database.DB.Model(&aluno).UpdateColumns(aluno); tx.Error != nil {
		c.JSON(http.StatusBadRequest, tx.Error.Error())
		return
	}

	c.JSON(http.StatusOK, aluno)
}

func BuscaAlunoPorCPF(c *gin.Context) {
	var aluno models.Aluno
	cpf := c.Params.ByName("cpf")

	database.DB.Where(&models.Aluno{CPF: cpf}).First(&aluno)

	if aluno.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"Not Found": "Aluno não encontrado"})
		return
	}

	c.JSON(http.StatusOK, aluno)
}
