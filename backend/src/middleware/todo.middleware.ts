/**
 * Todo Middleware
 * Contains middleware functions specific to todo operations, including input validation.
 * Re-exports authentication middleware for convenience in todo routes.
 */

import { Request, Response, NextFunction } from 'express';
import { authenticate } from './user.middleware';

/**
 * Validates todo creation input.
 * Checks for required fields (name, description) in the request body.
 */
export const validateCreateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  next();
};

// Re-export authentication middleware for use in todo routes
export const authMiddleware = authenticate;