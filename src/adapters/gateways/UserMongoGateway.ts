import { User } from '../../core/entities/User';

export interface UserMongoGateway {
  createUser(user: User): Promise<void>;
  updateUser(user: User): Promise<void>;
}
