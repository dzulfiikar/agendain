import { PrismaClient, User } from '@prisma/client';
import { RegisterDTO } from '../../../../adapters/controllers/dtos/RegisterDTO';
import { UserRepository } from '../UserRepository';

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    return user;
  }

  async createUser(registerDTO: RegisterDTO): Promise<User> {
    try {
      const user: User = await this.prisma.user.create({
        data: {
          name: registerDTO.name,
          email: registerDTO.email,
          password: registerDTO.password,
        },
      });
      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }
}
