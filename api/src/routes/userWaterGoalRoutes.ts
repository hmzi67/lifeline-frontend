import { Router } from 'express';
import {
  getUserWaterGoal,
  setUserWaterGoal,
  deleteUserWaterGoal,
  getAllWaterGoals
} from '../controllers/userWaterGoalController.js';

const router = Router();

// GET /api/water-goals - Get all water goals (admin)
router.get('/', getAllWaterGoals);

// GET /api/water-goals/user/:userId - Get user's water goal
router.get('/user/:userId', getUserWaterGoal);

// POST /api/water-goals - Set or update user's water goal
router.post('/', setUserWaterGoal);

// DELETE /api/water-goals/:id - Delete water goal
router.delete('/:id', deleteUserWaterGoal);

export default router;
