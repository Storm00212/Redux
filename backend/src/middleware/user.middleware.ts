import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  next();
};

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
    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};