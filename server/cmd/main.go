package main

import (
	"os"

	"github.com/dkshi/sppotolok"
	"github.com/dkshi/sppotolok/internal/handler"
	"github.com/dkshi/sppotolok/internal/repository"
	"github.com/dkshi/sppotolok/internal/service"
	"github.com/sirupsen/logrus"
)

func main() {
	db, err := repository.NewPostgresDB(repository.Config{
		DBName:   os.Getenv("DB_NAME"),
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		Username: os.Getenv("DB_USERNAME"),
		Password: os.Getenv("DB_PASSWORD"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	})
	if err != nil {
		logrus.Fatalf("error connecting database: %s", err)
	}
	repo := repository.NewRepository(db)
	s := service.NewService(repo)

	err = s.ParseTemplates()
	if err != nil {
		logrus.Fatalf("error loading templates: %s", err)
	}

	h := handler.NewHandler(s)

	srv := new(sppotolok.Server)
	if err = srv.Run(os.Getenv("SERVER_PORT"), h.InitRoutes()); err != nil {
		logrus.Fatalf("error while running app: %s", err.Error())
	}
}
