package models

import (
	"testing"
)

func TestUserValidateWithoutError(t *testing.T) {
	user := User{Name: "name", Username: "username", Email: "email", Password: "password"}

	got := user.Validate()

	if got != nil {
		t.Errorf("got %q, wanted %q", got, "nil")
	}
}

func TestUserValidateWithoutName(t *testing.T) {
	user := User{Username: "username", Email: "email", Password: "password"}
	wantedError := "User name must not be empty"

	if err := user.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestUserValidateWithoutUsername(t *testing.T) {
	user := User{Name: "name", Email: "email", Password: "password"}
	wantedError := "User Username must not be empty"

	if err := user.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestUserValidateWithoutEmail(t *testing.T) {
	user := User{Name: "name", Username: "username", Password: "password"}
	wantedError := "User Email must not be empty"

	if err := user.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestUserValidateWithoutPassword(t *testing.T) {
	user := User{Name: "name", Username: "username", Email: "email"}
	wantedError := "User Password must not be empty"

	if err := user.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}
