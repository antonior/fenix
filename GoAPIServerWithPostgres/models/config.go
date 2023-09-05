package models

import (
	"encoding/json"
	"errors"
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

func LoadConfigFile() (Config, error) {
	var config Config
	file, _ := os.Open("config.json")
	defer file.Close()
	decoder := json.NewDecoder(file)

	if err := decoder.Decode(&config); err != nil {
		log.Panic(err.Error())
	}

	if err := config.Validate(); err != nil {
		return config, err
	}
	return config, nil
}

func (config Config) Validate() error {
	if config.DbServer == "" {
		return errors.New("Config file dbServer must not be empty")
	}
	if config.DbPort == "" {
		return errors.New("Config file dbPort must not be empty")
	}
	if config.DbName == "" {
		return errors.New("Config file dbName must not be empty")
	}
	if config.DbUser == "" {
		return errors.New("Config file dbUser must not be empty")
	}
	if config.DbPassword == "" {
		return errors.New("Config file dbPassword must not be empty")
	}
	return nil
}
