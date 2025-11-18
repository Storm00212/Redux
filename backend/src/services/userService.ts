import UserRepository from "../repositories/userRepository";
import { User } from "../types/usertypes";

/**
 * Service class handling user-related business logic.
 * Provides methods for user validation and retrieval operations.
 */
export class UserService {
    private userRepository: UserRepository;

    /**
     * Initializes the service with a UserRepository instance.
     */
    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * Ensures a user exists by ID, throwing an error if not found.
     * Used for authorization checks before performing user-specific operations.
     * @param id - The user's unique identifier
     * @returns Promise<User> - The user object if found
     * @throws Error if user does not exist
     */
    async ensureUserExists(id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    /**
     * Retrieves a user by their unique ID.
     * @param id - The user's unique identifier
     * @returns Promise<User | null> - User object if found, null otherwise
     */
    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.getUserById(id);
    }
}