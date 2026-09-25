import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';
import {
  findWebhookUserId,
  RevenueCatServiceError,
  syncRevenueCatEntitlement,
} from '../services/revenueCatService.js';

const sendServiceError = (res: Response, error: unknown) => {
  if (error instanceof RevenueCatServiceError) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }

  console.error('App Store entitlement sync failed:', error);
  return res.status(500).json({
    success: false,
    message: 'Unable to sync the App Store subscription',
  });
};

export const syncInAppPurchase = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const result = await syncRevenueCatEntitlement(userId);
    return res.status(200).json({
      success: true,
      data: result,
      message: result.active
        ? 'App Store subscription synced successfully'
        : 'No active App Store subscription was found',
    });
  } catch (error) {
    return sendServiceError(res, error);
  }
};

export const handleRevenueCatWebhook = async (req: Request, res: Response) => {
  const expectedAuthorization = process.env.REVENUECAT_WEBHOOK_AUTHORIZATION?.trim();
  if (!expectedAuthorization) {
    return res.status(503).json({ success: false, message: 'RevenueCat webhook is not configured' });
  }

  if (req.get('authorization') !== expectedAuthorization) {
    return res.status(401).json({ success: false, message: 'Invalid webhook authorization' });
  }

  const event = req.body?.event;
  if (!event || typeof event !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid RevenueCat webhook payload' });
  }

  const candidateIds = [
    event.app_user_id,
    event.original_app_user_id,
    ...(Array.isArray(event.aliases) ? event.aliases : []),
  ].filter((value): value is string => typeof value === 'string');

  try {
    const transferIds = event.type === 'TRANSFER'
      ? [
          ...(Array.isArray(event.transferred_from) ? event.transferred_from : []),
          ...(Array.isArray(event.transferred_to) ? event.transferred_to : []),
        ].filter((value): value is string => typeof value === 'string')
      : [];
    const resolvedUserIds = transferIds.length > 0
      ? await Promise.all(transferIds.map(id => findWebhookUserId([id])))
      : [await findWebhookUserId(candidateIds)];
    const userIds = [...new Set(resolvedUserIds.filter((id): id is string => !!id))];

    if (userIds.length === 0) {
      // RevenueCat test events and old anonymous aliases may not map to an app user.
      return res.status(200).json({ received: true, ignored: true });
    }

    const results = await Promise.all(userIds.map(userId => syncRevenueCatEntitlement(userId)));
    return res.status(200).json({
      received: true,
      active: results.some(result => result.active),
      syncedUsers: results.length,
    });
  } catch (error) {
    return sendServiceError(res, error);
  }
};
