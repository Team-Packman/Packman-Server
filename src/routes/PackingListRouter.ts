import { Router } from 'express';
import { body } from 'express-validator/check';

const router: Router = Router();

// router.post('/', [
//     body('name').notEmpty(),
//     body('phone').notEmpty(),
//     body('email').notEmpty(),
//     body('email').isEmail(),
//     body('password').isLength({ min: 6 }),
//     body('password').notEmpty()
// ], UserController.createUser);
// router.post('/signin', [
//     body('email').notEmpty(),
//     body('email').isEmail(),
//     body('password').isLength({ min: 6 }),
//     body('password').notEmpty()
// ], UserController.signinUser);
// router.put('/:userId', UserController.updateUser);
// router.get('/:userId', UserController.findUserById);
// router.delete('/:userId', UserController.deleteUser);
router;

export default router;
