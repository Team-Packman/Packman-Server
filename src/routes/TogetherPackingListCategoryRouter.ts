import { Router } from 'express';
import { body } from 'express-validator/check';
import TogetherPackingListCategoryController from '../controllers/TogetherPackingListCategoryController';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('listId').notEmpty()],
  TogetherPackingListCategoryController.createCategory,
);

router.patch(
  '/',
  [body('id').notEmpty(), body('name').notEmpty(), body('listId').notEmpty()],
  TogetherPackingListCategoryController.updateCategory,
);

router.delete('/:listId/:categoryId', TogetherPackingListCategoryController.deleteCategory);
export default router;
