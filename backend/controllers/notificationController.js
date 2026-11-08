import Notification from '../models/Notification.js';

// @desc    Helper to create notifications safely without crashing
export const createNotification = async ({ recipient, user, sender, type, title, message, link }) => {
  try {
    const targetUserId = recipient || user;
    if (!targetUserId) {
      console.warn('Notification skipped: No recipient user ID provided');
      return null;
    }

    const notif = await Notification.create({
      recipient: targetUserId,
      user: targetUserId,
      sender: sender || null,
      type: type || 'system',
      title: title || 'Notification',
      message: message || '',
      link: link || '/clientdashboard',
      read: false,
      isRead: false,
    });

    return notif;
  } catch (err) {
    console.error('Error creating notification in DB:', err.message);
    return null;
  }
};

// @desc    Get notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const notifications = await Notification.find({
      $or: [{ recipient: userId }, { user: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = notifications.filter((n) => !(n.read || n.isRead)).length;

    res.status(200).json({
      success: true,
      notifications,
      data: notifications,
      unreadCount,
    });
  } catch (err) {
    console.error('Error fetching notifications:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

// @desc    Mark single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true, isRead: true },
      { new: true }
    );
    res.status(200).json({ success: true, notification: notif });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    await Notification.updateMany(
      { $or: [{ recipient: userId }, { user: userId }] },
      { $set: { read: true, isRead: true } }
    );
    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};