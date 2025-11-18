import express, { Express } from "express";
import { config } from "dotenv";
import { getPool } from "./db/config";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

// Load environment variables from .env file
config();

// Set server port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Create Express application instance
const app: Express = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount route handlers for different API sections
app.use('/auth', authRoutes);  // Authentication routes (register, login)
app.use('/user', userRoutes);  // User management routes
app.use('/todo', todoRoutes);  // Todo CRUD routes

// Start the server and establish database connection
app.listen(PORT, async() => {
      try {
         // Test database connection on server start
         const dbconnect = await getPool();
         if (dbconnect){
             console.log("Database connected successfully");
             console.log(`Server running on http://localhost:${PORT}`);
         }
      } catch (error) {
        console.log("Error starting the server", error);
      }
});

// Root endpoint providing API information
app.get('/', (req, res) =>{
    res.json({
        message: "Server is up and running",
        version: "1.0.0",
        endpoints: {
            auth: "/auth",
            todo: "/todo",
            user: "/user"
        }
    });
});

export default app;
