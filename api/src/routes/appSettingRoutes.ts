import { Router } from 'express';
import { AppSettingController } from '../controllers/appSettingController';

const router = Router();

// Create a new app setting
router.post('/', AppSettingController.createAppSetting);

// Get all app settings with optional pagination and filtering
router.get('/', AppSettingController.getAllAppSettings);

// Bulk upsert app settings
router.post('/bulk-upsert', AppSettingController.bulkUpsertAppSettings);

// Get app setting by ID
router.get('/:id', AppSettingController.getAppSettingById);

// Update app setting by ID
router.put('/:id', AppSettingController.updateAppSetting);

// Delete app setting by ID
router.delete('/:id', AppSettingController.deleteAppSetting);

// Get app setting by key (with optional scope query parameter)
router.get('/key/:key', AppSettingController.getAppSettingByKey);

// Get app settings by scope
router.get('/scope/:scope', AppSettingController.getAppSettingsByScope);

export default router;