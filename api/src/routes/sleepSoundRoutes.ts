import { Router } from 'express';
import {
  createSleepSound,
  getSleepSounds,
  getSleepSoundById,
  updateSleepSound,
  deleteSleepSound,
} from '../controllers/sleepSoundController.js';

const router = Router();

router.get('/', getSleepSounds);
router.get('/:id', getSleepSoundById);
router.post('/', createSleepSound);
router.put('/:id', updateSleepSound);
router.delete('/:id', deleteSleepSound);

export default router;
