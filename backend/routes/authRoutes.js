import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  verifyStudentStatus
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Fetch user profile by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
});

// Protected routes (Logged in users)
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Verification route
router.put('/verify-student/:id', protect, verifyStudentStatus);

export default router;