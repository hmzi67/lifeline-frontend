import { Router } from 'express';
import { UserDailyRoutineController } from '../controllers/userDailyRoutineController';

const router = Router();

// Create a new user daily routine
router.post('/', UserDailyRoutineController.createUserDailyRoutine);

// Get all user daily routines with optional pagination and filtering
router.get('/', UserDailyRoutineController.getAllUserDailyRoutines);

// Get user daily routine by ID
router.get('/:id', UserDailyRoutineController.getUserDailyRoutineById);

// Update user daily routine by ID
router.put('/:id', UserDailyRoutineController.updateUserDailyRoutine);

// Delete user daily routine by ID
router.delete('/:id', UserDailyRoutineController.deleteUserDailyRoutine);

// Get user daily routines by user ID
router.get('/user/:userId', UserDailyRoutineController.getUserDailyRoutinesByUserId);

export default router;