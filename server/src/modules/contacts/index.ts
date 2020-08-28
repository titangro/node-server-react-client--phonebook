import { Router } from 'express';
import * as controllers from './controllers';

import { privateRoute } from 'middlewares/private';

const router = Router();

router.post('/', [privateRoute], controllers.createContact);

router.get('/', [privateRoute], controllers.getContacts);

router.get('/:id', [privateRoute], controllers.getContact);

router.put('/:id', [privateRoute], controllers.updateContact);

router.delete('/:id', [privateRoute], controllers.deleteContact);

export default router;
