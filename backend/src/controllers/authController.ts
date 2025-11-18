import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { CreateUser, RegisterData } from "../types/usertypes";

/**
 * Controller class handling authentication-related HTTP requests.
 * Provides endpoints for user registration and login.
 */
export class AuthController {
    /**
     * Handles user registration requests.
     * Validates input data and creates new user account.
     * @param req - Express request object containing user registration data
     * @param res - Express response object
     * @returns JSON response with created user or error
     */
    static async register(req: Request, res: Response) {
        try {
            const userData: CreateUser = req.body;
            const user = await AuthService.register(userData);
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    email: user.email,
                    created_at: user.created_at
                }
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Handles user login requests.
     * Authenticates user credentials and returns JWT token.
     * @param req - Express request object containing login credentials
     * @param res - Express response object
     * @returns JSON response with token and user data or error
     */
    static async login(req: Request, res: Response) {
        try {
            const loginData: RegisterData = req.body;
            const result = await AuthService.login(loginData);
            res.status(200).json({
                message: "Login successful",
                ...result
            });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}