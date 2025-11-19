import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as {
      userId: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        googleId: true,
        profileImage: true,
        isEmailVerified: true,
        subject: true,
        status: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        questionnaires: {
          select: {
            id: true,
            gender: true,
            goal: true,
            dietType: true,
            isDiabetic: true,
            allergenFood: true,
            fitnessLevel: true,
            typicalDayType: true,
            physicalLimitations: true,
            bodyFocusArea: true,
            dateOfBirth: true,
            height: true,
            heightUnit: true,
            weight: true,
            weightUnit: true,
            goalWeight: true,
            motivationFor: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

// Admin function to get all users with pagination and filtering
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      search = '',
      status = '',
      role = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause for filtering
    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search as string, mode: 'insensitive' } },
        { username: { contains: search as string, mode: 'insensitive' } },
        { subject: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status as string;
    }

    if (role) {
      where.role = {
        name: { contains: role as string, mode: 'insensitive' },
      };
    }

    // Get total count for pagination
    const totalUsers = await prisma.user.count({ where });

    // Get users with pagination
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        googleId: true,
        profileImage: true,
        isEmailVerified: true,
        subject: true,
        status: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        _count: {
          select: {
            questionnaires: true,
            subscriptionPayments: true,
            userLicenses: true,
          },
        },
      },
      orderBy: {
        [sortBy as string]: sortOrder as 'asc' | 'desc',
      },
      skip,
      take: limitNum,
    });

    const totalPages = Math.ceil(totalUsers / limitNum);

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalUsers,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

// Admin function to get user statistics
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();

    const usersByStatus = await prisma.user.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const usersByRole = await prisma.user.groupBy({
      by: ['roleId'],
      _count: {
        roleId: true,
      },
      // include: {
      //   role: {
      //     select: {
      //       name: true,
      //     },
      //   },
      // },
    });

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
    });

    const verifiedUsers = await prisma.user.count({
      where: {
        isEmailVerified: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        usersByStatus,
        usersByRole,
        recentUsers,
        verifiedUsers,
        verificationRate: totalUsers > 0 ? ((verifiedUsers / totalUsers) * 100).toFixed(2) : 0,
      },
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
    });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // ID is a string (cuid) according to schema, no need for BigInt conversion
    const userId = id;

    const allowedFields = [
      'email',
      'username',
      'profileImage',
      'subject',
      'password',
      'status',
      'roleId',
    ];

    let data: any = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
        data[key] = req.body[key];
      }
    }

    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // roleId is a string according to schema, no need for BigInt conversion
    // Just validate that the role exists if roleId is provided
    if (data.roleId) {
      const roleExists = await prisma.role.findUnique({
        where: { id: data.roleId },
      });

      if (!roleExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role ID provided',
        });
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        googleId: true,
        profileImage: true,
        isEmailVerified: true,
        subject: true,
        status: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (e: any) {
    console.error('Update error:', e);
    if (e.code === 'P2002') {
      // Handle unique constraint violation
      const target = e.meta?.target;
      if (target?.includes('email')) {
        res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      } else if (target?.includes('username')) {
        res.status(400).json({
          success: false,
          message: 'Username already exists',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Username or email already exists',
        });
      }
    } else if (e.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update user',
      });
    }
  }
};

// Admin: create user
export const createUser = async (req: Request, res: Response) => {
  try {
    const allowedFields = [
      'email',
      'username',
      'profileImage',
      'subject',
      'password',
      'status',
      'roleId',
    ];

    let data: any = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined && req.body[key] !== null && req.body[key] !== '') {
        data[key] = req.body[key];
      }
    }

    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    // Validate roleId if provided
    if (data.roleId) {
      const roleExists = await prisma.role.findUnique({
        where: { id: data.roleId },
      });
      if (!roleExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role ID provided',
        });
      }
    }

    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        username: true,
        googleId: true,
        profileImage: true,
        isEmailVerified: true,
        subject: true,
        status: true,
        roleId: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: { user },
      message: 'User created successfully',
    });
  } catch (e: any) {
    console.error('Create user error:', e);
    if (e.code === 'P2002') {
      // Handle unique constraint violation
      const target = e.meta?.target;
      if (target?.includes('email')) {
        res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      } else if (target?.includes('username')) {
        res.status(400).json({
          success: false,
          message: 'Username already exists',
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Username or email already exists',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to create user',
      });
    }
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // ID is a string (cuid) according to schema, no need for BigInt conversion
    const userId = id;

    const user = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        profileImage: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: { user },
      message: 'User deleted successfully',
    });
  } catch (e: any) {
    console.error('Delete user error:', e);
    if (e.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete user',
      });
    }
  }
};

// Additional helper function to get user with all relations
export const getUserWithRelations = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        questionnaires: true,
        authTokens: {
          select: {
            id: true,
            createdAt: true,
            expiresAt: true,
          },
        },
        subscriptionPayments: {
          select: {
            id: true,
            planName: true,
            amount: true,
            status: true,
            createdAt: true,
          },
        },
        userLicenses: {
          include: {
            payment: {
              select: {
                planName: true,
                amount: true,
                status: true,
              },
            },
          },
        },
        userDietPlans: {
          include: {
            diet: true,
          },
        },
        userExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error('Get user with relations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user data',
    });
  }
};
