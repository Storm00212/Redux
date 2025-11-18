import { Pool } from 'pg';
import { getPool } from '../db/config';
import { User, RegisterData } from '../types/usertypes';

class UserRepository {
  private poolPromise: Promise<Pool>;

  constructor() {
    this.poolPromise = getPool();
  }

  async register(userData: RegisterData): Promise<User> {
    const query = `
      INSERT INTO users (email, password_hash, created_at)
      VALUES ($1, $2, NOW())
      RETURNING id, email, password_hash, created_at
    `;
    const values = [userData.email, userData.password_hash];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  async login(email: string): Promise<User | null> {
    const query = `
      SELECT id, email, password_hash, created_at
      FROM users
      WHERE email = $1
    `;
    const values = [email];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('Failed to login user');
    }
  }

  async getUserById(id: number): Promise<User | null> {
    const query = `
      SELECT id, email, password_hash, created_at
      FROM users
      WHERE id = $1
    `;
    const values = [id];

    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Failed to fetch user');
    }
  }
}

export default UserRepository;