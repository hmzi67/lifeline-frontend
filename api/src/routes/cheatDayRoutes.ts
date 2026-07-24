import { Router } from 'express';
import {
    deleteCheatDay,
    getAllCheatDays,
    getCheatDayById,
    getUserCheatDays,
    logCheatDay,
    updateCheatDay
} from '../controllers/cheatDayController.js';
import authenticate from '../middleware/authenticate.js';
import { mediaUpload } from '../middleware/upload.js';

const router = Router();

// GET /api/cheat-days - Get all cheat days (admin)
router.get('/', authenticate, getAllCheatDays);

// GET /api/cheat-days/user/:userId - Get user's cheat days
router.get('/user/:userId', authenticate, getUserCheatDays);

// GET /api/cheat-days/:id - Get cheat day by ID
router.get('/:id', authenticate, getCheatDayById);

// POST /api/cheat-days - Log a cheat day meal
router.post('/', authenticate, mediaUpload.single('file'), logCheatDay);

// PUT /api/cheat-days/:id - Update cheat day
router.put('/:id', authenticate, mediaUpload.single('file'), updateCheatDay);

// DELETE /api/cheat-days/:id - Delete cheat day
router.delete('/:id', authenticate, deleteCheatDay);

export default router;
