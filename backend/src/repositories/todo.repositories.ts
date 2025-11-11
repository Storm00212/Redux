import pool from "../db/dbconfig";
import { todo } from "../types/todo.schema";

export class TodoRepository {
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

  static async findTodosByUserId(userId: number): Promise<todo[]> {
    const query = `SELECT id, name, description, "createdBy" FROM todos WHERE "createdBy" = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}