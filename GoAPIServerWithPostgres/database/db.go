package database

import (
	"fmt"
	"log"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDatabase(config models.Config) (db *gorm.DB) {
	connectionString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.DbServer, config.DbUser, config.DbPassword, config.DbName, config.DbPort)

	var err error
	db, err = gorm.Open(postgres.Open(connectionString))
	if err != nil {
		log.Panic("Error connecting to database", err.Error())
	}

	db.AutoMigrate(&models.Client{}, &models.User{})
	return db
}
