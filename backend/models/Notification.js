import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'system',
    },
    link: {
      type: String,
      default: '/clientdashboard',
    },
    read: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-sync recipient and user fields so both always match
notificationSchema.pre('save', function (next) {
  if (!this.recipient && this.user) {
    this.recipient = this.user;
  }
  if (!this.user && this.recipient) {
    this.user = this.recipient;
  }
  if (this.read !== undefined && this.isRead === undefined) {
    this.isRead = this.read;
  }
  next();
});

export default mongoose.model('Notification', notificationSchema);