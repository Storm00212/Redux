import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { CreateUser, RegisterData } from "../types/usertypes";

export class AuthController {
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