import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

const timeout = (timeoutMs: number = 30000) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const timeoutId = setTimeout(() => {
            if (!res.headersSent) {
                next(new AppError('Request timeout', 408, 'REQUEST_TIMEOUT'));
            }
        }, timeoutMs);

        res.on('finish', () => {
            clearTimeout(timeoutId);
        });

        res.on('close', () => {
            clearTimeout(timeoutId);
        });

        next();
    };
};

export default timeout;