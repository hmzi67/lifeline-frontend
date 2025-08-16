import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";
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
            where: { id: BigInt(decoded.userId) },
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
                    }
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
                    }
                }
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
}

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Convert id to BigInt
    const userId = BigInt(id);

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

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data.roleId) {
      data.roleId = BigInt(data.roleId);
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
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (e: any) {
    console.error('Update error:', e);
    if (e.code === 'P2002') {
      res.status(400).json({
        success: false,
        message: 'Username or email already exists',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to update user',
      });
    }
  }
};


// delete user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const userId = BigInt(id);
        
        const user = await prisma.user.delete({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                profileImage: true,
                createdAt: true,
            }
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
}