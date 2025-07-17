import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '@/types/middlewareTypes';
import { AppError } from './errorHandler';

const authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return next(new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

        // You can add user lookup from database here
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            permissions: decoded.permissions || []
        };

        next();
    } catch (error) {
        next(new AppError('Invalid or expired token', 401, 'INVALID_TOKEN'));
    }
};

export default authenticate;