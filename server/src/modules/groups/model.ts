import { Schema, model, Document, Types } from 'mongoose';

enum GroupLabels {
  Family,
  Colleagues,
  Friends,
}

enum GroupTypes {
  Open,
  Close,
}

export interface Group extends Document {
  label: keyof typeof GroupLabels;
  type: keyof typeof GroupTypes;
  contactsIds: Types.ObjectId[];
}

const groupSchema = new Schema({
  label: String,
  type: String,
  contactsIds: {
    type: [Types.ObjectId],
  },
});

export const GroupModel = model<Group>('Group', groupSchema);
