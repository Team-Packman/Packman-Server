import { Router } from "express";
import { AuthController } from "../controllers";

const router: Router = Router();


router.get('/google', AuthController.getGoogleUser);

// router.get("/google/callback", AuthController.googleLogin);

export default router;
