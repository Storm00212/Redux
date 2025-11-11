import express from 'express';
import cors from 'cors';
import './db/dbconfig'; // Initialize database connection
import pool from './db/dbconfig';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, async () => {
  try {
    const dbconnect = await pool.connect()
    if(dbconnect){
      console.log("Database connected successfully✅")
    } else{
      console.log("Database connection error ❌")
    }
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log("Error connecting to the database or server error.", error)

  }

});