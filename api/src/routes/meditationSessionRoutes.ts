import { Router } from 'express';
import {
  getMeditationSessions,
  getMeditationSessionById,
  createMeditationSession,
  updateMeditationSession,
  deleteMeditationSession
} from '../controllers/meditationSessionController.js';

const router = Router();

// GET /api/meditation-sessions/meditation/:meditationId - Get all sessions for a meditation
router.get('/meditation/:meditationId', getMeditationSessions);

// GET /api/meditation-sessions/:id - Get session by ID
router.get('/:id', getMeditationSessionById);

// POST /api/meditation-sessions - Create meditation session
router.post('/', createMeditationSession);

// PUT /api/meditation-sessions/:id - Update meditation session
router.put('/:id', updateMeditationSession);

// DELETE /api/meditation-sessions/:id - Delete meditation session
router.delete('/:id', deleteMeditationSession);

export default router;
