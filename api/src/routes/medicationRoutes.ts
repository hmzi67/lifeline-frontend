import { Router } from 'express';
import {
    createMedication,
    deleteMedication,
    getMedicationById,
    getMedications,
    getUserMedications,
    updateMedication
} from '../controllers/medicationController.js';
import authenticate from '../middleware/authenticate.js';
import { mediaUpload } from '../middleware/upload.js';

const router = Router();

// Get all medications for the authenticated user
router.get('/user', authenticate, getUserMedications);

// Get all medications
router.get('/', authenticate, getMedications);

// Get a specific medication by ID
router.get('/:id', authenticate, getMedicationById);

// Create a new medication
router.post('/', authenticate, mediaUpload.single('file'), createMedication);

// Update a medication
router.put('/:id', authenticate, mediaUpload.single('file'), updateMedication);

// Delete a medication
router.delete('/:id', authenticate, deleteMedication);

export default router;