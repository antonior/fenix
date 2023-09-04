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
			secured.GET("/clients", controllers.FindAll)
			secured.POST("/clients", controllers.Create)
			secured.GET("/clients/:id", controllers.FindById)
			secured.DELETE("/clients/:id", controllers.Delete)
			secured.PATCH("/clients/:id", controllers.Update)
			secured.GET("/clients/cpf/:cpf", controllers.FindByCpf)

			secured.POST("/longtask", controllers.HandleLongTaskCall)

			secured.GET("/ping", controllers.Ping)
		}
	}
	server.Run(":8080")
}
