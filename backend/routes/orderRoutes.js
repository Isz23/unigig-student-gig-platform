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
  getStudentReviews,
  addClientReview,
  getClientReviews
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Order Retrieval Routes
router.get('/my-orders', getMyOrders);
router.get('/seller-orders', getSellerOrders);

// Review Retrieval Routes
router.get('/reviews/student/:studentId', getStudentReviews);
router.get('/reviews/client/:clientId', getClientReviews);

// Order Lifecycle Actions
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id/submit', submitWork);
router.put('/:id/approve', approveAndReleaseEscrow);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/revision', requestRevision);

// 2-Way Review Submission Routes
router.post('/:id/review', addOrderReview);
router.post('/:id/review-client', addClientReview);

export default router;