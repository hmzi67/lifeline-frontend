import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMeditation = async (req: Request, res: Response) => {
  try {
    const { name, type, soundUrl } = req.body;

    if (!name || !type || !soundUrl) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and soundUrl are required'
      });
    }

    const meditation = await prisma.meditation.create({
      data: {
        name,
        type,
        soundUrl
      }
    });

    res.status(201).json({
      success: true,
      data: meditation,
      message: 'Meditation created successfully'
    });
  } catch (error) {
    console.error('Error creating meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create meditation'
    });
  }
};

export const getMeditations = async (req: Request, res: Response) => {
  try {
    const { type, limit, offset } = req.query;
    
    const where = type ? { type: type as string } : {};
    const take = limit ? parseInt(limit as string) : undefined;
    const skip = offset ? parseInt(offset as string) : undefined;

    const meditations = await prisma.meditation.findMany({
      where,
      take,
      skip,
      orderBy: {
        name: 'asc'
      }
    });

    const total = await prisma.meditation.count({ where });
    
    res.json({
      success: true,
      data: meditations,
      count: meditations.length,
      total
    });
  } catch (error) {
    console.error('Error fetching meditations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meditations'
    });
  }
};

export const getMeditationsByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    const meditations = await prisma.meditation.findMany({
      where: {
        type
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    res.json({
      success: true,
      data: meditations,
      count: meditations.length
    });
  } catch (error) {
    console.error('Error fetching meditations by type:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meditations by type'
    });
  }
};

export const getMeditationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const meditation = await prisma.meditation.findUnique({
      where: {
        id
      },
      include: {
        userDailyRoutines: {
          select: {
            id: true,
            userId: true,
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
    
    if (!meditation) {
      return res.status(404).json({
        success: false,
        message: 'Meditation not found'
      });
    }

    res.json({
      success: true,
      data: meditation
    });
  } catch (error) {
    console.error('Error fetching meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meditation'
    });
  }
};

export const updateMeditation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, type, soundUrl } = req.body;

    // Check if meditation exists
    const existingMeditation = await prisma.meditation.findUnique({
      where: { id }
    });
    
    if (!existingMeditation) {
      return res.status(404).json({
        success: false,
        message: 'Meditation not found'
      });
    }

    const meditation = await prisma.meditation.update({
      where: { id },
      data: {
        name: name || existingMeditation.name,
        type: type || existingMeditation.type,
        soundUrl: soundUrl || existingMeditation.soundUrl
      }
    });

    res.json({
      success: true,
      data: meditation,
      message: 'Meditation updated successfully'
    });
  } catch (error) {
    console.error('Error updating meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update meditation'
    });
  }
};

export const deleteMeditation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if meditation exists
    const existingMeditation = await prisma.meditation.findUnique({
      where: { id }
    });
    
    if (!existingMeditation) {
      return res.status(404).json({
        success: false,
        message: 'Meditation not found'
      });
    }

    // Check if meditation is being used in user daily routines
    const usageCount = await prisma.userDailyRoutine.count({
      where: { meditationId: id }
    });

    if (usageCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete meditation. It is being used in ${usageCount} user daily routines.`
      });
    }

    await prisma.meditation.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Meditation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete meditation'
    });
  }
};