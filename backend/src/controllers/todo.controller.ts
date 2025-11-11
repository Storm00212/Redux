/**
 * Todo Controller
 * Handles HTTP requests related to todo operations such as creating new todos and retrieving user-specific todos.
 * Relies on authentication middleware to attach user information to the request object.
 */

import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
  /**
   * Creates a new todo item.
   * Extracts todo details from request body and user ID from authenticated request,
   * calls TodoService to create the todo, and returns the created todo.
   */
  static async createTodo(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const createdBy = (req as any).user.id; // User ID attached by authentication middleware
      const todo = await TodoService.createTodo(name, description, createdBy);
      res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Retrieves all todos for the authenticated user.
   * Extracts user ID from authenticated request, calls TodoService to fetch todos,
   * and returns the list of todos.
   */
  static async getTodos(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id; // User ID attached by authentication middleware
      const todos = await TodoService.getTodosByUserId(userId);
      res.json({ todos });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}