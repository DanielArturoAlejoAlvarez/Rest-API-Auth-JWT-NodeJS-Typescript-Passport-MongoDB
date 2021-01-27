import { Document } from 'mongoose'

export interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: boolean;
}