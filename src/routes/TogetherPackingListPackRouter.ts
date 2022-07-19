import { Router } from 'express';
import { body } from 'express-validator';
import TogetherPackingListPackController from '../controllers/TogetherPackingListPackController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('categoryId').notEmpty(), body('listId').notEmpty()],
  auth,
  TogetherPackingListPackController.createPack,
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
  TogetherPackingListPackController.updatePack,
);

router.delete('/:listId/:categoryId/:packId', auth, TogetherPackingListPackController.deletePack);

export default router;
