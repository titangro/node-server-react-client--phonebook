import { Express } from 'express';
import contactsRouter from './contacts';

export const initializeModules = (app: Express, urlPrefix: string) => {
  app.use(`${urlPrefix}/contacts`, contactsRouter);
  // TODO: realize other module imports
};

// TODO: add genarations
// 1 itterate in modules
// 2 require each module by folder name
// 3 logger modules required
