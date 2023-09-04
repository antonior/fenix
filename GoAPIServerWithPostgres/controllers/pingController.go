package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PingController struct{}

func (ctrl *PingController) Ping(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"message": "pong"})
}
