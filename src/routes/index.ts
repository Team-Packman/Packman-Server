//router index file
import { Router } from 'express';
import PackingListRouter from './PackingListRouter';

const router = Router();

router.use('/packinglist', PackingListRouter);
export default router;
