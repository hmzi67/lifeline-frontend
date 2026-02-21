import { Router } from 'express';
import {
  getUserCheatDays,
  getCheatDayById,
  logCheatDay,
  updateCheatDay,
  deleteCheatDay,
  getAllCheatDays
} from '../controllers/cheatDayController.js';

const router = Router();

// GET /api/cheat-days - Get all cheat days (admin)
router.get('/', getAllCheatDays);

// GET /api/cheat-days/user/:userId - Get user's cheat days
router.get('/user/:userId', getUserCheatDays);

// GET /api/cheat-days/:id - Get cheat day by ID
router.get('/:id', getCheatDayById);

// POST /api/cheat-days - Log a cheat day meal
router.post('/', logCheatDay);

// PUT /api/cheat-days/:id - Update cheat day
router.put('/:id', updateCheatDay);

// DELETE /api/cheat-days/:id - Delete cheat day
router.delete('/:id', deleteCheatDay);

export default router;
