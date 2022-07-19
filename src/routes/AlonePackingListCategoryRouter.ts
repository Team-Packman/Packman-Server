import { Router } from 'express';
import { body } from 'express-validator';
import AlonePackingListCategoryController from '../controllers/AlonePackingListCategoryController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('listId').notEmpty()],
  auth,
  AlonePackingListCategoryController.createCategory,
);

router.patch(
  '/',
  [body('_id').notEmpty(), body('name').notEmpty(), body('listId').notEmpty()],
  auth,
  AlonePackingListCategoryController.updateCategory,
);

// router.delete('/:listId/:categoryId', auth, TogetherPackingListCategoryController.deleteCategory);
export default router;
