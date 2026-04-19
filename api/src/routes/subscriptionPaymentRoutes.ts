import { Router } from 'express';
import {
    createSubscriptionPayment,
    deleteSubscriptionPayment,
    getAllSubscriptionPayments,
    getPaymentsByUserId,
    getSubscriptionPaymentById,
    updateSubscriptionPayment
} from '../controllers/subscriptionPaymentController.js';

const router = Router();

// Get all subscription payments
router.get('/', getAllSubscriptionPayments);

// Get all payments for a specific user
router.get('/user/:userId', getPaymentsByUserId);

// Get a specific subscription payment by ID
router.get('/:id', getSubscriptionPaymentById);

// Create a new subscription payment
router.post('/', createSubscriptionPayment);

// Update a subscription payment
router.put('/:id', updateSubscriptionPayment);

// Delete a subscription payment
router.delete('/:id', deleteSubscriptionPayment);

export default router;
