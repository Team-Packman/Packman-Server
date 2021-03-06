import { Router } from 'express';
import { body } from 'express-validator';
import AlonePackingListPackController from '../controllers/AlonePackingListPackController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('categoryId').notEmpty(), body('listId').notEmpty()],
  auth,
  AlonePackingListPackController.createPack,
);
router.patch(
  '/',
  [
    body('_id').notEmpty(),
    body('name').notEmpty(),
    body('isChecked').notEmpty(),
    body('listId').notEmpty(),
    body('categoryId').notEmpty(),
  ],
  auth,
  AlonePackingListPackController.updatePack,
);

router.delete('/:listId/:categoryId/:packId', auth, AlonePackingListPackController.deletePack);
export default router;
