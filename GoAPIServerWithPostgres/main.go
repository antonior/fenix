package main

import (
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/database"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/routes"
)

func main() {
	database.ConnectToDatabase()
	routes.HandleRequests()

}
