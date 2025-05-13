package service

import (
	"github.com/dkshi/sppotolok"
	"github.com/dkshi/sppotolok/internal/repository"
)

type ProductsService struct {
	repo *repository.Repository
}

func NewProductsService(repo *repository.Repository) *ProductsService {
	return &ProductsService{
		repo: repo,
	}
}

func (s *ProductsService) GetProducts(productsType, productFragment string, page, size int) ([]*sppotolok.Product, error) {
	return s.repo.GetProducts(productsType, productFragment, page, size)
}

func (s *ProductsService) GetPopularProducts() ([]*sppotolok.Product, error) {
	return s.repo.GetPopularProducts()
}
