import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
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