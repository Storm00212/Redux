import { Pool } from 'pg';
import { getPool } from '../db/config';
import { User, RegisterData } from '../types/usertypes';

/**
 * Repository class for handling user-related database operations.
 * Provides methods for user registration, login, and retrieval.
 * Uses PostgreSQL connection pooling for database interactions.
 */
class UserRepository {
   private poolPromise: Promise<Pool>;

   /**
    * Initializes the repository with a database connection pool.
    */
   constructor() {
     this.poolPromise = getPool();
   }

   /**
    * Registers a new user in the database.
    * @param userData - The user data containing email and hashed password
    * @returns Promise<User> - The created user object with database-generated fields
    * @throws Error if registration fails
    */
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

  /**
   * Retrieves a user by email for login purposes.
   * @param email - The user's email address
   * @returns Promise<User | null> - User object if found, null otherwise
   * @throws Error if database query fails
   */
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

  /**
   * Retrieves a user by their unique ID.
   * @param id - The user's unique identifier
   * @returns Promise<User | null> - User object if found, null otherwise
   * @throws Error if database query fails
   */
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

  async getUserByEmail(email: string): Promise<User>{
    const query = `
    SELECT id, email, password_hash, created_at
    FROM users
    WHERE email = $1
    `;

    const values = [email]
    try {
      const pool = await this.poolPromise;
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching user by Email:', error);
      throw new Error('Failed to fetch user');
    }

  }
}

export default UserRepository;