import { Router } from 'express';
import {
  getAllUserExercises,
  getUserExercisesByUserId,
  getUserExerciseById,
  assignExerciseToUser,
  updateUserExercise,
  removeUserExercise,
  removeUserFromExercise,
  getUsersByExerciseId,
  getUserExercisesByPurpose
} from '../controllers/userExerciseController';

const router = Router();

// GET /api/user-exercises - Get all user exercise assignments
router.get('/', getAllUserExercises);

// GET /api/user-exercises/:id - Get user exercise assignment by ID
router.get('/:id', getUserExerciseById);

// GET /api/user-exercises/user/:userId - Get exercises for specific user
router.get('/user/:userId', getUserExercisesByUserId);

// GET /api/user-exercises/user/:userId/purpose/:purpose - Get user exercises by purpose
router.get('/user/:userId/purpose/:purpose', getUserExercisesByPurpose);

// GET /api/user-exercises/exercise/:exerciseId/users - Get users for specific exercise
router.get('/exercise/:exerciseId/users', getUsersByExerciseId);

// POST /api/user-exercises/assign - Assign exercise to user
router.post('/assign', assignExerciseToUser);

// PUT /api/user-exercises/:id - Update user exercise assignment
router.put('/:id', updateUserExercise);

// DELETE /api/user-exercises/:id - Remove user exercise assignment
router.delete('/:id', removeUserExercise);

// DELETE /api/user-exercises/user/:userId/exercise/:exerciseId - Remove specific user from exercise
router.delete('/user/:userId/exercise/:exerciseId', removeUserFromExercise);

export default router;