import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';

const prisma = new PrismaClient();

let stripeClient: Stripe | null = null;

const getStripeClient = (): Stripe | null => {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  stripeClient = new Stripe(secretKey, {
    apiVersion: '2025-11-17.clover',
  });

  return stripeClient;
};

// Validation schemas
const createPaymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('usd'),
  planName: z.string().optional(),
  planId: z.string().optional(),
});

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment Intent ID is required'),
  paymentMethodId: z.string().min(1, 'Payment Method ID is required'),
  userId: z.string().optional(),
});

/**
 * Create a Stripe Payment Intent
 */
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(503).json({
        error: 'Stripe not configured',
        message: 'Set STRIPE_SECRET_KEY to enable payments',
      });
    }

    // Validate request body
    const validatedData = createPaymentIntentSchema.parse(req.body);

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Convert to cents
      currency: validatedData.currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planName: validatedData.planName || '',
        planId: validatedData.planId || '',
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create payment intent',
    });
  }
};

/**
 * Confirm payment and create subscription payment record
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(503).json({
        error: 'Stripe not configured',
        message: 'Set STRIPE_SECRET_KEY to enable payments',
      });
    }

    // Validate request body
    const validatedData = confirmPaymentSchema.parse(req.body);

    // Retrieve payment intent from Stripe to verify
    const paymentIntent = await stripe.paymentIntents.retrieve(
      validatedData.paymentIntentId
    );

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment has not succeeded',
      });
    }

    // Get user ID from authenticated request or body
    const userId = (req as any).user?.id || validatedData.userId;

    if (!userId) {
      return res.status(401).json({
        error: 'User not authenticated',
      });
    }

    // Create subscription payment record in database
    const subscriptionPayment = await prisma.subscriptionPayment.create({
      data: {
        userId: userId,
        planName: paymentIntent.metadata.planName || 'Premium Plan',
        amount: paymentIntent.amount / 100, // Convert from cents
        method: 'stripe',
        status: 'COMPLETED',
        createdAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      subscriptionId: subscriptionPayment.id,
      message: 'Payment confirmed successfully',
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to confirm payment',
    });
  }
};

/**
 * Webhook handler for Stripe events
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const stripe = getStripeClient();
  if (!stripe) {
    return res.status(503).json({
      error: 'Stripe not configured',
      message: 'Set STRIPE_SECRET_KEY to enable webhooks',
    });
  }

  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).send('Missing stripe-signature header');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      // Handle successful payment
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', failedPayment.id);
      // Handle failed payment
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

/**
 * Get Stripe publishable key
 */
export const getPublishableKey = async (req: Request, res: Response) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  });
};
