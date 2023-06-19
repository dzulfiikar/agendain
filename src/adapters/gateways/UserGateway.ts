import { User } from '../../core/entities/User';
import { RegisterDTO } from '../controllers/dtos/RegisterDTO';

export interface UserGateway {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(registerDTO: RegisterDTO): Promise<User | null>;
}
