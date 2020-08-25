import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Contact } from '../contacts/model';

export const generateJWT = (contact: Contact) => {
  return jwt.sign(
    {
      data: {
        _id: contact._id,
        name: contact.name,
        number: contact.number,
      },
    },
    process.env.SECRET_CODE || '',
    { expiresIn: '6h' },
  );
};
