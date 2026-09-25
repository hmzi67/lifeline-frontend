import { Request, Response } from 'express';
import { findActiveLicense } from '../services/subscriptionAccessService.js';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';

export const getSubscriptionStatus = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const activeLicense = await findActiveLicense(userId);
    const payment = activeLicense?.payment;

    return res.status(200).json({
      success: true,
      data: {
        active: Boolean(activeLicense),
        expiresAt: activeLicense?.expiresAt?.toISOString() ?? null,
        cancelAtPeriodEnd: payment?.cancelAtPeriodEnd ?? false,
        pricingPlanId: payment?.pricingPlanId ?? null,
        productId: payment?.storeProductId ?? null,
        source: payment?.method ?? null,
      },
    });
  } catch (error) {
    console.error('Subscription status lookup failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve subscription status',
    });
  }
};
