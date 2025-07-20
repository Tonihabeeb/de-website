import { Router } from 'express';
import { getDashboard, updateDashboard } from '../controllers/dashboardController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/:type(project|financial|environmental|stakeholder)', requireAuth, getDashboard);
router.put('/:type(project|financial|environmental|stakeholder)', requireAuth, updateDashboard);

export default router; 