import { Response, Request } from 'express';
import { ContactModel } from './model';
import { getResponseError } from '../../helpers/getResponseError';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { number, name, age, admin } = req.body;

    if (!number || !name) {
      return getResponseError(res, 'Where is data?!', 400);
    }

    const contact = await ContactModel.create({
      name,
      number,
      age,
      admin,
    });

    return res.json(contact);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactModel.find({});

    res.json(contacts);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      return getResponseError(res, 'No such contact', 404);
    }

    return res.json(contactById);
  } catch (error) {
    return getResponseError(res, `Is't corrent id. Error: ${error}`, 500);
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { number, name, age, admin } = req.body;

    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      return getResponseError(res, 'No such contact to update', 404);
    }

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

    await contactById.save();

    return res.json(contactById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contactById = await ContactModel.findByIdAndDelete(req.params.id);

    if (!contactById) {
      return getResponseError(res, 'No such contact to delete', 404);
    }
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
