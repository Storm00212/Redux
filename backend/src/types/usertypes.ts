/**
 * Backend Type Definitions
 * TypeScript interfaces and types for the backend application.
 * Defines data structures for database entities and API payloads.
 */

/**
 * Represents a user entity from the database.
 * Contains all user information including sensitive data like password hash.
 */
export interface User {
   id: number;              // Unique identifier for the user
   email: string;           // User's email address (unique)
   password_hash: string;   // Hashed password for security
   created_at: Date;        // Timestamp when user was created
}

/**
 * Data required for user login.
 * Contains only email and password for authentication.
 */
export interface RegisterData {
   email: string;           // User's email for login
   password_hash: string;   // Plain text password (will be hashed)
}

/**
 * Data required for user registration.
 * Includes username for display purposes along with login credentials.
 */
export interface CreateUser {
   Username: string;        // Display name for the user
   email: string;           // User's email address
   password_hash: string;   // Plain text password (will be hashed)
}

