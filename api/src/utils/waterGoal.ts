import { PrismaClient } from '@prisma/client';

export const DEFAULT_WATER_GOAL_AMOUNT = 2500;
export const DEFAULT_WATER_GOAL_UNIT = 'ml';
const DEFAULT_WATER_GOAL_SETTING_KEY = 'daily_water_goal_ml';

export const getDefaultWaterGoalAmount = async (prisma: PrismaClient): Promise<number> => {
  const setting = await prisma.appSetting.findFirst({
    where: {
      key: DEFAULT_WATER_GOAL_SETTING_KEY,
    },
  });

  const parsedAmount = Number(setting?.value);

  return Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : DEFAULT_WATER_GOAL_AMOUNT;
};