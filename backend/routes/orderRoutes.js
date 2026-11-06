import express from 'express';
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getOrderById,
  submitWork,
  approveAndReleaseEscrow,
  cancelOrder
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/my-orders', getMyOrders);
router.get('/seller-orders', getSellerOrders);

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id/submit', submitWork);
router.put('/:id/approve', approveAndReleaseEscrow);
router.put('/:id/cancel', cancelOrder);

export default router;