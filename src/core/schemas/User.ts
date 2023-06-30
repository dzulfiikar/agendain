import { ObjectId } from 'bson';

export interface User {
  _id: ObjectId;
  user_id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
