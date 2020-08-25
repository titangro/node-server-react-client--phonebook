import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

import { ContactModel } from 'modules/contacts/model';

import { generateJWT } from './helpers';
import { getResponseError } from 'helpers/getResponseError';

import { Response, Request } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.params;

    if (!name) {
      return getResponseError(res, 'Contact name is wrong', 500);
    }

    const contactRecord = await ContactModel.findOne({
      name,
    });

    if (!contactRecord) {
      return getResponseError(res, 'User not found', 404);
    } else {
      const correctPassword = await argon2.verify(
        contactRecord.password,
        password,
      );
      if (!correctPassword) {
        return getResponseError(res, 'Incorrect password', 500);
      }
    }

    return res.status(200).json({
      contact: contactRecord,
      token: generateJWT(contactRecord),
    });
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const loginAs = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    if (!name) {
      return getResponseError(res, 'Contact name is wrong', 500);
    }

    const contactRecord = await ContactModel.findOne({
      name,
    });

    if (!contactRecord) {
      return getResponseError(res, 'User not found', 404);
    }

    return res.status(200).json({
      contact: contactRecord,
      token: generateJWT(contactRecord),
    });
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
