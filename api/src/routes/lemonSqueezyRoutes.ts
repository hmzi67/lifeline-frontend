import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import {
  createLemonSqueezyCheckout,
  handleLemonSqueezyWebhook,
} from '../controllers/lemonSqueezyController.js';

const router = Router();

/**
 * Create a Lemon Squeezy checkout session
 * Protected route - requires authentication
 */
router.post('/checkout', authenticate, createLemonSqueezyCheckout);

/**
 * Webhook endpoint for Lemon Squeezy events
 * Public route - signature verification is done in the controller
 * 
 * Note: Webhook raw body handling is done in app.ts
 */
router.post('/webhook', handleLemonSqueezyWebhook);

export default router;
