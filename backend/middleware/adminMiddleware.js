export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role || '').toLowerCase() === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admin credentials required'
    });
  }
};