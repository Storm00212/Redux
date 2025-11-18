import { Pool } from 'pg';
import { getPool } from '../db/config';
import { Todo, CreateTodoData, UpdateTodoData } from '../types/todotypes';

class TodoRepository {
  private poolPromise: Promise<Pool>;

  constructor() {
    this.poolPromise = getPool();
  }

  async createTodo(todoData: CreateTodoData): Promise<Todo> {
    const query = `
      INSERT INTO todos (user_id, title, description, completed, created_at, updated_at)
      VALUES ($1, $2, $3, false, NOW(), NOW())
      RETURNING id, user_id, title, description, completed, created_at, updated_at
    `;
    const values = [todoData.user_id, todoData.title, todoData.description || null];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  }

  async getTodos(userId: number): Promise<Todo[]> {
    const query = `
      SELECT id, user_id, title, description, completed, created_at, updated_at
      FROM todos
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const values = [userId];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new Error('Failed to fetch todos');
    }
  }

  async updateTodo(id: number, updates: UpdateTodoData): Promise<Todo | null> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (updates.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(updates.title);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(updates.description);
    }
    if (updates.completed !== undefined) {
      fields.push(`completed = $${paramIndex++}`);
      values.push(updates.completed);
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const query = `
      UPDATE todos
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING id, user_id, title, description, completed, created_at, updated_at
    `;

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw new Error('Failed to update todo');
    }
  }

  async deleteTodo(id: number): Promise<boolean> {
    const query = `
      DELETE FROM todos
      WHERE id = $1
    `;
    const values = [id];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo');
    }
  }
}

export default TodoRepository;