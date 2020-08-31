import { Schema, model, Document, Types } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  role?: string;
  name?: string;
  contactId?: number;
  number: string;
  groupsIds?: Types.ObjectId[];
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
  contactId: {
    type: Schema.Types.ObjectId,
  },
  number: {
    type: String,
    required: true,
  },
  groupsIds: {
    type: [Schema.Types.ObjectId],
  },
});

export const UserModel = model<User>('User', userSchema);
