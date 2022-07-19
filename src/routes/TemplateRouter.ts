import { Router } from 'express';
import TemplateController from '../controllers/TemplateController';
import auth from '../middleware/auth';

const router: Router = Router();

router.get('/alone', auth, TemplateController.getAloneTemplate);
router.get('/together', auth, TemplateController.getTogetherTemplate);
router.get('/:templateId/:type', auth, TemplateController.readTemplate);

router;

export default router;
