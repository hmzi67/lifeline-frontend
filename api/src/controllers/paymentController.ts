import { Request, Response } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';

const prisma = new PrismaClient();

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

// ─── Validation Schemas ────────────────────────────────────────────────────────

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
  paymentMethodId: z.string().min(1, 'Payment Method ID is required'),
  userId: z.string().optional(),
  couponCode: z.string().optional(),
  referralCode: z.string().optional(),
});

// ─── Helper: Resolve Discount ──────────────────────────────────────────────────

/**
 * Validates a coupon or referral code for a given user.
 * Does NOT increment usage — that happens atomically after successful payment.
 */
async function resolveDiscount(
  userId: string,
  couponCode?: string,
  referralCode?: string
): Promise<{
  discountPercent: number;
  discountType: 'coupon' | 'referral' | null;
  discountCode: string | null;
}> {
  // Coupon takes precedence when both supplied
  if (couponCode) {
    const upper = couponCode.toUpperCase();
    const coupon = await prisma.couponCode.findUnique({ where: { code: upper } });

    if (!coupon || !coupon.isActive) throw new Error('Invalid or inactive coupon code');
    if (coupon.expiresAt && new Date() > coupon.expiresAt) throw new Error('Coupon code has expired');
    if (coupon.currentUses >= coupon.maxUses) throw new Error('Coupon code has reached its usage limit');

    const used = await prisma.couponUsage.findUnique({
      where: { couponId_userId: { couponId: coupon.id, userId } },
    });
    if (used) throw new Error('You have already used this coupon code');

    return { discountPercent: coupon.discountPercent, discountType: 'coupon', discountCode: coupon.code };
  }

  if (referralCode) {
    const upper = referralCode.toUpperCase();
    const refCode = await prisma.referralCode.findUnique({ where: { code: upper } });

    if (!refCode || !refCode.isActive) throw new Error('Invalid or inactive referral code');
    if (refCode.expiresAt && new Date() > refCode.expiresAt) throw new Error('Referral code has expired');
    if (refCode.currentUses >= refCode.maxUses) throw new Error('Referral code has reached its usage limit');
    if (refCode.referrerId === userId) throw new Error('You cannot use your own referral code');

    const used = await prisma.referralUsage.findUnique({
      where: { referralCodeId_userId: { referralCodeId: refCode.id, userId } },
    });
    if (used) throw new Error('You have already used this referral code');

    return { discountPercent: refCode.discountPercent, discountType: 'referral', discountCode: refCode.code };
  }

  return { discountPercent: 0, discountType: null, discountCode: null };
}

/**
 * Create a Stripe Payment Intent
 * Optionally accepts couponCode or referralCode to apply a 10% discount.
 */
export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.id;
    const validatedData = createPaymentIntentSchema.parse(req.body);

    const originalAmount = validatedData.amount;
    let finalAmount = originalAmount;
    let discountPercent = 0;
    let discountAmount = 0;
    let discountCode: string | null = null;
    let discountType: string | null = null;

    // Resolve discount if a coupon or referral code was provided
    if (userId && (validatedData.couponCode || validatedData.referralCode)) {
      const discount = await resolveDiscount(userId, validatedData.couponCode, validatedData.referralCode);
      discountPercent = discount.discountPercent;
      discountCode = discount.discountCode;
      discountType = discount.discountType;
      discountAmount = parseFloat(((originalAmount * discountPercent) / 100).toFixed(2));
      finalAmount = parseFloat((originalAmount - discountAmount).toFixed(2));
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalAmount * 100), // convert to cents
      currency: validatedData.currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        planName: validatedData.planName || '',
        planId: validatedData.planId || '',
        originalAmount: String(originalAmount),
        discountAmount: String(discountAmount),
        discountPercent: String(discountPercent),
        discountCode: discountCode || '',
        discountType: discountType || '',
        userId: userId || '',
      },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      pricing: {
        originalAmount,
        discountPercent,
        discountAmount,
        finalAmount,
        discountCode,
        discountType,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation error', details: error.errors });
    }
    console.error('createPaymentIntent error:', error);
    if (error.message && (error.message.includes('coupon') || error.message.includes('referral') || error.message.includes('code'))) {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to create payment intent' });
  }
};

/**
 * Confirm payment — records the subscription and atomically marks the discount code as used.
 */
export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const validatedData = confirmPaymentSchema.parse(req.body);

    const paymentIntent = await stripe.paymentIntents.retrieve(validatedData.paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ success: false, message: 'Payment has not succeeded' });
    }

    const userId = (req as AuthenticatedRequest).user?.id || validatedData.userId;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'User not authenticated' });
    }

    const meta = paymentIntent.metadata;
    const originalAmount = parseFloat(meta.originalAmount || '0') || paymentIntent.amount / 100;
    const discountAmount = parseFloat(meta.discountAmount || '0');
    const finalAmount = paymentIntent.amount / 100;
    const discountCode = meta.discountCode || null;
    const discountType = meta.discountType || null;

    // Atomic transaction: create payment record + mark discount code used
    const result = await prisma.$transaction(async (tx) => {
      const subscriptionPayment = await tx.subscriptionPayment.create({
        data: {
          userId,
          planName: meta.planName || 'Premium Plan',
          originalAmount,
          discountAmount,
          amount: finalAmount,
          discountCode,
          discountType,
          method: 'stripe',
          status: 'COMPLETED',
          createdAt: new Date(),
        },
      });

      if (discountType === 'coupon' && discountCode) {
        const coupon = await tx.couponCode.findUnique({ where: { code: discountCode } });
        if (coupon) {
          await tx.couponUsage.create({ data: { couponId: coupon.id, userId, paymentId: subscriptionPayment.id } });
          await tx.couponCode.update({ where: { id: coupon.id }, data: { currentUses: { increment: 1 } } });
        }
      }

      if (discountType === 'referral' && discountCode) {
        const refCode = await tx.referralCode.findUnique({ where: { code: discountCode } });
        if (refCode) {
          await tx.referralUsage.create({ data: { referralCodeId: refCode.id, userId, paymentId: subscriptionPayment.id } });
          await tx.referralCode.update({ where: { id: refCode.id }, data: { currentUses: { increment: 1 } } });
        }
      }

      return subscriptionPayment;
    });

    return res.status(200).json({
      success: true,
      subscriptionId: result.id,
      message: 'Payment confirmed successfully',
      pricing: { originalAmount, discountAmount, finalAmount, discountCode, discountType },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: 'Validation error', details: error.errors });
    }
    console.error('confirmPayment error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error', message: 'Failed to confirm payment' });
  }
};

/**
 * Webhook handler for Stripe events
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing stripe-signature header');

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }
    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      console.log('PaymentIntent failed:', failedPayment.id);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.json({ received: true });
};

/**
 * Get Stripe publishable key
 */
export const getPublishableKey = async (req: Request, res: Response) => {
  return res.status(200).json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
};
