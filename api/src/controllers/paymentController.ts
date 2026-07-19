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
  couponCode: z.string().optional(),
  referralCode: z.string().optional(),
});

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment Intent ID is required'),
  paymentMethodId: z.string().optional(),
  userId: z.string().optional(),
});

const createSubscriptionSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  planName: z.string().min(1, 'Plan name is required'),
});

const confirmSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
});

const planPriceEnvMap: Record<string, string> = {
  premium_monthly: 'STRIPE_PRICE_MONTHLY',
  premium_6_months: 'STRIPE_PRICE_6_MONTHS',
  premium_yearly: 'STRIPE_PRICE_YEARLY',
};

const resolvePriceId = (planId: string): string | null => {
  if (planId.startsWith('price_')) return planId;
  const envName = planPriceEnvMap[planId];
  return envName ? process.env[envName] || null : null;
};

const getSubscriptionPaymentIntent = (subscription: Stripe.Subscription): Stripe.PaymentIntent | null => {
  const invoice = (subscription as any).latest_invoice;
  const paymentIntent = invoice?.payment_intent;
  if (!paymentIntent || typeof paymentIntent === 'string') return null;
  return paymentIntent as Stripe.PaymentIntent;
};

const getSubscriptionClientSecret = (subscription: Stripe.Subscription): string | null => {
  const invoice = (subscription as any).latest_invoice;
  const confirmationSecret = invoice?.confirmation_secret;
  const paymentIntent = getSubscriptionPaymentIntent(subscription);

  if (confirmationSecret?.client_secret) return confirmationSecret.client_secret;
  return paymentIntent?.client_secret || null;
};

const getCurrentPeriodEnd = (subscription: Stripe.Subscription): Date | null => {
  const periodEnd = (subscription as any).current_period_end;
  return typeof periodEnd === 'number' ? new Date(periodEnd * 1000) : null;
};

const getOrCreateStripeCustomer = async (stripe: Stripe, userId: string): Promise<string> => {
  const existingPayment = await prisma.subscriptionPayment.findFirst({
    where: {
      userId,
      stripeCustomerId: { not: null },
    } as any,
    orderBy: { createdAt: 'desc' },
  });

  const existingCustomerId = (existingPayment as any)?.stripeCustomerId;
  if (existingCustomerId) return existingCustomerId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.username || undefined,
    metadata: { userId },
  });

  return customer.id;
};

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
    const userId = (req as any).user?.id;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Convert to cents
      currency: validatedData.currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId || '',
        planName: validatedData.planName || '',
        planId: validatedData.planId || '',
        couponCode: validatedData.couponCode || '',
        referralCode: validatedData.referralCode || '',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      message: 'Payment intent created successfully',
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
    const userId = (req as any).user?.id || validatedData.userId || paymentIntent.metadata.userId;

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
      data: {
        subscriptionId: subscriptionPayment.id,
        paymentIntentId: paymentIntent.id,
      },
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
 * Create a recurring Stripe subscription and return the first invoice PaymentIntent.
 */
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: 'Set STRIPE_SECRET_KEY to enable payments',
      });
    }

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    const validatedData = createSubscriptionSchema.parse(req.body);
    const priceId = resolvePriceId(validatedData.planId);

    if (!priceId) {
      return res.status(400).json({
        success: false,
        message: `Stripe Price ID is not configured for ${validatedData.planId}`,
      });
    }

    const customerId = await getOrCreateStripeCustomer(stripe, userId);
    const price = await stripe.prices.retrieve(priceId);
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      billing_mode: {
        type: 'flexible',
      },
      metadata: {
        userId,
        planId: validatedData.planId,
        planName: validatedData.planName,
      },
      expand: ['latest_invoice.confirmation_secret'],
    } as any);

    const paymentIntent = getSubscriptionPaymentIntent(subscription);
    const clientSecret = getSubscriptionClientSecret(subscription);

    if (!clientSecret) {
      return res.status(500).json({
        success: false,
        message: 'Stripe did not return a client secret for this subscription',
      });
    }

    const amount = typeof price.unit_amount === 'number' ? price.unit_amount / 100 : (paymentIntent?.amount || 0) / 100;

    await prisma.subscriptionPayment.create({
      data: {
        userId,
        planName: validatedData.planName,
        amount,
        method: 'stripe',
        status: 'PENDING',
        createdAt: new Date(),
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscription.id,
        stripePaymentIntentId: paymentIntent?.id,
        stripePriceId: priceId,
        currentPeriodEnd: getCurrentPeriodEnd(subscription),
        cancelAtPeriodEnd: !!subscription.cancel_at_period_end,
      } as any,
    });

    res.status(200).json({
      success: true,
      data: {
        clientSecret,
        paymentIntentId: paymentIntent?.id || '',
        subscriptionId: subscription.id,
        customerId,
      },
      message: 'Subscription created successfully',
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error?.message || 'Failed to create subscription',
    });
  }
};

