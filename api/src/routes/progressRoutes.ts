import { Router } from 'express';
import {
  getCaloriesIntake,
  getExerciseActiveDays,
  getMedicationStats,
  getUserChallengeProgress,
  getProgressSummary,
} from '../controllers/progressController.js';

const router = Router();

// Full progress summary (all stats in one call)
router.get('/summary', getProgressSummary);

// Calories intake aggregation
router.get('/calories-intake', getCaloriesIntake);

// Exercise active days - weekly summary
router.get('/exercise-active-days', getExerciseActiveDays);

// Medication stats / adherence
router.get('/medication-stats', getMedicationStats);

// User challenge progress
router.get('/challenges', getUserChallengeProgress);

export default router;
