import { Router } from 'express';
import {
  getUserActiveExercisePlan,
  startActiveExercisePlan,
  pauseActiveExercisePlan,
  resumeActiveExercisePlan,
  updateCurrentWeek,
  deleteActiveExercisePlan
} from '../controllers/userActiveExercisePlanController.js';

const router = Router();

// GET /api/active-exercise-plans/user/:userId - Get user's active exercise plan
router.get('/user/:userId', getUserActiveExercisePlan);

// POST /api/active-exercise-plans/start - Start a new active exercise plan
router.post('/start', startActiveExercisePlan);

// PUT /api/active-exercise-plans/:id/pause - Pause active exercise plan
router.put('/:id/pause', pauseActiveExercisePlan);

// PUT /api/active-exercise-plans/:id/resume - Resume active exercise plan
router.put('/:id/resume', resumeActiveExercisePlan);

// PUT /api/active-exercise-plans/:id/current-week - Update current week
router.put('/:id/current-week', updateCurrentWeek);

// DELETE /api/active-exercise-plans/:id - Delete active exercise plan
router.delete('/:id', deleteActiveExercisePlan);

export default router;
