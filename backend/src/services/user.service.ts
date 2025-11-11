/**
 * User Service
 * Contains business logic for user operations including registration, authentication,
 * and user data retrieval. Handles password hashing, JWT token generation, and validation.
 *
 * Security Features:
 * - Password hashing with bcrypt (salt rounds: 10)
 * - JWT tokens with 1-hour expiration
 * - Email uniqueness validation
 * - Centralized error handling
 */

import bcrypt from 'bcrypt'; // Library for password hashing
import jwt from 'jsonwebtoken'; // Library for JWT token creation/verification
import { UserRepository } from '../repositories/user.repositories';
import { User, LoginUser } from '../types/user.schema';

// JWT secret key loaded from environment variables for security
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserService {
  /**
   * Registers a new user.
   * Validates uniqueness, hashes password, and creates user record.
   */
  static async register(name: string, email: string, password: string): Promise<User> {
    // Check if user exists
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await UserRepository.createUser(name, email, hashedPassword);
    return user;
  }

  /**
   * Authenticates a user and generates JWT token.
   * Validates credentials and returns user data with access token.
   */
  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Find user by email
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password against stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token with user info
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  }

  /**
   * Retrieves a user by their ID.
   * Used for authentication middleware to validate tokens.
   */
  static async getUserById(id: number): Promise<User | null> {
    return await UserRepository.findUserById(id);
  }

  /**
   * Retrieves all users from the database.
   * Returns complete user list (consider access control in production).
   */
  static async getAllUsers(): Promise<User[]> {
     return await UserRepository.getAllUsers()
  }
}