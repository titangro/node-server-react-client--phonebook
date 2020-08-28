import { NextFunction, Request, Response } from 'express';
import { getResponseError } from 'helpers/getResponseError';
import * as jwt from 'jsonwebtoken';

export const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeader(req);

  jwt.verify(token || '', process.env.SECRET_CODE || '', function (
    error,
    decoded,
  ) {
    if (error) {
      return getResponseError(res, 'You are not authorized!', 500);
    }
  });

  return next();
};
