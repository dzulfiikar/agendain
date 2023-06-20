import { User } from '@prisma/client';
import { RegisterDTO } from '../../../adapters/controllers/dtos/RegisterDTO';

export interface UserRepository {
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(registerDTO: RegisterDTO): Promise<User>;
}
