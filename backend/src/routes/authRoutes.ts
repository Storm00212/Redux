import { Router } from "express";
import { AuthController } from "../controllers/authController";

/**
 * Express router for authentication-related endpoints.
 * Defines routes for user registration and login.
 */
const router = Router();

// POST /auth/register - Register a new user account
router.post("/register", AuthController.register);

// POST /auth/login - Authenticate user and return JWT token
router.post("/login", AuthController.login);

export default router;