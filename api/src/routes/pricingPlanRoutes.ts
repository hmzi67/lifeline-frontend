import { Router } from 'express';
import {
    createPricingPlan,
    deletePricingPlan,
    getAllPricingPlans,
    getAllPricingPlansAdmin,
    getPricingPlanById,
    updatePricingPlan
} from '../controllers/pricingPlanController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

router.get('/', getAllPricingPlans);
router.get('/admin', authenticate, authorize(['admin']), getAllPricingPlansAdmin);
router.get('/:id', getPricingPlanById);
router.post('/', authenticate, authorize(['admin']), createPricingPlan);
router.put('/:id', authenticate, authorize(['admin']), updatePricingPlan);
router.delete('/:id', authenticate, authorize(['admin']), deletePricingPlan);

export default router;
