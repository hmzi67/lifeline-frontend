import { Router } from 'express';
import { getWarmupExercises, getWarmupSession } from '../controllers/warmupController.js';

const router = Router();

// GET /api/warmup/exercises - Get warm-up exercises
router.get('/exercises', getWarmupExercises);

// GET /api/warmup/session
router.get('/session', getWarmupSession);

export default router;
