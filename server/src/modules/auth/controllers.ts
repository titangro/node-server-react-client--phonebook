import { ContactModel } from '../../modules/contacts/model';
import bcrypt from 'bcrypt';

import { UserModel } from './model';

import { generateJWT } from './helpers';
import { getResponseError } from '../../helpers/getResponseError';

import { Response, Request } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return getResponseError(res, 'User email is wrong', 500);
    }

    const userRecord = await UserModel.findOne({
      email,
    });

    if (!userRecord) {
      return getResponseError(res, 'User not found', 404);
    } else {
      const correctPassword = await bcrypt.compare(
        password,
        userRecord.password,
      );
      if (!correctPassword) {
        return getResponseError(res, 'Incorrect password', 500);
      }
    }

    return generateJWT(userRecord);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { password, name, email, number } = req.body;
    console.log('signUp -> password', password);
    const passwordHashed = await bcrypt.hash(password, 10);

    // TODO: validate if user is created?
    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      name,
      number,
    });

    const { id: contactId } = await ContactModel.create({
      name,
      number,
      userId: userRecord.id,
    });

    userRecord.constactId = contactId;
    userRecord.save();

    return res.json(generateJWT(userRecord));
  } catch (error) {
    console.log('Is Error', error);
    return getResponseError(res, error, 500);
  }
};
