import express from 'express';
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getOrderById,
  submitWork,
  approveAndReleaseEscrow,
  cancelOrder,
  requestRevision,
  addOrderReview,
  getStudentReviews
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/my-orders', getMyOrders);
router.get('/seller-orders', getSellerOrders);
router.get('/reviews/student/:studentId', getStudentReviews);
router.get('/reviews/client/:clientId', getClientReviews);
router.post('/:id/review-client', addClientReview);

router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id/submit', submitWork);
router.put('/:id/approve', approveAndReleaseEscrow);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/revision', requestRevision);
router.post('/:id/review', addOrderReview);

export default router;