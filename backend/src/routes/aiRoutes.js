import { Router } from 'express';
import { enhanceText, matchJobDescription, checkAtsScore } from '../controllers/aiController.js';

const router = Router();

router.post('/enhance', enhanceText);
router.post('/match-jd', matchJobDescription);
router.post('/ats-check', checkAtsScore);

export default router;
