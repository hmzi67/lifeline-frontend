import { Router } from 'express';
import {
  getAllExercisePlans,
  getExercisePlanById,
  createExercisePlan,
  updateExercisePlan,
  deleteExercisePlan
} from '../controllers/exercisePlanController.js';

const router = Router();

// GET /api/exercise-plans - Get all exercise plans
router.get('/', getAllExercisePlans);

// GET /api/exercise-plans/:id - Get exercise plan by ID
router.get('/:id', getExercisePlanById);

// POST /api/exercise-plans - Create new exercise plan
router.post('/', createExercisePlan);

// PUT /api/exercise-plans/:id - Update exercise plan
router.put('/:id', updateExercisePlan);

// DELETE /api/exercise-plans/:id - Delete exercise plan
router.delete('/:id', deleteExercisePlan);

export default router;
