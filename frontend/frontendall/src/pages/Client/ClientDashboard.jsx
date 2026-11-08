import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Star,
  ShieldCheck,
  Plus,
  Loader2,
  Users,
  X,
  Trash2,
  DollarSign,
  Clock,
  Sparkles,
  ArrowUpRight,
  FileText,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import API from '../../api/axios';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('deliverables');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Client Reviews state
  const [clientReviews, setClientReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [acceptingBidId, setAcceptingBidId] = useState(null);

  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState(null);
  const [approvingOrderId, setApprovingOrderId] = useState(null);

  const [ratingOrder, setRatingOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchClientReviews = async (clientId) => {
    try {
      setLoadingReviews(true);
      const targetId = clientId || user?._id || user?.id;
      if (!targetId) return;
      const res = await API.get(`/orders/reviews/client/${targetId}`);
      if (res.data?.success) {
        setClientReviews(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch client reviews:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const fetchData = async () => {
    try {
      const profileRes = await API.get('/auth/profile');
      if (profileRes.data?.user) {
        setUser(profileRes.data.user);
        localStorage.setItem('user', JSON.stringify(profileRes.data.user));
        fetchClientReviews(profileRes.data.user._id);
      }
    } catch (err) {
      console.error(err);
    }

    try {
      setLoadingJobs(true);
      const jobsRes = await API.get('/jobs/my-jobs');
      if (jobsRes.data?.success) {
        setJobs(jobsRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }

    try {
      setLoadingOrders(true);
      const ordersRes = await API.get('/orders/my-orders');
      if (ordersRes.data?.success) {
        setOrders(ordersRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this task request? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await API.delete(`/jobs/${jobId}`);
      if (res.data?.success) {
        alert('Task deleted successfully.');
        setJobs((prevJobs) => prevJobs.filter((j) => j._id !== jobId));
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete task.');
    }
  };

  const handleAcceptProposal = async (jobId, proposalId) => {
    if (!window.confirm('Accept this proposal? An escrow order will be created and assigned to this student.')) {
      return;
    }

    try {
      setAcceptingBidId(proposalId);
      const res = await API.put(`/jobs/${jobId}/proposals/${proposalId}/accept`);
      if (res.data?.success) {
        alert('Proposal accepted! Order created in Escrow.');
        setSelectedJobForBids(null);
        fetchData();
        setActiveTab('deliverables');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept proposal.');
    } finally {
      setAcceptingBidId(null);
    }
  };

  const handleApproveEscrow = async (orderId) => {
    if (!window.confirm('Are you sure you want to approve this work and release funds to the student?')) {
      return;
    }

    try {
      setApprovingOrderId(orderId);
      const res = await API.put(`/orders/${orderId}/approve`);
      if (res.data?.success) {
        alert('Payment released successfully! Please leave a review.');
        const approvedOrder = res.data.order || selectedOrderForInspect;
        setSelectedOrderForInspect(null);
        fetchData();
        setRatingOrder(approvedOrder);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to release escrow.');
    } finally {
      setApprovingOrderId(null);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!ratingOrder) return;

    try {
      setSubmittingReview(true);
      const orderId = ratingOrder._id || ratingOrder.id;
      const res = await API.post(`/orders/${orderId}/review`, {
        rating: Number(reviewRating),
        comment: reviewComment.trim()
      });

      if (res.data?.success) {
        alert('Thank you for your feedback! Rating posted successfully.');
        setRatingOrder(null);
        setReviewComment('');
        fetchData();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  // KPI Calculations
  const activeDeliverables = orders.filter(
    (o) => o.status === 'delivered' || o.status === 'in_progress'
  );
  const pastCompleted = orders.filter((o) => o.status === 'completed');

  const escrowLockedAmount = activeDeliverables.reduce(
    (sum, ord) => sum + (Number(ord.price) || 0),
    0
  );

  const totalSpent = pastCompleted.reduce(
    (sum, ord) => sum + (Number(ord.price) || 0),
    0
  );

  const totalProposalsReceived = jobs.reduce(
    (sum, j) => sum + (j.proposals?.length || 0),
    0
  );

  // Dynamic Client Rating Calculation
  const clientAverageRating =
    clientReviews.length > 0
      ? (
          clientReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) /
          clientReviews.length
        ).toFixed(1)
      : user?.rating ? Number(user.rating).toFixed(1) : '5.0';

  return (
    <div className="min-h-screen bg-[#f8faf9] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-70" />
          
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
              alt={user?.name || 'Client Avatar'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#007a4d]/10 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {user?.name || 'Client Dashboard'}
                </h1>
                <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                  <span>Verified Campus Client</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {user?.university?.toUpperCase() || 'CAMPUS CLIENT'} •{' '}
                <span className="font-semibold text-gray-700 capitalize">{user?.role || 'Client'} Account</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/post-job"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post a New Task</span>
            </Link>
            <Link
              to="/browse-jobs"
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#007a4d] hover:border-[#007a4d] bg-white transition-colors cursor-pointer"
              title="Browse Marketplace"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Professional KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">Escrow Locked</span>
              <DollarSign className="w-4 h-4 text-[#007a4d]" />
            </div>
            <div className="text-2xl font-black text-gray-900">${escrowLockedAmount.toFixed(2)}</div>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Safe in Milestone Vault
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Deliverables</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-gray-900">{activeDeliverables.length}</div>
            <p className="text-[11px] text-amber-700 font-medium">In progress or awaiting review</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Spent</span>
              <CheckCircle2 className="w-4 h-4 text-[#007a4d]" />
            </div>
            <div className="text-2xl font-black text-gray-900">${totalSpent.toFixed(2)}</div>
            <p className="text-[11px] text-gray-500 font-medium">{pastCompleted.length} gigs completed & paid</p>
          </div>

          {/* Client Dynamic Rating KPI Card */}
          <div 
            onClick={() => setActiveTab('feedback')}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-200 transition-all"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Buyer Reputation</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1 flex items-center gap-1.5">
                {clientAverageRating}
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </h3>
              <span className="text-[11px] text-[#007a4d] font-semibold mt-1 block hover:underline">
                {clientReviews.length} {clientReviews.length === 1 ? 'peer rating' : 'peer ratings'} →
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Escrow Security Banner */}
        <div className="bg-[#eaf8f1]/60 border border-emerald-100/80 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#007a4d] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">UniGig 100% Campus Milestone Protection Active</h4>
              <p className="text-[11px] text-gray-500">
                Your payment remains securely in escrow until you inspect and approve the completed deliverables.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[10px] uppercase font-mono font-bold tracking-wider text-[#007a4d] bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
            Escrow ID: SEC-LOCKED
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-bold overflow-x-auto scrollbar-none">
          {[
            { id: 'deliverables', label: `Active Deliverables (${activeDeliverables.length})` },
            { id: 'tasks', label: `My Posted Tasks (${jobs.length})` },
            { id: 'completed', label: `Past Completed (${pastCompleted.length})` },
            { id: 'feedback', label: `Student Reviews (${clientReviews.length})` },
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

        {/* TAB 1: ACTIVE DELIVERABLES */}
        {activeTab === 'deliverables' && (
          <div className="space-y-4">
            {loadingOrders ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-2xs">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d] mx-auto" />
              </div>
            ) : activeDeliverables.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-xs text-gray-400 space-y-2">
                <FileText className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="font-bold text-gray-700">No active deliverables right now</p>
                <p>Accept bids from your posted tasks to initiate orders in escrow.</p>
              </div>
            ) : (
              activeDeliverables.map((ord) => {
                const isDelivered = ord.status === 'delivered';
                const studentId = ord.seller?._id || ord.seller?.id || (typeof ord.seller === 'string' ? ord.seller : '');
                const studentName = ord.seller?.name || 'Verified Student';

                return (
                  <div
                    key={ord._id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-gray-400">ORD-{ord._id?.slice(-4).toUpperCase()}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isDelivered
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {isDelivered ? 'Deliverable Ready for Review' : 'Work in Progress'}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900">
                          {ord.gig?.title || ord.requirements?.split('\n')[0] || 'Task Order'}
                        </h3>

                        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500 pt-0.5">
                          <span>Assigned Student:</span>
                          {studentId ? (
                            <Link
                              to={`/student/${studentId}`}
                              className="font-bold text-gray-900 hover:text-[#007a4d] hover:underline inline-flex items-center gap-1 transition-colors"
                              title="View Student Profile"
                            >
                              <span>{studentName}</span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </Link>
                          ) : (
                            <strong className="text-gray-900">{studentName}</strong>
                          )}

                          {studentId && (
                            <Link
                              to={`/messages?peerId=${studentId}`}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#eaf8f1] hover:bg-emerald-100 text-[#007a4d] border border-emerald-200 text-xs font-bold transition-all shadow-2xs cursor-pointer ml-1"
                              title={`Chat with ${studentName}`}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Message</span>
                            </Link>
                          )}

                          <span className="text-gray-300">•</span>
                          <span>
                            Amount: <strong className="text-[#007a4d] font-bold">${ord.price}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        {isDelivered ? (
                          <button
                            type="button"
                            onClick={() => setSelectedOrderForInspect(ord)}
                            className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Inspect & Approve</span>
                          </button>
                        ) : (
                          <div className="text-right">
                            <span className="text-xs font-bold text-gray-600 block">Funds Held in Escrow</span>
                            <span className="text-[11px] text-gray-400">Pending student submission</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                        <div className="text-[#007a4d]">1. Escrow Funded ✓</div>
                        <div className={ord.status ? 'text-[#007a4d]' : 'text-gray-300'}>2. In Progress ✓</div>
                        <div className={isDelivered ? 'text-[#007a4d]' : 'text-gray-300'}>3. Deliverable Submitted</div>
                        <div className="text-gray-300">4. Payout Released</div>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-[#007a4d] h-full transition-all duration-500"
                          style={{ width: isDelivered ? '75%' : '50%' }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: MY POSTED TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {loadingJobs ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-2xs">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d] mx-auto" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-2xs space-y-3">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">You haven't posted any tasks yet</h3>
                <p className="text-xs text-gray-400">Post assignments, club websites, or design tasks to receive student proposals.</p>
                <Link
                  to="/post-job"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] text-white text-xs font-bold rounded-xl hover:bg-[#006640] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post Your First Task</span>
                </Link>
              </div>
            ) : (
              jobs.map((job) => {
                const displayId = `JOB-${job._id?.slice(-4).toUpperCase()}`;
                const proposalsCount = job.proposals?.length || 0;
                const formattedDeadline = job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : 'Flexible';

                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-gray-400">{displayId}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                          {job.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          job.status === 'open'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {job.status === 'open' ? 'Open for Bids' : 'Assigned to Student'}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                      <p className="text-xs text-gray-500">
                        Budget: <strong className="text-gray-800">${job.budget}</strong> • Deadline:{' '}
                        {formattedDeadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => setSelectedJobForBids(job)}
                        className="px-4 py-2 bg-[#eaf8f1] hover:bg-emerald-100 text-[#007a4d] border border-emerald-200 rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Users className="w-4 h-4" />
                        <span>Review {proposalsCount} Student Bids</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-colors cursor-pointer"
                        title="Delete Task Request"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: PAST COMPLETED ORDERS */}
        {activeTab === 'completed' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs">
            <h3 className="text-base font-bold text-gray-900 mb-4">Completed Orders History</h3>
            {pastCompleted.length === 0 ? (
              <p className="text-xs text-gray-400">No completed orders yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {pastCompleted.map((ord) => (
                  <div key={ord._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{ord.gig?.title || 'Custom Task'}</p>
                      <p className="text-gray-500 mt-0.5">
                        Student: <strong className="text-gray-800">{ord.seller?.name || 'Verified Student'}</strong> • Paid:{' '}
                        <strong className="text-[#007a4d] font-bold">${ord.price}</strong>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {ord.review?.rating ? (
                        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1 rounded-xl font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{ord.review.rating}.0 Rated</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setRatingOrder(ord)}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                          <Star className="w-3.5 h-3.5 fill-white" />
                          <span>Leave Review</span>
                        </button>
                      )}
                      
                      <span className="text-[#007a4d] font-bold flex items-center gap-1 bg-[#eaf8f1] px-2.5 py-1 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-[#007a4d]" /> Escrow Paid
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REVIEWS RECEIVED FROM STUDENTS */}
        {activeTab === 'feedback' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Student Feedback & Ratings</span>
                  <span className="text-xs bg-[#eaf8f1] text-[#007a4d] border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold">
                    Campus Verified Buyer
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Reviews and recommendations left by university students you have hired.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-200/70">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-extrabold text-gray-900">{clientAverageRating}</span>
                </div>
                <div className="h-7 w-px bg-gray-200"></div>
                <div className="text-left text-xs">
                  <p className="font-bold text-gray-800">{clientReviews.length} Student Reviews</p>
                  <p className="text-[11px] text-[#007a4d] font-medium">Trusted Client</p>
                </div>
              </div>
            </div>

            {loadingReviews ? (
              <div className="py-16 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                <p className="text-xs text-gray-400">Loading student reviews...</p>
              </div>
            ) : clientReviews.length === 0 ? (
              <div className="py-16 text-center space-y-2 bg-gray-50/50 rounded-2xl border border-gray-100">
                <p className="text-sm font-bold text-gray-700">No student reviews yet</p>
                <p className="text-xs text-gray-400">
                  When students rate their collaboration experience after task completion, it will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {clientReviews.map((rev) => (
                  <div 
                    key={rev.id || rev._id} 
                    className="p-5 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-gray-200 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={rev.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${rev.reviewer || 'Student'}`} 
                          alt={rev.reviewer} 
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-gray-900">{rev.reviewer}</h4>
                            <span className="text-[10px] text-[#007a4d] bg-[#eaf8f1] border border-emerald-100 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5" /> Verified Student
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{rev.university || 'Campus Freelancer'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Number(rev.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-gray-800 ml-1">{rev.rating}.0</span>
                        <span className="text-xs text-gray-400">{rev.date}</span>
                      </div>
                    </div>

                    {rev.gigTitle && (
                      <div className="text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-100 inline-block font-medium">
                        Completed task: <span className="font-bold text-gray-800">{rev.gigTitle}</span>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Inspect Deliverables Modal */}
      {selectedOrderForInspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-5 relative">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-[#007a4d] uppercase tracking-wider bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Inspect Deliverables
                </span>
                <h2 className="text-base font-bold text-gray-900 mt-1">
                  Deliverable for ORD-{selectedOrderForInspect._id?.slice(-4).toUpperCase()}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderForInspect(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Delivered Project URL</label>
                <a
                  href={selectedOrderForInspect.submission?.workUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#007a4d] underline font-bold break-all flex items-center gap-1"
                >
                  {selectedOrderForInspect.submission?.workUrl}
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Student Delivery Notes</label>
                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-700">
                  {selectedOrderForInspect.submission?.notes || 'No notes provided.'}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedOrderForInspect(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                disabled={approvingOrderId === selectedOrderForInspect._id}
                onClick={() => handleApproveEscrow(selectedOrderForInspect._id)}
                className="px-5 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
              >
                {approvingOrderId === selectedOrderForInspect._id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>Approve & Release Escrow</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review & Rating Modal */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Rate Student's Work</h3>
              <button
                type="button"
                onClick={() => setRatingOrder(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= reviewRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience working with this student (quality, communication, delivery)..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] leading-relaxed"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRatingOrder(null)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs active:scale-95"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Bids Modal */}
      {selectedJobForBids && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-[#007a4d] uppercase tracking-wider bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Student Proposals & Reverse Bids
                </span>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mt-1">
                  Bids for: {selectedJobForBids.title}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Budget: <strong className="text-[#007a4d]">${selectedJobForBids.budget}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForBids(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {(!selectedJobForBids.proposals || selectedJobForBids.proposals.length === 0) ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  No student proposals submitted yet for this task.
                </div>
              ) : (
                selectedJobForBids.proposals.map((prop) => (
                  <div
                    key={prop._id}
                    className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={prop.student?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop'}
                          alt={prop.student?.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{prop.student?.name}</h4>
                          <p className="text-[11px] text-gray-400">
                            {prop.student?.university || 'University'} • {prop.student?.studentRegNumber || ''}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black text-[#007a4d]">${prop.bidAmount}</span>
                        <p className="text-[10px] text-gray-400">{prop.deliveryDays} Days delivery</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                      "{prop.coverLetter}"
                    </div>

                    <div className="flex justify-end pt-1">
                      {prop.status === 'accepted' ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                          Accepted & In Progress
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={acceptingBidId === prop._id || selectedJobForBids.status !== 'open'}
                          onClick={() => handleAcceptProposal(selectedJobForBids._id, prop._id)}
                          className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] disabled:bg-gray-400 text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {acceptingBidId === prop._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <span>Accept Bid & Lock Escrow</span>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}