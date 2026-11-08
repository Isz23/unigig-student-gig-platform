import Gig from '../models/Gig.js';

// @desc    Create a new Gig
// @route   POST /api/gigs
// @access  Private (Student)
export const createGig = async (req, res) => {
  try {
    const {
      title,
      category,
      turnaround,
      description,
      imageUrl,
      tags,
      packages,
      sellerId
    } = req.body;

    const gig = new Gig({
      title,
      category,
      turnaround,
      description,
      imageUrl: imageUrl || undefined,
      tags: Array.isArray(tags) ? tags : tags ? tags.split(',').map((t) => t.trim()) : [],
      packages,
      seller: req.user?._id || sellerId || null
    });

    const savedGig = await gig.save();
    res.status(201).json({
      success: true,
      message: 'Gig successfully created',
      data: savedGig
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all Gigs (with Search & Category Filters)
// @route   GET /api/gigs
// @access  Public
export const getGigs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { status: 'Active' };

    // Category filter
    if (category && category !== 'All Categories' && category !== 'All') {
      query.category = category;
    }

    // Search filter across title, description, and tags
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const gigs = await Gig.find(query)
      .populate('seller', 'name email avatar university studentRegNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get logged in student's gigs (Seller Dashboard)
// @route   GET /api/gigs/my-gigs
// @access  Private (Seller/Student)
export const getMyGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({
      $or: [{ seller: req.user._id }, { user: req.user._id }]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single Gig by ID
// @route   GET /api/gigs/:id
// @access  Public
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate('seller', 'name email avatar university studentRegNumber rating reviewsCount');

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    res.status(200).json({
      success: true,
      data: gig
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get Gigs by specific Seller (Student Profile view)
// @route   GET /api/gigs/seller/:sellerId
// @access  Public
export const getGigsBySeller = async (req, res) => {
  try {
    const gigs = await Gig.find({ seller: req.params.sellerId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      data: gigs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update a Gig (Owner only)
// @route   PUT /api/gigs/:id
// @access  Private (Owner)
export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Authorization check: Only the creator of the gig can edit it
    const ownerId = gig.seller ? gig.seller.toString() : gig.user?.toString();
    if (req.user && ownerId && ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only edit your own gigs'
      });
    }

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Gig updated successfully',
      data: updatedGig
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a Gig (Owner only)
// @route   DELETE /api/gigs/:id
// @access  Private (Owner)
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
      });
    }

    // Authorization check: Only the creator of the gig can delete it
    const ownerId = gig.seller ? gig.seller.toString() : gig.user?.toString();
    if (req.user && ownerId && ownerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only delete your own gigs'
      });
    }

    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Gig deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};