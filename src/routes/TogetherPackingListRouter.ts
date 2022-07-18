import { Router } from 'express';
import { body } from 'express-validator/check';
import { TogetherPackingListController } from '../controllers';

const router: Router = Router();

router.post(
  '/',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  TogetherPackingListController.createTogetherPackingList,
);
router.get('/:listId', TogetherPackingListController.readTogetherPackingList);
router.delete('/:folderId/:listId', TogetherPackingListController.deleteTogetherPackingList);

router;

export default router;
