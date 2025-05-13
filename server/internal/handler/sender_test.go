package handler

import (
	"bytes"
	"errors"
	"net/http/httptest"
	"testing"

	"github.com/dkshi/sppotolok"
	"github.com/dkshi/sppotolok/internal/service"
	mock_service "github.com/dkshi/sppotolok/internal/service/mocks"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
	"go.uber.org/mock/gomock"
)

func TestHandler_sendEmailOrder(t *testing.T) {
	type mockBehavior func(s *mock_service.MockEmailSender, emailorder *sppotolok.EmailOrder)

	testTable := []struct {
		name               string
		inputBody          string
		inputEmailOrder    *sppotolok.EmailOrder
		mockBehavior       mockBehavior
		expectedStatusCode int
	}{
		{
			name: "OK",
			inputBody: `{ 
				"name": "Aleksandr Savosin",
				"email": "savosin_a@internet.ru",
				"phone": "+79153572644", 
				"order": 
					[
						{ 
							"name":"test",
							"price":"10 rub", 
							"quantity":10
						}
					], 
				"address": "Testovaya ulitsa 33 12"
			}`,
			inputEmailOrder: &sppotolok.EmailOrder{
				Name:  "Aleksandr Savosin",
				Email: "savosin_a@internet.ru",
				Phone: "+79153572644",
				Order: []*sppotolok.ProductOrder{
					{
						Name:     "test",
						Quantity: 10,
					},
				},
				Address: "Testovaya ulitsa 33 12",
			},
			mockBehavior: func(s *mock_service.MockEmailSender, emailorder *sppotolok.EmailOrder) {
				s.EXPECT().SendEmail(emailorder).Return(nil)
			},
			expectedStatusCode: 200,
		},
		{
			name: "Missing Required Fields",
			inputBody: `{ 
				"name": "Aleksandr Savosin",
			}`,
			inputEmailOrder: &sppotolok.EmailOrder{
				Name: "Aleksandr Savosin",
			},
			mockBehavior: func(s *mock_service.MockEmailSender, emailorder *sppotolok.EmailOrder) {
			},
			expectedStatusCode: 400,
		},
		{
			name: "OK",
			inputBody: `{ 
				"name": "Aleksandr Savosin",
				"email": "savosin_a@internet.ru",
				"phone": "+79153572644", 
				"order": 
					[
						{ 
							"name":"test",
							"price":"10 rub", 
							"quantity":10
						}
					], 
				"address": "Testovaya ulitsa 33 12"
			}`,
			inputEmailOrder: &sppotolok.EmailOrder{
				Name:  "Aleksandr Savosin",
				Email: "savosin_a@internet.ru",
				Phone: "+79153572644",
				Order: []*sppotolok.ProductOrder{
					{
						Name:     "test",
						Quantity: 10,
					},
				},
				Address: "Testovaya ulitsa 33 12",
			},
			mockBehavior: func(s *mock_service.MockEmailSender, emailorder *sppotolok.EmailOrder) {
				s.EXPECT().SendEmail(emailorder).Return(errors.New("cannot send email"))
			},
			expectedStatusCode: 500,
		},
	}

	for _, testCase := range testTable {
		t.Run(testCase.name, func(t *testing.T) {
			// Init
			c := gomock.NewController(t)
			defer c.Finish()

			emailSender := mock_service.NewMockEmailSender(c)
			testCase.mockBehavior(emailSender, testCase.inputEmailOrder)

			s := &service.Service{EmailSender: emailSender}
			handler := NewHandler(s)

			// Test server
			r := gin.New()
			r.POST("/emailorder", handler.sendEmailOrder)

			// Test request
			w := httptest.NewRecorder()
			req := httptest.NewRequest("POST", "/emailorder", bytes.NewBufferString(testCase.inputBody))

			// Make request
			r.ServeHTTP(w, req)

			// Assert
			assert.Equal(t, testCase.expectedStatusCode, w.Code)
		})
	}
}
