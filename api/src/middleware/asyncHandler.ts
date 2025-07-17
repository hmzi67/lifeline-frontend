import { Request, Response, NextFunction } from 'express';
import { AsyncMiddleware } from '@/types/middlewareTypes';

const asyncHandler = (fn: AsyncMiddleware) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;