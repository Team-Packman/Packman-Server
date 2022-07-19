import { Router } from 'express';
import { body } from 'express-validator/check';
import TemplateController from '../controllers/TemplateController';

const router: Router = Router();

router.get('/alone', TemplateController.getAloneTemplate);
router.get('/together', TemplateController.getTogetherTemplate);
router.get('/:templateId/:type', TemplateController.readTemplate);

router;

export default router;
