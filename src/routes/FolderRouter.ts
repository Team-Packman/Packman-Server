import { Router } from 'express';
import { body } from 'express-validator';
import FolderController from '../controllers/FolderController';
import auth from '../middleware/auth';

const router: Router = Router();

router.post(
  '/',
  [body('title').notEmpty(), body('isAloned').notEmpty()],
  auth,
  FolderController.createFolder,
);
router.patch(
  '/',
  [body('id').notEmpty(), body('title').notEmpty()],
  auth,
  FolderController.updateFolder,
);
router.delete('/:folderId', auth, FolderController.deleteFolder);
router.get('/', auth, FolderController.getFolders);
router.get('/alone', auth, FolderController.getAloneFolders);
router.get('/together', auth, FolderController.getTogetherFolders);
router.get('/packingList/together/:folderId', auth, FolderController.getTogetherListInFolder);
router.get('/packingList/alone/:folderId', auth, FolderController.getAloneListInFolder);
router.get('/recentCreatedList', auth, FolderController.getRecentCreatedList);
export default router;
