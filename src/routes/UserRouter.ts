import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";


const router: Router = Router();

router.get('/', auth, UserController.getUserInfo);
router.post('/profile',[
    body('name')
    .notEmpty(),
    body('profileImageId')
    .notEmpty() ] 
    , UserController.createUser);
router.patch('/profile',[
        body('name')
        .notEmpty(),
        body('profileImageId')
        .notEmpty() ] 
        , auth,UserController.updateUser);

export default router;
