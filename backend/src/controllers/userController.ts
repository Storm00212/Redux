import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

/**
 * Controller class handling user-related HTTP requests.
 * Provides endpoints for user data retrieval.
 */
export class UserController {
    /**
     * Handles requests to retrieve a user by ID.
     * Validates the user ID and returns user information (password excluded).
     * @param req - Express request object with user ID in params
     * @param res - Express response object
     * @returns JSON response with user data or error
     */
    static async getUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            // Remove password hash
            const { password_hash, ...userResponse } = user;
            res.status(200).json(userResponse);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}