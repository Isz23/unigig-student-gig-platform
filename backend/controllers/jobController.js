import Job from '../models/Job.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { createNotification } from './notificationController.js';

// @desc    Create a new job post (Client only)
// @route   POST /api/jobs
// @access  Private (Client)
export const createJob = async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;

    if (!title || !description || !category || !budget || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const job = await Job.create({
      client: req.user._id,
      title,
      description,
      category,
      budget: Number(budget),
      deadline: new Date(deadline),
      status: 'open',
      proposals: []
    });

    // 1. Notification to Client confirming task post
    try {
      await createNotification({
        recipient: req.user._id,
        sender: req.user._id,
        type: 'job',
        title: 'Task Request Posted 🚀',
        message: `Your task "${job.title}" has been posted with a budget of $${Number(job.budget).toFixed(2)}. Open for student bids!`,
        link: '/clientdashboard'
      });
    } catch (notifErr) {
      console.warn('Failed to send job creation notification:', notifErr.message);
    }

    res.status(201).json({
      success: true,
      data: job,
      message: 'Task posted successfully'
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating job'
    });
  }
};

// @desc    Get all open jobs (For Students browsing)
// @route   GET /api/jobs
// @access  Public / Private
export const getAllJobs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { status: 'open' };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const jobs = await Job.find(query)
      .populate('client', 'name email university avatar')
      .populate('proposals.student', 'name avatar university studentRegNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching jobs'
    });
  }
};

// @desc    Get jobs posted by the logged-in client
// @route   GET /api/jobs/my-jobs
// @access  Private (Client)
export const getMyPostedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user._id })
      .populate('proposals.student', 'name email avatar university studentRegNumber')
      .populate('selectedStudent', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching client jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching your jobs'
    });
  }
};

// @desc    Submit a proposal / reverse bid on a job (Student only)
// @route   POST /api/jobs/:id/proposals
// @access  Private (Student)
export const submitProposal = async (req, res) => {
  try {
    const { bidAmount, deliveryDays, coverLetter } = req.body;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({
        success: false,
        message: 'This task is no longer accepting bids'
      });
    }

    // Check if the student already submitted a proposal
    const alreadyProposed = job.proposals.some(
      (p) => p.student.toString() === req.user._id.toString()
    );

    if (alreadyProposed) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a proposal for this task'
      });
    }

    const newProposal = {
      student: req.user._id,
      bidAmount: Number(bidAmount),
      deliveryDays: Number(deliveryDays) || 3,
      coverLetter: coverLetter || '',
      status: 'pending'
    };

    job.proposals.push(newProposal);
    await job.save();

    // 2. Notification to Client when a student bids
    try {
      await createNotification({
        recipient: job.client,
        sender: req.user._id,
        type: 'bid',
        title: 'New Student Proposal! 📝',
        message: `${req.user.name || 'A student'} placed a bid of $${Number(bidAmount).toFixed(2)} on "${job.title}".`,
        link: '/clientdashboard'
      });
    } catch (notifErr) {
      console.warn('Failed to send bid notification to client:', notifErr.message);
    }

    res.status(201).json({
      success: true,
      data: job,
      message: 'Proposal submitted successfully!'
    });
  } catch (error) {
    console.error('Error submitting proposal:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while submitting proposal'
    });
  }
};

// @desc    Accept a proposal -> Convert directly to an Escrow Order
// @route   PUT /api/jobs/:id/proposals/:proposalId/accept
// @access  Private (Client)
export const acceptProposalAndCreateOrder = async (req, res) => {
  try {
    const { id: jobId, proposalId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const proposal = job.proposals.id(proposalId);
    if (!proposal) {
      return res.status(404).json({ success: false, message: 'Proposal not found' });
    }

    // 1. Mark accepted proposal and update other proposals
    job.proposals.forEach((p) => {
      if (p._id.toString() === proposalId) {
        p.status = 'accepted';
      } else {
        p.status = 'rejected';
      }
    });

    job.status = 'assigned';
    job.selectedStudent = proposal.student;
    await job.save();

    // 2. Automatically generate an Order with Escrow
    const calculatedDeadline = new Date();
    calculatedDeadline.setDate(calculatedDeadline.getDate() + (proposal.deliveryDays || 3));

    const newOrder = await Order.create({
      buyer: req.user._id,
      seller: proposal.student,
      packageTier: 'Custom Task Request',
      price: proposal.bidAmount,
      deliveryDeadline: calculatedDeadline,
      requirements: `Task: ${job.title}\nDetails: ${job.description}\nProposal Notes: ${proposal.coverLetter || ''}`,
      status: 'in_progress',
      escrowStatus: 'held_in_escrow'
    });

    // 3. Update seller pending escrow balance
    await User.findByIdAndUpdate(proposal.student, {
      $inc: { pendingEscrowBalance: proposal.bidAmount }
    });

    // 4. Notifications
    try {
      // To Student
      await createNotification({
        recipient: proposal.student,
        sender: req.user._id,
        type: 'order_placed',
        title: 'Proposal Accepted! 🎉',
        message: `${req.user.name || 'Client'} accepted your bid for "${job.title}"! $${Number(proposal.bidAmount).toFixed(2)} held in Escrow.`,
        link: '/stddashboard'
      });

      // To Client
      await createNotification({
        recipient: req.user._id,
        sender: req.user._id,
        type: 'order_placed',
        title: 'Order Created & Escrow Held 🔒',
        message: `You accepted a bid for "${job.title}". $${Number(proposal.bidAmount).toFixed(2)} secured in Escrow.`,
        link: '/clientdashboard'
      });
    } catch (notifErr) {
      console.warn('Failed to send proposal acceptance notifications:', notifErr.message);
    }

    res.status(200).json({
      success: true,
      message: 'Proposal accepted! Escrow order created and assigned to student.',
      order: newOrder,
      job
    });
  } catch (error) {
    console.error('Error accepting proposal:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while accepting proposal'
    });
  }
};