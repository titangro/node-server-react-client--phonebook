import * as jwt from 'jsonwebtoken';
import { User } from '../../modules/auth/model';

export const generateJWT = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      contactId: user.constactId,
    },
    process.env.SECRET_CODE || '',
    { expiresIn: '6h' },
  );
};
