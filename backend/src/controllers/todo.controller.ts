import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
  static async createTodo(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const createdBy = (req as any).user.id; // From auth middleware
      const todo = await TodoService.createTodo(name, description, createdBy);
      res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getTodos(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const todos = await TodoService.getTodosByUserId(userId);
      res.json({ todos });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}