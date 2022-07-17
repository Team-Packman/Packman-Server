import { Router } from 'express';
import { body } from 'express-validator/check';
import { AlonePackingListController, TogetherPackingListController } from '../controllers';

const router: Router = Router();

router.post(
  '/alone',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  AlonePackingListController.createAlonePackingList,
);
router.post(
  '/together',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  TogetherPackingListController.createTogetherPackingList,
);

router;

export default router;
