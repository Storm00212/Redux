import { Router } from "express";
import { TodoController } from "../controllers/todoController";

const router = Router();

// POST /todo - Create a new todo for the authenticated user
router.post("/", TodoController.createTodo);

// GET /todo - Retrieve all todos for the authenticated user
router.get("/", TodoController.getTodos);

// PUT /todo/:id - Update a specific todo (requires user ownership)
router.put("/:id", TodoController.updateTodo);

// DELETE /todo/:id - Delete a specific todo (requires user ownership)
router.delete("/:id", TodoController.deleteTodo);

export default router;