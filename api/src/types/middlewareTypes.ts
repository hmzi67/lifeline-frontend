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
    isEmailVerified?: boolean;
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

// Type for authenticated route handlers
export type AuthenticatedHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any> | any;
