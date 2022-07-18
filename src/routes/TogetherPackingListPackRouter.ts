import { Router } from 'express';
import { body } from 'express-validator/check';
import TogetherPackingListPackController from '../controllers/TogetherPackingListPackController';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('categoryId').notEmpty(), body('listId').notEmpty()],
  TogetherPackingListPackController.createPack,
);

router.patch(
  '/',
  [
    body('id').notEmpty(),
    body('name').notEmpty(),
    body('isChecked').notEmpty(),
    body('listId').notEmpty(),
    body('categoryId').notEmpty(),
  ],
  TogetherPackingListPackController.updatePack,
);

export default router;
