/**
 * User Controller
 * Handles HTTP requests related to user operations such as registration, login, and retrieving users.
 * Acts as an intermediary between routes and the UserService, managing request/response cycles.
 *
 * Controller Layer Responsibilities:
 * - Parse and validate incoming request data
 * - Call appropriate service methods for business logic
 * - Format and send HTTP responses
 * - Handle errors and send appropriate error responses
 */

import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  /**
   * Handles user registration HTTP requests.
   * Process: Extract data → Validate → Register → Respond
   * Endpoint: POST /api/users/register
   */
  static async register(req: Request, res: Response) {
    try {
      // Extract registration data from request body
      const { name, email, password } = req.body;
      // Call service layer to handle registration logic
      const user = await UserService.register(name, email, password);
      // Send success response with created user data
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      // Handle registration errors (duplicate email, validation failures)
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Handles user login HTTP requests.
   * Process: Extract credentials → Authenticate → Return token
   * Endpoint: POST /api/users/login
   */
  static async login(req: Request, res: Response) {
    try {
      // Extract login credentials from request body
      const { email, password } = req.body;
      // Call service layer to authenticate user and generate token
      const { user, token } = await UserService.login(email, password);
      // Send success response with user data and JWT token
      res.json({ message: 'Login successful', user, token });
    } catch (error: any) {
      // Handle authentication errors (invalid credentials)
      res.status(401).json({ error: error.message });
    }
  }

  /**
   * Retrieves all users from the database.
   * Process: Fetch users → Format response
   * Endpoint: GET /api/users/users
   * Note: In production, this should be protected and paginated
   */
  static async getUsers(req: Request, res: Response) {
    try {
       // Call service layer to retrieve all users
       const users = await UserService.getAllUsers();

       // Send success response with users array
       res.status(200).json({
        message:'Successful retrieval of users',
        users,
       })
    } catch (error: any) {
        // Handle database or service layer errors
        res.status(500).json({
            message:"User retrieval unsuccessful",
           error: error.message,
        })
    }
  }
}