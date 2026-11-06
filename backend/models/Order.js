import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: true
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    packageTier: {
      type: String,
      enum: ['Basic', 'Standard', 'Premium'],
      default: 'Basic'
    },
    price: {
      type: Number,
      required: true
    },
    requirements: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'],
      default: 'in_progress'
    },
    // Escrow Payment Tracking
    escrowStatus: {
      type: String,
      enum: ['held_in_escrow', 'released_to_seller', 'refunded_to_buyer'],
      default: 'held_in_escrow'
    },
    deliveryDeadline: {
      type: Date
    },
    // Student Work Submission Details
    submission: {
      workUrl: { type: String, default: '' },
      notes: { type: String, default: '' },
      submittedAt: { type: Date }
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;