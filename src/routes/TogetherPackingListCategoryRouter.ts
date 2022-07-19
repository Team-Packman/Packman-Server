import { Router } from 'express';
import { body } from 'express-validator';
import TogetherPackingListCategoryController from '../controllers/TogetherPackingListCategoryController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('listId').notEmpty()],
  auth,
  TogetherPackingListCategoryController.createCategory,
);

router.patch(
  '/',
  [body('_id').notEmpty(), body('name').notEmpty(), body('listId').notEmpty()],
  auth,
  TogetherPackingListCategoryController.updateCategory,
);

router.delete('/:listId/:categoryId', auth, TogetherPackingListCategoryController.deleteCategory);
export default router;
