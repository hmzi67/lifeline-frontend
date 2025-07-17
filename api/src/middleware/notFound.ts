import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new AppError(
        `Route ${req.originalUrl} not found`,
        404,
        'ROUTE_NOT_FOUND'
    );
    next(error);
};

export default notFound;