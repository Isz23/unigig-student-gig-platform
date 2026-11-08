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

    // Determine price based on tier (or base price)
    let orderPrice = gig.price || 1500;
    if (gig.packages && gig.packages[packageTier?.toLowerCase()]) {
      orderPrice = gig.packages[packageTier.toLowerCase()].price;
    }

    // Set deadline
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
    const order = await Order.findById(req.params.id)
      .populate('gig')
      .populate('buyer', 'name email avatar')
      .populate('seller', 'name email avatar studentRegNumber');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const buyerId = order.buyer._id ? order.buyer._id.toString() : order.buyer.toString();
    const sellerId = order.seller._id ? order.seller._id.toString() : order.seller.toString();
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

// @desc    Student submits the completed deliverable
// @route   PUT /api/orders/:id/submit
// @access  Private (Seller only)
export const submitWork = async (req, res) => {
  try {
    const { workUrl, notes } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the assigned student can submit work'
      });
    }

    order.submission = {
      workUrl,
      notes: notes || '',
      submittedAt: new Date()
    };
    order.status = 'delivered';

    await order.save();

    await createNotification({
      recipient: order.buyer,
      sender: req.user._id,
      type: 'order_delivered',
      title: 'Deliverable Ready for Review 🚀',
      message: `${req.user.name || 'Student'} submitted the project deliverable for ORD-${order._id.toString().slice(-4).toUpperCase()}. Please inspect and approve.`,
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
// @route   PUT /api/orders/:id/approve
// @access  Private (Buyer only)
export const approveAndReleaseEscrow = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.buyer.toString() !== req.user._id.toString()) {
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

    await User.findByIdAndUpdate(order.seller, {
      $inc: {
        pendingEscrowBalance: -order.price,
        walletBalance: order.price
      }
    });


    await createNotification({
      recipient: order.seller,
      sender: req.user._id,
      type: 'order_completed',
      title: 'Payment Released! 💰',
      message: `Client approved your deliverable! $${order.price.toFixed(2)} has been released from Escrow to your student wallet.`,
      link: '/stddashboard'
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
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const currentUserId = req.user._id.toString();
    const buyerId = order.buyer.toString();
    const sellerId = order.seller.toString();

    // 1. Authorization check: Only buyer or seller involved can cancel
    if (currentUserId !== buyerId && currentUserId !== sellerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer or seller of this order can initiate cancellation'
      });
    }

    // 2. State validation: Cannot cancel completed or already cancelled orders
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

    // 3. Update order status
    order.status = 'cancelled';
    order.escrowStatus = 'refunded_to_buyer';
    order.cancellationReason = reason || 'Order cancelled by user';
    order.cancelledBy = req.user._id;
    await order.save();

    // 4. Reverse Escrow: Deduct from seller's pending escrow & refund buyer's wallet
    await User.findByIdAndUpdate(sellerId, {
      $inc: { pendingEscrowBalance: -order.price }
    });

    await User.findByIdAndUpdate(buyerId, {
      $inc: { walletBalance: order.price }
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
    const { revisionNotes } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // 1. Authorization: Only the buyer can request a revision
    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer can request a revision'
      });
    }

    // 2. State Validation: Can only request revision if order is 'delivered'
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

    // 3. Update order state back to in_progress
    order.status = 'in_progress';
    order.revisionNotes = revisionNotes;
    order.revisionRequestedAt = new Date();
    await order.save();

    await createNotification({
      recipient: order.seller,
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

// @desc    Buyer leaves a review & rating for a completed order
// @route   POST /api/orders/:id/review
// @access  Private (Buyer only)
export const addOrderReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // 1. Authorization: Only buyer can leave a review
    if (order.buyer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Only the buyer can review this order'
      });
    }

    // 2. Validation: Must be completed
    if (order.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'You can only review completed orders'
      });
    }

    // 3. Validation: Prevent duplicate reviews
    if (order.review && order.review.rating) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this order'
      });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid rating between 1 and 5'
      });
    }

    // 4. Attach review to order
    order.review = {
      rating: Number(rating),
      comment: comment || '',
      createdAt: new Date()
    };
    await order.save();

    // 5. Update Gig's average rating if gig exists
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
    await createNotification({
      recipient: order.seller,
      sender: req.user._id,
      type: 'system',
      title: 'New Review & Rating Received! ⭐',
      message: `${req.user.name || 'Client'} gave you a ${rating}-star review for completed order ORD-${order._id.toString().slice(-4).toUpperCase()}.`,
      link: `/student/${order.seller.toString()}`
    });

    res.status(200).json({
      success: true,
      message: 'Review and rating submitted successfully',
      review: order.review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};