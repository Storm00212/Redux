/**
 * User Repository
 * Handles direct database operations for user entities.
 * Provides methods for creating, finding, and retrieving user data from the PostgreSQL database.
 */

import pool from "../db/dbconfig";
import { User } from "../types/user.schema";

export class UserRepository {
  /**
   * Creates a new user in the database.
   * Inserts user data and returns the created user record.
   */
  static async createUser(name: string, email: string, hashedPassword: string): Promise<User> {
    const query = `
      INSERT INTO users (name, email, password, "createdAt")
      VALUES ($1, $2, $3, NOW())
      RETURNING id, name, email, password, "createdAt"
    `;
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  /**
   * Finds a user by their email address.
   * Returns the user record if found, null otherwise.
   */
  static async findUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT id, name, email, password, "createdAt" FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Finds a user by their ID.
   * Returns the user record if found, null otherwise.
   */
  static async findUserById(id: number): Promise<User | null> {
    const query = `SELECT id, name, email, password, "createdAt" FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  /**
   * Retrieves all users from the database.
   * Returns an array of all user records.
   */
  static async getAllUsers(): Promise<User[]> {
    const query = `SELECT id, name, email, password, "createdAt" FROM users`;
    const result = await pool.query(query);
    return result.rows;
  }
}
