import { Request, Response, NextFunction } from 'express';
import { checkDatabaseHealth } from '../config/database.js';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

export class HealthController {
  checkHealth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const health = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        memoryUsage: process.memoryUsage(),
      };

      const response: ApiResponse<typeof health> = {
        success: true,
        data: health,
        message: 'Service is healthy',
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  checkDatabase = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isHealthy = await checkDatabaseHealth();

      const response: ApiResponse<{ database: string }> = {
        success: true,
        data: { database: isHealthy ? 'Connected' : 'Disconnected' },
        message: isHealthy ? 'Database is healthy' : 'Database connection failed',
      };

      res.status(isHealthy ? 200 : 503).json(response);
    } catch (error) {
      next(error);
    }
  };
}
