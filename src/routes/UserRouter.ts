import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/UserController";


const router: Router = Router();

router.post('/profile',[
    body('nickname')
    .notEmpty(),
    body('profileImageId')
    .notEmpty() ] 
    , UserController.createUser);

export default router;
