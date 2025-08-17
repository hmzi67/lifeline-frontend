import { Router } from 'express';
import {
  getAllDietPlans,
  getDietPlanById,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
  searchDietPlans
} from '../controllers/dietPlanController';

const router = Router();

// GET /api/diet-plans - Get all diet plans
router.get('/', getAllDietPlans);

// GET /api/diet-plans/search - Search diet plans
router.get('/search', searchDietPlans);

// GET /api/diet-plans/:id - Get diet plan by ID
router.get('/:id', getDietPlanById);

// POST /api/diet-plans - Create new diet plan
router.post('/', createDietPlan);

// PUT /api/diet-plans/:id - Update diet plan
router.put('/:id', updateDietPlan);

// DELETE /api/diet-plans/:id - Delete diet plan
router.delete('/:id', deleteDietPlan);

export default router;