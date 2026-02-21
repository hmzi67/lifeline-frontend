import { Router } from 'express';
import {
  createMeditation,
  getMeditations,
  getMeditationById,
  updateMeditation,
  deleteMeditation,
  getMeditationsByType
} from '../controllers/meditationController.js';

const router = Router();

// Public routes (no authentication required for viewing meditations)
router.get('/', getMeditations);
router.get('/type/:type', getMeditationsByType);
router.get('/:id', getMeditationById);

// Protected routes (require authentication for admin operations)
router.post('/', createMeditation);
router.put('/:id', updateMeditation);
router.delete('/:id', deleteMeditation);

export default router;