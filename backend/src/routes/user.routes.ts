/**
 * User Routes
 * Defines Express routes for user-related operations including registration, login, and user retrieval.
 * Applies appropriate validation middleware to ensure data integrity.
 */

import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRegister, validateLogin } from '../middleware/user.middleware';

const router = Router();

// User registration endpoint with input validation
router.post('/register', validateRegister, UserController.register);

// User login endpoint with input validation
router.post('/login', validateLogin, UserController.login);

// Get all users endpoint (no authentication required in this implementation)
router.get('/users', UserController.getUsers)

export default router;