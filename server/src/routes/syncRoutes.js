import { Router } from 'express';
import { syncOfflineEvents, getSyncStatus } from '../controllers/syncController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authenticateToken, syncOfflineEvents);
router.get('/status', authenticateToken, getSyncStatus);

export default router;
