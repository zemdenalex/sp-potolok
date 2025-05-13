package handler

import (
	"github.com/dkshi/sppotolok/internal/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *service.Service
}

func NewHandler(service *service.Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()
	router.Use(corsMiddleware())

	router.GET("/products", h.products)
	router.GET("/products/popular", h.popularProducts)
	router.Group("/send")
	{
		router.POST("/emailorder", h.sendEmailOrder)
		router.POST("/emailphone", h.sendEmailPhone)
	}

	return router
}
