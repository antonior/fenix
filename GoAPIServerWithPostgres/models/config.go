package models

import (
	"encoding/json"
	"log"
	"os"
)

type Config struct {
	DbServer   string `json:"dbServer"`
	DbPort     string `json:"dbPort"`
	DbName     string `json:"dbName"`
	DbUser     string `json:"dbUser"`
	DbPassword string `json:"dbPassword"`
}

func LoadConfigFile() Config {
	var config Config
	file, _ := os.Open("config.json")
	defer file.Close()
	decoder := json.NewDecoder(file)
	err := decoder.Decode(&config)
	if err != nil {
		log.Panic(err.Error())
	}
	return config
}
