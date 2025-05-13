package service

import (
	"fmt"
	"net/smtp"
	"strings"

	"github.com/dkshi/sppotolok"
	"github.com/jordan-wright/email"
)

const (
	smtpAuthAddress   = "smtp.gmail.com"
	smtpServerAddress = "smtp.gmail.com:587"
	subjectOrder      = "Новый заказ"
	subjectPhone      = "Перезвоните мне"
)

type GmailSender struct {
	fromEmailAddress  string
	fromEmailPassword string
	toEmailAddress    string
}

func NewGmailSender(fromEmailAddress, fromEmailPassword, toEmailAddress string) *GmailSender {
	return &GmailSender{
		fromEmailAddress:  fromEmailAddress,
		fromEmailPassword: fromEmailPassword,
		toEmailAddress:    toEmailAddress,
	}
}

func (s *GmailSender) SendEmail(emailData any) error {
	e := email.NewEmail()

	e.From = fmt.Sprintf("SP POTOLOK <%s>", s.fromEmailAddress)
	e.To = []string{s.toEmailAddress}

	switch emailData.(type) {
	case *sppotolok.EmailOrder:
		e.Subject = subjectOrder
	case *sppotolok.EmailPhone:
		e.Subject = subjectPhone
	}

	emailHTML, err := s.executeEmailHTML(emailData)
	if err != nil {
		return err
	}
	e.HTML = []byte(emailHTML)

	return e.Send(smtpServerAddress, smtp.PlainAuth("", s.fromEmailAddress, s.fromEmailPassword, smtpAuthAddress))
}

func (s *GmailSender) executeEmailHTML(emailData any) (string, error) {
	var b strings.Builder
	err := templates.ExecuteTemplate(&b, s.getEmailTemplateName(emailData), emailData)

	if err != nil {
		return "", err
	}

	return b.String(), nil
}

func (s *GmailSender) getEmailTemplateName(emailData any) string {
	switch emailData.(type) {
	case *sppotolok.EmailOrder:
		return "emailorder.html"
	case *sppotolok.EmailPhone:
		return "emailphone.html"
	default:
		return ""
	}
}
