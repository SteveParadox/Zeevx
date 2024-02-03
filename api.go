package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"errors"
)

type book struct {
	ID string `json:"id"`
	Title string `json:"title"`
	Author string `json:"author"`
	Quantity int `json:"quantity"`
}

var books = []book{
	{ID: '1', Title:'FDFDD', Author: "fdgd"}
}


func main() {
	router := gin.Default()
}