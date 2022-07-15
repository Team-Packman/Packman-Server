import { Router } from "express";
import { FolderController } from "../controllers";
import auth from "../middleware/auth";



const router: Router = Router();

router.get('/', auth, FolderController.getFolders);

export default router;