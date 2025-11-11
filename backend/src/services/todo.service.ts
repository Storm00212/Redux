/**
 * Todo Service
 * Contains business logic for todo operations including creation and retrieval.
 * Acts as an intermediary between controllers and repositories, handling any
 * additional business rules or data transformations.
 */

import { TodoRepository } from '../repositories/todo.repositories';
import { todo } from '../types/todo.schema';

export class TodoService {
  /**
   * Creates a new todo item for a user.
   * Delegates to repository for database operations.
   */
  static async createTodo(name: string, description: string, createdBy: number): Promise<todo> {
    return await TodoRepository.createTodo(name, description, createdBy);
  }

  /**
   * Retrieves all todos created by a specific user.
   * Delegates to repository for database query.
   */
  static async getTodosByUserId(userId: number): Promise<todo[]> {
    return await TodoRepository.findTodosByUserId(userId);
  }
}