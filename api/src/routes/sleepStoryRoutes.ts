import { Router } from 'express';
import {
  createSleepStory,
  getSleepStories,
  getSleepStoryById,
  updateSleepStory,
  deleteSleepStory,
} from '../controllers/sleepStoryController.js';

const router = Router();

router.get('/', getSleepStories);
router.get('/:id', getSleepStoryById);
router.post('/', createSleepStory);
router.put('/:id', updateSleepStory);
router.delete('/:id', deleteSleepStory);

export default router;
