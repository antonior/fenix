package database

import (
	"fmt"
	"log"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func ConnectToDatabase(config models.Config) {
	connectionString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.DbServer, config.DbUser, config.DbPassword, config.DbName, config.DbPort)

	DB, err = gorm.Open(postgres.Open(connectionString))
	if err != nil {
		log.Panic("Error connecting to database", err.Error())
	}

	DB.AutoMigrate(&models.Student{})
}
