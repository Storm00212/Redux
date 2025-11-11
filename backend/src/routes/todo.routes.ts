import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { authMiddleware, validateCreateTodo } from '../middleware/todo.middleware';

const router = Router();

router.post('/', authMiddleware, validateCreateTodo, TodoController.createTodo);
router.get('/', authMiddleware, TodoController.getTodos);

export default router;