import { Router } from 'express';
import { getAllJobs, getJobById, createJob } from '../controllers/jobController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', authenticateToken, requireRole('employer', 'admin'), createJob);

export default router;
