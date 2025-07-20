import { Router } from 'express';
import { getAuditLogs } from '../controllers/auditController';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), getAuditLogs);

export default router; 