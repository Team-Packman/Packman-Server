import { Router } from 'express';
import { AuthController } from '../controllers';

const router: Router = Router();

router.post('/google', AuthController.getGoogleUser);


export default router;
