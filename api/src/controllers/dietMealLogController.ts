import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

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

    res.status(200).json({
      success: true,
      data: [],
      message: 'Meal logs feature is currently unavailable in this schema',
    });
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

    const { activePlanId, mealId, date } = req.body;

    if (!activePlanId || !mealId || !date) {
      res.status(400).json({
        success: false,
        message: 'activePlanId, mealId and date are required',
      });
      return;
    }

    res.status(501).json({
      success: false,
      message: 'Meal logging is currently unavailable in this schema',
      data: { userId, activePlanId, mealId, date },
    });
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
    res.status(501).json({
      success: false,
      message: 'Meal unlogging is currently unavailable in this schema',
      data: { userId, mealId, date },
    });
  } catch (error) {
    console.error('Error unlogging meal:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
