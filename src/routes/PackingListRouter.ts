import { Router } from 'express';
import { body } from 'express-validator/check';
import { AlonePackingListController } from '../controllers';

const router: Router = Router();

router.post(
  '/alone',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  AlonePackingListController.createAlonePackingList,
);

router;

export default router;
