import { UserModel } from 'modules/auth/model';
import { Request, Response, NextFunction } from 'express';
import { getResponseError } from 'helpers/getResponseError';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const decodedUser = req.token.data;
    // const user = await UserModel.findOne({ _id: decodedUser._id });
    // if (!user) {
    //   return getResponseError(res, 'User not found', 401);
    // }
    // req.body = user;
    return next();
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
