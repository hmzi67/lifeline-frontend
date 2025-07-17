import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '@/types/middlewareTypes';
import { AppError } from './errorHandler';

const authorize = (requiredRoles: string[] = [], requiredPermissions: string[] = []) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError('Authentication required', 401, 'AUTHENTICATION_REQUIRED'));
        }

        const hasRequiredRole = requiredRoles.length === 0 ||
            requiredRoles.includes(req.user.role);

        const hasRequiredPermissions = requiredPermissions.length === 0 ||
            requiredPermissions.every(permission =>
                req.user?.permissions?.includes(permission)
            );

        if (!hasRequiredRole || !hasRequiredPermissions) {
            return next(new AppError('Insufficient permissions', 403, 'INSUFFICIENT_PERMISSIONS'));
        }

        next();
    };
};

export default authorize;