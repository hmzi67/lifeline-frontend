import { Router } from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  handleStripeWebhook,
  getPublishableKey,
} from '../controllers/paymentController.js';

const router = Router();

// Create payment intent
router.post('/create-intent', createPaymentIntent);

// Confirm payment
router.post('/confirm', confirmPayment);

// Get Stripe publishable key
router.get('/publishable-key', getPublishableKey);

// Stripe webhook (Note: This route should use raw body parser)
router.post('/webhook', handleStripeWebhook);

export default router;
