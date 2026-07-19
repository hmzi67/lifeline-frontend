import { Router } from 'express';
import { getDashboardData } from '../controllers/adminDashboardController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const adminDashboardRoutes = Router();

adminDashboardRoutes.get('/', authenticate, authorize(['admin']), getDashboardData);

export default adminDashboardRoutes;
