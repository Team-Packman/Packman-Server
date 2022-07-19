import { Router } from 'express';
import PackingListRouter from './PackingListRouter';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import FolderRouter from './FolderRouter';
import TogetherPackingListCategoryRouter from './TogetherPackingListCategoryRouter';
import TogetherPackingListPackRouter from './TogetherPackingListPackRouter';
import TogetherPackingListRouter from './TogetherPackingListRouter';
import AlonePackingListRouter from './AlonePackingListRouter';
import AlonePackingListCategoryRouter from './AlonePackingListCategoryRouter';
import TemplateRouter from './TemplateRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/folder', FolderRouter);
router.use('/packingList', PackingListRouter);
router.use('/packingList/together', TogetherPackingListRouter);
router.use('/packingList/alone', AlonePackingListRouter);
router.use('/packingList/alone/category', AlonePackingListCategoryRouter);
router.use('/packingList/together/category', TogetherPackingListCategoryRouter);
router.use('/packingList/together/pack', TogetherPackingListPackRouter);

router.use('/template', TemplateRouter);
export default router;
