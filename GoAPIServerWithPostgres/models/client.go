package models

import (
	"errors"

	"gorm.io/gorm"
)

type Client struct {
	gorm.Model
	Name string `json:"name"`
	CPF  string `json:"cpf"`
	RG   string `json:"rg"`
}

func (client Client) Validate() error {
	if client.Name == "" {
		return errors.New("Client name must not be empty")
	}
	if client.CPF == "" {
		return errors.New("Client CPF must not be empty")
	}
	if client.RG == "" {
		return errors.New("Client RG must not be empty")
	}
	return nil
}
