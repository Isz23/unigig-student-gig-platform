import express from 'express';
import {
  createJob,
  getJobs,
  getMyJobs,
  submitProposal,
  acceptProposal,
  deleteJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createJob)
  .get(getJobs);

router.get('/my-jobs', protect, getMyJobs);
router.post('/:id/proposals', protect, submitProposal);
router.put('/:id/proposals/:proposalId/accept', protect, acceptProposal);
router.delete('/:id', protect, deleteJob);

export default router;