import express, { Express } from "express";
import { config } from "dotenv";
import { getPool } from "./db/config";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

config();
const PORT = process.env.PORT || 3000;

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, async() => {
      try {
         const dbconnect = await getPool();
         if (dbconnect){
             console.log("Database connected successfully");
             console.log(`Server running on http://localhost:${PORT}`);
         }
      } catch (error) {
        console.log("Error starting the server", error);
      }
});

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
