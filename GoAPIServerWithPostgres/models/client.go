package models

import "gorm.io/gorm"

type Client struct {
	gorm.Model
	Name string `json:"name"`
	CPF  string `json:"cpf"`
	RG   string `json:"rg"`
}
