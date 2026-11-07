import express from 'express';
import {
  createGig,
  getGigs,
  getGigById,
  getMyGigs,
  getGigsBySeller,
  updateGig,
  deleteGig
} from '../controllers/gigController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Base URL: /api/gigs

// Public explore & Protected create
router.route('/')
  .get(getGigs)
  .post(protect, createGig);

// Private route for logged-in student (Must be placed before /:id)
router.route('/my-gigs')
  .get(protect, getMyGigs);

// Public route to view gigs by specific seller/student
router.route('/seller/:sellerId')
  .get(getGigsBySeller);

// Single Gig routes: Public view, Protected update & delete
router.route('/:id')
  .get(getGigById)
  .put(protect, updateGig)
  .delete(protect, deleteGig);

export default router;