import { Router } from 'express';
import {
  handleRevenueCatWebhook,
  syncInAppPurchase,
} from '../controllers/inAppPurchaseController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

router.post('/sync', authenticate, syncInAppPurchase);
router.post('/revenuecat/webhook', handleRevenueCatWebhook);

export default router;
