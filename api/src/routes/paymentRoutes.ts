import { RequestHandler, Router } from 'express';
import {
  confirmSubscriptionPayment,
  createPaymentIntent,
  createSubscription,
  confirmPayment,
  getPublishableKey,
} from '../controllers/paymentController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

const optionalAuthenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next();
    return;
  }

  authenticate(req, res, next);
};

// Create payment intent
router.post('/create-intent', optionalAuthenticate, createPaymentIntent);

// Confirm payment
router.post('/confirm', optionalAuthenticate, confirmPayment);

// Create recurring subscription
router.post('/subscriptions', authenticate, createSubscription);

// Confirm recurring subscription first payment
router.post('/subscriptions/confirm', authenticate, confirmSubscriptionPayment);

// Get Stripe publishable key
router.get('/publishable-key', getPublishableKey);

export default router;
