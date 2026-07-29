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
  pricingPlanId: z.string().min(1, 'Pricing plan ID is required'),
});

const confirmSubscriptionSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
});

const getSubscriptionPaymentIntent = (subscription: Stripe.Subscription): Stripe.PaymentIntent | null => {
  const invoice = (subscription as any).latest_invoice;
  const paymentIntent = invoice?.payment_intent;
  if (!paymentIntent || typeof paymentIntent === 'string') return null;
  return paymentIntent as Stripe.PaymentIntent;
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + months);
  return result;
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

    // ponytail: record coupon usage if a coupon was applied
    const couponCode = paymentIntent.metadata.couponCode;
    if (couponCode) {
      const coupon = await prisma.couponCode.findUnique({ where: { code: couponCode.toUpperCase() } });
      if (coupon && coupon.isActive && coupon.currentUses < coupon.maxUses) {
        await prisma.$transaction([
          prisma.couponUsage.create({
            data: { couponId: coupon.id, userId, paymentId: subscriptionPayment.id },
          }),
          prisma.couponCode.update({
            where: { id: coupon.id },
            data: { currentUses: { increment: 1 } },
          }),
        ]);
      }
    }

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
 * Create a direct Stripe intent using the server-side pricing plan.
 *
 * The route name is retained for mobile compatibility, but this does not create
 * a Stripe Billing Subscription.
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

    const { pricingPlanId } = createSubscriptionSchema.parse(req.body);
    const [plan, user] = await Promise.all([
      prisma.pricingPlan.findFirst({
        where: { id: pricingPlanId, isActive: true },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, trialUsedAt: true },
      }),
    ]);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan is inactive or no longer available',
      });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const customerId = await getOrCreateStripeCustomer(stripe, userId);
    const metadata = {
      userId,
      pricingPlanId: plan.id,
      planName: plan.name,
      durationMonths: String(plan.durationMonths),
    };
    const trialEligible = plan.trialDays > 0 && !user.trialUsedAt;
    const trialEndsAt = trialEligible
      ? new Date(Date.now() + plan.trialDays * 24 * 60 * 60 * 1000)
      : null;

    if (trialEligible) {
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        usage: 'off_session',
        automatic_payment_methods: { enabled: true },
        metadata,
      });

      if (!setupIntent.client_secret) {
        return res.status(500).json({
          success: false,
          message: 'Stripe did not return a client secret for this trial',
        });
      }

      const payment = await prisma.subscriptionPayment.create({
        data: {
          userId,
          pricingPlanId: plan.id,
          planName: plan.name,
          durationMonths: plan.durationMonths,
          amount: plan.price,
          method: 'stripe',
          status: 'SETUP_PENDING',
          createdAt: new Date(),
          stripeCustomerId: customerId,
          stripeSetupIntentId: setupIntent.id,
          currentPeriodEnd: trialEndsAt,
        },
      });

      return res.status(200).json({
        success: true,
        data: {
          intentType: 'setup',
          clientSecret: setupIntent.client_secret,
          paymentIntentId: '',
          subscriptionId: payment.id,
          customerId,
        },
        message: 'Trial setup created successfully',
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(plan.price) * 100),
      currency: 'usd',
      customer: customerId,
      setup_future_usage: 'off_session',
      automatic_payment_methods: { enabled: true },
      metadata,
    });

    if (!paymentIntent.client_secret) {
      return res.status(500).json({
        success: false,
        message: 'Stripe did not return a client secret for this payment',
      });
    }

    const payment = await prisma.subscriptionPayment.create({
      data: {
        userId,
        pricingPlanId: plan.id,
        planName: plan.name,
        durationMonths: plan.durationMonths,
        amount: plan.price,
        method: 'stripe',
        status: 'PENDING',
        createdAt: new Date(),
        stripeCustomerId: customerId,
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        intentType: 'payment',
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        subscriptionId: payment.id,
        customerId,
      },
      message: 'Payment created successfully',
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
 * Confirm a direct PaymentIntent or SetupIntent and grant time-limited access.
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

    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const { subscriptionId } = confirmSubscriptionSchema.parse(req.body);
    const payment = await prisma.subscriptionPayment.findFirst({
      where: { id: subscriptionId, userId },
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    if (payment.status === 'COMPLETED' || payment.status === 'TRIALING') {
      const existingLicense = await prisma.userLicense.findFirst({
        where: { paymentId: payment.id, userId },
      });
      if (!existingLicense) {
        const expiresAt = payment.currentPeriodEnd
          || addMonths(new Date(), payment.durationMonths || 1);
        await prisma.$transaction([
          prisma.subscriptionPayment.update({
            where: { id: payment.id },
            data: { currentPeriodEnd: expiresAt },
          }),
          prisma.userLicense.create({
            data: { userId, paymentId: payment.id, createdAt: new Date(), expiresAt },
          }),
        ]);
      }
      return res.status(200).json({
        success: true,
        data: { subscriptionPaymentId: payment.id, status: payment.status },
        message: 'Payment already confirmed',
      });
    }

    if (payment.stripeSetupIntentId) {
      const setupIntent = await stripe.setupIntents.retrieve(payment.stripeSetupIntentId);
      if (setupIntent.status !== 'succeeded' || !setupIntent.payment_method) {
        return res.status(400).json({
          success: false,
          message: 'Payment method setup has not succeeded',
        });
      }

      const paymentMethodId = typeof setupIntent.payment_method === 'string'
        ? setupIntent.payment_method
        : setupIntent.payment_method.id;
      const expiresAt = payment.currentPeriodEnd || new Date();

      await prisma.$transaction(async (tx) => {
        const trialClaim = await tx.user.updateMany({
          where: { id: userId, trialUsedAt: null },
          data: { trialUsedAt: new Date() },
        });
        if (trialClaim.count !== 1) {
          throw new Error('Free trial has already been used');
        }

        await tx.subscriptionPayment.update({
          where: { id: payment.id },
          data: {
            status: 'TRIALING',
            stripePaymentMethodId: paymentMethodId,
          },
        });
        await tx.userLicense.create({
          data: { userId, paymentId: payment.id, createdAt: new Date(), expiresAt },
        });
      });

      return res.status(200).json({
        success: true,
        data: { subscriptionPaymentId: payment.id, status: 'TRIALING' },
        message: 'Trial activated successfully',
      });
    }

    if (!payment.stripePaymentIntentId) {
      return res.status(400).json({ success: false, message: 'Payment intent is missing' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(payment.stripePaymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ success: false, message: 'Payment has not succeeded' });
    }

    const expiresAt = addMonths(new Date(), payment.durationMonths || 1);
    const paymentMethodId = typeof paymentIntent.payment_method === 'string'
      ? paymentIntent.payment_method
      : paymentIntent.payment_method?.id;

    await prisma.$transaction([
      prisma.subscriptionPayment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          stripePaymentMethodId: paymentMethodId,
          currentPeriodEnd: expiresAt,
        },
      }),
      prisma.userLicense.create({
        data: { userId, paymentId: payment.id, createdAt: new Date(), expiresAt },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        subscriptionPaymentId: payment.id,
        status: 'COMPLETED',
      },
      message: 'Payment confirmed successfully',
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
 * Charge cards saved by trial SetupIntents when their trial expires.
 * Stripe idempotency keys make this safe to retry after process restarts.
 */
export const processDueTrialCharges = async (): Promise<void> => {
  const stripe = getStripeClient();
  if (!stripe) return;

  const dueTrials = await prisma.subscriptionPayment.findMany({
    where: {
      status: 'TRIALING',
      currentPeriodEnd: { lte: new Date() },
      stripeCustomerId: { not: null },
      stripePaymentMethodId: { not: null },
    },
    take: 100,
  });

  for (const payment of dueTrials) {
    try {
      const paymentIntent = await stripe.paymentIntents.create(
        {
          amount: Math.round(Number(payment.amount || 0) * 100),
          currency: 'usd',
          customer: payment.stripeCustomerId!,
          payment_method: payment.stripePaymentMethodId!,
          confirm: true,
          off_session: true,
          metadata: {
            userId: payment.userId || '',
            pricingPlanId: payment.pricingPlanId || '',
            subscriptionPaymentId: payment.id,
            chargeType: 'trial_conversion',
          },
        },
        { idempotencyKey: `trial-conversion-${payment.id}` },
      );

      if (paymentIntent.status !== 'succeeded') {
        await prisma.subscriptionPayment.update({
          where: { id: payment.id },
          data: {
            status: 'PAYMENT_ACTION_REQUIRED',
            stripePaymentIntentId: paymentIntent.id,
          },
        });
        continue;
      }

      const expiresAt = addMonths(new Date(), payment.durationMonths || 1);
      await prisma.$transaction([
        prisma.subscriptionPayment.update({
          where: { id: payment.id },
          data: {
            status: 'COMPLETED',
            stripePaymentIntentId: paymentIntent.id,
            currentPeriodEnd: expiresAt,
          },
        }),
        prisma.userLicense.updateMany({
          where: { paymentId: payment.id },
          data: { expiresAt },
        }),
      ]);
    } catch (error: any) {
      console.error(`Failed to convert trial payment ${payment.id}:`, error);
      await prisma.subscriptionPayment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          stripePaymentIntentId: error?.payment_intent?.id,
        },
      });
    }
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
