package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Todo struct {
	ID       int    `json:"id"`
	Complete bool   `json:"complete"`
	Body     string `json:"body"`
}

func main() {
	app := fiber.New()
	err :=godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	PORT := os.Getenv("PORT")

	todos := []Todo{}

	// Root endpoint
	app.Get("/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	// Create a new todo
	app.Post("/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"Error": "Invalid request body",
			})
		}
		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{
				"Error": "Body is required",
			})
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)
		return c.Status(201).JSON(todo)
	})

	// Update a todo
	app.Patch("/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Complete = true
				return c.Status(200).JSON(todos[i])
			}
		}
		return c.Status(404).JSON(fiber.Map{
			"Error": "Todo not found",
		})
	})
	
	// Delete a todo
	app.Delete("/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return c.Status(200).JSON(fiber.Map{
					"message": "Todo deleted",
					"Sucess":  true,
				})
			}
		}
		return c.Status(404).JSON(fiber.Map{
			"Error": "Todo not found",
		})
	})

	log.Fatal(app.Listen(":" + PORT))
	fmt.Println("Server is running on port " + PORT)
}