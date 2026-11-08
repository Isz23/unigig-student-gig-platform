import Order from '../models/Order.js';
import User from '../models/User.js';
import Gig from '../models/Gig.js';
import { createNotification } from './notificationController.js';

// @desc    Create a new order & hold funds in escrow
// @route   POST /api/orders
// @access  Private (Client / Buyer)
export const createOrder = async (req, res) => {
  try {
    const { gigId, packageTier, requirements, deliveryDays } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ success: false, message: 'Gig not found' });
    }

    let orderPrice = gig.price || 1500;
    if (gig.packages && gig.packages[packageTier?.toLowerCase()]) {
      orderPrice = gig.packages[packageTier.toLowerCase()].price;
    }

    const days = deliveryDays || 3;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);

    const sellerId = gig.seller || gig.user;

    const order = await Order.create({
      gig: gig._id,
      buyer: req.user._id,
      seller: sellerId,
      packageTier: packageTier || 'Basic',
      price: orderPrice,
      requirements: requirements || '',
      deliveryDeadline: deadline,
      status: 'in_progress',
      escrowStatus: 'held_in_escrow'
    });

    // Update seller's pending escrow balance
    await User.findByIdAndUpdate(sellerId, {
      $inc: { pendingEscrowBalance: orderPrice }
    });

    await createNotification({
      recipient: sellerId,
      sender: req.user._id,
      type: 'order_placed',
      title: 'New Order Received! 🚀',
      message: `${req.user.name || 'A client'} placed an order for "${gig.title}". $${orderPrice.toFixed(2)} held in Escrow.`,
      link: '/stddashboard'
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully and funds secured in Escrow',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in buyer's purchases (Buyer Dashboard)
// @route   GET /api/orders/my-orders
// @access  Private (Buyer)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('gig', 'title category image imageUrl')
      .populate('seller', 'name email avatar studentRegNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buyer orders',
      error: error.message
    });
  }
};

// @desc    Get orders received by seller (Student/Seller Dashboard)
// @route   GET /api/orders/seller-orders
// @access  Private (Seller)
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id })
      .populate('gig', 'title category image imageUrl')
      .populate('buyer', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seller orders',
      error: error.message
    });
  }
};

// @desc    Get single order details by ID
// @route   GET /api/orders/:id
// @access  Private (Buyer or Seller only)
export const getOrderById = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const order = await Order.findById(targetId)
      .populate('gig')
      .populate('buyer', 'name email avatar')
      .populate('seller', 'name email avatar studentRegNumber');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const buyerId = order.buyer?._id ? order.buyer._id.toString() : order.buyer?.toString();
    const sellerId = order.seller?._id ? order.seller._id.toString() : order.seller?.toString();
    const currentUserId = req.user._id.toString();

    if (buyerId !== currentUserId && sellerId !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details',
      error: error.message
    });
  }
};

