import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  DollarSign,
  Clock,
  Plus,
  CheckCircle2,
  Star,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  X,
  Check,
  Eye,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Calendar,
  Percent,
  Layers,
  Loader2
} from 'lucide-react';
import API from '../../api/axios';

export default function ClientDashboard() {
  const navigate = useNavigate();

  // 1. Client Profile Data Sync
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await API.get('/auth/profile');
        if (res.data?.user) {
          if (res.data.user.role !== 'client') {
            navigate('/signup?role=client');
            return;
          }
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchClientProfile();
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('tasks');

  // Backend Orders States
  const [myPurchasedOrders, setMyPurchasedOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [inspectDeliverableOrder, setInspectDeliverableOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [releasingEscrow, setReleasingEscrow] = useState(false);

  // Backend එකෙන් Client ගේ Live Orders Fetch කිරීම
  const fetchClientOrders = async () => {
    try {
      const res = await API.get('/orders/my-orders');
      if (res.data?.success) {
        setMyPurchasedOrders(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch client orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchClientOrders();
  }, []);

  // Posted Task Requests (Bidding Mock / Live Placeholder)
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'JOB-9481',
      title: 'Need React & Tailwind Landing Page for IEEE Club',
      category: 'Coding & Tech',
      budget: 35,
      deadline: 'Nov 05, 2026',
      status: 'Open for Bids',
      proposalsCount: 2,
      proposals: [
        {
          id: 'PROP-01',
          studentId: 'std-001',
          studentName: 'Dulaksha Nipun',
          university: 'South Eastern University of Sri Lanka',
          studentReg: 'SEU/IS/22/ICT/047',
          bidAmount: 35,
          deliveryDays: '3 Days',
          coverLetter: 'I have pre-configured Vite and Tailwind CSS component systems for campus clubs. Can deliver fully mobile-responsive code with clean Git commits.',
          rating: 4.9,
          completedGigs: 14
        },
        {
          id: 'PROP-02',
          studentId: 'std-002',
          studentName: 'Kasun Bandara',
          university: 'University of Moratuwa',
          studentReg: 'UOM/IT/23/089',
          bidAmount: 30,
          deliveryDays: '4 Days',
          coverLetter: 'Experienced with frontend styling and Lucide React icons. Ready to start immediately.',
          rating: 4.7,
          completedGigs: 8
        }
      ]
    }
  ]);

  // Orders Filter: Active vs Completed
  const activeOrders = myPurchasedOrders.filter(
    (o) => o.status === 'in_progress' || o.status === 'delivered'
  );
  const completedOrders = myPurchasedOrders.filter(
    (o) => o.status === 'completed'
  );

  // Stats calculation
  const totalInvested = myPurchasedOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.price || 0), 0);

  const lockedInEscrow = activeOrders.reduce((sum, o) => sum + (o.price || 0), 0);

  // Escrow Approval & Payment Release (Backend API Call)
  const handleReleasePayment = async (order) => {
    setReleasingEscrow(true);
    const orderId = order._id || order.id || order.orderId;

    try {
      const res = await API.put(`/orders/${orderId}/approve`);
      if (res.data?.success) {
        alert('🎉 Work approved! Escrow payment released to the student.');
        setInspectDeliverableOrder(null);
        setRatingOrder(res.data.order || order);
        fetchClientOrders();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to release escrow payment.');
    } finally {
      setReleasingEscrow(false);
    }
  };

  // Submit Rating & Review (Backend API Call)
  const handleSubmitRating = async (e) => {
    e.preventDefault();
    const orderId = ratingOrder._id || ratingOrder.id || ratingOrder.orderId;

    try {
      await API.post(`/orders/${orderId}/review`, {
        rating: ratingValue,
        comment: reviewFeedback.trim() || 'Great collaboration!'
      });
      alert('Review submitted successfully!');
      fetchClientOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setRatingOrder(null);
      setReviewFeedback('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Rich Client Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'}
                alt={user?.name || 'Client Avatar'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-emerald-500/10 shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    {user?.name || 'Campus Client'}
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                    <span>Verified Client</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                  <GraduationCap className="w-4 h-4 text-[#007a4d]" />
                  <span>{user?.university || 'University of Moratuwa'}</span>
                </div>

                <p className="text-xs text-gray-400">
                  {user?.faculty || 'Club Lead / Student Organization • Campus Buyer'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-[#007a4d] bg-[#eaf8f1] px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Campus Buyer</span>
              </span>

              <Link
                to="/post-job"
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-2 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Task Request</span>
              </Link>
            </div>
          </div>

          {/* Quick Client Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Tasks Posted</span>
              <h3 className="text-lg font-black text-gray-900">{postedJobs.length} Tasks</h3>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hire Rate</span>
              <h3 className="text-lg font-black text-[#007a4d]">100%</h3>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Invested</span>
              <h3 className="text-lg font-black text-gray-900">${totalInvested.toFixed(2)}</h3>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Member Since</span>
              <h3 className="text-lg font-black text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2026'}
              </h3>
            </div>
          </div>
        </div>

        {/* 2. Escrow Balance & Ongoing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Escrow Protected Funds</p>
              <h3 className="text-xl font-extrabold text-gray-900">${lockedInEscrow.toFixed(2)}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Active Campus Projects</p>
              <h3 className="text-xl font-extrabold text-gray-900">{activeOrders.length} In Progress</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Completed Orders</p>
              <h3 className="text-xl font-extrabold text-gray-900">{completedOrders.length} Approved</h3>
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 transition-colors relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'tasks' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>My Posted Tasks ({postedJobs.length})</span>
            {activeTab === 'tasks' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activeOrders')}
            className={`pb-3 transition-colors relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'activeOrders' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Active Deliverables ({activeOrders.length})</span>
            {activeOrders.some((o) => o.status === 'delivered') && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
            {activeTab === 'activeOrders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`pb-3 transition-colors relative flex items-center gap-2 cursor-pointer ${
              activeTab === 'completed' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Past Completed ({completedOrders.length})</span>
            {activeTab === 'completed' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>
        </div>

        {/* Tab 1: Posted Job Requests */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs hover:border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {job.id}
                    </span>
                    <span className="text-[10px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {job.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        job.status === 'Open for Bids'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-gray-900">{job.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="font-semibold text-gray-800">Budget: ${job.budget}</span>
                    <span>•</span>
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {job.proposalsCount > 0 ? (
                    <button
                      type="button"
                      onClick={() => setSelectedJobForBids(job)}
                      className="px-4 py-2 bg-[#eaf8f1] text-[#007a4d] hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Review {job.proposalsCount} Student Bids</span>
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 italic">No proposals yet</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Live Active Deliverables (From Backend DB) */}
        {activeTab === 'activeOrders' && (
          <div className="space-y-4">
            {loadingOrders ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-gray-100">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                <p className="text-xs text-gray-400">Loading active orders...</p>
              </div>
            ) : activeOrders.length === 0 ? (
              <div className="py-16 text-center space-y-2 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm font-bold text-gray-700">No active deliverables right now</p>
                <p className="text-xs text-gray-400">Browse gigs or post a task to hire university peers.</p>
                <Link
                  to="/browse"
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] text-white text-xs font-bold rounded-xl"
                >
                  Explore Gigs
                </Link>
              </div>
            ) : (
              activeOrders.map((order) => {
                const ordId = `ORD-${order._id?.slice(-4).toUpperCase()}`;
                const gigTitle = order.gig?.title || 'Campus Gig Service';
                const studentName = order.seller?.name || 'Assigned Student';
                const studentReg = order.seller?.studentRegNumber || 'Reg No Pending';

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#007a4d]">{ordId}</span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#eaf8f1] text-[#007a4d] border border-emerald-100">
                            Funds Locked in Escrow
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900">{gigTitle}</h3>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-gray-400">Locked Amount</span>
                        <h4 className="text-lg font-black text-[#007a4d]">${order.price?.toFixed(2)}</h4>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      <div className="text-xs text-gray-600">
                        <p>
                          Assigned Student: <strong className="text-gray-900">{studentName}</strong> ({studentReg})
                        </p>
                        <p className="text-gray-400 mt-0.5">
                          Status: <strong className={order.status === 'delivered' ? 'text-blue-600' : 'text-amber-600'}>
                            {order.status === 'delivered' ? 'Deliverable Submitted (Review Needed)' : 'In Progress'}
                          </strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/messages?peerId=${order.seller?._id || ''}`}
                          className="px-3.5 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#007a4d]" />
                          <span>Chat</span>
                        </Link>

                        {order.status === 'delivered' ? (
                          <button
                            type="button"
                            onClick={() => setInspectDeliverableOrder(order)}
                            className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Inspect & Approve</span>
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Work in progress</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 3: Completed Orders */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-400 bg-white rounded-2xl border border-gray-100">
                No completed orders yet.
              </div>
            ) : (
              completedOrders.map((order) => {
                const ordId = `ORD-${order._id?.slice(-4).toUpperCase()}`;
                const gigTitle = order.gig?.title || 'Campus Gig Service';
                const studentName = order.seller?.name || 'Verified Student';
                const completedDate = new Date(order.updatedAt).toLocaleDateString();

                return (
                  <div
                    key={order._id}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-500">{ordId}</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#eaf8f1] text-[#007a4d] border border-emerald-100">
                          Payment Released
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{gigTitle}</h3>
                      <p className="text-xs text-gray-500">
                        Completed by <strong className="text-gray-800">{studentName}</strong> on {completedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-xs text-gray-400">Total Paid</span>
                        <h4 className="text-base font-extrabold text-gray-900">${order.price?.toFixed(2)}</h4>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/40">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{order.review?.rating || 5}.0</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

      {/* Inspect Deliverable Modal */}
      {inspectDeliverableOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Inspect Student Deliverable</h3>
                <p className="text-xs text-gray-500">ORD-{inspectDeliverableOrder._id?.slice(-4).toUpperCase()}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectDeliverableOrder(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1 border border-gray-100">
                <span className="font-bold text-gray-900">Student Submission Note:</span>
                <p className="italic text-gray-600 leading-relaxed">
                  {inspectDeliverableOrder.submission?.notes || 'No extra notes provided by student.'}
                </p>
              </div>

              {inspectDeliverableOrder.submission?.workUrl && (
                <div className="space-y-2">
                  <span className="font-bold text-gray-900">Verification Link:</span>
                  <a
                    href={inspectDeliverableOrder.submission.workUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-between font-medium text-[#007a4d] transition-colors cursor-pointer"
                  >
                    <span className="truncate pr-2">{inspectDeliverableOrder.submission.workUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              )}

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#007a4d] mt-0.5" />
                <span className="leading-relaxed">
                  Approving work will immediately transfer <strong>${inspectDeliverableOrder.price}</strong> from Escrow to the student's wallet balance.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                disabled={releasingEscrow}
                onClick={() => setInspectDeliverableOrder(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                disabled={releasingEscrow}
                onClick={() => handleReleasePayment(inspectDeliverableOrder)}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] disabled:bg-gray-400 text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
              >
                {releasingEscrow ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Releasing Escrow...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Approve Work & Release Escrow (${inspectDeliverableOrder.price})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rating & Feedback Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-50 text-[#007a4d] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Rate Student Freelancer</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Leave feedback for <strong className="text-gray-800">{ratingOrder.seller?.name || 'Student'}</strong> to build their campus reputation.
              </p>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    className="p-1 focus:outline-none transition-transform active:scale-90 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= ratingValue ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Public Feedback / Testimonial
                </label>
                <textarea
                  rows={3}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="e.g. Great code quality, very polite and delivered right on time!"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Submit Rating & Complete
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}