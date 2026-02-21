import { Router } from 'express';
import {
  getExerciseDetails,
  getExerciseDetailById,
  createExerciseDetail,
  updateExerciseDetail,
  deleteExerciseDetail
} from '../controllers/exerciseDetailController.js';

const router = Router();

// GET /api/exercise-details/exercise/:exerciseId - Get all details for an exercise
router.get('/exercise/:exerciseId', getExerciseDetails);

// GET /api/exercise-details/:id - Get exercise detail by ID
router.get('/:id', getExerciseDetailById);

// POST /api/exercise-details - Create exercise detail
router.post('/', createExerciseDetail);

// PUT /api/exercise-details/:id - Update exercise detail
router.put('/:id', updateExerciseDetail);

// DELETE /api/exercise-details/:id - Delete exercise detail
router.delete('/:id', deleteExerciseDetail);

export default router;
