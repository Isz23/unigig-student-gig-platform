import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bidAmount: {
    type: Number,
    required: [true, 'Please specify bid amount']
  },
  deliveryDays: {
    type: Number,
    required: [true, 'Please specify delivery duration in days'],
    default: 3
  },
  coverLetter: {
    type: String,
    required: [true, 'Please provide a short pitch or proposal notes'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed requirements for the task']
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Academics & Tutoring',
        'Coding & Tech',
        'Graphics & UI/UX',
        'Writing & Proofreading',
        'Video & Media',
        'Campus Services'
      ]
    },
    budget: {
      type: Number,
      required: [true, 'Please enter an estimated budget']
    },
    deadline: {
      type: Date,
      required: [true, 'Please set a task deadline']
    },
    status: {
      type: String,
      enum: ['open', 'assigned', 'completed', 'cancelled'],
      default: 'open'
    },
    selectedStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    proposals: [proposalSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Job', jobSchema);