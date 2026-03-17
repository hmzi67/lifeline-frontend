import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const getUserIdFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const decoded = jwt.verify(
      authHeader.substring(7),
      process.env.JWT_SECRET || 'fallback-secret'
    ) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
};

// GET /api/diet-meal-logs?date=YYYY-MM-DD
// Returns the user's logged meals for a given date (defaults to today)
export const getLoggedMeals = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const dateStr = (req.query.date as string) || new Date().toISOString().split('T')[0];
    const dateStart = new Date(dateStr);
    const dateEnd = new Date(dateStart.getTime() + 86400000);

    const logs = await prisma.dietMealLog.findMany({
      where: {
        userId,
        date: { gte: dateStart, lt: dateEnd },
      },
    });

    res.status(200).json({ success: true, data: logs, message: 'Meal logs retrieved' });
  } catch (error) {
    console.error('Error fetching meal logs:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// POST /api/diet-meal-logs
// Logs a meal as consumed (idempotent – duplicate logs for same mealId+date are ignored)
export const logMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { activePlanId, mealId, mealName, mealType, calories, date } = req.body;

    if (!activePlanId || !mealId || !date) {
      res.status(400).json({
        success: false,
        message: 'activePlanId, mealId and date are required',
      });
      return;
    }

    const dateStart = new Date(date as string);
    const dateEnd = new Date(dateStart.getTime() + 86400000);

    // Idempotent: return existing log if already logged
    const existing = await prisma.dietMealLog.findFirst({
      where: { userId, mealId, date: { gte: dateStart, lt: dateEnd } },
    });
    if (existing) {
      res.status(200).json({ success: true, data: existing, message: 'Already logged' });
      return;
    }

    const log = await prisma.dietMealLog.create({
      data: {
        userId,
        activePlanId,
        mealId,
        mealName: mealName || '',
        mealType: mealType || '',
        calories: typeof calories === 'number' ? calories : 0,
        date: dateStart,
      },
    });

    res.status(201).json({ success: true, data: log, message: 'Meal logged successfully' });
  } catch (error) {
    console.error('Error logging meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /api/diet-meal-logs/meal/:mealId/date/:date
// Removes the meal log (uncheck)
export const unlogMeal = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { mealId, date } = req.params;
    const dateStart = new Date(date);
    const dateEnd = new Date(dateStart.getTime() + 86400000);

    await prisma.dietMealLog.deleteMany({
      where: { userId, mealId, date: { gte: dateStart, lt: dateEnd } },
    });

    res.status(200).json({ success: true, message: 'Meal unlogged successfully' });
  } catch (error) {
    console.error('Error unlogging meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
