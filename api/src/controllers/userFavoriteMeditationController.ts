import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get user's favorite meditations
export const getUserFavoriteMeditations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const favorites = await prisma.userFavoriteMeditation.findMany({
      where: { userId },
      include: {
        session: {
          include: {
            meditation: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            username: true
          }
        }
      },
      orderBy: {
        favoritedAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: favorites,
      message: 'Favorite meditations retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching favorite meditations:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Add meditation to favorites
export const addFavoriteMeditation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, sessionId } = req.body;

    if (!userId || !sessionId) {
      res.status(400).json({
        success: false,
        message: 'User ID and session ID are required'
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

    // Verify session exists
    const session = await prisma.meditationSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      res.status(404).json({
        success: false,
        message: 'Meditation session not found'
      });
      return;
    }

    // Check if already favorited
    const existingFavorite = await prisma.userFavoriteMeditation.findFirst({
      where: {
        userId,
        sessionId
      }
    });

    if (existingFavorite) {
      res.status(400).json({
        success: false,
        message: 'Meditation session is already in favorites'
      });
      return;
    }

    const favorite = await prisma.userFavoriteMeditation.create({
      data: {
        userId,
        sessionId,
        favoritedAt: new Date()
      },
      include: {
        session: {
          include: {
            meditation: true
          }
        },
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
      data: favorite,
      message: 'Meditation added to favorites successfully'
    });
  } catch (error) {
    console.error('Error adding favorite meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Remove meditation from favorites
export const removeFavoriteMeditation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existingFavorite = await prisma.userFavoriteMeditation.findUnique({
      where: { id }
    });

    if (!existingFavorite) {
      res.status(404).json({
        success: false,
        message: 'Favorite meditation not found'
      });
      return;
    }

    await prisma.userFavoriteMeditation.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Meditation removed from favorites successfully'
    });
  } catch (error) {
    console.error('Error removing favorite meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Check if meditation is favorited
export const checkFavoriteMeditation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, sessionId } = req.params;

    const favorite = await prisma.userFavoriteMeditation.findFirst({
      where: {
        userId,
        sessionId
      }
    });

    res.status(200).json({
      success: true,
      data: {
        isFavorited: !!favorite,
        favorite: favorite || null
      },
      message: 'Favorite status retrieved successfully'
    });
  } catch (error) {
    console.error('Error checking favorite meditation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
