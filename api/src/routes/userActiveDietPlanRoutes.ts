import { Router } from 'express';
import {
  getUserActiveDietPlan,
  startActiveDietPlan,
  pauseActiveDietPlan,
  resumeActiveDietPlan,
  updateCurrentDay,
  deleteActiveDietPlan
} from '../controllers/userActiveDietPlanController.js';

const router = Router();

// GET /api/active-diet-plans/user/:userId - Get user's active diet plan
router.get('/user/:userId', getUserActiveDietPlan);

// POST /api/active-diet-plans/start - Start a new active diet plan
router.post('/start', startActiveDietPlan);

// PUT /api/active-diet-plans/:id/pause - Pause active diet plan
router.put('/:id/pause', pauseActiveDietPlan);

// PUT /api/active-diet-plans/:id/resume - Resume active diet plan
router.put('/:id/resume', resumeActiveDietPlan);

// PUT /api/active-diet-plans/:id/current-day - Update current day
router.put('/:id/current-day', updateCurrentDay);

// DELETE /api/active-diet-plans/:id - Delete active diet plan
router.delete('/:id', deleteActiveDietPlan);

export default router;
