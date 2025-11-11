/**
 * User Controller
 * Handles HTTP requests related to user operations such as registration, login, and retrieving users.
 * Acts as an intermediary between routes and the UserService, managing request/response cycles.
 */

import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  /**
   * Handles user registration.
   * Extracts user data from request body, calls UserService to register the user,
   * and returns the created user with a success message.
   */
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register(name, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Handles user login.
   * Extracts credentials from request body, calls UserService to authenticate,
   * and returns user data along with an authentication token.
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
      res.json({ message: 'Login successful', user, token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  /**
   * Retrieves all users.
   * Calls UserService to fetch all users from the database and returns them in the response.
   */
  static async getUsers(req: Request, res: Response) {
    try {
       const users = await UserService.getAllUsers();

       res.status(200).json({
        message:'Successful retrieval of users',
        users,
       })
    } catch (error: any) {
        res.status(500).json({
            message:"User retrieval unsuccessful",
           error: error.message,
        })
    }
  }
}