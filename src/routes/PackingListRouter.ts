import { Router } from 'express';
import { body } from 'express-validator/check';
import {
  AlonePackingListController,
  PackingListController,
  TogetherPackingListController,
} from '../controllers';

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
router.patch(
  '/title',
  [body('_id').notEmpty(), body('title').notEmpty(), body('isAloned').notEmpty()],
  PackingListController.updatePackingListTitle,
);
router.patch(
  '/departureDate',
  [body('_id').notEmpty(), body('departureDate').notEmpty(), body('isAloned').notEmpty()],
  PackingListController.updatePackingListDate,
);

router;

export default router;
