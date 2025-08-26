import { Router } from 'express';
import {
  createSleepLog,
  getUserSleepLogs,
  getSleepLogById,
  updateSleepLog,
  deleteSleepLog,
  getSleepStats,
  getSleepQuality,
} from '../controllers/sleepLogController.js';

const sleepRoutes = Router();

// CRUD operations
sleepRoutes.post('/', createSleepLog);
sleepRoutes.get('/', getUserSleepLogs);
sleepRoutes.get('/stats', getSleepStats);
sleepRoutes.get('/quality', getSleepQuality);
sleepRoutes.get('/:id', getSleepLogById);
sleepRoutes.put('/:id', updateSleepLog);
sleepRoutes.delete('/:id', deleteSleepLog);

export default sleepRoutes;