import { Router } from 'express';
import {
  createFastingLog,
  getUserFastingLogs,
  getFastingLogById,
  updateFastingLog,
  deleteFastingLog,
  getFastingStats,
} from '../controllers/fastingLogController.js';

const fastingRoutes = Router();


// CRUD operations
fastingRoutes.post('/', createFastingLog);
fastingRoutes.get('/', getUserFastingLogs);
fastingRoutes.get('/stats', getFastingStats);
fastingRoutes.get('/:id', getFastingLogById);
fastingRoutes.put('/:id', updateFastingLog);
fastingRoutes.delete('/:id', deleteFastingLog);

export default fastingRoutes;