import { User } from '../../../core/entities/User';
import { UserMongoRepository } from '../../../frameworks/database/repositories/UserMongoRepository';
import { UserMongoGateway } from '../UserMongoGateway';

export class UserMongoGatewayImpl implements UserMongoGateway {
  constructor(private readonly userMongoRepository: UserMongoRepository) {}

  async createUser(user: User): Promise<void> {
    await this.userMongoRepository.createUser(user);
  }

  async updateUser(user: User): Promise<void> {
    await this.userMongoRepository.updateUser(user);
  }
}
