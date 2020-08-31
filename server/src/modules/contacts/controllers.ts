import { Response, Request } from 'express';
import { ContactModel } from './model';
import { getResponseError } from 'helpers/getResponseError';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { number, name, age, admin } = req.body;

    if (!number || !name) {
      return getResponseError(res, 'Where is data?!', 400);
    }

    // создаем контакт без привязки к пользователю
    const contact = await ContactModel.create({
      name,
      number,
      age,
      admin,
    });

    // в ответе возвращаем контакт
    return res.json(contact);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    // получаем список контактов
    const contacts = await ContactModel.find({});

    res.json(contacts);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    // получаение контакта по id
    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      // 404 ошибка если контакт не найден
      return getResponseError(res, 'No such contact', 404);
    }

    // возвращаем в ответе найденный контакт
    return res.json(contactById);
  } catch (error) {
    return getResponseError(res, `Is't corrent id. Error: ${error}`, 500);
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    // получение параметров для обновления
    const { number, name, age, admin } = req.body;

    // ищем контакт по id
    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      // 404 ошибка если контакт не найден
      return getResponseError(res, 'No such contact to update', 404);
    }

    // проходим по каждому параметру и, если он существует, - обноляем
    if (number) {
      contactById.number = number;
    }

    if (name) {
      contactById.name = name;
    }

    if (age) {
      contactById.age = age;
    }

    if (admin) {
      contactById.admin = admin;
    }

    // сохраняем имзененный контакт в базе
    await contactById.save();

    // возвращаем обновленный контакт в ответе
    return res.json(contactById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    // поиск и удаление контакта по id
    const contactById = await ContactModel.findByIdAndDelete(req.params.id);

    if (!contactById) {
      // 404 ошибка если контакт не найден
      return getResponseError(res, 'No such contact to delete', 404);
    }

    // возвращаем удаленный контакт (можно возращать true)
    return res.json(contactById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
