import { Router } from 'express';
import * as controllers from './controllers';

const router = Router();

router.post('/login', controllers.login);

router.post('/signup', controllers.signUp);

export default router;
