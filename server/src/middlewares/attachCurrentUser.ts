import { UserModel } from 'modules/auth/model';
import { Request, Response, NextFunction } from 'express';
import { getResponseError } from 'helpers/getResponseError';
import { getTokenFromHeaders } from 'helpers/getTokenFromHeaders';
import * as jwt from 'jsonwebtoken';

export const attachCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getTokenFromHeaders(req);

    const decodedUser = jwt.verify(
      token || '',
      process.env.SECRET_CODE || '',
    ) as Record<string, string>;
    const { id: userId } = decodedUser;

    const user = await UserModel.findOne({ id: userId });
    if (!user) {
      return getResponseError(res, 'User not found', 401);
    }
    req.body.user = user;
    return next();
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
