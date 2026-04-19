import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class UserDailyRoutineController {
  // Create a new user daily routine
  static async createUserDailyRoutine(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        fastingId,
        sleepId,
        medicationId,
        meditationId,
        waterId,
        routinesDate,
      } = req.body;

      const userDailyRoutine = await prisma.userDailyRoutine.create({
        data: {
          userId,
          fastingId,
          sleepId,
          medicationId,
          meditationId,
          waterId,
          routinesDate: routinesDate ? new Date(routinesDate) : undefined,
        },
        include: {
          user: true,
          fasting: true,
          sleep: true,
          medication: true,
          meditation: true,
          water: true
        }
      });

      res.status(201).json({
        success: true,
        message: 'User daily routine created successfully',
        data: userDailyRoutine
      });
    } catch (error) {
      console.error('Error creating user daily routine:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get all user daily routines
  static async getAllUserDailyRoutines(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, userId } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const where = userId ? { userId: String(userId) } : {};

      const [userDailyRoutines, total] = await Promise.all([
        prisma.userDailyRoutine.findMany({
          where,
          skip,
          take: Number(limit),
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true
              }
            },
            fasting: true,
            sleep: true,
            medication: true,
            meditation: true,
            water: true
          },
          orderBy: {
            id: 'desc'
          }
        }),
        prisma.userDailyRoutine.count({ where })
      ]);

      res.status(200).json({
        success: true,
        message: 'User daily routines retrieved successfully',
        data: userDailyRoutines,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalItems: total,
          itemsPerPage: Number(limit)
        }
      });
    } catch (error) {
      console.error('Error getting user daily routines:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get user daily routine by ID
  static async getUserDailyRoutineById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const userDailyRoutine = await prisma.userDailyRoutine.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true
            }
          },
          fasting: true,
          sleep: true,
          medication: true,
          meditation: true,
          water: true
        }
      });

      if (!userDailyRoutine) {
        res.status(404).json({
          success: false,
          message: 'User daily routine not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User daily routine retrieved successfully',
        data: userDailyRoutine
      });
    } catch (error) {
      console.error('Error getting user daily routine:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update user daily routine
  static async updateUserDailyRoutine(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        userId,
        fastingId,
        sleepId,
        medicationId,
        meditationId,
        waterId,
        routinesDate,
      } = req.body;

      const existingRoutine = await prisma.userDailyRoutine.findUnique({
        where: { id }
      });

      if (!existingRoutine) {
        res.status(404).json({
          success: false,
          message: 'User daily routine not found'
        });
        return;
      }

      const updatedUserDailyRoutine = await prisma.userDailyRoutine.update({
        where: { id },
        data: {
          userId,
          fastingId,
          sleepId,
          medicationId,
          meditationId,
          waterId,
          routinesDate: routinesDate ? new Date(routinesDate) : undefined,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true
            }
          },
          fasting: true,
          sleep: true,
          medication: true,
          meditation: true,
          water: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'User daily routine updated successfully',
        data: updatedUserDailyRoutine
      });
    } catch (error) {
      console.error('Error updating user daily routine:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete user daily routine
  static async deleteUserDailyRoutine(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const existingRoutine = await prisma.userDailyRoutine.findUnique({
        where: { id }
      });

      if (!existingRoutine) {
        res.status(404).json({
          success: false,
          message: 'User daily routine not found'
        });
        return;
      }

      await prisma.userDailyRoutine.delete({
        where: { id }
      });

      res.status(200).json({
        success: true,
        message: 'User daily routine deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user daily routine:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get user daily routines by user ID
  static async getUserDailyRoutinesByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const [userDailyRoutines, total] = await Promise.all([
        prisma.userDailyRoutine.findMany({
          where: { userId },
          skip,
          take: Number(limit),
          include: {
            fasting: true,
            sleep: true,
            medication: true,
            meditation: true,
            water: true
          },
          orderBy: {
            id: 'desc'
          }
        }),
        prisma.userDailyRoutine.count({ where: { userId } })
      ]);

      res.status(200).json({
        success: true,
        message: 'User daily routines retrieved successfully',
        data: userDailyRoutines,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / Number(limit)),
          totalItems: total,
          itemsPerPage: Number(limit)
        }
      });
    } catch (error) {
      console.error('Error getting user daily routines by user ID:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}