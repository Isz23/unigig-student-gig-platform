import Job from '../models/Job.js';
import Order from '../models/Order.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, category, budget, deadline } = req.body;

    if (!title || !description || !budget || !deadline) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const job = await Job.create({
      client: req.user._id,
      title,
      description,
      category: category || 'Coding & Tech',
      budget: Number(budget),
      deadline: new Date(deadline),
      status: 'open',
      proposals: []
    });

    res.status(201).json({
      success: true,
      message: 'Task request posted successfully!',
      data: job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating job request.' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' })
      .populate('client', 'name university avatar email role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching task requests.' });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.user._id })
      .populate('client', 'name university avatar')
      .populate('proposals.student', 'name university avatar studentRegNumber email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching your tasks.' });
  }
};

export const submitProposal = async (req, res) => {
  try {
    const { bidAmount, deliveryDays, coverLetter } = req.body;
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Task request not found.' });
    }

    if (job.status !== 'open') {
      return res.status(400).json({ success: false, message: 'This task is no longer open for bids.' });
    }

    const jobClientId = (job.client?._id || job.client || '').toString();
    const currentUserId = (req.user?._id || req.user?.id || '').toString();

    if (jobClientId && currentUserId && jobClientId === currentUserId) {
      return res.status(400).json({
        success: false,
        message: 'You cannot submit a proposal on your own task request.'
      });
    }

    if (req.user?.role === 'client') {
      return res.status(403).json({
        success: false,
        message: 'Clients cannot submit proposals. Bidding is restricted to students only.'
      });
    }

    const alreadyProposed = job.proposals.some(
      (p) => (p.student?._id || p.student || '').toString() === currentUserId
    );

    if (alreadyProposed) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a proposal for this task.'
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

    return res.status(201).json({
      success: true,
      message: 'Proposal submitted successfully!',
      data: job
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Server error submitting proposal.' });
  }
};

export const acceptProposal = async (req, res) => {
  try {
    const { id: jobId, proposalId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    const jobClientId = (job.client?._id || job.client || '').toString();
    const currentUserId = (req.user?._id || req.user?.id || '').toString();

    if (jobClientId !== currentUserId) {
      return res.status(403).json({ success: false, message: 'Unauthorized action.' });
    }

    const proposal = job.proposals.id(proposalId);
    if (!proposal) {
      return res.status(404).json({ success: false, message: 'Proposal not found.' });
    }

    job.status = 'assigned';
    job.proposals.forEach((p) => {
      p.status = p._id.toString() === proposalId ? 'accepted' : 'rejected';
    });
    await job.save();

    const deliveryDeadline = new Date();
    deliveryDeadline.setDate(deliveryDeadline.getDate() + (proposal.deliveryDays || 3));

    const order = await Order.create({
      buyer: job.client,
      seller: proposal.student,
      job: job._id,
      packageTier: 'Custom Task Request',
      price: proposal.bidAmount,
      deliveryDeadline,
      requirements: `${job.title}\n\nDeliverables: ${job.description}`,
      status: 'in_progress',
      escrowStatus: 'held_in_escrow'
    });

    res.status(200).json({
      success: true,
      message: 'Proposal accepted and order locked in escrow.',
      data: { job, order }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || 'Server error accepting proposal.' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Task request not found.' });
    }

    const jobClientId = (job.client?._id || job.client || '').toString();
    const currentUserId = (req.user?._id || req.user?.id || '').toString();

    if (jobClientId && currentUserId && jobClientId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized: You can only delete tasks you created.'
      });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error deleting task.'
    });
  }
};