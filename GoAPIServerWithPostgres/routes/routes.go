package routes

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/controllers"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	server := gin.Default()
	server.GET("/students", controllers.FindAll)
	server.POST("/students", controllers.Create)
	server.GET("/students/:id", controllers.FindById)
	server.DELETE("/students/:id", controllers.Delete)
	server.PATCH("/students/:id", controllers.Update)
	server.GET("/students/cpf/:cpf", controllers.FindByCpf)
	server.Run(":8080")
}
