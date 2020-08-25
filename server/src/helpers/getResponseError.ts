import { Response } from 'express';

export const getResponseError = (
  res: Response,
  error: Record<string, any> | string,
  statusCode: number,
) => {
  return res.status(statusCode).json({
    error: true,
    message: error,
  });
};
