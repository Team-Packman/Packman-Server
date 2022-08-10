import { Router } from 'express';
import { body } from 'express-validator/check';
import auth from '../middleware/auth';
import MemberController from '../controllers/MemberController'

const router: Router = Router();

router.get('/member/:groupId', auth, MemberController.getMembers);

export default router;
