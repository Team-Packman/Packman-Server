//router index file
import { Router } from 'express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import FolderRouter from './FolderRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/folder', FolderRouter);

export default router;
