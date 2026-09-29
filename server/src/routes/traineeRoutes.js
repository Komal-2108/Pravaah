import { Router } from 'express';
import { getTraineeProfile, updateTargetRole, getSkillGraph, getSkillEvidenceTimeline } from '../controllers/traineeController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/profile', authenticateToken, getTraineeProfile);
router.put('/target-role', authenticateToken, updateTargetRole);
router.get('/skills/graph', authenticateToken, getSkillGraph);
router.get('/skills/:skill_id/evidence', authenticateToken, getSkillEvidenceTimeline);
router.get('/skills/evidence', authenticateToken, getSkillEvidenceTimeline);

export default router;
