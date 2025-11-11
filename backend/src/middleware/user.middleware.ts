/**
 * User Middleware
 * Contains middleware functions for user-related operations including input validation
 * and JWT-based authentication. These middlewares are used to validate requests
 * and ensure authenticated access to protected routes.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Validates user registration input.
 * Checks for required fields (name, email, password) and password length.
 */
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  next();
};

/**
 * Validates user login input.
 * Checks for required fields (email, password).
 */
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
};

/**
 * JWT Authentication middleware.
 * Verifies the JWT token from Authorization header, validates the user exists,
 * and attaches user information to the request object for downstream use.
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    const user = await UserService.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    (req as any).user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};