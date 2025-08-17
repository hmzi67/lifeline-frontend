import { Router } from 'express';
import {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
  searchExercises,
  getExercisesByPurpose
} from '../controllers/exerciseController';

const router = Router();

// GET /api/exercises - Get all exercises
router.get('/', getAllExercises);

// GET /api/exercises/search - Search exercises
router.get('/search', searchExercises);

// GET /api/exercises/purpose/:purpose - Get exercises by purpose
router.get('/purpose/:purpose', getExercisesByPurpose);

// GET /api/exercises/:id - Get exercise by ID
router.get('/:id', getExerciseById);

// POST /api/exercises - Create new exercise
router.post('/', createExercise);

// PUT /api/exercises/:id - Update exercise
router.put('/:id', updateExercise);

// DELETE /api/exercises/:id - Delete exercise
router.delete('/:id', deleteExercise);

export default router;