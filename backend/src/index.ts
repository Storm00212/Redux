import express, { Express } from "express";
import { config } from "dotenv";
import { getPool } from "./db/config";

config();
const PORT = process.env.PORT || 3000

const app: Express = express();

app.listen(PORT, async() => {
     try {
        const dbconnect = await getPool();
        if (dbconnect){
            console.log("Database connected successfully")
            console.log("Server running on http://localhost:3000")
        }
     } catch (error) {
       console.log("Error starting the server", error); 
     }
})

app.get('/', (req, res) =>{
    res.json({
        message:" Server is up and running",
        version: "1.0.0",
        endpoints: {
            auth: "/auth",
            todo: "/todo",
            user: "/user"
        }
    })
})

export default app;
