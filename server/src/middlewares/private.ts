import { NextFunction, Request, Response } from 'express';
import { getResponseError } from 'helpers/getResponseError';
import * as jwt from 'jsonwebtoken';

import { getTokenFromHeaders } from 'helpers/getTokenFromHeaders';

export const privateRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromHeaders(req);

  let verifyError;

  jwt.verify(token || '', process.env.SECRET_CODE || '', function (
    error,
    decoded,
  ) {
    if (error) {
      verifyError = { error, note: 'You are not authorized!' };
    }
  });

  if (verifyError) {
    return getResponseError(res, verifyError, 500);
  }

  return next();
};
