import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { AppError } from './errorHandler.js';

export const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error: any) => ({
        field: error.param,
        message: error.msg,
        value: error.value,
      }));

      res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errorMessages,
        },
      });
      return;
    }

    next();
  };
};
