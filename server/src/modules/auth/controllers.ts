import { ContactModel } from '../../modules/contacts/model';
import bcrypt from 'bcrypt';

import { UserModel } from './model';

import { generateJWT } from './helpers';
import { getResponseError } from 'helpers/getResponseError';

import { Response, Request } from 'express';

export const login = async (req: Request, res: Response) => {
  try {
    // получаем данные Post запроса
    const { email, password } = req.body;

    // исключение при отсутсвии email
    if (!email) {
      return getResponseError(res, 'User email is wrong', 500);
    }

    // поиск существующего пользователя по email
    const userRecord = await UserModel.findOne({
      email,
    });

    if (!userRecord) {
      // исключение если пользователь не найден
      return getResponseError(res, 'User not found', 404);
    } else {
      // сравнение хешей паролей
      const correctPassword = await bcrypt.compare(
        password,
        userRecord.password,
      );
      if (!correctPassword) {
        // исключение если пароли разные
        return getResponseError(res, 'Incorrect password', 500);
      }
    }

    return res.json(`Bearer ${generateJWT(userRecord)}`);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    // получаем данные Post запроса из body, хешируем пароль
    const { password, name, email, number } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);

    // поиск уже зарегистрированного пользователя
    const createdUser = await UserModel.findOne({
      email,
    });

    // если пользователь уже существует к идаем исключение
    if (createdUser) {
      return getResponseError(res, 'Such user already exists', 401);
    }

    // создаем пользователя
    const userRecord = await UserModel.create({
      password: passwordHashed,
      email,
      name,
      number,
    });

    // создаем контакт
    const { id: contactId } = await ContactModel.create({
      name,
      number,
      userId: userRecord.id,
    });

    // добавляем id контакта для синхронизацией с пользователем, сохраняем изменения
    userRecord.constactId = contactId;
    userRecord.save();

    // в ответе возвращаем только токен
    return res.json(`Bearer ${generateJWT(userRecord)}`);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
