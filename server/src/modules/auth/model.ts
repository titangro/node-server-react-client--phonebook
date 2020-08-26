import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role?: string;
  name?: string;
  constactId?: number;
  number: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  role: {
    type: String,
    default: 'user', // Possible values: user | admin
  },
  constactId: {
    type: Schema.Types.ObjectId,
  },
  number: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User>('User', userSchema);
