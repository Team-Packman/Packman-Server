import { Router } from 'express';
import { PackingListController } from '../controllers';
import { body } from 'express-validator/check';
import auth from '../middleware/auth';

const router: Router = Router();

router.patch(
  '/title',
  [body('_id').notEmpty(), body('title').notEmpty(), body('isAloned').notEmpty()],
  auth,
  PackingListController.updatePackingListTitle,
);
router.patch(
  '/departureDate',
  [body('_id').notEmpty(), body('departureDate').notEmpty(), body('isAloned').notEmpty()],
  auth,
  PackingListController.updatePackingListDate,
);
router.patch(
  '/myTemplate',
  [body('_id').notEmpty(), body('isSaved').notEmpty(), body('isAloned').notEmpty()],
  auth,
  PackingListController.updatePackingListMyTemplate,
);
router.get('/invite/:inviteCode', PackingListController.invitePackingList);

export default router;
