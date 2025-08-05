import { Router, Request, Response } from 'express';
import { validateRequest, authenticate, authorize, asyncHandler } from '@/middleware';
import { createUserSchema, updateUserSchema } from '@/validators/userSchema';
import { AuthenticatedRequest } from '@/types/middlewareTypes';

const router = Router();

// Public route - no authentication required
router.post(
  '/',
  validateRequest(createUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    // Create user logic here
    res.status(201).json({ success: true, message: 'User created successfully' });
  })
);

// Protected route - authentication required
router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    // Type assertion since authenticate middleware adds user to req
    const authReq = req as AuthenticatedRequest;
    res.json({ success: true, user: authReq.user });
  })
);

// Protected route with validation
router.put(
  '/:id',
  authenticate,
  validateRequest(updateUserSchema),
  asyncHandler(async (req: Request, res: Response) => {
    // Type assertion since authenticate middleware adds user to req
    const authReq = req as AuthenticatedRequest;
    const userId = req.params.id;
    res.json({ success: true, message: 'User updated successfully', userId, user: authReq.user });
  })
);

// Admin only route
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  asyncHandler(async (req: Request, res: Response) => {
    // Type assertion since authenticate middleware adds user to req
    const authReq = req as AuthenticatedRequest;
    const userId = req.params.id;
    res.json({ success: true, message: 'User deleted successfully', userId, user: authReq.user });
  })
);

export default router;
