import { Router } from 'express';
import {
  getUserFavoriteMeditations,
  addFavoriteMeditation,
  removeFavoriteMeditation,
  checkFavoriteMeditation
} from '../controllers/userFavoriteMeditationController.js';

const router = Router();

// GET /api/favorite-meditations/user/:userId - Get user's favorite meditations
router.get('/user/:userId', getUserFavoriteMeditations);

// GET /api/favorite-meditations/check/:userId/:sessionId - Check if meditation is favorited
router.get('/check/:userId/:sessionId', checkFavoriteMeditation);

// POST /api/favorite-meditations - Add meditation to favorites
router.post('/', addFavoriteMeditation);

// DELETE /api/favorite-meditations/:id - Remove meditation from favorites
router.delete('/:id', removeFavoriteMeditation);

export default router;
