package routes

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/controllers"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	server := gin.Default()
	server.GET("/alunos", controllers.ExibeTodosAlunos)
	server.POST("/alunos", controllers.CriaNovoAluno)
	server.GET("/alunos/:id", controllers.FindbyId)
	server.DELETE("/alunos/:id", controllers.DeletaAluno)
	server.PATCH("/alunos/:id", controllers.EditaAluno)
	server.GET("/alunos/cpf/:cpf", controllers.BuscaAlunoPorCPF)
	server.Run(":8080")
}
