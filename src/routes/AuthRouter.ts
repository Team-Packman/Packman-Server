import { Router } from 'express';
import { AuthController } from '../controllers';

const router: Router = Router();

router.post('/google', AuthController.getGoogleUser);
router.post('/kakao', AuthController.getKakaoUser);

export default router;
