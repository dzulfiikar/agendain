import { randomUUID } from 'crypto';
import { UserTokenRepository } from '../../../frameworks/database/repositories/UserTokenRepository';
import { UserTokenGateway } from '../UserTokenGateway';

export default class UserTokenGatewayImpl implements UserTokenGateway {
  constructor(private readonly userTokenRepository: UserTokenRepository) {}

  async getUserIdByToken(token: string): Promise<string | null> {
    const userId = await this.userTokenRepository.getUserIdByToken(token);
    if (!userId) {
      return null;
    }
    return userId;
  }

  async createToken(userId: string): Promise<string> {
    // create refresh token with format: userId + random string + datetime in epoch then hash it
    const hasher = new Bun.CryptoHasher('sha256');
    hasher.update(userId + randomUUID() + Date.now(), 'base64');
    const refreshToken = hasher.digest('base64');

    const token = await this.userTokenRepository.createToken(userId, refreshToken);
    return token;
  }
}
