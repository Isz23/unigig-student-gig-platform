import User from '../models/User.js';
import Order from '../models/Order.js';
import Job from '../models/Job.js';
import Gig from '../models/Gig.js';
import { createNotification } from './notificationController.js';

// 1. Get All Students with Gigs, Orders, Profile & Reviews
export const getAdminStudents = async (req, res) => {
  try {
    const students = await User.find({ role: { $regex: /^student$/i } })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    const populated = await Promise.all(
      students.map(async (student) => {
        let gigs = [];
        let ordersCount = 0;
        let reviews = [];

        try {
          gigs = await Gig.find({
            $or: [{ seller: student._id }, { user: student._id }]
          }).select('title category price rating reviewCount');

          ordersCount = await Order.countDocuments({ seller: student._id });

          const reviewOrders = await Order.find({
            seller: student._id,
            'review.rating': { $exists: true }
          })
            .populate('buyer', 'name avatar email')
            .select('review buyer gig createdAt')
            .sort({ 'review.createdAt': -1 });

          reviews = reviewOrders.map((ord) => ({
            id: ord._id,
            rating: ord.review?.rating || 5,
            comment: ord.review?.comment || '',
            reviewerName: ord.buyer?.name || 'Verified Client',
            reviewerAvatar: ord.buyer?.avatar,
            date: ord.review?.createdAt || ord.createdAt
          }));
        } catch (e) {
          console.warn('Error fetching student details:', e.message);
        }

        return {
          ...student,
          gigs: gigs || [],
          ordersCount,
          reviews: reviews || []
        };
      })
    );

    res.status(200).json({ success: true, count: populated.length, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Clients with Jobs, Orders, Profile & Reviews
export const getAdminClients = async (req, res) => {
  try {
    const clients = await User.find({ role: { $regex: /^client$/i } })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    const populated = await Promise.all(
      clients.map(async (client) => {
        let jobs = [];
        let ordersCount = 0;
        let reviews = [];

        try {
          jobs = await Job.find({ client: client._id })
            .select('title category budget deadline status proposals');

          ordersCount = await Order.countDocuments({ buyer: client._id });

          const reviewOrders = await Order.find({
            buyer: client._id,
            'sellerReview.rating': { $exists: true }
          })
            .populate('seller', 'name avatar studentRegNumber')
            .select('sellerReview seller gig createdAt')
            .sort({ 'sellerReview.createdAt': -1 });

          reviews = reviewOrders.map((ord) => ({
            id: ord._id,
            rating: ord.sellerReview?.rating || 5,
            comment: ord.sellerReview?.comment || '',
            reviewerName: ord.seller?.name || 'Campus Student',
            reviewerAvatar: ord.seller?.avatar,
            studentRegNumber: ord.seller?.studentRegNumber,
            date: ord.sellerReview?.createdAt || ord.createdAt
          }));
        } catch (e) {
          console.warn('Error fetching client details:', e.message);
        }

        return {
          ...client,
          jobs: jobs || [],
          ordersCount,
          reviews: reviews || []
        };
      })
    );

    res.status(200).json({ success: true, count: populated.length, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Verify / Reject Student with Instant Notification Trigger
export const verifyStudentStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // 'verified' | 'rejected' | 'pending'

    const student = await User.findByIdAndUpdate(
      userId,
      {
        verificationStatus: status,
        isVerifiedStudent: status === 'verified'
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student account not found' });
    }

    // Notification Trigger
    try {
      if (status === 'verified') {
        await createNotification({
          recipient: student._id,
          user: student._id,
          sender: req.user._id,
          type: 'system',
          title: 'Campus Account Verified! 🎓',
          message: `Congratulations! Your student ID (${student.studentRegNumber || 'Reg No'}) has been verified by UniGig Admin.`,
          link: '/stddashboard'
        });
      } else if (status === 'rejected') {
        await createNotification({
          recipient: student._id,
          user: student._id,
          sender: req.user._id,
          type: 'system',
          title: 'Verification Status Updated ⚠️',
          message: 'Your university verification could not be approved. Please review your Registration Number.',
          link: '/stddashboard'
        });
      }
    } catch (notifErr) {
      console.warn('Notification trigger warning:', notifErr.message);
    }

    res.status(200).json({
      success: true,
      message: `Student status successfully updated to "${status}"`,
      user: student
    });
  } catch (error) {
    console.error('Verify status error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update User Profile & Wallet Balance (Student or Client)
export const updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, walletBalance, verificationStatus, studentRegNumber, university } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (walletBalance !== undefined) user.walletBalance = Number(walletBalance);
    if (verificationStatus) {
      user.verificationStatus = verificationStatus;
      user.isVerifiedStudent = verificationStatus === 'verified';
    }
    if (studentRegNumber !== undefined) user.studentRegNumber = studentRegNumber;
    if (university) user.university = university;

    await user.save();
    res.status(200).json({ success: true, message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Delete User (Student or Client)
export const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if ((user.role || '').toLowerCase() === 'student') {
      await Gig.deleteMany({ $or: [{ seller: userId }, { user: userId }] });
    } else if ((user.role || '').toLowerCase() === 'client') {
      await Job.deleteMany({ client: userId });
    }

    res.status(200).json({ success: true, message: 'User and listings removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6. Delete Gig by Admin
export const deleteGigByAdmin = async (req, res) => {
  try {
    const { gigId } = req.params;
    await Gig.findByIdAndDelete(gigId);
    res.status(200).json({ success: true, message: 'Gig removed by Admin' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7. Delete Job by Admin
export const deleteJobByAdmin = async (req, res) => {
  try {
    const { jobId } = req.params;
    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ success: true, message: 'Job post removed by Admin' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};