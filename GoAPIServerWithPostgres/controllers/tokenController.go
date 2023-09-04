package controllers

import (
	"net/http"

	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/auth"
	"gitgub.com/antonior/fenix/GoAPIServerWithPostgres/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type TokenController struct {
	DB *gorm.DB
}

type tokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (ctrl *TokenController) GenerateToken(context *gin.Context) {
	var request tokenRequest
	var user models.User
	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	// check if email exists and password is correct
	record := ctrl.DB.Where("email = ?", request.Email).First(&user)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}
	credentialError := user.CheckPassword(request.Password)
	if credentialError != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials"})
		context.Abort()
		return
	}
	tokenString, err := auth.GenerateJWT(user.Email, user.Username)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		context.Abort()
		return
	}
	context.JSON(http.StatusOK, gin.H{"token": tokenString})
}
