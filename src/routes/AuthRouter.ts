import { Router } from 'express';
import { AuthController } from '../controllers';

const router: Router = Router();

router.get('/google', AuthController.getGoogleUser);


export default router;
