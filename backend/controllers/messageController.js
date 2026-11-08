import Message from '../models/Message.js';
import { createNotification } from './notificationController.js';

// @desc    Send a message & trigger notification to receiver
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const receiverId = req.body.receiverId || req.body.receiver;
    const { text } = req.body;
    const senderId = req.user._id || req.user.id;

    if (!receiverId || !text?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Receiver ID and text are required',
      });
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text: text.trim(),
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name role email avatar university')
      .populate('receiver', 'name role email avatar university');

    // Trigger Notification to Receiver
    try {
      const senderName = req.user.name || 'Campus Peer';
      const previewText =
        text.trim().length > 50 ? `${text.trim().substring(0, 50)}...` : text.trim();

      await createNotification({
        recipient: receiverId,
        user: receiverId,
        sender: senderId,
        type: 'message',
        title: `New Message from ${senderName} 💬`,
        message: previewText,
        link: `/messages?peerId=${senderId}`,
      });
    } catch (notifError) {
      console.warn('Failed to trigger message notification:', notifError.message);
    }

    res.status(201).json({ success: true, data: populatedMessage });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: 'Server error sending message' });
  }
};

// @desc    Get chat conversation between current user and peer
// @route   GET /api/messages/chat/:userId or /:peerId
// @access  Private
export const getConversation = async (req, res) => {
  try {
    const currentUserId = req.user._id || req.user.id;
    const chatPartnerId = req.params.userId || req.params.peerId || req.params.id;

    if (!chatPartnerId) {
      return res.status(400).json({
        success: false,
        message: 'Chat partner ID is required',
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: chatPartnerId },
        { sender: chatPartnerId, receiver: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name role email avatar')
      .populate('receiver', 'name role email avatar');

    await Message.updateMany(
      { sender: chatPartnerId, receiver: currentUserId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving messages' });
  }
};

// @desc    Get all conversations list for sidebar
// @route   GET /api/messages/conversations
// @access  Private
export const getConversationsList = async (req, res) => {
  try {
    const currentUserId = req.user._id || req.user.id;

    const messages = await Message.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email role avatar university')
      .populate('receiver', 'name email role avatar university');

    const partnersMap = new Map();

    messages.forEach((msg) => {
      if (!msg.sender || !msg.receiver) return;

      const senderIdStr = (msg.sender._id || msg.sender).toString();
      const currentUserIdStr = currentUserId.toString();

      const partner = senderIdStr === currentUserIdStr ? msg.receiver : msg.sender;
      if (!partner) return;

      const partnerIdStr = (partner._id || partner).toString();

      if (!partnersMap.has(partnerIdStr)) {
        const isUnread =
          !msg.read &&
          (msg.receiver._id || msg.receiver).toString() === currentUserIdStr;

        partnersMap.set(partnerIdStr, {
          user: partner,
          lastMessage: msg.text,
          lastMessageDate: msg.createdAt,
          unread: isUnread,
        });
      }
    });

    res.status(200).json({ success: true, data: Array.from(partnersMap.values()) });
  } catch (error) {
    console.error('Get conversations list error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving chat list' });
  }
};