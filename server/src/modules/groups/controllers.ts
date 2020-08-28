import { Request, Response } from 'express';
import { GroupModel } from 'modules/groups/model';

import { getResponseError } from 'helpers/getResponseError';

export const createGroup = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await GroupModel.find({});

    res.json(groups);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getGroup = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const updateGroup = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const deleteGroup = (req: Request, res: Response) => {
  try {
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
