package service

import (
	"html/template"
	"os"

	"github.com/dkshi/sppotolok"
	"github.com/dkshi/sppotolok/internal/repository"
)

//go:generate mockgen -source=service.go -destination=mocks/mock.go

var templates *template.Template

type Products interface {
	GetProducts(productsType, productFragment string,  page, size int) ([]*sppotolok.Product, error)
	GetPopularProducts() ([]*sppotolok.Product, error)
}

type EmailSender interface {
	SendEmail(emailData any) error
}

type Service struct {
	Products
	EmailSender
}

func NewService(repo *repository.Repository) *Service {
	return &Service{
		Products:    NewProductsService(repo),
		EmailSender: NewGmailSender(os.Getenv("FROM_EMAIL"), os.Getenv("FROM_PASSWORD"), os.Getenv("TO_EMAIL")),
	}
}

func (s *Service) ParseTemplates() error {
	files := []string{
		"./templates/emailorder.html",
		"./templates/emailphone.html",
	}

	ts, err := template.ParseFiles(files...)
	if err != nil {
		return err
	}
	templates = ts
	return nil
}
