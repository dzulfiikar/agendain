import { User } from '../../../core/entities/User';
import { UserRepository } from '../../../frameworks/database/repositories/UserRepository';
import { RegisterDTO } from '../../controllers/dtos/RegisterDTO';
import { UserGateway } from '../UserGateway';

export class UserGatewayImpl implements UserGateway {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.userRepository.getUserById(id);
    return {
      id: user!.id,
      name: user!.name,
      email: user!.email,
      password: user!.password,
      profileColorCode: user!.profile_color_code,
      profileFirstChar: user!.profile_first_char,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
    };
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;
    return {
      id: user!.id,
      name: user!.name,
      email: user!.email,
      password: user!.password,
      profileColorCode: user!.profile_color_code,
      profileFirstChar: user!.profile_first_char,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
    };
  }

  async createUser(registerDTO: RegisterDTO): Promise<User> {
    const user = await this.userRepository.createUser(registerDTO);
    return {
      id: user!.id,
      name: user!.name,
      email: user!.email,
      password: user!.password,
      profileColorCode: user!.profile_color_code,
      profileFirstChar: user!.profile_first_char,
      createdAt: user!.createdAt,
      updatedAt: user!.updatedAt,
    };
  }
}
