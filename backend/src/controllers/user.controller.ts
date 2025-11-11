import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
      res.json({ message: 'Login successful', user, token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}