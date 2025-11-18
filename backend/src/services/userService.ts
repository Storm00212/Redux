import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { CreateUser } from "../types/usertypes";
import { User } from "../types/usertypes";

const userRepo = new UserRepository();
const validateandParsecredentials = async (body: any): Promise<CreateUser> => {
    const{Username, email, password_hash} = body ?? {}

    if(!Username || !email || !password_hash){
        throw new Error("Please fill in all credentials")
    }
    if(typeof Username !== 'string' || typeof email !== 'string' || typeof password_hash !== 'string'){
        throw new Error("Credentials are entered in the wrong format please review")
    }
    const trimmedUsername = Username.trim()
    const trimmedEmail = email.trim().toLowerCase()

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
   if(!emailRe.test(trimmedEmail)){
     throw new Error('Invalid email format');
    }
   if(password_hash.length < 8){
    throw new Error("Password must be at least 8 characters for maximum security")
   }
  const passwordHash = await bcrypt.hash(password_hash, 10);
    return {
        Username: trimmedUsername,
        email: trimmedEmail,
        password_hash: passwordHash
    }
}


const ensureUserExists = async (id:number) => {
    
    const user = await userRepo.getUserById(id);
    if (!user) {
        throw new Error("User not found");
    }
}
export class UserService {
    static async createUser(newUser: CreateUser): Promise<User> {
      try {
        const validatedUser = await validateandParsecredentials(newUser);
        const existingUser = await userRepo.getUserByEmail(validatedUser.email);
        if (existingUser) {
        throw new Error("User with this email already exists");
         }

        const createdUser = await userRepo.register(validatedUser);
        return createdUser as User;
      } catch (error) {
        throw error;
      }
    }

    
    
}