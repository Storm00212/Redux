import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { CreateUser, RegisterData, User } from "../types/usertypes";

const userRepo = new UserRepository();

/**
 * Validates and parses user registration credentials.
 * Performs input validation, email format checking, and password hashing.
 * @param body - Raw request body containing user registration data
 * @returns Promise<CreateUser> - Validated and processed user data with hashed password
 * @throws Error if validation fails
 */
const validateandParsecredentials = async (body: any): Promise<CreateUser> => {
    const { Username, email, password_hash } = body ?? {};

    if (!Username || !email || !password_hash) {
        throw new Error("Please fill in all credentials");
    }
    if (typeof Username !== 'string' || typeof email !== 'string' || typeof password_hash !== 'string') {
        throw new Error("Credentials are entered in the wrong format please review");
    }
    const trimmedUsername = Username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(trimmedEmail)) {
        throw new Error('Invalid email format');
    }
    if (password_hash.length < 8) {
        throw new Error("Password must be at least 8 characters for maximum security");
    }
    const passwordHash = await bcrypt.hash(password_hash, 10);
    return {
        Username: trimmedUsername,
        email: trimmedEmail,
        password_hash: passwordHash
    };
};

const validateandParsecredentialsforLogin = async (body: any): Promise<RegisterData> => {
    const { email, password_hash } = body ?? {};

    if (!email || !password_hash) {
        throw new Error("Please fill in all credentials");
    }
    if (typeof email !== 'string' || typeof password_hash !== 'string') {
        throw new Error("Credentials are entered in the wrong format please review");
    }
    const trimmedEmail = email.trim().toLowerCase();

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(trimmedEmail)) {
        throw new Error('Invalid email format');
    }

    return {
        email: trimmedEmail,
        password_hash: password_hash
    };
};

/**
 * Service class handling authentication-related business logic.
 * Provides methods for user registration and login with JWT token generation.
 */
export class AuthService {
    /**
     * Registers a new user in the system.
     * Validates input, checks for existing users, and creates new user account.
     * @param newUser - User registration data
     * @returns Promise<User> - Created user object
     * @throws Error if user already exists or validation fails
     */
    static async register(newUser: CreateUser): Promise<User> {
        try {
            const validatedUser = await validateandParsecredentials(newUser);
            const existingUser = await userRepo.login(validatedUser.email);
            if (existingUser) {
                throw new Error("User with this email already exists");
            }

            const registerData: RegisterData = {
                email: validatedUser.email,
                password_hash: validatedUser.password_hash
            };
            const createdUser = await userRepo.register(registerData);
            return createdUser;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Authenticates a user and generates a JWT token.
     * Validates credentials, checks password hash, and returns token with user info.
     * @param userData - User login credentials (email and password)
     * @returns Promise<{token: string, user: User}> - JWT token and user data (password excluded)
     * @throws Error if user not found or password invalid
     */
    static async login(userData: RegisterData): Promise<{ token: string; user: Omit<User, 'password_hash'> }> {
        try {
            const loginData = await validateandParsecredentialsforLogin(userData);
            const user = await userRepo.login(loginData.email);
            if (!user) {
                throw new Error("User does not exist ensure you register first");
            }
            const validate = await bcrypt.compare(loginData.password_hash, user.password_hash);
            if (!validate) {
                throw new Error("Invalid email or password");
            }
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET || 'YOUR-SECRET-KEY',
                { expiresIn: '24h' }
            );
            // Remove password hash from response
            const { password_hash, ...userResponse } = user;

            return { token, user: userResponse };

        } catch (error) {
            console.log("Error in login service", error);
            throw error;
        }
    }
}