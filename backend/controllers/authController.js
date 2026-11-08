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

// @desc    Update user profile (Bio, Skills, Avatar, Name)
// @route   PUT /api/auth/profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.avatar = req.body.avatar || user.avatar;
      user.skills = req.body.skills || user.skills;
      user.faculty = req.body.faculty || user.faculty;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          bio: updatedUser.bio,
          skills: updatedUser.skills,
          avatar: updatedUser.avatar,
          faculty: updatedUser.faculty,
          studentRegNumber: updatedUser.studentRegNumber,
          verificationStatus: updatedUser.verificationStatus,
          walletBalance: updatedUser.walletBalance
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify student account (Approve / Reject campus status)
// @route   PUT /api/auth/verify-student/:id
export const verifyStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.verificationStatus = status;
    user.isVerifiedStudent = status === 'verified';

    await user.save();

    res.status(200).json({
      success: true,
      message: `Student verification updated to ${status}`,
      user: {
        _id: user._id,
        name: user.name,
        studentRegNumber: user.studentRegNumber,
        verificationStatus: user.verificationStatus,
        isVerifiedStudent: user.isVerifiedStudent
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Deposit funds to wallet (Client Escrow Wallet)
// @route   POST /api/auth/deposit
// @access  Private
export const depositFunds = async (req, res) => {
  try {
    const { amount } = req.body;
    const depositAmt = Number(amount);

    if (!depositAmt || depositAmt <= 0 || isNaN(depositAmt)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid deposit amount greater than 0'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { walletBalance: depositAmt } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: `$${depositAmt.toFixed(2)} deposited to wallet successfully!`,
      walletBalance: user.walletBalance,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Withdraw funds from wallet (Student or Client)
// @route   POST /api/auth/withdraw
// @access  Private
export const withdrawFunds = async (req, res) => {
  try {
    const { amount, method, accountNotes } = req.body;
    const withdrawAmt = Number(amount);

    if (!withdrawAmt || withdrawAmt <= 0 || isNaN(withdrawAmt)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid withdrawal amount greater than 0'
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if ((user.walletBalance || 0) < withdrawAmt) {
      return res.status(400).json({
        success: false,
        message: `Insufficient funds. Your available balance is $${Number(user.walletBalance || 0).toFixed(2)}`
      });
    }

    user.walletBalance -= withdrawAmt;
    await user.save();

    res.status(200).json({
      success: true,
      message: `$${withdrawAmt.toFixed(2)} withdrawal requested successfully via ${method ? method.toUpperCase() : 'standard transfer'}!`,
      walletBalance: user.walletBalance,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletBalance: user.walletBalance
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};