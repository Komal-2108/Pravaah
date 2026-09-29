import { Router } from 'express';
import { generateSessionQR, getActiveSession, markAttendance, getAttendanceHistory } from '../controllers/attendanceController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.post('/session', authenticateToken, requireRole('admin'), generateSessionQR);
router.get('/session/active', getActiveSession);
router.post('/mark', authenticateToken, markAttendance);
router.get('/history', authenticateToken, getAttendanceHistory);

export default router;
