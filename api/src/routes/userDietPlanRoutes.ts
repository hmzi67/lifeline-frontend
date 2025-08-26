import { Router } from 'express';
import {
  getAllUserDietPlans,
  getUserDietPlansByUserId,
  getUserDietPlanById,
  assignDietPlanToUser,
  updateUserDietPlan,
  removeUserDietPlan,
  removeUserFromDietPlan,
  getUsersByDietPlanId
} from '../controllers/userDietPlanController.js';

const router = Router();

// GET /api/user-diet-plans - Get all user diet plan assignments
router.get('/', getAllUserDietPlans);

// GET /api/user-diet-plans/:id - Get user diet plan assignment by ID
router.get('/:id', getUserDietPlanById);

// GET /api/user-diet-plans/user/:userId - Get diet plans for specific user
router.get('/user/:userId', getUserDietPlansByUserId);

// GET /api/user-diet-plans/diet/:dietId/users - Get users for specific diet plan
router.get('/diet/:dietId/users', getUsersByDietPlanId);

// POST /api/user-diet-plans/assign - Assign diet plan to user
router.post('/assign', assignDietPlanToUser);

// PUT /api/user-diet-plans/:id - Update user diet plan assignment
router.put('/:id', updateUserDietPlan);

// DELETE /api/user-diet-plans/:id - Remove user diet plan assignment
router.delete('/:id', removeUserDietPlan);

// DELETE /api/user-diet-plans/user/:userId/diet/:dietId - Remove specific user from diet plan
router.delete('/user/:userId/diet/:dietId', removeUserFromDietPlan);

export default router;