import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

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
                firstName: true,
                lastName: true,
                role: true,
                isEmailVerified: true,
                profileImage: true,
                dateOfBirth: true,
                gender: true,
                height: true,
                weight: true,
                activityLevel: true,
                createdAt: true,
                updatedAt: true,
                preferences: true,
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
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...req.body,
            },
        });
        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Failed to update user',
        })
    }
}
export const deleteUser = () => {}