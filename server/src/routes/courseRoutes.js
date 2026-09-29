import { Router } from 'express';
import { getAllCourses, getCourseById, updateProgress, downloadCoursePackage } from '../controllers/courseController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/:id/progress', authenticateToken, updateProgress);
router.get('/:id/download', downloadCoursePackage);

export default router;
