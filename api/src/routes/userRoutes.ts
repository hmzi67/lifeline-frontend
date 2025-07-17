import { Router } from 'express';
import { validateRequest, authenticate, authorize, asyncHandler } from '@/middleware';
import { createUserSchema, updateUserSchema } from '@/validators/userSchema';

const router = Router();

// Public route - no authentication required
router.post('/', validateRequest(createUserSchema), asyncHandler(async (req, res) => {
    // Create user logic here
    res.status(201).json({ success: true, message: 'User created successfully' });
}));

// Protected route - authentication required
router.get('/profile', authenticate, asyncHandler(async (req, res) => {
    // Get user profile logic here
    res.json({ success: true, user: req });
}));

// Protected route with validation
router.put('/:id',
    authenticate,
    validateRequest(updateUserSchema),
    asyncHandler(async (req, res) => {
        // Update user logic here
        res.json({ success: true, message: 'User updated successfully' });
    })
);

// Admin only route
router.delete('/:id',
    authenticate,
    authorize(['admin']),
    asyncHandler(async (req, res) => {
        // Delete user logic here
        res.json({ success: true, message: 'User deleted successfully' });
    })
);

export default router;