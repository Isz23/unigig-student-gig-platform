import express from 'express';
import {
  createOrder,
  getMyOrders,
  submitWork,
  approveAndReleaseEscrow
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All order actions require authentication
router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.put('/:id/submit', submitWork);
router.put('/:id/approve', approveAndReleaseEscrow);

export default router;