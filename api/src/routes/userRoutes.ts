import { Router } from 'express';
import { authenticate } from '../middleware/index.js';
import { deleteUser, getCurrentUser, updateUser } from '@controllers/userController';

const userRoute = Router();

userRoute.get('/profile', authenticate, getCurrentUser)
userRoute.put('/profile/:id', authenticate, updateUser)
userRoute.delete('/profile/:id', authenticate, deleteUser)

export default userRoute;


// Admin-only route
// router.delete(
//   '/:id',
//   authenticate,
//   authorize(['admin']),
//  );
