package sppotolok

type EmailOrder struct {
	Name    string          `json:"name" binding:"required"`
	Email   string          `json:"email"`
	Phone   string          `json:"phone" binding:"required"`
	Order   []*ProductOrder `json:"order" binding:"required"`
	Address string          `json:"address" binding:"required"`
}
