package handler

import (
	"net/http"

	"github.com/dkshi/sppotolok"
	"github.com/gin-gonic/gin"
)


func (h *Handler) sendEmailOrder(c *gin.Context) {
	var emailorder sppotolok.EmailOrder

	if err := c.BindJSON(&emailorder); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.service.SendEmail(&emailorder); err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	
	c.Status(http.StatusOK)
}

func (h *Handler) sendEmailPhone(c *gin.Context) {
	var emailphone sppotolok.EmailPhone

	if err := c.BindJSON(&emailphone); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	if err := h.service.SendEmail(&emailphone); err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	
	c.Status(http.StatusOK)
}
