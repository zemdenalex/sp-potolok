package sppotolok

type EmailPhone struct {
	Name    string `json:"name" binding:"required"`
	Phone   string `json:"phone" binding:"required"`
	Message string `json:"message"`
}
