import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

interface DietPlanQuery {
  query?: string;
  calories?: string;
  duration?: string;
}

interface CreateDietPlanBody {
  name: string;
  calories?: number;
  duration?: string;
  description?: string;
  image?: string;
}

interface UpdateDietPlanBody {
  name?: string;
  calories?: number;
  duration?: string;
  description?: string;
  image?: string;
}

// Get all diet plans
export const getAllDietPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const dietPlans = await prisma.dietPlan.findMany({
      include: {
        userDietPlans: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true
              }
            }
          }
        },
        challengeDiets: {
          include: {
            challenge: {
              select: {
                id: true,
                name: true,
                status: true
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: dietPlans,
      message: 'Diet plans retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching diet plans:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get diet plan by ID
export const getDietPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const dietPlan = await prisma.dietPlan.findUnique({
      where: { id },
      include: {
        userDietPlans: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true
              }
            }
          }
        },
        challengeDiets: {
          include: {
            challenge: {
              select: {
                id: true,
                name: true,
                status: true
              }
            }
          }
        }
      }
    });

    if (!dietPlan) {
      res.status(404).json({
        success: false,
        message: 'Diet plan not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: dietPlan,
      message: 'Diet plan retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create new diet plan
export const createDietPlan = async (req: Request<{}, {}, CreateDietPlanBody>, res: Response): Promise<void> => {
  try {
    const { name, calories, duration, description, image } = req.body;

    // Validation
    if (!name) {
      res.status(400).json({
        success: false,
        message: 'Diet plan name is required'
      });
      return;
    }

    const dietPlan = await prisma.dietPlan.create({
      data: {
        name,
        calories: calories || null,
        duration: duration || null,
        description: description || null,
        image: image || null
      }
    });

    res.status(201).json({
      success: true,
      data: dietPlan,
      message: 'Diet plan created successfully'
    });
  } catch (error) {
    console.error('Error creating diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update diet plan
export const updateDietPlan = async (req: Request<{ id: string }, {}, UpdateDietPlanBody>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, calories, duration, description, image } = req.body;

    // Check if diet plan exists
    const existingDietPlan = await prisma.dietPlan.findUnique({
      where: { id }
    });

    if (!existingDietPlan) {
      res.status(404).json({
        success: false,
        message: 'Diet plan not found'
      });
      return;
    }

    const updateData: Partial<CreateDietPlanBody> = {};
    if (name !== undefined) updateData.name = name;
    if (calories !== undefined) updateData.calories = calories;
    if (duration !== undefined) updateData.duration = duration;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;

    const updatedDietPlan = await prisma.dietPlan.update({
      where: { id },
      data: updateData
    });

    res.status(200).json({
      success: true,
      data: updatedDietPlan,
      message: 'Diet plan updated successfully'
    });
  } catch (error) {
    console.error('Error updating diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete diet plan
export const deleteDietPlan = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if diet plan exists
    const existingDietPlan = await prisma.dietPlan.findUnique({
      where: { id }
    });

    if (!existingDietPlan) {
      res.status(404).json({
        success: false,
        message: 'Diet plan not found'
      });
      return;
    }

    await prisma.dietPlan.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Diet plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting diet plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Search diet plans
export const searchDietPlans = async (req: Request<{}, {}, {}, DietPlanQuery>, res: Response): Promise<void> => {
  try {
    const { query, calories, duration } = req.query;

    const whereClause: any = {};

    if (query) {
      whereClause.name = {
        contains: query,
        mode: 'insensitive'
      };
    }

    if (calories) {
      whereClause.calories = parseInt(calories);
    }

    if (duration) {
      whereClause.duration = duration;
    }

    const dietPlans = await prisma.dietPlan.findMany({
      where: whereClause,
      include: {
        userDietPlans: {
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
      data: dietPlans,
      message: 'Diet plans search completed successfully'
    });
  } catch (error) {
    console.error('Error searching diet plans:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};