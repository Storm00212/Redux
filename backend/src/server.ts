/**
 * Main server file for the Redux tutorial backend.
 * This file sets up the Express application, configures middleware for CORS and JSON parsing,
 * defines API routes for users and todos, includes a health check endpoint, and starts the server
 * while verifying database connectivity.
 */

import express from 'express';
import cors from 'cors';
import './db/dbconfig'; // Initialize database connection
import pool from './db/dbconfig';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Route setup
app.use('/api/users', userRoutes); // Mount user-related routes
app.use('/api/todos', todoRoutes); // Mount todo-related routes

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Start server and verify database connection
app.listen(PORT, async () => {
  try {
    const dbconnect = await pool.connect()
    if(dbconnect){
      console.log("Database connected successfully✅")
    } else{
      console.log("Database connection error ❌")
    }
    console.log(`Server running on http://localhost:${PORT}/api`);
  } catch (error) {
    console.log("Error connecting to the database or server error.", error)

  }

});