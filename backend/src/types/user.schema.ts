/**
 * User-related TypeScript type definitions.
 * Defines the structure of user data used throughout the application.
 */

/**
 * Represents a complete user entity from the database.
 * Contains all user information including sensitive data like password hash.
 */
export type User = {
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: Date
}

/**
 * Represents the data required for user login.
 * Used for authentication requests containing only email and password.
 */
export type LoginUser = {
    email: string,
    password: string
}