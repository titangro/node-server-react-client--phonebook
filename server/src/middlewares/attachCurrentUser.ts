import { ContactModel } from 'modules/contacts/model';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedUser = req.token.data;
    const user = await ContactModel.findOne({ _id: decodedUser._id });

    if (!user) {
      res.status(401).end();
    }
    req.body = user;
    return next();
  } catch (error) {
    return res.json(error).status(500);
  }
};
