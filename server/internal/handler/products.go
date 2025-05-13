package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

const (
	standartPage = 1
	standartPageSize = 4
)

func (h *Handler) products(c *gin.Context) {
	productType := c.Query("type")
	productSearch := c.Query("search")

	var err error
	page, size := standartPage, standartPageSize
	pageStr := c.Query("page")
	sizeStr := c.Query("size")

	if pageStr != "" {
		page, err = strconv.Atoi(c.Query("page"))
		if err != nil {
			newErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}
	}

	if sizeStr != "" {
		size, err = strconv.Atoi(c.Query("size"))
		if err != nil {
			newErrorResponse(c, http.StatusBadRequest, err.Error())
			return
		}
	}

	ps, err := h.service.GetProducts(productType, productSearch, page, size)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, ps)
}

func (h *Handler) popularProducts(c *gin.Context) {
	ps, err := h.service.GetPopularProducts()
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}
	c.JSON(http.StatusOK, ps)
}
