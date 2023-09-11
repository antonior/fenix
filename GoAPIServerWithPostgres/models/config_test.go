package models

import (
	"testing"
)

func TestConfigValidateWithoutError(t *testing.T) {
	config := Config{DbServer: "server", DbPort: "port", DbName: "name", DbUser: "user", DbPassword: "password"}

	got := config.Validate()

	if got != nil {
		t.Errorf("got %q, wanted %q", got, "nil")
	}
}

func TestConfigValidateWithoutDbServer(t *testing.T) {
	config := Config{DbPort: "port", DbName: "name", DbUser: "user", DbPassword: "password"}
	wantedError := "Config file dbServer must not be empty"

	if err := config.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestConfigValidateWithoutDbPort(t *testing.T) {
	config := Config{DbServer: "server", DbName: "name", DbUser: "user", DbPassword: "password"}
	wantedError := "Config file dbPort must not be empty"

	if err := config.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestConfigValidateWithoutDbName(t *testing.T) {
	config := Config{DbServer: "server", DbPort: "port", DbUser: "user", DbPassword: "password"}
	wantedError := "Config file dbName must not be empty"

	if err := config.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestConfigValidateWithoutDbUser(t *testing.T) {
	config := Config{DbServer: "server", DbPort: "port", DbName: "name", DbPassword: "password"}
	wantedError := "Config file dbUser must not be empty"

	if err := config.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}

func TestConfigValidateWithoutDbPassword(t *testing.T) {
	config := Config{DbServer: "server", DbPort: "port", DbName: "name", DbUser: "user"}
	wantedError := "Config file dbPassword must not be empty"

	if err := config.Validate(); err == nil || err.Error() != wantedError {
		t.Errorf("got %q, wanted %q", err, wantedError)
	}
}
