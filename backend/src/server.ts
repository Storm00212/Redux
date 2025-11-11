/**
 * Main server file for the Redux tutorial backend.
 * This file sets up the Express application, configures middleware for CORS and JSON parsing,
 * defines API routes for users and todos, includes a health check endpoint, and starts the server
 * while verifying database connectivity.
 *
 * Architecture Overview:
 * - Express.js framework for handling HTTP requests
 * - PostgreSQL database with connection pooling
 * - JWT-based authentication for protected routes
 * - Modular structure with separate controllers, services, and repositories
 */

// Import core Express framework for building the web server
import express from 'express';
// Import CORS middleware to allow cross-origin requests from frontend
import cors from 'cors';
// Import database configuration to initialize connection on startup
import './db/dbconfig'; // Initialize database connection
// Import database connection pool for runtime database operations
import pool from './db/dbconfig';
// Import user route handlers for authentication and user management
import userRoutes from './routes/user.routes';
// Import todo route handlers for todo CRUD operations
import todoRoutes from './routes/todo.routes';

// Create an instance of the Express application
const app = express();
// Define the port number, using environment variable or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Configure middleware for handling requests
// Enable CORS to allow requests from different origins (e.g., frontend on different port)
app.use(cors()); // Enable Cross-Origin Resource Sharing
// Parse incoming JSON payloads in request bodies
app.use(express.json()); // Parse incoming JSON requests

// Mount route handlers under specific API paths
// All user-related endpoints (register, login, get users) available under /api/users
app.use('/api/users', userRoutes); // Mount user-related routes
// All todo-related endpoints (create, get todos) available under /api/todos
app.use('/api/todos', todoRoutes); // Mount todo-related routes

// Define a simple health check endpoint to verify server is running
// Accessible at GET /api, returns a basic JSON response
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Start the server and perform initial database connectivity check
app.listen(PORT, async () => {
  try {
    // Attempt to connect to the database to verify configuration
    const dbconnect = await pool.connect()
    if(dbconnect){
      console.log("Database connected successfully✅")
    } else{
      console.log("Database connection error ❌")
    }
    // Log the server startup message with the accessible URL
    console.log(`Server running on http://localhost:${PORT}/api`);
  } catch (error) {
    // Handle any errors during database connection or server startup
    console.log("Error connecting to the database or server error.", error)

  }

});