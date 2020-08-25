import { Request, Response, NextFunction } from 'express';

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Required role?');
    if (req.body.admin) {
      return res.status(401).end();
    } else {
      console.log('User meet required role, going to next middleware');
      return next();
    }
  };
};
