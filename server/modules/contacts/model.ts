import { Schema, model, Document } from 'mongoose';

export interface Contact extends Document {
  number: string;
  name: string;
  age?: number;
  admin?: boolean;
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
  admin: {
    type: Boolean,
    default: false,
  },
});

export const ContactModel = model<Contact>('Contact', contactSchema);
