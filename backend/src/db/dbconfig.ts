/**
 * Database Configuration
 * Sets up the PostgreSQL connection pool using environment variables,
 * handles database connection events, and initializes database tables.
 * Uses Neon PostgreSQL with SSL configuration.
 */

import { Pool } from 'pg';
import dotenv from 'dotenv';

import assert = require('assert');

// Load environment variables from .env file
dotenv.config();

// Ensure DATABASE_URL is provided
assert(process.env.DATABASE_URL, "Database url required.")

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon PostgreSQL
  },
});

// Log connection attempt
console.log("Connecting to database...")

// Handle successful database connection
pool.on('connect', async () => {
  console.log('Connected to Neon PostgreSQL database ✅');
  try {
    await createTables(); // Initialize tables on connection
  } catch (error) {
    console.error('Error creating tables:', error);
  }
});

// Handle database connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Creates the necessary database tables if they don't exist.
 * Defines users table for user accounts and todos table for todo items.
 */
const createTables = async () => {
  // SQL query to create users table
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // SQL query to create todos table with foreign key reference
  const todoTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      "createdBy" INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  // Execute table creation queries
  await pool.query(userTableQuery);
  await pool.query(todoTableQuery);
  console.log('Tables created or already exist ✅');
};

// Export the connection pool for use in other modules
export default pool;