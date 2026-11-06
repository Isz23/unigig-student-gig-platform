import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
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
    // Gigs හරහා එන Orders වලට gig ID එක වැටේ, Custom Job Requests වලදී මෙය optional වේ
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gig',
      required: false
    },
    // Job Post එකක් හරහා ආවේ නම් අදාළ Job ID එක
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: false
    },
    packageTier: {
      type: String,
      enum: ['Basic', 'Standard', 'Premium', 'Custom Task Request', 'Custom'],
      default: 'Custom Task Request'
    },
    price: {
      type: Number,
      required: true
    },
    deliveryDeadline: {
      type: Date,
      required: true
    },
    requirements: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled', 'revision_requested'],
      default: 'in_progress'
    },
    escrowStatus: {
      type: String,
      enum: ['held_in_escrow', 'released_to_seller', 'refunded_to_buyer'],
      default: 'held_in_escrow'
    },
    submission: {
      workUrl: String,
      notes: String,
      submittedAt: Date
    },
    review: {
      rating: Number,
      comment: String,
      createdAt: Date
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Order', orderSchema);