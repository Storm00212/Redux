import { Pool } from 'pg';
import { getPool } from '../db/config';
import { Todo, CreateTodoData, UpdateTodoData } from '../types/todotypes';

/**
 * Repository class for handling todo-related database operations.
 * Provides CRUD methods for todo items with user association.
 * Uses PostgreSQL connection pooling for database interactions.
 */
class TodoRepository {
   private poolPromise: Promise<Pool>;

   /**
    * Initializes the repository with a database connection pool.
    */
   constructor() {
     this.poolPromise = getPool();
   }

   /**
    * Creates a new todo item in the database.
    * @param todoData - The todo data containing user_id, title, and optional description
    * @returns Promise<Todo> - The created todo object with database-generated fields
    * @throws Error if creation fails
    */
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

  /**
   * Retrieves all todo items for a specific user.
   * @param userId - The ID of the user whose todos to retrieve
   * @returns Promise<Todo[]> - Array of todo objects for the user
   * @throws Error if database query fails
   */
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

  /**
   * Updates an existing todo item with partial data.
   * @param id - The ID of the todo to update
   * @param updates - Object containing fields to update (title, description, completed)
   * @returns Promise<Todo | null> - Updated todo object or null if not found
   * @throws Error if no fields to update or database query fails
   */
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

  /**
   * Deletes a todo item from the database.
   * @param id - The ID of the todo to delete
   * @returns Promise<boolean> - True if todo was deleted, false if not found
   * @throws Error if database query fails
   */
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