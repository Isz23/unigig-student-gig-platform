import express from 'express';
import {
  createGig,
  getGigs,
  getGigById,
  getGigsBySeller,
  updateGig,
  deleteGig
} from '../controllers/gigController.js';

const router = express.Router();

// Base URL: /api/gigs
router.route('/')
  .get(getGigs)
  .post(createGig);

router.route('/:id')
  .get(getGigById)
  .put(updateGig)
  .delete(deleteGig);

router.route('/seller/:sellerId')
  .get(getGigsBySeller);

export default router;