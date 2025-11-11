import pool from "../db/dbconfig";
import { User } from "../types/user.schema";

export class UserRepository {
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

  static async findUserByEmail(email: string): Promise<User | null> {
    const query = `SELECT id, name, email, password, "createdAt" FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findUserById(id: number): Promise<User | null> {
    const query = `SELECT id, name, email, password, "createdAt" FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