// @desc    Student submits the completed deliverable (Inspect Work)
// @route   PUT /api/orders/:id/submit or /:orderId/submit
// @access  Private (Seller only)
export const submitWork = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const { workUrl, notes } = req.body;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const sellerId = order.seller?._id ? order.seller._id.toString() : order.seller?.toString();
    if (sellerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the assigned student can submit work'
      });
    }

    order.submission = {
      workUrl: workUrl || '',
      notes: notes || '',
      submittedAt: new Date()
    };
    order.status = 'delivered';
    await order.save();

    const buyerId = order.buyer?._id || order.buyer;
    await createNotification({
      recipient: buyerId,
      sender: req.user._id,
      type: 'order_delivered',
      title: 'Deliverable Ready for Review 🚀',
      message: `${req.user.name || 'Student'} submitted deliverables for ORD-${order._id.toString().slice(-4).toUpperCase()}. Click to inspect & approve.`,
      link: '/clientdashboard'
    });

    res.status(200).json({
      success: true,
      message: 'Work submitted for client review',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Client approves delivery -> Release funds from Escrow to Student Wallet
// @route   PUT /api/orders/:id/approve or /:orderId/approve
// @access  Private (Buyer only)
export const approveAndReleaseEscrow = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const buyerId = order.buyer?._id ? order.buyer._id.toString() : order.buyer?.toString();
    if (buyerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the client can approve this order'
      });
    }

    if (order.status === 'completed' || order.escrowStatus === 'released_to_seller') {
      return res.status(400).json({
        success: false,
        message: 'Payment has already been released for this order'
      });
    }

    order.status = 'completed';
    order.escrowStatus = 'released_to_seller';
    await order.save();

    const sellerId = order.seller?._id || order.seller;

    // Release Escrow to Student Wallet
    await User.findByIdAndUpdate(sellerId, {
      $inc: {
        pendingEscrowBalance: -Number(order.price || 0),
        walletBalance: Number(order.price || 0)
      }
    });

    // 1. Notification to Student (Money received)
    await createNotification({
      recipient: sellerId,
      sender: req.user._id,
      type: 'order_completed',
      title: 'Payment Released! 💰',
      message: `Client approved your deliverable! $${Number(order.price).toFixed(2)} has been released to your student wallet.`,
      link: '/stddashboard'
    });

    // 2. Notification to Client (Order complete)
    await createNotification({
      recipient: req.user._id,
      sender: req.user._id,
      type: 'order_completed',
      title: 'Escrow Released Successfully ✅',
      message: `You approved ORD-${order._id.toString().slice(-4).toUpperCase()} and released $${Number(order.price).toFixed(2)} to the student.`,
      link: '/clientdashboard'
    });

    res.status(200).json({
      success: true,
      message: 'Order completed and payment released from Escrow to Student wallet successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel order & refund held escrow funds to buyer
// @route   PUT /api/orders/:id/cancel
// @access  Private (Buyer or Seller)
export const cancelOrder = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const { reason } = req.body;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const currentUserId = req.user._id.toString();
    const buyerId = (order.buyer?._id || order.buyer).toString();
    const sellerId = (order.seller?._id || order.seller).toString();

    if (currentUserId !== buyerId && currentUserId !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer or seller can initiate cancellation'
      });
    }

    if (order.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel an order that has already been completed and paid'
      });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'This order is already cancelled'
      });
    }

    order.status = 'cancelled';
    order.escrowStatus = 'refunded_to_buyer';
    order.cancellationReason = reason || 'Order cancelled by user';
    order.cancelledBy = req.user._id;
    await order.save();

    await User.findByIdAndUpdate(sellerId, {
      $inc: { pendingEscrowBalance: -Number(order.price || 0) }
    });

    await User.findByIdAndUpdate(buyerId, {
      $inc: { walletBalance: Number(order.price || 0) }
    });

    const otherPartyId = currentUserId === buyerId ? sellerId : buyerId;
    const targetLink = currentUserId === buyerId ? '/stddashboard' : '/clientdashboard';

    await createNotification({
      recipient: otherPartyId,
      sender: req.user._id,
      type: 'system',
      title: 'Order Cancelled ⚠️',
      message: `Order ORD-${order._id.toString().slice(-4).toUpperCase()} was cancelled. Reason: ${order.cancellationReason}`,
      link: targetLink
    });

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully. Funds have been refunded from Escrow to Buyer wallet.',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Client requests a revision on delivered work
// @route   PUT /api/orders/:id/revision
// @access  Private (Buyer only)
export const requestRevision = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const { revisionNotes } = req.body;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const buyerId = (order.buyer?._id || order.buyer).toString();
    if (buyerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer can request a revision'
      });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({
        success: false,
        message: `Cannot request revision when order status is '${order.status}'. Work must be delivered first.`
      });
    }

    if (!revisionNotes) {
      return res.status(400).json({
        success: false,
        message: 'Please provide revision details or instructions'
      });
    }

    order.status = 'in_progress';
    order.revisionNotes = revisionNotes;
    order.revisionRequestedAt = new Date();
    await order.save();

    const sellerId = order.seller?._id || order.seller;
    await createNotification({
      recipient: sellerId,
      sender: req.user._id,
      type: 'system',
      title: 'Revision Requested 📝',
      message: `Client requested changes for ORD-${order._id.toString().slice(-4).toUpperCase()}: "${revisionNotes.slice(0, 50)}..."`,
      link: '/stddashboard'
    });

    res.status(200).json({
      success: true,
      message: 'Revision requested successfully. Order returned to student for updates.',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Buyer leaves a review & rating for a completed order (Client -> Student)
// @route   POST /api/orders/:id/review or /:orderId/review
// @access  Private (Buyer only)
export const addOrderReview = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const { rating, comment } = req.body;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const buyerId = (order.buyer?._id || order.buyer).toString();
    if (buyerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer can review this order'
      });
    }

    if (order.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review completed orders'
      });
    }

    if (order.review && order.review.rating) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order'
      });
    }

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid rating between 1 and 5'
      });
    }

    order.review = {
      rating: ratingNum,
      comment: comment || '',
      reviewer: req.user.name || 'Client',
      createdAt: new Date()
    };
    await order.save();

    // 1. Update Gig Rating if gig exists
    if (order.gig) {
      const gig = await Gig.findById(order.gig);
      if (gig) {
        const allGigOrders = await Order.find({
          gig: gig._id,
          'review.rating': { $exists: true }
        });
        const totalRating = allGigOrders.reduce((acc, item) => acc + item.review.rating, 0);
        gig.rating = Number((totalRating / allGigOrders.length).toFixed(1));
        gig.reviewCount = allGigOrders.length;
        await gig.save();
      }
    }

    // 2. Update Student User Rating
    const sellerId = order.seller?._id || order.seller;
    const allStudentOrders = await Order.find({
      seller: sellerId,
      'review.rating': { $exists: true }
    });
    const totalStudentRating = allStudentOrders.reduce((acc, item) => acc + item.review.rating, 0);
    const avgStudentRating = Number((totalStudentRating / allStudentOrders.length).toFixed(1));

    await User.findByIdAndUpdate(sellerId, {
      rating: avgStudentRating,
      reviewCount: allStudentOrders.length
    });

    // 3. Notification to Student
    await createNotification({
      recipient: sellerId,
      sender: req.user._id,
      type: 'review',
      title: 'New Review & Rating Received! ⭐',
      message: `${req.user.name || 'Client'} gave you a ${ratingNum}-star review for completed order ORD-${order._id.toString().slice(-4).toUpperCase()}.`,
      link: '/stddashboard'
    });

    res.status(200).json({
      success: true,
      message: 'Review and rating submitted successfully',
      review: order.review,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews received by a student
// @route   GET /api/orders/reviews/student/:studentId
// @access  Public
export const getStudentReviews = async (req, res) => {
  try {
    const { studentId } = req.params;

    const ordersWithReviews = await Order.find({
      seller: studentId,
      'review.rating': { $exists: true }
    })
      .populate('buyer', 'name avatar university')
      .populate('gig', 'title')
      .sort({ 'review.createdAt': -1 });

    const reviews = ordersWithReviews.map((ord) => ({
      id: ord._id,
      reviewer: ord.buyer?.name || 'Verified Client',
      avatar: ord.buyer?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ord.buyer?.name || 'Client'}`,
      university: ord.buyer?.university || 'Campus Buyer',
      rating: ord.review?.rating || 5,
      comment: ord.review?.comment || '',
      date: new Date(ord.review?.createdAt || ord.updatedAt).toLocaleDateString(),
      gigTitle: ord.gig?.title || 'Campus Gig Service'
    }));

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Student leaves a review & rating for the Client
// @route   POST /api/orders/:id/review-client or /:orderId/review-client
// @access  Private (Seller only)
export const addClientReview = async (req, res) => {
  try {
    const targetId = req.params.id || req.params.orderId;
    const { rating, comment } = req.body;
    const order = await Order.findById(targetId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const sellerId = (order.seller?._id || order.seller).toString();
    if (sellerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the assigned student can review the client'
      });
    }

    if (order.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review the client after order completion and payment release'
      });
    }

    if (order.sellerReview && order.sellerReview.rating) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this client for this order'
      });
    }

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid rating between 1 and 5'
      });
    }

    order.sellerReview = {
      rating: ratingNum,
      comment: comment || '',
      reviewer: req.user.name || 'Student',
      createdAt: new Date()
    };
    await order.save();

    const buyerId = order.buyer?._id || order.buyer;

    // Recalculate average Client Rating
    const allClientOrders = await Order.find({
      buyer: buyerId,
      'sellerReview.rating': { $exists: true }
    });

    const totalRating = allClientOrders.reduce(
      (acc, item) => acc + item.sellerReview.rating,
      0
    );
    const avgClientRating = Number((totalRating / allClientOrders.length).toFixed(1));

    await User.findByIdAndUpdate(buyerId, {
      rating: avgClientRating,
      reviewCount: allClientOrders.length
    });

    await createNotification({
      recipient: buyerId,
      sender: req.user._id,
      type: 'review',
      title: 'New Student Feedback Received! ⭐',
      message: `${req.user.name || 'Student'} rated your collaboration ${ratingNum} stars for ORD-${order._id.toString().slice(-4).toUpperCase()}.`,
      link: '/clientdashboard'
    });

    res.status(200).json({
      success: true,
      message: 'Client review and rating submitted successfully',
      sellerReview: order.sellerReview,
      clientRating: avgClientRating
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews received by a client from students
// @route   GET /api/orders/reviews/client/:clientId
// @access  Public
export const getClientReviews = async (req, res) => {
  try {
    const { clientId } = req.params;

    const ordersWithReviews = await Order.find({
      buyer: clientId,
      'sellerReview.rating': { $exists: true }
    })
      .populate('seller', 'name avatar university studentRegNumber')
      .populate('gig', 'title')
      .sort({ 'sellerReview.createdAt': -1 });

    const reviews = ordersWithReviews.map((ord) => ({
      id: ord._id,
      reviewer: ord.seller?.name || ord.sellerReview?.reviewer || 'Verified Student',
      avatar: ord.seller?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${ord.seller?.name || 'Student'}`,
      university: ord.seller?.university || 'Campus Student',
      rating: ord.sellerReview?.rating || 5,
      comment: ord.sellerReview?.comment || '',
      date: new Date(ord.sellerReview?.createdAt || ord.updatedAt).toLocaleDateString(),
      gigTitle: ord.gig?.title || ord.requirements?.split('\n')[0] || 'Campus Task'
    }));

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Compatibility Aliases so all routes continue to work seamlessly
export const reviewStudent = addOrderReview;
export const reviewClient = addClientReview;
export const approveOrder = approveAndReleaseEscrow;