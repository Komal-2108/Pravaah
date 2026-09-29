import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateBody(['email', 'password', 'name']), register);
router.post('/login', validateBody(['email', 'password']), login);
router.get('/me', authenticateToken, getMe);

export default router;
