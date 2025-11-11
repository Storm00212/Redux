import { Pool } from 'pg';
import dotenv from 'dotenv';

import assert = require('assert');

dotenv.config();
assert(process.env.DATABASE_URL, "Database url required.")
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

// Test the connection and create tables
console.log("Connecting to database...")
pool.on('connect', async () => {
  console.log('Connected to Neon PostgreSQL database ✅');
  try {
    await createTables();
  } catch (error) {
    console.error('Error creating tables:', error);
  }
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const createTables = async () => {
  const userTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const todoTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      "createdBy" INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  await pool.query(userTableQuery);
  await pool.query(todoTableQuery);
  console.log('Tables created or already exist ✅');
};

export default pool;