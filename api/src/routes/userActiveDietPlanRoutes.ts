import { Router } from 'express';
import {
    deleteActiveDietPlan,
    getUserActiveDietPlan,
    pauseActiveDietPlan,
    resumeActiveDietPlan,
    startActiveDietPlan,
    updateCurrentDay
} from '../controllers/userActiveDietPlanController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/active-diet-plans/user/:userId - Get user's active diet plan
router.get('/user/:userId', authenticate, getUserActiveDietPlan);

// POST /api/active-diet-plans/start - Start a new active diet plan
router.post('/start', authenticate, startActiveDietPlan);

// PUT /api/active-diet-plans/:id/pause - Pause active diet plan
router.put('/:id/pause', authenticate, pauseActiveDietPlan);

// PUT /api/active-diet-plans/:id/resume - Resume active diet plan
router.put('/:id/resume', authenticate, resumeActiveDietPlan);

// PUT /api/active-diet-plans/:id/current-day - Update current day
router.put('/:id/current-day', authenticate, updateCurrentDay);

// DELETE /api/active-diet-plans/:id - Delete active diet plan
router.delete('/:id', authenticate, deleteActiveDietPlan);

export default router;
