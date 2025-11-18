import { Router } from "express";
import { TodoController } from "../controllers/todoController";

const router = Router();

// Assuming middleware for auth sets req.user
router.post("/", TodoController.createTodo);
router.get("/", TodoController.getTodos); // For user's todos, userId from auth
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;