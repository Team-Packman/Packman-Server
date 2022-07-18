import { Router } from 'express';
import { body } from 'express-validator/check';
import TemplateController from '../controllers/TemplateController';

const router: Router = Router();

router.post('/alone', TemplateController.getAloneTemplate);

router;

export default router;
