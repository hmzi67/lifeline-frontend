import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get user's active diet plan
export const getUserActiveDietPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const activePlan = await prisma.userActiveDietPlan.findFirst({
      where: { 
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        },
        diet: {
          include: {
            dietPlanDays: {
              include: {
                dietPlanMeals: {
                  include: {
                    mealType: true
                  }
                }
              },
              orderBy: {
                dayNumber: 'asc'
              }
            }
          }
        }
      }
    });

    if (!activePlan) {
      res.status(404).json({
        success: false,
        message: 'No active diet plan found for this user'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: activePlan,
      message: 'Active diet plan retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching active diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Start a new active diet plan
export const startActiveDietPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, dietId, currentDay } = req.body;

    if (!userId || !dietId) {
      res.status(400).json({
        success: false,
        message: 'User ID and diet ID are required'
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

    // Verify diet plan exists
    const diet = await prisma.dietPlan.findUnique({
      where: { id: dietId }
    });

    if (!diet) {
      res.status(404).json({
        success: false,
        message: 'Diet plan not found'
      });
      return;
    }

    // Check if user already has an active diet plan
    const existingActivePlan = await prisma.userActiveDietPlan.findFirst({
      where: {
        userId,
        pausedAt: null
      }
    });

    if (existingActivePlan) {
      res.status(400).json({
        success: false,
        message: 'User already has an active diet plan. Please pause it first.'
      });
      return;
    }

    const activePlan = await prisma.userActiveDietPlan.create({
      data: {
        userId,
        dietId,
        currentDay: currentDay || 1,
        startedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        },
        diet: true
      }
    });

    res.status(201).json({
      success: true,
      data: activePlan,
      message: 'Active diet plan started successfully'
    });
  } catch (error) {
    console.error('Error starting active diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Pause active diet plan
export const pauseActiveDietPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const activePlan = await prisma.userActiveDietPlan.findUnique({
      where: { id }
    });

    if (!activePlan) {
      res.status(404).json({
        success: false,
        message: 'Active diet plan not found'
      });
      return;
    }

    if (activePlan.pausedAt) {
      res.status(400).json({
        success: false,
        message: 'Diet plan is already paused'
      });
      return;
    }

    const updatedPlan = await prisma.userActiveDietPlan.update({
      where: { id },
      data: {
        pausedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        },
        diet: true
      }
    });

    res.status(200).json({
      success: true,
      data: updatedPlan,
      message: 'Active diet plan paused successfully'
    });
  } catch (error) {
    console.error('Error pausing active diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Resume active diet plan
export const resumeActiveDietPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const activePlan = await prisma.userActiveDietPlan.findUnique({
      where: { id }
    });

    if (!activePlan) {
      res.status(404).json({
        success: false,
        message: 'Active diet plan not found'
      });
      return;
    }

    if (!activePlan.pausedAt) {
      res.status(400).json({
        success: false,
        message: 'Diet plan is not paused'
      });
      return;
    }

    const updatedPlan = await prisma.userActiveDietPlan.update({
      where: { id },
      data: {
        pausedAt: null
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        },
        diet: true
      }
    });

    res.status(200).json({
      success: true,
      data: updatedPlan,
      message: 'Active diet plan resumed successfully'
    });
  } catch (error) {
    console.error('Error resuming active diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update current day
export const updateCurrentDay = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { currentDay } = req.body;

    if (!currentDay) {
      res.status(400).json({
        success: false,
        message: 'Current day is required'
      });
      return;
    }

    const activePlan = await prisma.userActiveDietPlan.findUnique({
      where: { id }
    });

    if (!activePlan) {
      res.status(404).json({
        success: false,
        message: 'Active diet plan not found'
      });
      return;
    }

    const updatedPlan = await prisma.userActiveDietPlan.update({
      where: { id },
      data: { currentDay },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        },
        diet: true
      }
    });

    res.status(200).json({
      success: true,
      data: updatedPlan,
      message: 'Current day updated successfully'
    });
  } catch (error) {
    console.error('Error updating current day:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete active diet plan
export const deleteActiveDietPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const activePlan = await prisma.userActiveDietPlan.findUnique({
      where: { id }
    });

    if (!activePlan) {
      res.status(404).json({
        success: false,
        message: 'Active diet plan not found'
      });
      return;
    }

    await prisma.userActiveDietPlan.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Active diet plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting active diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
