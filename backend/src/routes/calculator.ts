import express from 'express';
import { calculateEnergyCosts } from '../controllers/calculatorController';

const router = express.Router();

router.post('/energy-costs', calculateEnergyCosts);

export default router; 