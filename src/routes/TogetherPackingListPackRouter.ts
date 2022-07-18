import { Router } from 'express';
import { body } from 'express-validator/check';
import TogetherPackingListPackController from '../controllers/TogetherPackingListPackController';

const router: Router = Router();

router.post(
  '/',
  [body('name').notEmpty(), body('categoryId').notEmpty(), body('listId').notEmpty()],
  TogetherPackingListPackController.createPack,
);
export default router;
