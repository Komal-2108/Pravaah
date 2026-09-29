import { Router } from 'express';
import { getAdminAnalytics } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/analytics', authenticateToken, requireRole('admin'), getAdminAnalytics);

export default router;
