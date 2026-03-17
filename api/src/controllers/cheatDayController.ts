import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';

const prisma = new PrismaClient();

// Get all cheat days for a user
export const getUserCheatDays = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUser = (req as AuthenticatedRequest).user;
    const { userId } = req.params;

    if (authUser?.id !== userId) {
      res.status(403).json({ success: false, message: 'Forbidden: You can only access your own cheat days' });
      return;
    }

    const cheatDays = await prisma.cheatDay.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      },
      orderBy: {
        loggedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: cheatDays,
      message: 'Cheat days retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching cheat days:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get cheat day by ID
export const getCheatDayById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const cheatDay = await prisma.cheatDay.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      }
    });

    if (!cheatDay) {
      res.status(404).json({
        success: false,
        message: 'Cheat day not found'
      });
      return;
    }

    const authUser = (req as AuthenticatedRequest).user;
    if (authUser?.id !== cheatDay.userId) {
      res.status(403).json({ success: false, message: 'Forbidden: You can only access your own cheat days' });
      return;
    }

    res.status(200).json({
      success: true,
      data: cheatDay,
      message: 'Cheat day retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching cheat day:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Log a cheat day meal
export const logCheatDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, foodName, image, mealType, portionSize, calories, protein, carbs, fat, barcode } = req.body;

    const authUser = (req as AuthenticatedRequest).user;
    if (!userId || authUser?.id !== userId) {
      res.status(403).json({ success: false, message: 'Forbidden: You can only log cheat days for yourself' });
      return;
    }

    if (!foodName) {
      res.status(400).json({
        success: false,
        message: 'User ID and food name are required'
      });
      return;
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    const cheatDay = await prisma.cheatDay.create({
      data: {
        userId,
        foodName,
        image: image || null,
        mealType: mealType || null,
        portionSize: portionSize || null,
        calories: calories != null ? Number(calories) : null,
        protein: protein != null ? Number(protein) : null,
        carbs: carbs != null ? Number(carbs) : null,
        fat: fat != null ? Number(fat) : null,
        barcode: barcode || null,
        loggedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: cheatDay,
      message: 'Cheat day logged successfully'
    });
  } catch (error) {
    console.error('Error logging cheat day:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update cheat day
export const updateCheatDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { foodName, image, mealType, portionSize, calories, protein, carbs, fat, barcode } = req.body;

    const existingCheatDay = await prisma.cheatDay.findUnique({
      where: { id }
    });

    if (!existingCheatDay) {
      res.status(404).json({
        success: false,
        message: 'Cheat day not found'
      });
      return;
    }

    const authUser = (req as AuthenticatedRequest).user;
    if (authUser?.id !== existingCheatDay.userId) {
      res.status(403).json({ success: false, message: 'Forbidden: You can only update your own cheat days' });
      return;
    }

    const updateData: any = {};
    if (foodName !== undefined) updateData.foodName = foodName;
    if (image !== undefined) updateData.image = image;
    if (mealType !== undefined) updateData.mealType = mealType;
    if (portionSize !== undefined) updateData.portionSize = portionSize;
    if (calories !== undefined) updateData.calories = Number(calories);
    if (protein !== undefined) updateData.protein = Number(protein);
    if (carbs !== undefined) updateData.carbs = Number(carbs);
    if (fat !== undefined) updateData.fat = Number(fat);
    if (barcode !== undefined) updateData.barcode = barcode;

    const cheatDay = await prisma.cheatDay.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: cheatDay,
      message: 'Cheat day updated successfully'
    });
  } catch (error) {
    console.error('Error updating cheat day:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete cheat day
export const deleteCheatDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingCheatDay = await prisma.cheatDay.findUnique({
      where: { id }
    });

    if (!existingCheatDay) {
      res.status(404).json({
        success: false,
        message: 'Cheat day not found'
      });
      return;
    }

    const authUser = (req as AuthenticatedRequest).user;
    if (authUser?.id !== existingCheatDay.userId) {
      res.status(403).json({ success: false, message: 'Forbidden: You can only delete your own cheat days' });
      return;
    }

    await prisma.cheatDay.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Cheat day deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting cheat day:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get all cheat days (admin)
export const getAllCheatDays = async (req: Request, res: Response): Promise<void> => {
  try {
    const cheatDays = await prisma.cheatDay.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      },
      orderBy: {
        loggedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: cheatDays,
      message: 'All cheat days retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching all cheat days:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
