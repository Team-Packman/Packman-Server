//router index file
import { Router } from 'express';
import PackingListRouter from './PackingListRouter';

import AuthRouter from './AuthRouter';
import UserRouter from './UserRouter';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/packingList', PackingListRouter);

export default router;
