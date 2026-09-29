import { Router } from 'express';
import { getCertificates, issueCertificate, verifyCertificatePublic } from '../controllers/certificateController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', authenticateToken, getCertificates);
router.post('/', authenticateToken, requireRole('admin'), issueCertificate);
router.get('/verify/:id', verifyCertificatePublic);

export default router;
