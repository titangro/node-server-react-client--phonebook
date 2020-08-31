import { Router } from 'express';
import * as controllers from './controllers';

import { privateRoute } from 'middlewares/private';
import { attachCurrentUser } from 'middlewares/attachCurrentUser';

const router = Router();

router.post('/', [privateRoute, attachCurrentUser], controllers.createGroup);

router.get('/', [privateRoute, attachCurrentUser], controllers.getGroups);

router.get('/:id', [privateRoute, attachCurrentUser], controllers.getGroup);

router.put('/:id', [privateRoute, attachCurrentUser], controllers.updateGroup);

router.delete(
  '/:id',
  [privateRoute, attachCurrentUser],
  controllers.deleteGroup,
);

export default router;
