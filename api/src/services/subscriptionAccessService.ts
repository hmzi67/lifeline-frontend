import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findActiveLicense = (userId: string, now = new Date()) =>
  prisma.userLicense.findFirst({
    where: {
      userId,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    select: {
      expiresAt: true,
      payment: {
        select: {
          cancelAtPeriodEnd: true,
          method: true,
          pricingPlanId: true,
          storeProductId: true,
        },
      },
    },
  });

/** Active VIP access billed by Apple, even when a newer non-App Store license exists. */
export const findActiveAppStoreLicense = (userId: string, now = new Date()) =>
  prisma.userLicense.findFirst({
    where: {
      userId,
      payment: { method: 'app_store' },
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } },
      ],
    },
    select: { id: true },
  });
