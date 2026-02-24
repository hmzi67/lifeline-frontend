import { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { createCheckout } from '../services/lemonSqueezyService.js';
import { config } from '../config/index.js';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';

const prisma = new PrismaClient();

// Validation schema for checkout creation
const createCheckoutSchema = z.object({
  variantId: z.string().optional(),
});

/**
 * Create a Lemon Squeezy checkout session
 * POST /api/lemonsqueezy/checkout
 */
export const createLemonSqueezyCheckout = async (req: Request, res: Response) => {
  try {
    // Get authenticated user
    const authenticatedReq = req as AuthenticatedRequest;
    const userId = authenticatedReq.user?.id;
    const userEmail = authenticatedReq.user?.email;

    if (!userId || !userEmail) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED',
      });
    }

    // Validate request body
    const validatedData = createCheckoutSchema.parse(req.body);

    console.log(`Creating Lemon Squeezy checkout for user ${userId}`);

    // Create checkout session
    const checkoutData = await createCheckout(userId, userEmail, validatedData.variantId);

    res.status(200).json({
      success: true,
      data: {
        checkoutUrl: checkoutData.checkoutUrl,
        checkoutId: checkoutData.checkoutId,
      },
    });
  } catch (error) {
    console.error('Error creating Lemon Squeezy checkout:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    }

    if (error instanceof Error) {
      // Provide more specific error messages
      let statusCode = 500;
      let message = 'Failed to create checkout';
      
      if (error.message.includes('not configured')) {
        statusCode = 503;
        message = 'Payment service is not configured properly';
      } else if (error.message.includes('timed out') || error.message.includes('Unable to connect')) {
        statusCode = 503;
        message = 'Payment service is temporarily unavailable. Please try again later.';
      }
      
      return res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

/**
 * Verify Lemon Squeezy webhook signature
 * @param signature - The X-Signature header value
 * @param rawBody - The raw request body as string
 * @returns True if signature is valid
 */
const verifyWebhookSignature = (signature: string, rawBody: string): boolean => {
  try {
    if (!config.lemonSqueezy.webhookSecret) {
      console.error('Lemon Squeezy webhook secret is not configured');
      return false;
    }

    // Create HMAC-SHA256 hash
    const hmac = crypto.createHmac('sha256', config.lemonSqueezy.webhookSecret);
    hmac.update(rawBody);
    const digest = hmac.digest('hex');

    // Compare signatures (constant-time comparison)
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
};

/**
 * Handle Lemon Squeezy webhook events
 * POST /api/webhooks/lemonsqueezy
 */
export const handleLemonSqueezyWebhook = async (req: Request, res: Response) => {
  try {
    // Get the signature from headers
    const signature = req.headers['x-signature'] as string;

    if (!signature) {
      console.error('Webhook signature missing');
      return res.status(401).json({
        success: false,
        message: 'Signature required',
      });
    }

    // Get raw body - should be stored by middleware
    const rawBody = (req as any).rawBody || JSON.stringify(req.body);

    // Verify signature
    const isValid = verifyWebhookSignature(signature, rawBody);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return res.status(401).json({
        success: false,
        message: 'Invalid signature',
      });
    }

    // Parse the event
    const event = req.body;
    const eventName = event.meta?.event_name;

    console.log(`Received Lemon Squeezy webhook: ${eventName}`);

    // Process different event types
    switch (eventName) {
      case 'order_created':
        await handleOrderCreated(event);
        break;

      case 'subscription_created':
        await handleSubscriptionCreated(event);
        break;

      case 'subscription_updated':
        await handleSubscriptionUpdated(event);
        break;

      case 'subscription_cancelled':
        await handleSubscriptionCancelled(event);
        break;

      default:
        console.log(`Unhandled webhook event: ${eventName}`);
    }

    // Always return 200 OK to acknowledge receipt
    res.status(200).json({
      success: true,
      message: 'Webhook processed',
    });
  } catch (error) {
    console.error('Error processing webhook:', error);

    // Still return 200 to prevent retries for processing errors
    res.status(200).json({
      success: false,
      message: 'Webhook received but processing failed',
    });
  }
};

/**
 * Handle order_created event
 */
const handleOrderCreated = async (event: any) => {
  try {
    const orderData = event.data;
    const customData = orderData.attributes.first_order_item?.product?.custom_data;
    const userId = customData?.user_id;

    if (!userId) {
      console.error('User ID not found in order custom data');
      return;
    }

    console.log(`Processing order_created for user ${userId}`);

    // Update user record or create subscription payment record
    await prisma.subscriptionPayment.create({
      data: {
        userId: userId,
        planName: orderData.attributes.first_order_item?.product?.name || 'Lemon Squeezy Plan',
        amount: parseFloat(orderData.attributes.total) / 100, // Convert cents to dollars
        method: 'lemonsqueezy',
        status: orderData.attributes.status,
        createdAt: new Date(orderData.attributes.created_at),
      },
    });

    console.log(`Order created record saved for user ${userId}`);
  } catch (error) {
    console.error('Error handling order_created:', error);
    throw error;
  }
};

/**
 * Handle subscription_created event
 */
const handleSubscriptionCreated = async (event: any) => {
  try {
    const subscriptionData = event.data;
    const customData = subscriptionData.attributes.custom_data;
    const userId = customData?.user_id;

    if (!userId) {
      console.error('User ID not found in subscription custom data');
      return;
    }

    console.log(`Processing subscription_created for user ${userId}`);

    // Update user with subscription details
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionActive: true,
        subscriptionId: subscriptionData.id,
        subscriptionStatus: subscriptionData.attributes.status,
        currentPeriodEnd: new Date(subscriptionData.attributes.renews_at),
        lemonSqueezyCustomerId: subscriptionData.attributes.customer_id.toString(),
      },
    });

    console.log(`Subscription activated for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription_created:', error);
    throw error;
  }
};

/**
 * Handle subscription_updated event
 */
const handleSubscriptionUpdated = async (event: any) => {
  try {
    const subscriptionData = event.data;
    const customData = subscriptionData.attributes.custom_data;
    const userId = customData?.user_id;

    if (!userId) {
      console.error('User ID not found in subscription custom data');
      return;
    }

    console.log(`Processing subscription_updated for user ${userId}`);

    // Update subscription details
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: subscriptionData.attributes.status,
        currentPeriodEnd: new Date(subscriptionData.attributes.renews_at),
      },
    });

    console.log(`Subscription updated for user ${userId}`);
  } catch (error) {
    console.error('Error handling subscription_updated:', error);
    throw error;
  }
};

/**
 * Handle subscription_cancelled event
 */
const handleSubscriptionCancelled = async (event: any) => {
  try {
    const subscriptionData = event.data;
    const customData = subscriptionData.attributes.custom_data;
    const userId = customData?.user_id;

    if (!userId) {
      console.error('User ID not found in subscription custom data');
      return;
    }

    console.log(`Processing subscription_cancelled for user ${userId}`);

    // Determine if we should deactivate immediately or at period end
    const endsAt = subscriptionData.attributes.ends_at;
    const shouldDeactivateNow = !endsAt || new Date(endsAt) <= new Date();

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionActive: shouldDeactivateNow ? false : true,
        subscriptionStatus: subscriptionData.attributes.status,
        currentPeriodEnd: endsAt ? new Date(endsAt) : null,
      },
    });

    console.log(
      `Subscription cancelled for user ${userId} (deactivated: ${shouldDeactivateNow})`
    );
  } catch (error) {
    console.error('Error handling subscription_cancelled:', error);
    throw error;
  }
};
