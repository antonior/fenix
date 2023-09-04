package main

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/routes"
)

func main() {
	config := models.LoadConfigFile()
	db := database.ConnectToDatabase(config)
	routes.HandleRequests(db)
}
