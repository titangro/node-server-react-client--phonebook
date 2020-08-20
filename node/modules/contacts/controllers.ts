import { Response, Request } from 'express';
import { ContactModel } from './model';

export const createContact = async (req: Request, res: Response) => {
  try {
    const { number, name, age, admin } = req.body;

    if (!number || !name) {
      return res.status(400).json({
        error: true,
        message: 'Where is data?!',
      });
    }

    const contact = await ContactModel.create({
      name,
      number,
      age,
      admin,
    });

    return res.json(contact);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await ContactModel.find({});

    res.json(contacts);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

export const getContact = async (req: Request, res: Response) => {
  try {
    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      return res.status(404).json({
        error: true,
        message: 'No such contact',
      });
    }

    return res.json(contactById);
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: `Is't corrent id. Error: ${error}`,
    });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const { number, name, age, admin } = req.body;

    const contactById = await ContactModel.findById(req.params.id);

    if (!contactById) {
      return res.status(404).json({
        error: true,
        message: 'No such contact to update',
      });
    }

    contactById.number = number;
    contactById.name = name;

    if (age) {
      contactById.age = age;
    }

    if (admin) {
      contactById.admin = admin;
    }

    await contactById.save();

    return res.json(contactById);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contactById = await ContactModel.findByIdAndDelete(req.params.id);

    if (!contactById) {
      return res.status(404).json({
        error: true,
        message: 'No such contact to delete',
      });
    }

    return res.json(contactById);
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};
