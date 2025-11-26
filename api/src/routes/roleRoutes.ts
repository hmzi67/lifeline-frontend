import { Router } from 'express';
import {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
} from '../controllers/roleController.js';

const router = Router();

// GET /api/roles - Get all roles
router.get('/', getAllRoles);

// GET /api/roles/:id - Get role by ID
router.get('/:id', getRoleById);

// POST /api/roles - Create new role
router.post('/', createRole);

// PUT /api/roles/:id - Update role
router.put('/:id', updateRole);

// DELETE /api/roles/:id - Delete role
router.delete('/:id', deleteRole);

export default router;
