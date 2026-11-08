import express from 'express';
import {
  createJob,
  getAllJobs,
  getMyPostedJobs,
  submitProposal,
  acceptProposalAndCreateOrder
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAllJobs)
  .post(protect, createJob);

router.get('/my-jobs', protect, getMyPostedJobs);
router.post('/:id/proposals', protect, submitProposal);
router.put('/:id/proposals/:proposalId/accept', protect, acceptProposalAndCreateOrder);

export default router;