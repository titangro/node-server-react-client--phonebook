import * as jwt from 'express-jwt';
import { Request } from 'express';

export const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

export const isAuth = jwt({
  secret: process.env.SECRET_CODE,
  userProperty: 'token',
  getToken: getTokenFromHeader,
});
