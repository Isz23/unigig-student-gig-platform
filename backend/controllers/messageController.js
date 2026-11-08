import Message from '../models/Message.js';
import { createNotification } from './notificationController.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    const senderId = req.user._id || req.user.id;

    if (!receiverId || !text?.trim()) {
      return res.status(400).json({ success: false, message: 'Receiver ID and text are required' });
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text: text.trim(),
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name role email')
      .populate('receiver', 'name role email');

    await createNotification({
      recipient: receiverId,
      sender: senderId,
      type: 'message',
      title: `New Message from ${req.user.name || 'Peer'}`,
      message: text.trim().length > 60 ? `${text.trim().substring(0, 60)}...` : text.trim(),
      link: `/messages?peerId=${senderId}`,
    });

    res.status(201).json({ success: true, data: populatedMessage });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: 'Server error sending message' });
  }
};

export const getConversation = async (req, res) => {
  try {
    const currentUserId = req.user._id || req.user.id;
    const chatPartnerId = req.params.userId;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: chatPartnerId },
        { sender: chatPartnerId, receiver: currentUserId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name role')
      .populate('receiver', 'name role');

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

export const getConversationsList = async (req, res) => {
  try {
    const currentUserId = req.user._id || req.user.id;

    const messages = await Message.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email role')
      .populate('receiver', 'name email role');

    const partnersMap = new Map();

    messages.forEach((msg) => {
      const partner =
        msg.sender._id.toString() === currentUserId.toString() ? msg.receiver : msg.sender;

      if (partner && !partnersMap.has(partner._id.toString())) {
        partnersMap.set(partner._id.toString(), {
          user: partner,
          lastMessage: msg.text,
          lastMessageDate: msg.createdAt,
          unread: !msg.read && msg.receiver._id.toString() === currentUserId.toString(),
        });
      }
    });

    res.status(200).json({ success: true, data: Array.from(partnersMap.values()) });
  } catch (error) {
    console.error('Get conversations list error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving chat list' });
  }
};