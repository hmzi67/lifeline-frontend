import { Router } from 'express';
import {
  getAllMealTypes,
  getMealTypeById,
  createMealType,
  updateMealType,
  deleteMealType
} from '../controllers/mealTypeController.js';

const router = Router();

// GET /api/meal-types - Get all meal types
router.get('/', getAllMealTypes);

// GET /api/meal-types/:id - Get meal type by ID
router.get('/:id', getMealTypeById);

// POST /api/meal-types - Create new meal type
router.post('/', createMealType);

// PUT /api/meal-types/:id - Update meal type
router.put('/:id', updateMealType);

// DELETE /api/meal-types/:id - Delete meal type
router.delete('/:id', deleteMealType);

export default router;
