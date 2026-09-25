import { Router } from 'express';
import { getSubscriptionStatus } from '../controllers/subscriptionController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.get('/status', authenticate, getSubscriptionStatus);

export default router;
