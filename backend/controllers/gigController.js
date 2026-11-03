import Gig from '../models/Gig.js';

// @desc    Create a new Gig
// @route   POST /api/gigs
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
      seller: sellerId || null
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

// @desc    Get single Gig by ID
// @route   GET /api/gigs/:id
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

// @desc    Update a Gig
// @route   PUT /api/gigs/:id
export const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
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

// @desc    Delete a Gig
// @route   DELETE /api/gigs/:id
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: 'Gig not found'
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