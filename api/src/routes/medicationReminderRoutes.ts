import { Router } from 'express';
import {
  getMedicationReminders,
  getUserMedicationReminders,
  getMedicationReminderById,
  createMedicationReminder,
  updateMedicationReminder,
  toggleMedicationReminder,
  deleteMedicationReminder
} from '../controllers/medicationReminderController.js';

const router = Router();

// GET /api/medication-reminders/medication/:medicationId - Get reminders for a medication
router.get('/medication/:medicationId', getMedicationReminders);

// GET /api/medication-reminders/user/:userId - Get user's all medication reminders
router.get('/user/:userId', getUserMedicationReminders);

// GET /api/medication-reminders/:id - Get reminder by ID
router.get('/:id', getMedicationReminderById);

// POST /api/medication-reminders - Create medication reminder
router.post('/', createMedicationReminder);

// PUT /api/medication-reminders/:id - Update medication reminder
router.put('/:id', updateMedicationReminder);

// PUT /api/medication-reminders/:id/toggle - Toggle reminder enabled status
router.put('/:id/toggle', toggleMedicationReminder);

// DELETE /api/medication-reminders/:id - Delete medication reminder
router.delete('/:id', deleteMedicationReminder);

export default router;
