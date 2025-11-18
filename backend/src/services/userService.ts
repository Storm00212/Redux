import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { CreateUser, RegisterData } from "../types/usertypes";
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

const validateandParsecredentialsforLogin = async (body: any): Promise<RegisterData> => {
    const{email, password_hash} = body ?? {}

    if(!email || !password_hash){
        throw new Error("Please fill in all credentials")
    }
    if(typeof email !== 'string' || typeof password_hash !== 'string'){
        throw new Error("Credentials are entered in the wrong format please review")
    }
    const trimmedEmail = email.trim().toLowerCase()

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
   if(!emailRe.test(trimmedEmail)){
     throw new Error('Invalid email format');
    }

    return {
        email: trimmedEmail,
        password_hash: password_hash
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

    static async loginUser(userData: RegisterData){
        try {
         const loginUser = validateandParsecredentialsforLogin(userData);
         const user = await userRepo.getUserByEmail((await loginUser).email);
         if(!user){
            throw new Error("User does not exist ensure you register first");
         }
         const validate = await bcrypt.compare((await loginUser).password_hash, user.password_hash);
         if(!validate){
            throw new Error("Invalid email or password");
         } 
        const token = jwt.sign(
            {
            userId: user.id,
            email: user.email
            },
            process.env.JWT_SECRET || 'YOUR-SECRET-KEY',
            {expiresIn: '24h'}
        )
         // Remove password hash from response
         const { password_hash, ...userResponse } = user;

          return { token, user: userResponse };

        } catch (error) {
          console.log("Error in loginUser controller", error)  
        }
    }
    
    
}