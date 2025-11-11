import { TodoRepository } from '../repositories/todo.repositories';
import { todo } from '../types/todo.schema';

export class TodoService {
  static async createTodo(name: string, description: string, createdBy: number): Promise<todo> {
    return await TodoRepository.createTodo(name, description, createdBy);
  }

  static async getTodosByUserId(userId: number): Promise<todo[]> {
    return await TodoRepository.findTodosByUserId(userId);
  }
}