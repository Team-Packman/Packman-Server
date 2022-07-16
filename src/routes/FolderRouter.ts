import { Router } from 'express';
import { body } from 'express-validator';
import { FolderController } from '../controllers';
import auth from '../middleware/auth';

const router: Router = Router();

router.delete('/:folderId', auth, FolderController.deleteFolder);

export default router;
