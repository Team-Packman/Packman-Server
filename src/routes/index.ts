//router index file
import { Router } from 'express';
import PackingListRouter from './PackingListRouter';

import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import FolderRouter from './FolderRouter';
import TogetherPackingListCategoryRouter from './TogetherPackingListCategoryRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/folder', FolderRouter);
router.use('/packingList', PackingListRouter);
router.use('/packingList/together/category', TogetherPackingListCategoryRouter);

export default router;
