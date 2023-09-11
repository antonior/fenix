package models

import (
	"testing"
)

func TestClientValidateWithoutError(t *testing.T) {

	client := Client{Name: "Tester", CPF: "12345678901", RG: "1234567"}

	got := client.Validate()

	if got != nil {
		t.Errorf("got %q, wanted %q", got, "nil")
	}
}

func TestClientValidateWithoutName(t *testing.T) {

	client := Client{CPF: "12345678901", RG: "1234567"}

	if err := client.Validate(); err == nil || err.Error() != "Client name must not be empty" {
		t.Errorf("got %q, wanted %q", err, "Client name must not be empty")
	}
}

func TestClientValidateWithoutCPF(t *testing.T) {

	client := Client{Name: "Tester", RG: "1234567"}

	if err := client.Validate(); err == nil || err.Error() != "Client CPF must not be empty" {
		t.Errorf("got %q, wanted %q", err, "Client CPF must not be empty")
	}
}

func TestClientValidateWithoutRG(t *testing.T) {

	client := Client{Name: "Tester", CPF: "12345678901"}

	if err := client.Validate(); err == nil || err.Error() != "Client RG must not be empty" {
		t.Errorf("got %q, wanted %q", err, "Client RG must not be empty")
	}
}
