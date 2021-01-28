import { Document } from 'mongoose'

/**
 * IUser Interface
 * Document class inheritance
 */
export interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: boolean;
}