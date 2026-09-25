import { Router } from 'express';
import {
  getAllDietPlans,
  getDietPlanById,
  createDietPlan,
  updateDietPlan,
  deleteDietPlan,
  searchDietPlans
} from '../controllers/dietPlanController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

// GET /api/diet-plans - Get all diet plans
router.get('/', getAllDietPlans);

// GET /api/diet-plans/search - Search diet plans
router.get('/search', searchDietPlans);

// GET /api/diet-plans/:id - Get diet plan by ID
router.get('/:id', getDietPlanById);

// POST /api/diet-plans - Create new diet plan
router.post('/', authenticate, authorize(['admin']), createDietPlan);

// PUT /api/diet-plans/:id - Update diet plan
router.put('/:id', authenticate, authorize(['admin']), updateDietPlan);

// DELETE /api/diet-plans/:id - Delete diet plan
router.delete('/:id', authenticate, authorize(['admin']), deleteDietPlan);

export default router;
