package main

import (
	"log"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/routes"
)

func main() {
	//load configurations
	config, err := models.LoadConfigFile()
	if err != nil {
		log.Panic(err.Error())
	}

	//connect to database
	db := database.ConnectToDatabase(config)

	//start http server
	routes.HandleRequests(db)
}
