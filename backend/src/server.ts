import express from 'express';
import './db/dbconfig'; // Initialize database connection
import pool from './db/dbconfig';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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