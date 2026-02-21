import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Helper function to get userId from token
const getUserIdFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
    };
    return decoded.userId;
  } catch {
    return null;
  }
};

// Create a new sleep log
export const createSleepLog = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { date, timeStart, timeEnd } = req.body;

    // Validate required fields
    if (!date || !timeStart || !timeEnd) {
      return res.status(400).json({
        success: false,
        message: 'Date, start time, and end time are required',
      });
    }

    const sleepLog = await prisma.sleepLog.create({
      data: {
        userId,
        date: new Date(date),
        timeStart: new Date(`1970-01-01T${timeStart}`),
        timeEnd: new Date(`1970-01-01T${timeEnd}`),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: { sleepLog },
      message: 'Sleep log created successfully',
    });
  } catch (error) {
    console.error('Create sleep log error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create sleep log',
    });
  }
};

// Get all sleep logs for the authenticated user
export const getUserSleepLogs = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const {
      page = '1',
      limit = '10',
      startDate,
      endDate,
      sortBy = 'date',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = { userId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.date.lte = new Date(endDate as string);
      }
    }

    const totalLogs = await prisma.sleepLog.count({ where });

    const sleepLogs = await prisma.sleepLog.findMany({
      where,
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc',
      },
      skip,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalLogs / limitNum);

    res.status(200).json({
      success: true,
      data: {
        sleepLogs,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalLogs,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get user sleep logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sleep logs',
    });
  }
};

// Get a single sleep log by ID
export const getSleepLogById = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;

    const sleepLog = await prisma.sleepLog.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        userDailyRoutines: true,
      },
    });

    if (!sleepLog) {
      return res.status(404).json({
        success: false,
        message: 'Sleep log not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { sleepLog },
    });
  } catch (error) {
    console.error('Get sleep log by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sleep log',
    });
  }
};

// Update a sleep log
export const updateSleepLog = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;
    const { date, timeStart, timeEnd } = req.body;

    // Check if the sleep log exists and belongs to the user
    const existingLog = await prisma.sleepLog.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        message: 'Sleep log not found',
      });
    }

    const data: any = {};
    if (date) data.date = new Date(date);
    if (timeStart) data.timeStart = new Date(`1970-01-01T${timeStart}`);
    if (timeEnd) data.timeEnd = new Date(`1970-01-01T${timeEnd}`);

    const sleepLog = await prisma.sleepLog.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: { sleepLog },
      message: 'Sleep log updated successfully',
    });
  } catch (error) {
    console.error('Update sleep log error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update sleep log',
    });
  }
};

// Delete a sleep log
export const deleteSleepLog = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { id } = req.params;

    // Check if the sleep log exists and belongs to the user
    const existingLog = await prisma.sleepLog.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        message: 'Sleep log not found',
      });
    }

    await prisma.sleepLog.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Sleep log deleted successfully',
    });
  } catch (error) {
    console.error('Delete sleep log error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete sleep log',
    });
  }
};

// Get sleep statistics for the user
export const getSleepStats = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { startDate, endDate } = req.query;

    const where: any = { userId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate as string);
      }
      if (endDate) {
        where.date.lte = new Date(endDate as string);
      }
    }

    const totalLogs = await prisma.sleepLog.count({ where });

    const logs = await prisma.sleepLog.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    // Calculate average sleep duration
    let totalDuration = 0;
    logs.forEach(log => {
      if (log.timeStart && log.timeEnd) {
        const start = log.timeStart.getTime();
        const end = log.timeEnd.getTime();
        let duration = end - start;
        
        // Handle case where sleep crosses midnight
        if (duration < 0) {
          duration += 24 * 60 * 60 * 1000; // Add 24 hours
        }
        
        totalDuration += duration;
      }
    });

    const averageDuration = totalLogs > 0 ? totalDuration / totalLogs : 0;
    const averageHours = averageDuration / (1000 * 60 * 60);

    res.status(200).json({
      success: true,
      data: {
        totalLogs,
        averageSleepHours: averageHours.toFixed(2),
        dateRange: {
          startDate: startDate || 'All time',
          endDate: endDate || 'Present',
        },
      },
    });
  } catch (error) {
    console.error('Get sleep stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sleep statistics',
    });
  }
};

// Get sleep quality analysis
export const getSleepQuality = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { days = '7' } = req.query;
    const daysNum = parseInt(days as string, 10);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysNum);

    const logs = await prisma.sleepLog.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'desc' },
    });

    // Analyze sleep patterns
    const analysis = logs.map(log => {
      if (!log.timeStart || !log.timeEnd) return null;

      const start = log.timeStart.getTime();
      const end = log.timeEnd.getTime();
      let duration = end - start;

      // Handle case where sleep crosses midnight
      if (duration < 0) {
        duration += 24 * 60 * 60 * 1000;
      }

      const hours = duration / (1000 * 60 * 60);

      let quality = 'Poor';
      if (hours >= 7 && hours <= 9) {
        quality = 'Good';
      } else if (hours >= 6 && hours < 7) {
        quality = 'Fair';
      }

      return {
        date: log.date,
        duration: hours.toFixed(2),
        quality,
      };
    }).filter(Boolean);

    res.status(200).json({
      success: true,
      data: {
        analysis,
        period: `Last ${daysNum} days`,
      },
    });
  } catch (error) {
    console.error('Get sleep quality error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze sleep quality',
    });
  }
};