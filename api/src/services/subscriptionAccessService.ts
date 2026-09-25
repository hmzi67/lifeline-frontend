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
