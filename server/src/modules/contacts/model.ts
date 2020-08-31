import { Schema, model, Document, Types } from 'mongoose';

export interface Contact extends Document {
  number: string;
  name: string;
  age?: number;
  admin?: boolean;
  userId?: Types.ObjectId;
}

const contactSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  userId: {
    type: Schema.Types.ObjectId,
  },
});

export const ContactModel = model<Contact>('Contact', contactSchema);
