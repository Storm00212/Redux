import { Router } from "express";
import { UserController } from "../controllers/userController";

/**
 * Express router for user-related endpoints.
 * Defines routes for user data retrieval.
 */
const router = Router();

// GET /user/:id - Retrieve user information by ID
router.get("/:id", UserController.getUser);

export default router;