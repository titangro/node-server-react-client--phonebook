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
  contacts: Types.ObjectId[];
}

const groupSchema = new Schema({
  label: String,
  type: String,
  contacts: {
    type: [Types.ObjectId],
  },
});

export const GroupModel = model<Group>('Group', groupSchema);
