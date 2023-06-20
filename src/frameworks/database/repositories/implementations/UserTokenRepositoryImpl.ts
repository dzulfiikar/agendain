import { PrismaClient } from '@prisma/mongo/client';
import { UserTokenRepository } from '../UserTokenRepository';

export default class UserTokenRepositoryImpl implements UserTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createToken(userId: string, token: string): Promise<string> {
    const userToken = await this.prisma.userToken.create({
      data: {
        userId,
        refreshToken: token,
        // 30 days from now
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return userToken.refreshToken;
  }

  async getUserIdByToken(token: string): Promise<string | null> {
    const userToken = await this.prisma.userToken.findFirst({
      where: {
        refreshToken: token,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    return userToken?.userId ?? null;
  }
}
