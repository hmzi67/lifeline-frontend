import { Router } from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  getCouponStats,
} from '../controllers/couponController.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const router = Router();

// ─── User Routes (authenticated) ─────────────────────────────────────────────

// POST /api/coupons/validate  - validate a coupon code before payment
router.post('/validate', authenticate, validateCoupon);

// ─── Admin Routes (admin only) ────────────────────────────────────────────────

// GET  /api/coupons           - list all coupons
router.get('/', authenticate, authorize(['admin']), getAllCoupons);

// POST /api/coupons           - create a new coupon
router.post('/', authenticate, authorize(['admin']), createCoupon);

// GET  /api/coupons/:id       - get coupon by id
router.get('/:id', authenticate, authorize(['admin']), getCouponById);

// GET  /api/coupons/:id/stats - get usage stats for a coupon
router.get('/:id/stats', authenticate, authorize(['admin']), getCouponStats);

// PUT  /api/coupons/:id       - update a coupon
router.put('/:id', authenticate, authorize(['admin']), updateCoupon);

// DELETE /api/coupons/:id     - delete a coupon
router.delete('/:id', authenticate, authorize(['admin']), deleteCoupon);

export default router;
