import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();
const userController = new UserController();

// Protected routes
router.use(authenticateToken);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.delete('/profile', userController.deleteProfile);
router.post('/upload-avatar', userController.uploadAvatar);

export default router;
