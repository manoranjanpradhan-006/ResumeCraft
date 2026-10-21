import { Router } from 'express';
import {
  listApplications,
  createApplication,
  getApplication,
  updateApplication,
  deleteApplication
} from '../controllers/applicationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Require auth for all applications operations
router.use(requireAuth);

router.get('/', listApplications);
router.post('/', createApplication);
router.get('/:id', getApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

export default router;
