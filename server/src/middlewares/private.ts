import { NextFunction, Request, Response } from 'express';

export const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
};

// export default jwt({
//   secret: process.env.SECRET_CODE,
//   userProperty: 'token',
//   getToken: getTokenFromHeader,
// });

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req, res);
  return next();
};