/**
 * Confirm the first subscription payment and mark the local subscription record active.
 */
export const confirmSubscriptionPayment = async (req: Request, res: Response) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(503).json({
        success: false,
        message: 'Set STRIPE_SECRET_KEY to enable payments',
      });
    }

    const validatedData = confirmSubscriptionSchema.parse(req.body);
    const subscription = await stripe.subscriptions.retrieve(validatedData.subscriptionId, {
      expand: ['latest_invoice.confirmation_secret'],
    });
    const paymentIntent = getSubscriptionPaymentIntent(subscription);
    const paymentSucceeded = paymentIntent?.status === 'succeeded';
    const subscriptionActive = ['active', 'trialing'].includes(subscription.status);

    if (!paymentSucceeded && !subscriptionActive) {
      return res.status(400).json({
        success: false,
        message: 'Subscription payment has not succeeded',
      });
    }

    const existingPayment = await prisma.subscriptionPayment.findFirst({
      where: { stripeSubscriptionId: subscription.id } as any,
    });

    const updateData = {
      status: 'COMPLETED',
      stripePaymentIntentId: paymentIntent?.id,
      currentPeriodEnd: getCurrentPeriodEnd(subscription),
      cancelAtPeriodEnd: !!subscription.cancel_at_period_end,
    };

    const payment = existingPayment
      ? await prisma.subscriptionPayment.update({
          where: { id: existingPayment.id },
          data: updateData as any,
        })
      : await prisma.subscriptionPayment.create({
          data: {
            userId: (req as any).user?.id || subscription.metadata.userId,
            planName: subscription.metadata.planName || 'Premium Plan',
            amount: paymentIntent ? paymentIntent.amount / 100 : undefined,
            method: 'stripe',
            createdAt: new Date(),
            stripeCustomerId: String(subscription.customer),
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            ...updateData,
          } as any,
        });

    res.status(200).json({
      success: true,
      data: {
        subscriptionPaymentId: payment.id,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
      },
      message: 'Subscription confirmed successfully',
    });
  } catch (error: any) {
    console.error('Error confirming subscription:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error?.message || 'Failed to confirm subscription',
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
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      await prisma.subscriptionPayment.updateMany({
        where: { stripePaymentIntentId: paymentIntent.id } as any,
        data: { status: 'COMPLETED' } as any,
      });
      break;
    }

    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', failedPayment.id);
      await prisma.subscriptionPayment.updateMany({
        where: { stripePaymentIntentId: failedPayment.id } as any,
        data: { status: 'FAILED' } as any,
      });
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice as any).subscription;
      const paymentIntentId = (invoice as any).payment_intent;

      if (typeof subscriptionId === 'string') {
        await prisma.subscriptionPayment.updateMany({
          where: { stripeSubscriptionId: subscriptionId } as any,
          data: {
            status: 'COMPLETED',
            stripePaymentIntentId: typeof paymentIntentId === 'string' ? paymentIntentId : undefined,
          } as any,
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = (invoice as any).subscription;

      if (typeof subscriptionId === 'string') {
        await prisma.subscriptionPayment.updateMany({
          where: { stripeSubscriptionId: subscriptionId } as any,
          data: { status: 'FAILED' } as any,
        });
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status === 'active' || subscription.status === 'trialing'
        ? 'COMPLETED'
        : subscription.status === 'canceled'
        ? 'CANCELLED'
        : 'PENDING';

      await prisma.subscriptionPayment.updateMany({
        where: { stripeSubscriptionId: subscription.id } as any,
        data: {
          status,
          currentPeriodEnd: getCurrentPeriodEnd(subscription),
          cancelAtPeriodEnd: !!subscription.cancel_at_period_end,
        } as any,
      });
      break;
    }

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
    success: true,
    data: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    },
    message: 'Stripe publishable key retrieved successfully',
  });
};
