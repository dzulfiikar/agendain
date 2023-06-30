import { User as UserMongo } from '@prisma/mongo/client';
import { User } from '../../../core/entities/User';

export interface UserMongoRepository {
  createUser(user: User): Promise<UserMongo>;
  updateUser(user: User): Promise<UserMongo>;
}
