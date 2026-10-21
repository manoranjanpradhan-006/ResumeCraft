import { Router } from 'express';
import { enhanceText, matchJobDescription, checkAtsScore, tailorResume } from '../controllers/aiController.js';

const router = Router();

router.post('/enhance', enhanceText);
router.post('/match-jd', matchJobDescription);
router.post('/ats-check', checkAtsScore);
router.post('/tailor-resume', tailorResume);

export default router;
