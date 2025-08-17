import { Router } from 'express';
import {
  getAllSubscriptionPayments,
  getSubscriptionPaymentById,
  createSubscriptionPayment,
  updateSubscriptionPayment,
  deleteSubscriptionPayment,
  getPaymentsByUserId
} from '../controllers/subscriptionPaymentController';

const router = Router();

// Get all subscription payments
router.get('/', getAllSubscriptionPayments);

// Get a specific subscription payment by ID
router.get('/:id', getSubscriptionPaymentById);

// Create a new subscription payment
router.post('/', createSubscriptionPayment);

// Update a subscription payment
router.put('/:id', updateSubscriptionPayment);

// Delete a subscription payment
router.delete('/:id', deleteSubscriptionPayment);

// Get all payments for a specific user
router.get('/user/:userId', getPaymentsByUserId);

export default router;
