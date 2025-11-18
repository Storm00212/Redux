import UserRepository from "../repositories/userRepository";
import { User } from "../types/usertypes";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async ensureUserExists(id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.getUserById(id);
    }
}