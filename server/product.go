package sppotolok

type Product struct {
	ProductID   int    `json:"-" db:"-"`
	ProductType string `json:"type" db:"type" binding:"required"`
	Name        string `json:"name" db:"name" binding:"required"`
	Price       string `json:"price" db:"price" binding:"required"`
	ImageLink   string `json:"image_link" db:"image_link" binding:"required"`
}
