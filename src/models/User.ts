import { model, Schema, Document } from 'mongoose'

export interface IUser extends Document {
  displayName: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: boolean;
}

const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    minlength: 4,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  avatar: {
    type: String,
    maxlength: 512,
    required: false
  },
  role: {
    type: String,
    enum: ["SUPERADMIN","ADMIN","USER"],
    default: "USER"
  },
  status: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
})

export default model<IUser>('User', UserSchema)