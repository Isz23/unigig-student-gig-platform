import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  verifyStudentStatus
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (Logged in users)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Verification route
router.put('/verify-student/:id', protect, verifyStudentStatus);

export default router;