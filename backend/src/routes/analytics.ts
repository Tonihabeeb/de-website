import express from 'express';
import { getAnalytics } from '../controllers/analyticsController';
import { logAnalyticsEvent } from '../controllers/analyticsEventController';

const router = express.Router();

// GET /api/analytics
router.get('/', getAnalytics);
router.post('/events', logAnalyticsEvent);

export default router;
