import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all exercise plans
export const getAllExercisePlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercisePlans = await prisma.exercisePlan.findMany({
      include: {
        exercisePlanWeeks: {
          include: {
            exercisePlanSchedule: {
              include: {
                exercise: true
              }
            }
          }
        },
        userActiveExercisePlan: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: exercisePlans,
      message: 'Exercise plans retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching exercise plans:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get exercise plan by ID
export const getExercisePlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const exercisePlan = await prisma.exercisePlan.findUnique({
      where: { id },
      include: {
        exercisePlanWeeks: {
          include: {
            exercisePlanSchedule: {
              include: {
                exercise: true
              },
              orderBy: {
                orderIndex: 'asc'
              }
            }
          },
          orderBy: {
            weekNumber: 'asc'
          }
        }
      }
    });

    if (!exercisePlan) {
      res.status(404).json({
        success: false,
        message: 'Exercise plan not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: exercisePlan,
      message: 'Exercise plan retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching exercise plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create exercise plan
export const createExercisePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, level, durationWeeks } = req.body;

    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Exercise plan name is required'
      });
      return;
    }

    const exercisePlan = await prisma.exercisePlan.create({
      data: {
        name,
        description: description || null,
        image: image || null,
        level: level || null,
        durationWeeks: durationWeeks || null
      }
    });

    res.status(201).json({
      success: true,
      data: exercisePlan,
      message: 'Exercise plan created successfully'
    });
  } catch (error) {
    console.error('Error creating exercise plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update exercise plan
export const updateExercisePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, image, level, durationWeeks } = req.body;

    const existingPlan = await prisma.exercisePlan.findUnique({
      where: { id }
    });

    if (!existingPlan) {
      res.status(404).json({
        success: false,
        message: 'Exercise plan not found'
      });
      return;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (level !== undefined) updateData.level = level;
    if (durationWeeks !== undefined) updateData.durationWeeks = durationWeeks;

    const exercisePlan = await prisma.exercisePlan.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      data: exercisePlan,
      message: 'Exercise plan updated successfully'
    });
  } catch (error) {
    console.error('Error updating exercise plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete exercise plan
export const deleteExercisePlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingPlan = await prisma.exercisePlan.findUnique({
      where: { id }
    });

    if (!existingPlan) {
      res.status(404).json({
        success: false,
        message: 'Exercise plan not found'
      });
      return;
    }

    await prisma.exercisePlan.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Exercise plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting exercise plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
