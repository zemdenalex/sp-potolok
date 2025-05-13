package repository

import (
	"github.com/dkshi/sppotolok"
	"github.com/jmoiron/sqlx"
)

type Products interface {
	GetProducts(productsType, productFragment string,  page, size int) ([]*sppotolok.Product, error)
	GetPopularProducts() ([]*sppotolok.Product, error)
}

type Repository struct {
	Products
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Products: NewProductsRepository(db),
	}
}
