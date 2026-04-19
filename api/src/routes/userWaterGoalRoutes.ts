import { Router } from 'express';
import {
    deleteUserWaterGoal,
    getAllWaterGoals,
    getUserWaterGoal,
    setUserWaterGoal
} from '../controllers/userWaterGoalController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/water-goals - Get all water goals (admin)
router.get('/', authenticate, getAllWaterGoals);

// GET /api/water-goals/user/:userId - Get user's water goal
router.get('/user/:userId', authenticate, getUserWaterGoal);

// POST /api/water-goals - Set or update user's water goal
router.post('/', authenticate, setUserWaterGoal);

// DELETE /api/water-goals/:id - Delete water goal
router.delete('/:id', authenticate, deleteUserWaterGoal);

export default router;
