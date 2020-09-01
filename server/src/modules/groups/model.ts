import { Schema, model, Document, Types } from 'mongoose';

export const values = {
  labels: ['Family', 'Colleagues', 'Friends'],
  types: ['Open', 'Close'],
};

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
  contactsIds: [Types.ObjectId];
}

const groupSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  contactsIds: {
    type: [Types.ObjectId],
    default: [],
  },
});

export const GroupModel = model<Group>('Group', groupSchema);
