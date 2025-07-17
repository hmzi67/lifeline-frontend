import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
    code?: string;
    details?: any;
}

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
        permissions?: string[];
    };
}

export interface RequestWithId extends Request {
    id: string;
}

export type AsyncMiddleware = (
    req: Request | AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => Promise<void>;

export type Middleware = (
    req: Request | AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => void;