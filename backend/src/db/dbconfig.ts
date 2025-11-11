/**
 * Database Configuration
 * Sets up the PostgreSQL connection pool using environment variables,
 * handles database connection events, and initializes database tables.
 * Uses Neon PostgreSQL with SSL configuration.
 *
 * Database Design:
 * - Users table: Stores user accounts with authentication data
 * - Todos table: Stores todo items linked to users via foreign key
 * - Connection pooling for efficient database access
 * - Automatic table creation on first connection
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

import assert = require('assert');

// Load environment variables from .env file for configuration
dotenv.config();

// Validate that DATABASE_URL environment variable is set
assert(process.env.DATABASE_URL, "Database url required.")

// Create PostgreSQL connection pool with configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Full connection URL from env
  ssl: {
    rejectUnauthorized: false, // Required for Neon PostgreSQL (managed SSL)
  },
});

// Log initial connection attempt for debugging
console.log("Connecting to database...")

// Event handler for successful database connections
pool.on('connect', async () => {
  console.log('Connected to Neon PostgreSQL database ✅');
  try {
    await createTables(); // Initialize database schema on first connection
  } catch (error) {
    console.error('Error creating tables:', error);
  }
});

// Event handler for database connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1); // Exit process on critical database errors
});

/**
 * Creates the necessary database tables if they don't exist.
 * Uses "IF NOT EXISTS" to avoid errors on subsequent runs.
 * Defines schema for user authentication and todo management.
 */
const createTables = async () => {
  // SQL query to create users table with authentication fields
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,                    -- Auto-incrementing unique identifier
      name VARCHAR(255) NOT NULL,               -- User's display name
      email VARCHAR(255) UNIQUE NOT NULL,       -- Unique email for login
      password VARCHAR(255) NOT NULL,           -- Hashed password string
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Account creation timestamp
    );
  `;

  // SQL query to create todos table linked to users
  const todoTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,                    -- Auto-incrementing unique identifier
      name VARCHAR(255) NOT NULL,               -- Todo title/name
      description TEXT NOT NULL,                -- Todo description/details
      "createdBy" INTEGER REFERENCES users(id) ON DELETE CASCADE -- Foreign key to users, cascade delete
    );
  `;

  // Execute table creation queries sequentially
  await pool.query(userTableQuery);
  await pool.query(todoTableQuery);
  console.log('Tables created or already exist ✅');
};

// Export the connection pool instance for use throughout the application
export default pool;