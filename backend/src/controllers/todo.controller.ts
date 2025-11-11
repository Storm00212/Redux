/**
 * Todo Controller
 * Handles HTTP requests related to todo operations such as creating new todos and retrieving user-specific todos.
 * Relies on authentication middleware to attach user information to the request object.
 *
 * Controller Layer Responsibilities:
 * - Extract authenticated user ID from request
 * - Parse todo data from request body
 * - Call TodoService for business logic
 * - Format responses for frontend consumption
 * - Handle errors from service layer
 */

import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';

export class TodoController {
  /**
   * Creates a new todo item for the authenticated user.
   * Process: Extract data → Get user ID → Create todo → Respond
   * Endpoint: POST /api/todos/
   * Requires: Authentication middleware
   */
  static async createTodo(req: Request, res: Response) {
    try {
      // Extract todo data from request body
      const { name, description } = req.body;
      // Get authenticated user ID from request (attached by auth middleware)
      const createdBy = (req as any).user.id; // User ID attached by authentication middleware
      // Call service layer to create todo in database
      const todo = await TodoService.createTodo(name, description, createdBy);
      // Send success response with created todo
      res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error: any) {
      // Handle creation errors (validation, database issues)
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Retrieves all todos belonging to the authenticated user.
   * Process: Get user ID → Fetch todos → Return list
   * Endpoint: GET /api/todos/
   * Requires: Authentication middleware
   */
  static async getTodos(req: Request, res: Response) {
    try {
      // Get authenticated user ID from request
      const userId = (req as any).user.id; // User ID attached by authentication middleware
      // Call service layer to fetch user's todos
      const todos = await TodoService.getTodosByUserId(userId);
      // Send todos array in response
      res.json({ todos });
    } catch (error: any) {
      // Handle retrieval errors (database issues)
      res.status(500).json({ error: error.message });
    }
  }
}