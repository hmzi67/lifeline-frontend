import { Router } from 'express';
import { authenticate } from '../middleware/index.js';
import {
  deleteUser,
  getCurrentUser,
  updateUser,
  getAllUsers,
  getUserStats,
  getUserWithRelations,
} from '@controllers/userController';

const userRoute = Router();

// Regular user routes
userRoute.get('/profile',  getCurrentUser);
userRoute.put('/profile/:id',  updateUser);
userRoute.delete('/profile/:id', deleteUser);

// Admin-only routes
userRoute.get('/admin/users',  getAllUsers);
userRoute.get('/admin/stats',  getUserStats);
userRoute.get('/admin/users/:id',  getUserWithRelations);

// Admin can update any user
userRoute.put('/admin/users/:id',  updateUser);

// Admin can delete any user
userRoute.delete('/admin/users/:id',  deleteUser);

export default userRoute;

// Admin-only route
// router.delete(
//   '/:id',
//   authenticate,
//   authorize(['admin']),
//  );
