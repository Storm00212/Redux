/**
 * Database configuration module for PostgreSQL connection management.
 * Provides connection pooling, retry logic, and graceful shutdown handling.
 */

import { Pool } from "pg";
import assert from "assert";
import { config } from "dotenv";

// Load environment variables
config();

// Retrieve and validate database connection string from environment
const DATABASE_URL=process.env.DATABASE_URL;
assert(DATABASE_URL, "DATABASE_URL required")

// Create PostgreSQL connection pool with optimized settings
const pool = new Pool({
    connectionString:DATABASE_URL,
    max: 10,              // Maximum number of connections
    min: 0,               // Minimum number of connections
    idleTimeoutMillis: 30000  // Close idle connections after 30 seconds
});

// Configuration for connection retry logic
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 5000;

export const getPool = async (): Promise<Pool> => {
  // Test the connection with retry logic
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const client = await pool.connect();
      console.log("\x1b[32m[DB]\x1b[0m  Connected successfully to PostgreSQL");
      client.release();
      return pool;
    } catch (error: any) {
      const code = error.code || "UNKNOWN";
      const message = error.message || "No error message provided";

      console.error(`\x1b[31m[DB]\x1b[0m  Connection failed [${code}]: ${message}`);

      // Provide helpful error messages for common connection issues
      switch (code) {
        case "ECONNREFUSED":
          console.error(" Check if PostgreSQL is running and accessible.");
          break;
        case "ENOTFOUND":
          console.error(" Database host not found — verify DATABASE_URL in your .env file.");
          break;
        case "28P01":
          console.error(" Authentication failed — verify credentials in DATABASE_URL.");
          break;
        case "ETIMEOUT":
          console.error(" Timeout — check network/firewall settings or server availability.");
          break;
        default:
          console.error(" Unknown error — inspect DATABASE_URL or network configuration.");
      }

      // Retry connection if attempts remain
      if (attempt < MAX_RETRIES) {
        console.log(`\x1b[33m[DB]\x1b[0m  Retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        console.error("\x1b[31m[DB]\x1b[0m  Max retries reached. Unable to connect to PostgreSQL.");
        throw error;
      }
    }
  }

  throw new Error("PostgreSQL connection failed after multiple retries.");
};

/**
 * Close database connection pool gracefully
 *
 * Should be called during application shutdown to clean up resources.
 * Handles errors during pool closure.
 */
export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("\x1b[33m[DB]\x1b[0m  PostgreSQL connection pool closed gracefully.");
  } catch (err) {
    console.error("\x1b[31m[DB]\x1b[0m  Error closing PostgreSQL pool:", err);
  }
};
