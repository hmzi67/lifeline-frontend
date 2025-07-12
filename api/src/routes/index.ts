import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import healthRoutes from './health.js';

const router = Router();

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/health', healthRoutes);

export default router;
