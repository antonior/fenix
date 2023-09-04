package routes

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/controllers"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/middlewares"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleRequests(db *gorm.DB) {
	server := gin.Default()
	api := server.Group("/api")
	{
		tokenController := controllers.TokenController{DB: db}
		api.POST("/token", tokenController.GenerateToken)
		userController := controllers.UserController{DB: db}
		api.POST("/user/register", userController.RegisterUser)

		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			clientController := controllers.ClientController{DB: db}
			secured.GET("/clients", clientController.FindAll)
			secured.POST("/clients", clientController.Create)
			secured.GET("/clients/:id", clientController.FindById)
			secured.DELETE("/clients/:id", clientController.Delete)
			secured.PATCH("/clients/:id", clientController.Update)
			secured.GET("/clients/cpf/:cpf", clientController.FindByCpf)

			longTaskController := controllers.LongtaskController{}
			secured.POST("/longtask", longTaskController.HandleLongTaskCall)

			pingController := controllers.PingController{}
			secured.GET("/ping", pingController.Ping)
		}
	}
	server.Run(":8080")
}
