import User from '../models/User.js';
import generateToken from '../Utils/generateToken.js';

// @desc    Register a new user (Student / Client)
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, university, faculty, studentRegNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }

    if (role === 'student' && !studentRegNumber) {
      return res.status(400).json({
        success: false,
        message: 'Student Registration Number is required for student accounts'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student',
      university: university || 'South Eastern University of Sri Lanka',
      faculty: faculty || '',
      studentRegNumber: studentRegNumber || '',
      verificationStatus: role === 'student' ? 'pending' : 'verified'
    });

    if (user) {
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          university: user.university,
          studentRegNumber: user.studentRegNumber,
          verificationStatus: user.verificationStatus,
          walletBalance: user.walletBalance
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          university: user.university,
          studentRegNumber: user.studentRegNumber,
          verificationStatus: user.verificationStatus,
          walletBalance: user.walletBalance
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};