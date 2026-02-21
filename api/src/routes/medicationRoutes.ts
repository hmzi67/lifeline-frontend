import { Router } from 'express';
import {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication,
  deleteMedication,
  getUserMedications
} from '../controllers/medicationController.js';

const router = Router();

// Get all medications for the authenticated user
router.get('/user', getUserMedications);

// Get all medications
router.get('/', getMedications);

// Get a specific medication by ID
router.get('/:id', getMedicationById);

// Create a new medication
router.post('/', createMedication);

// Update a medication
router.put('/:id', updateMedication);

// Delete a medication
router.delete('/:id', deleteMedication);

export default router;