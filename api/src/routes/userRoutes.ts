import { NextFunction, Request, Response, Router } from 'express';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getCurrentUser,
    getUserSettings,
    getUserStats,
    getUserWithRelations,
    registerPushToken,
    updateUser,
    updateUserSettings,
} from '../controllers/userController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import { mediaUpload, getMediaCategory } from '../middleware/upload.js';
import { AuthenticatedRequest } from '../types/middlewareTypes.js';

const userRoute = Router();

// Middleware to ensure a user can only modify their own profile
const checkProfileOwnership = (req: Request, res: Response, next: NextFunction) => {
    const authUser = (req as AuthenticatedRequest).user;
    if (authUser && req.params.id !== authUser.id) {
        return res.status(403).json({
            success: false,
            message: 'Forbidden: You can only modify your own profile',
        });
    }
    next();
};

// Regular user routes
userRoute.get('/profile', authenticate, getCurrentUser);
userRoute.put('/profile/:id', authenticate, checkProfileOwnership, mediaUpload.single('file'), updateUser);
userRoute.delete('/profile/:id', authenticate, checkProfileOwnership, deleteUser);
userRoute.get('/settings', authenticate, getUserSettings);
userRoute.put('/settings', authenticate, updateUserSettings);
userRoute.post('/push-token', authenticate, registerPushToken);

// Admin-only routes
userRoute.get('/admin/users', authenticate, authorize(['admin']), getAllUsers);
userRoute.get('/admin/stats', authenticate, authorize(['admin']), getUserStats);
userRoute.get('/admin/users/:id', authenticate, authorize(['admin']), getUserWithRelations);
userRoute.put('/admin/users/:id', authenticate, authorize(['admin']), mediaUpload.single('file'), updateUser);
userRoute.post('/admin/users', authenticate, authorize(['admin']), createUser);
userRoute.delete('/admin/users/:id', authenticate, authorize(['admin']), deleteUser);

export default userRoute;
