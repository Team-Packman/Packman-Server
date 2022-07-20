import { Router } from 'express';
import { body } from 'express-validator/check';
import { TogetherPackingListController } from '../controllers';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('title').notEmpty(), body('departureDate').notEmpty(), body('folderId').notEmpty()],
  auth,
  TogetherPackingListController.createTogetherPackingList,
);
router.get('/:listId', auth, TogetherPackingListController.readTogetherPackingList);
router.delete('/:folderId/:listId', auth, TogetherPackingListController.deleteTogetherPackingList);
router.patch(
  '/packer',
  [body('listId').notEmpty(), body('packId').notEmpty(), body('packerId').notEmpty()],
  auth,
  TogetherPackingListController.updatePacker,
);

export default router;
