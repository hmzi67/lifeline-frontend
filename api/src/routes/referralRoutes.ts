import { Router } from 'express';
import {
  createReferralCode,
  getAllReferralCodes,
  getReferralCodeById,
  updateReferralCode,
  deleteReferralCode,
  validateReferralCode,
  getReferralCodeStats,
} from '../controllers/referralController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

// ─── User Routes (authenticated) ─────────────────────────────────────────────

// POST /api/referral-codes/validate  - validate a referral code before payment
router.post('/validate', authenticate, validateReferralCode);

// ─── Admin Routes (admin only) ────────────────────────────────────────────────

// GET  /api/referral-codes           - list all referral codes
router.get('/', authenticate, authorize(['admin']), getAllReferralCodes);

// POST /api/referral-codes           - create a new referral code
router.post('/', authenticate, authorize(['admin']), createReferralCode);

// GET  /api/referral-codes/:id       - get referral code by id
router.get('/:id', authenticate, authorize(['admin']), getReferralCodeById);

// GET  /api/referral-codes/:id/stats - get usage stats for a referral code
router.get('/:id/stats', authenticate, authorize(['admin']), getReferralCodeStats);

// PUT  /api/referral-codes/:id       - update a referral code
router.put('/:id', authenticate, authorize(['admin']), updateReferralCode);

// DELETE /api/referral-codes/:id     - delete a referral code
router.delete('/:id', authenticate, authorize(['admin']), deleteReferralCode);

export default router;
