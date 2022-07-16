//router index file
import { Router } from 'express';
import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';
import TogetherPackingListCategoryRouter from './TogetherPackingListCategoryRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/packingList/together/category', TogetherPackingListCategoryRouter);

export default router;
