import { Router } from 'express';
import {
  listResumes,
  createResume,
  getResume,
  updateResume,
  deleteResume,
  duplicateResume
} from '../controllers/resumeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All resume routes require authentication
router.use(requireAuth);

router.get('/', listResumes);
router.post('/', createResume);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.post('/:id/duplicate', duplicateResume);

export default router;
