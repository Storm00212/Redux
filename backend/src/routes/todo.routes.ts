/**
 * Todo Routes
 * Defines Express routes for todo-related operations including creating and retrieving todos.
 * All routes require authentication and apply appropriate validation middleware.
 */

import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authMiddleware, validateCreateTodo } from '../middleware/todo.middleware';

const router = Router();

// Create new todo endpoint - requires authentication and input validation
router.post('/', authMiddleware, validateCreateTodo, TodoController.createTodo);

// Get user's todos endpoint - requires authentication
router.get('/', authMiddleware, TodoController.getTodos);

export default router;