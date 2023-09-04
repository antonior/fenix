package routes

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/controllers"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/middlewares"
	"github.com/gin-gonic/gin"
)

func HandleRequests() {
	server := gin.Default()
	api := server.Group("/api")
	{
		api.POST("/token", controllers.GenerateToken)
		api.POST("/user/register", controllers.RegisterUser)
		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			secured.GET("/students", controllers.FindAll)
			secured.POST("/students", controllers.Create)
			secured.GET("/students/:id", controllers.FindById)
			secured.DELETE("/students/:id", controllers.Delete)
			secured.PATCH("/students/:id", controllers.Update)
			secured.GET("/students/cpf/:cpf", controllers.FindByCpf)
			secured.POST("/longtask", controllers.HandleLongTaskCall)
			secured.GET("/ping", controllers.Ping)
		}
	}
	server.Run(":8080")
}
