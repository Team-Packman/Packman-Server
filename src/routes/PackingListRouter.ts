import { Router } from 'express';
import { PackingListController } from '../controllers';
import { body } from 'express-validator/check';

const router: Router = Router();

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
router.patch(
  '/myTemplate',
  [body('_id').notEmpty(), body('isSaved').notEmpty(), body('isAloned').notEmpty()],
  PackingListController.updatePackingListMyTemplate,
);
router.get('/invite/:inviteId', PackingListController.invitePackingList);

export default router;
