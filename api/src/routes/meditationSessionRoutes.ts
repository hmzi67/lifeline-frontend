import { Router } from 'express';
import {
    createMeditationSession,
    deleteMeditationSession,
    getMeditationSessionById,
    getMeditationSessions,
    updateMeditationSession
} from '../controllers/meditationSessionController.js';
import authenticate from '../middleware/authenticate.js';

const router = Router();

// GET /api/meditation-sessions/meditation/:meditationId - Get all sessions for a meditation
router.get('/meditation/:meditationId', authenticate, getMeditationSessions);

// GET /api/meditation-sessions/:id - Get session by ID
router.get('/:id', authenticate, getMeditationSessionById);

// POST /api/meditation-sessions - Create meditation session
router.post('/', authenticate, createMeditationSession);

// PUT /api/meditation-sessions/:id - Update meditation session
router.put('/:id', authenticate, updateMeditationSession);

// DELETE /api/meditation-sessions/:id - Delete meditation session
router.delete('/:id', authenticate, deleteMeditationSession);

export default router;
