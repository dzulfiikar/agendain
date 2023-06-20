import { User } from '../../../core/entities/User';
import { UserRepository } from '../../../frameworks/database/repositories/UserRepository';
import { RegisterDTO } from '../../controllers/dtos/RegisterDTO';
import { UserGateway } from '../UserGateway';

export class UserGatewayImpl implements UserGateway {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  async createUser(registerDTO: RegisterDTO): Promise<User> {
    return await this.userRepository.createUser(registerDTO);
  }
}
