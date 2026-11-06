import mongoose from 'mongoose';

// 3-Tier Package Pricing Schema
const packageTierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  delivery: { type: String, required: true },
  desc: { type: String, required: true }
});

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gig title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Academics & Tutoring',
        'Coding & Tech',
        'Graphics & UI/UX',
        'Writing & Proofreading',
        'Video & Media',
        'Campus Services'
      ]
    },
    turnaround: {
      type: String,
      default: '1 Day'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
    },
    tags: {
      type: [String],
      default: []
    },
    packages: {
      basic: { type: packageTierSchema, required: true },
      standard: { type: packageTierSchema, required: true },
      premium: { type: packageTierSchema, required: true }
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // 016 ගේ Auth module එක integrate වන තුරු optional වේ
    },
    status: {
      type: String,
      enum: ['Active', 'Paused'],
      default: 'Active'
    },
    ordersInQueue: {
      type: Number,
      default: 0
    },
    impressions: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5.0
    },
    reviewsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Gig = mongoose.model('Gig', gigSchema);
export default Gig;