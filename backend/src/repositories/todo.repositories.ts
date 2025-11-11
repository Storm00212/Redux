/**
 * Todo Repository
 * Handles direct database operations for todo entities.
 * Provides methods for creating todos and retrieving todos by user.
 */

import pool from "../db/dbconfig";
import { todo } from "../types/todo.schema";

export class TodoRepository {
  /**
   * Creates a new todo item in the database.
   * Inserts todo data with creator reference and returns the created todo record.
   */
  static async createTodo(name: string, description: string, createdBy: number): Promise<todo> {
    const query = `
      INSERT INTO todos (name, description, "createdBy")
      VALUES ($1, $2, $3)
      RETURNING id, name, description, "createdBy"
    `;
    const values = [name, description, createdBy];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Finds all todos created by a specific user.
   * Returns an array of todo records for the given user ID.
   */
  static async findTodosByUserId(userId: number): Promise<todo[]> {
    const query = `SELECT id, name, description, "createdBy" FROM todos WHERE "createdBy" = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}