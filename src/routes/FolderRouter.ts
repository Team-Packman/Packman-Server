import { Router } from "express";
import { body } from "express-validator";
import FolderController from "../controllers/FolderController";
import auth from "../middleware/auth";

const router: Router = Router();


router.post('/',[
    body('title')
    .notEmpty(),
    body('isAloned')
    .notEmpty() ] 
    ,auth ,FolderController.createFolder);
router.delete('/:folderId', auth, FolderController.deleteFolder);
export default router;
