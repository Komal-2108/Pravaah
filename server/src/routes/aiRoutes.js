import { Router } from 'express';
import {
  getTargetRoles,
  getSkillGapAnalysis,
  getLearningRecommendations,
  runWhatIfSimulation,
  getJobMatches,
  searchCandidates
} from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/target-roles', getTargetRoles);
router.post('/skill-gap', authenticateToken, getSkillGapAnalysis);
router.post('/learning-path', authenticateToken, getLearningRecommendations);
router.post('/what-if', authenticateToken, runWhatIfSimulation);
router.get('/job-match', authenticateToken, getJobMatches);
router.get('/candidates/search', searchCandidates);

export default router;
