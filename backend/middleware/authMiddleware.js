import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes (Logged-in users only)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'unigig_jwt_secret_key_2026');
      
      // Token එකේ id හෝ _id තිබුණත් හඳුනාගැනීම
      const userId = decoded.id || decoded._id || decoded.userId;
      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User account not found'
        });
      }

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token provided'
    });
  }
};

// Admin only middleware (Case-insensitive)
export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role || '').toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admin privileges required'
    });
  }
};

// Alias export
export const authorizeAdmin = adminOnly;