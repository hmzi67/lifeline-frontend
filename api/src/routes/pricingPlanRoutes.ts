import { Router } from 'express';
import {
    createPricingPlan,
    deletePricingPlan,
    getAllPricingPlans,
    getPricingPlanById,
    updatePricingPlan
} from '../controllers/pricingPlanController.js';

const router = Router();

router.get('/', getAllPricingPlans);
router.get('/:id', getPricingPlanById);
router.post('/', createPricingPlan);
router.put('/:id', updatePricingPlan);
router.delete('/:id', deletePricingPlan);

export default router;
