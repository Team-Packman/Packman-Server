import { Router } from 'express';
import { body } from 'express-validator/check';
import { AlonePackingListController } from '../controllers';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  auth,
  AlonePackingListController.createAlonePackingList,
);

router.get('/:listId', auth, AlonePackingListController.readAlonePackingList);

export default router;
