import { Router } from 'express';
import * as controllers from './controllers';

const router = Router();

router.post('/', controllers.createContact);

router.get('/', controllers.getContacts);

router.get('/:id', controllers.getContact);

router.put('/:id', controllers.updateContact);

router.delete('/:id', controllers.deleteContact);

export default router;
