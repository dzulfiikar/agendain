import { PrismaClient, User as UserMongo } from '@prisma/mongo/client';
import { User } from '../../../../core/entities/User';
import { UserMongoRepository } from '../UserMongoRepository';

export class UserMongoRepositoryImpl implements UserMongoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(user: User): Promise<UserMongo> {
    const userMongo = await this.prisma.user.create({
      data: {
        userId: user.id,
        name: user.name,
        profile_color_code: user.profileColorCode,
        profile_first_char: user.profileFirstChar,
      },
    });

    return userMongo;
  }
  async updateUser(user: User): Promise<UserMongo> {
    const userMongo = await this.prisma.user.update({
      where: {
        userId: user.id,
      },
      data: {
        name: user.name,
      },
    });

    return userMongo;
  }
}
