import { Router } from 'express';
import {
    createSleepLog,
    deleteSleepLog,
    getSleepLogById,
    getSleepQuality,
    getSleepStats,
    getUserSleepLogs,
    updateSleepLog,
} from '../controllers/sleepLogController.js';
import authenticate from '../middleware/authenticate.js';

const sleepRoutes = Router();

// CRUD operations
sleepRoutes.post('/', authenticate, createSleepLog);
sleepRoutes.get('/', authenticate, getUserSleepLogs);
sleepRoutes.get('/stats', authenticate, getSleepStats);
sleepRoutes.get('/quality', authenticate, getSleepQuality);
sleepRoutes.get('/:id', authenticate, getSleepLogById);
sleepRoutes.put('/:id', authenticate, updateSleepLog);
sleepRoutes.delete('/:id', authenticate, deleteSleepLog);

export default sleepRoutes;