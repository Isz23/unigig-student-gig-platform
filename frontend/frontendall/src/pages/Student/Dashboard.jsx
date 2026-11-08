import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Star,
  Clock,
  Plus,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  UserCheck,
  Briefcase,
  UploadCloud,
  X,
  Send,
  Link2,
  CheckCircle2,
  Loader2,
<<<<<<< Updated upstream
  Trash2
=======
  Trash2,
  MessageSquare,
  ArrowDownToLine,
  Wallet
>>>>>>> Stashed changes
} from 'lucide-react';
import API from '../../api/axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [myGigs, setMyGigs] = useState([]);
  const [loadingGigs, setLoadingGigs] = useState(true);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [selectedOrderForDelivery, setSelectedOrderForDelivery] = useState(null);
  const [deliveryWorkUrl, setDeliveryWorkUrl] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [submittingDelivery, setSubmittingDelivery] = useState(false);

<<<<<<< Updated upstream
=======
  // Student Rates Client Modal states
  const [ratingOrderForClient, setRatingOrderForClient] = useState(null);
  const [clientRating, setClientRating] = useState(5);
  const [clientReviewComment, setClientReviewComment] = useState('');
  const [submittingClientReview, setSubmittingClientReview] = useState(false);

  // Student Withdraw Modal states
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [withdrawAccountNotes, setWithdrawAccountNotes] = useState('');
  const [processingWithdraw, setProcessingWithdraw] = useState(false);

  const fetchReviews = async (sellerId) => {
    try {
      setLoadingReviews(true);
      const targetId = sellerId || user?._id || user?.id;
      if (!targetId) return;
      const res = await API.get(`/orders/reviews/student/${targetId}`);
      if (res.data?.success) {
        setReviews(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

>>>>>>> Stashed changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get('/auth/profile');
        if (res.data?.user) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    const fetchMyGigs = async () => {
      try {
        const res = await API.get('/gigs/my-gigs');
        if (res.data?.success) {
          setMyGigs(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching gigs:', err);
      } finally {
        setLoadingGigs(false);
      }
    };

    const fetchSellerOrders = async () => {
      try {
        const res = await API.get('/orders/seller-orders');
        if (res.data?.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching seller orders:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserProfile();
    fetchMyGigs();
    fetchSellerOrders();
  }, [navigate]);

  const handleDeleteGig = async (gigId) => {
    if (!window.confirm('Are you sure you want to delete this gig?')) return;

    try {
      const res = await API.delete(`/gigs/${gigId}`);
      if (res.data?.success) {
        setMyGigs((prev) => prev.filter((gig) => (gig._id || gig.id) !== gigId));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete gig.');
    }
  };

  const handleOpenDeliveryModal = (order) => {
    setSelectedOrderForDelivery(order);
    setDeliveryWorkUrl('');
    setDeliveryNotes('');
    setIsDeliveryModalOpen(true);
  };

  const handleCloseDeliveryModal = () => {
    setIsDeliveryModalOpen(false);
    setSelectedOrderForDelivery(null);
  };

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    if (!deliveryWorkUrl.trim()) return;

    setSubmittingDelivery(true);
    const orderId = selectedOrderForDelivery._id || selectedOrderForDelivery.id;

    try {
      const res = await API.put(`/orders/${orderId}/submit`, {
        workUrl: deliveryWorkUrl.trim(),
        notes: deliveryNotes.trim()
      });

      if (res.data?.success) {
        alert('🎉 Work submitted successfully! Awaiting client review.');
        setOrders((prev) =>
          prev.map((ord) =>
            (ord._id || ord.id) === orderId
              ? {
                  ...ord,
                  status: 'delivered',
                  submission: {
                    workUrl: deliveryWorkUrl,
                    notes: deliveryNotes,
                    submittedAt: new Date()
                  }
                }
              : ord
          )
        );
        handleCloseDeliveryModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit deliverable.');
    } finally {
      setSubmittingDelivery(false);
    }
  };

<<<<<<< Updated upstream
=======
  // Submit Feedback / Review for Client
  const handleSubmitClientReview = async (e) => {
    e.preventDefault();
    if (!ratingOrderForClient) return;

    try {
      setSubmittingClientReview(true);
      const orderId = ratingOrderForClient._id || ratingOrderForClient.id;
      const res = await API.post(`/orders/${orderId}/review-client`, {
        rating: Number(clientRating),
        comment: clientReviewComment.trim()
      });

      if (res.data?.success) {
        alert('🎉 Thank you! Your feedback for the client has been posted successfully.');
        setOrders((prev) =>
          prev.map((ord) =>
            (ord._id || ord.id) === orderId
              ? { ...ord, sellerReview: res.data.sellerReview }
              : ord
          )
        );
        setRatingOrderForClient(null);
        setClientReviewComment('');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review for client.');
    } finally {
      setSubmittingClientReview(false);
    }
  };

  // Handle Student Withdrawal Request
  const handleConfirmWithdrawal = (e) => {
    e.preventDefault();
    const currentBalance = Number(user?.walletBalance || 0);
    const requested = Number(withdrawAmount);

    if (requested <= 0 || isNaN(requested)) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }

    if (requested > currentBalance) {
      alert(`Insufficient funds! Your available balance is $${currentBalance.toFixed(2)}.`);
      return;
    }

    setProcessingWithdraw(true);
    setTimeout(() => {
      const newBal = currentBalance - requested;
      const updatedUser = { ...user, walletBalance: newBal };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setProcessingWithdraw(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setWithdrawAccountNotes('');

      alert(
        `✅ Withdrawal request of $${requested.toFixed(2)} submitted successfully!\n\nFunds will be credited to your account via ${withdrawMethod.toUpperCase()} within 24-48 business hours.`
      );
    }, 600);
  };

>>>>>>> Stashed changes
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'in_progress' || o.status === 'delivered'
  ).length;

  const pendingEscrowAmount = orders
    .filter((o) => o.escrowStatus === 'held_in_escrow' && o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.price || 0), 0);

  const reviews = [
    {
      id: 1,
      reviewer: 'Kavindu Perera',
      university: 'University of Moratuwa',
      rating: 5,
      date: '2 days ago',
      gigTitle: 'Responsive React & Tailwind Web App Development',
      comment: 'Super fast delivery and clean React code! The UI was responsive across mobile screens.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop'
    },
    {
      id: 2,
      reviewer: 'Sanduni Fernando',
      university: 'University of Peradeniya',
      rating: 5,
      date: '1 week ago',
      gigTitle: 'Computer Networks & Subnetting Problem Tutoring',
      comment: 'Explained VLSM subnetting calculations very clearly in a 40-minute session.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
              alt={user?.name || 'Student Avatar'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#007a4d]/10 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {user?.name || 'Campus Student'}
                </h1>

                {user?.verificationStatus === 'verified' ? (
                  <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                    <span>Verified Student</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Verification Pending</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {user?.university || 'South Eastern University of Sri Lanka'} •{' '}
                <span className="text-gray-800 font-semibold">
                  {user?.studentRegNumber || 'Reg No Pending'}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {user?.faculty || 'Undergraduate Member'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/browse-jobs"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs border border-gray-200 shadow-2xs transition-all"
            >
              <Briefcase className="w-4 h-4 text-[#007a4d]" />
              <span>Apply to Jobs</span>
            </Link>

            <Link
              to="/create-gig"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Gig</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Available Balance + Withdraw Action */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Available Balance</p>
                <h3 className="text-2xl font-black text-gray-900 mt-1">
                  ${Number(user?.walletBalance || 0).toFixed(2)}
                </h3>
                <span className="text-[11px] text-[#007a4d] font-semibold flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3 h-3" /> Ready for withdrawal
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setWithdrawAmount(Number(user?.walletBalance || 0).toFixed(2));
                setIsWithdrawModalOpen(true);
              }}
              className="w-full py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Withdraw Funds</span>
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Orders</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{activeOrdersCount}</h3>
              <span className="text-[11px] text-gray-500 mt-1 block font-medium">In Queue / Delivering</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Clearance</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">
                ${Number(user?.pendingEscrowBalance || pendingEscrowAmount).toFixed(2)}
              </h3>
              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> In Escrow security
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('reviews')}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-200 transition-all"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Student Rating</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1 flex items-center gap-1.5">
                5.0
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </h3>
              <span className="text-[11px] text-[#007a4d] font-semibold mt-1 block hover:underline">
                View all reviews →
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Recent Activity' },
            { id: 'gigs', label: `My Posted Gigs (${myGigs.length})` },
            { id: 'orders', label: `All Orders (${orders.length})` },
            { id: 'reviews', label: `Reviews & Feedback (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-5 sm:p-7 shadow-2xs">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-gray-900">Current Ongoing Tasks</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#007a4d] hover:underline flex items-center gap-1 cursor-pointer">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {loadingOrders ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                    <p className="text-xs text-gray-400">Loading your tasks...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-12 text-center space-y-2 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <p className="text-sm font-bold text-gray-700">No ongoing tasks yet</p>
                    <p className="text-xs text-gray-400">When peers place an order for your gigs, it will appear here.</p>
                  </div>
                ) : (
                  orders.slice(0, 3).map((ord) => {
                    const displayId = `ORD-${ord._id?.slice(-4).toUpperCase()}`;
                    const gigTitle = ord.gig?.title || 'Campus Gig Service';
                    const buyerName = ord.buyer?.name || 'Verified Client';
                    const deadlineFormatted = ord.deliveryDeadline
                      ? new Date(ord.deliveryDeadline).toLocaleDateString()
                      : 'Standard';

                    return (
                      <div key={ord._id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-gray-400">{displayId}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              ord.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : ord.status === 'delivered'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : ord.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                              {ord.status === 'in_progress' ? 'In Progress' : ord.status === 'delivered' ? 'Delivered' : ord.status}
                            </span>
                            <span className="text-[11px] text-gray-500 font-medium">({ord.packageTier || 'Basic'})</span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{gigTitle}</h4>
                          <p className="text-xs text-gray-500">
                            Client: <strong className="text-gray-700">{buyerName}</strong> • Due: {deadlineFormatted}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <span className="text-sm font-black text-[#007a4d]">${ord.price?.toFixed(2)}</span>

                          {ord.status === 'in_progress' && (
                            <button
                              type="button"
                              onClick={() => handleOpenDeliveryModal(ord)}
                              className="px-3.5 py-1.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                            >
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Deliver Work</span>
                            </button>
                          )}

                          {ord.status === 'delivered' && (
                            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">
                              Awaiting Review
                            </span>
                          )}

                          {ord.status === 'completed' && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100">
                              Completed & Paid
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Escrow Security Active</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-2">
                  All peer payments are held safely in escrow. Once you submit your deliverable, the client reviews it to release funds directly to your wallet.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <Link
                  to="/browse"
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Other Gigs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: My Gigs */}
        {activeTab === 'gigs' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">My Service Gigs</h3>
                <p className="text-xs text-gray-500 mt-0.5">Manage your active service offerings and view statistics</p>
              </div>
              <Link
                to="/create-gig"
                className="inline-flex items-center gap-1.5 bg-[#007a4d] hover:bg-[#006640] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Gig</span>
              </Link>
            </div>

            {loadingGigs ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                <p className="text-xs text-gray-500">Loading your gigs...</p>
              </div>
            ) : myGigs.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-sm font-bold text-gray-800">You haven't posted any gigs yet</p>
                <p className="text-xs text-gray-400">Offer your skills or project assistance to start receiving orders.</p>
                <Link
                  to="/create-gig"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] text-white text-xs font-bold rounded-xl hover:bg-[#006640] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Your First Gig</span>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {myGigs.map((gig) => {
                  const gigId = gig._id || gig.id;
                  const startingPrice = gig.packages?.basic?.price || gig.price || 15;

                  return (
                    <div key={gigId} className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1 max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d] bg-[#eaf8f1] px-2 py-0.5 rounded-full border border-emerald-100">
                            {gig.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            gig.status === 'Active' ? 'bg-emerald-50 text-[#007a4d] border border-emerald-100' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {gig.status || 'Active'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{gig.title}</h4>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-gray-500">
                        <div>
                          <span className="block font-bold text-gray-900 text-sm">${startingPrice}</span>
                          <span className="text-[10px] text-gray-400 uppercase">Starting Price</span>
                        </div>
                        <div>
                          <span className="block font-bold text-gray-900 text-sm">{gig.turnaround || '1-2 Days'}</span>
                          <span className="text-[10px] text-gray-400 uppercase">Delivery</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteGig(gigId)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                          title="Delete Gig"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: All Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Complete Order Records</h3>
            
            {loadingOrders ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                <p className="text-xs text-gray-400">Loading order records...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400">
                No orders recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-bold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Gig Service</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {orders.map((ord) => {
                      const displayId = `ORD-${ord._id?.slice(-4).toUpperCase()}`;
                      const gigTitle = ord.gig?.title || 'Campus Gig Service';
                      const buyerName = ord.buyer?.name || 'Client';

                      return (
                        <tr key={ord._id} className="hover:bg-gray-50/50">
                          <td className="py-4 font-mono font-bold text-gray-900">{displayId}</td>
                          <td className="py-4 font-semibold text-gray-900">{gigTitle}</td>
                          <td className="py-4 text-gray-500">{buyerName}</td>
                          <td className="py-4 font-bold text-[#007a4d]">${ord.price?.toFixed(2)}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              ord.status === 'in_progress'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : ord.status === 'delivered'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : ord.status === 'completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}>
                              {ord.status === 'in_progress' ? 'In Progress' : ord.status === 'delivered' ? 'Delivered' : ord.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {ord.status === 'in_progress' ? (
                              <button
                                type="button"
                                onClick={() => handleOpenDeliveryModal(ord)}
                                className="px-3 py-1 bg-[#007a4d] hover:bg-[#006640] text-white rounded-lg text-xs font-bold shadow-2xs transition-all cursor-pointer"
                              >
                                Deliver Work
                              </button>
                            ) : ord.status === 'delivered' ? (
                              <span className="text-[11px] text-blue-600 font-semibold">Under Client Review</span>
                            ) : ord.status === 'completed' ? (
                              <span className="text-[11px] text-emerald-600 font-semibold">Payment Received</span>
                            ) : (
                              <span className="text-[11px] text-gray-400">Closed</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Client & Peer Feedback</span>
                  <span className="text-xs bg-[#eaf8f1] text-[#007a4d] border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                    100% Positive
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Verified reviews given by students & clients on completed task orders.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-200/70">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-extrabold text-gray-900">5.0</span>
                </div>
                <div className="h-7 w-px bg-gray-200"></div>
                <div className="text-left text-xs">
                  <p className="font-bold text-gray-800">{reviews.length} Total Reviews</p>
                  <p className="text-[11px] text-gray-500">Campus Rank Active</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-5 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-gray-200 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.avatar} 
                        alt={rev.reviewer} 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{rev.reviewer}</h4>
                          <span className="text-[10px] text-[#007a4d] bg-[#eaf8f1] border border-emerald-100 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5" /> Verified Order
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{rev.university}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800 ml-1">{rev.rating}</span>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-100 inline-block font-medium">
                    Order for: <span className="font-bold text-gray-800">{rev.gigTitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Student Withdrawal Request Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 relative">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center">
                  <ArrowDownToLine className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Withdraw Student Earnings</h3>
                  <p className="text-xs text-gray-500">
                    Available: <strong className="text-[#007a4d]">${Number(user?.walletBalance || 0).toFixed(2)}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmWithdrawal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Withdrawal Amount ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={Number(user?.walletBalance || 0)}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 focus:outline-none focus:border-[#007a4d] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Payout Method
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'bank', label: 'Bank Transfer' },
                    { id: 'ezcash', label: 'eZ Cash / mCash' }
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setWithdrawMethod(m.id)}
                      className={`py-2 px-3 rounded-xl border font-bold cursor-pointer transition-all ${
                        withdrawMethod === m.id
                          ? 'bg-[#eaf8f1] text-[#007a4d] border-[#007a4d]'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Account Details / Mobile Number
                </label>
                <textarea
                  rows={2}
                  required
                  value={withdrawAccountNotes}
                  onChange={(e) => setWithdrawAccountNotes(e.target.value)}
                  placeholder="Enter Bank Name, Account Number, Branch (or Mobile Wallet Number)..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#007a4d] focus:bg-white leading-relaxed"
                />
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-2 text-[11px] text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Zero platform withdrawal fees for verified university students.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processingWithdraw}
                  className="px-5 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  {processingWithdraw ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Confirm Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deliver Work Modal */}
      {isDeliveryModalOpen && selectedOrderForDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative animate-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-[#007a4d] uppercase tracking-wider bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Deliver Work & Complete Task
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-1">
                  Deliver for: ORD-{selectedOrderForDelivery._id?.slice(-4).toUpperCase()}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Client: <strong className="text-gray-800">{selectedOrderForDelivery.buyer?.name || 'Client'}</strong> • Value:{' '}
                  <strong className="text-[#007a4d]">${selectedOrderForDelivery.price}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseDeliveryModal}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitDelivery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Deliverable Link (GitHub / Google Drive / Figma / Preview URL) *
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    required
                    value={deliveryWorkUrl}
                    onChange={(e) => setDeliveryWorkUrl(e.target.value)}
                    placeholder="https://github.com/... or https://drive.google.com/..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Make sure shareable links are set to "Anyone with the link can view".
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Delivery Message & Notes for Client
                </label>
                <textarea
                  rows={4}
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Summarize the completed deliverables, setup instructions, or notes on how you implemented the project..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 leading-relaxed"
                />
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-[#007a4d] shrink-0" />
                <span>Once submitted, the buyer inspects and approves to release the escrow funds to your wallet.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={submittingDelivery}
                  onClick={handleCloseDeliveryModal}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDelivery}
                  className="px-6 py-2.5 bg-[#007a4d] hover:bg-[#006640] disabled:bg-gray-400 text-white rounded-xl font-bold text-xs shadow-2xs flex items-center gap-2 active:scale-95 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {submittingDelivery ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Deliverable</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}