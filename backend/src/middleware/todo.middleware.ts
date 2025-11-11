import { Request, Response, NextFunction } from 'express';
import { authenticate } from './user.middleware';

export const validateCreateTodo = (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  next();
};

export const authMiddleware = authenticate;