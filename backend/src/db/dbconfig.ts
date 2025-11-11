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

// Test the connection
console.log("Connecting to database...")
pool.on('connect', () => {
  console.log('Connected to Neon PostgreSQL database ✅');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;