import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repositories';
import { User, LoginUser } from '../types/user.schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserService {
  static async register(name: string, email: string, password: string): Promise<User> {
    // Check if user exists
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserRepository.createUser(name, email, hashedPassword);
    return user;
  }

  static async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Find user
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return { user, token };
  }

  static async getUserById(id: number): Promise<User | null> {
    return await UserRepository.findUserById(id);
  }

  static async getAllUsers(): Promise<User[]> {
     return await UserRepository.getAllUsers()
  }
}