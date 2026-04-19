import { Router } from 'express';
import { completeUserExerciseProgress, getUserExerciseProgress } from '../controllers/userExerciseProgressController.js';

const router = Router();

// GET /api/user-exercise-progress/user/:userId - Get user exercise progress
router.get('/user/:userId', getUserExerciseProgress);

// POST /api/user-exercise-progress/complete - Save completed exercise progress
router.post('/complete', completeUserExerciseProgress);

export default router;
