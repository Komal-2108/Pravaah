import { Router } from 'express';
import { getAssessmentById, submitPracticalAssessment } from '../controllers/assessmentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:id', getAssessmentById);
router.post('/:id/submit', authenticateToken, submitPracticalAssessment);

export default router;
