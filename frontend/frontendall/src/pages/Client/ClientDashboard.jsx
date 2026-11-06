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
  Trash2
} from 'lucide-react';
import API from '../../api/axios';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('tasks');
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

  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [acceptingBidId, setAcceptingBidId] = useState(null);

  const [selectedOrderForInspect, setSelectedOrderForInspect] = useState(null);
  const [approvingOrderId, setApprovingOrderId] = useState(null);

  const [ratingOrder, setRatingOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchData = async () => {
    try {
      const profileRes = await API.get('/auth/profile');
      if (profileRes.data?.user) {
        setUser(profileRes.data.user);
        localStorage.setItem('user', JSON.stringify(profileRes.data.user));
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
        const approvedOrder = selectedOrderForInspect;
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
        alert('Thank you for your feedback!');
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

  const activeDeliverables = orders.filter(
    (o) => o.status === 'delivered' || o.status === 'in_progress'
  );

  const pastCompleted = orders.filter((o) => o.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">
        
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'}
              alt={user?.name || 'Client Avatar'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#007a4d]/10 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {user?.name || 'Client Profile'}
                </h1>
                <span className="inline-flex items-center gap-1 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                  <span>Verified Campus Client</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {user?.university || 'University Member'} • <span className="font-semibold text-gray-700">{user?.role || 'Client'}</span>
              </p>
            </div>
          </div>

          <Link
            to="/post-job"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Post a New Task</span>
          </Link>
        </div>

        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none">
          {[
            { id: 'tasks', label: `My Posted Tasks (${jobs.length})` },
            { id: 'deliverables', label: `Active Deliverables (${activeDeliverables.length})` },
            { id: 'completed', label: `Past Completed (${pastCompleted.length})` },
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

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {loadingJobs ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-2xs flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d]" />
                <p className="text-xs text-gray-400">Loading your posted tasks...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-2xs space-y-3">
                <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">You haven't posted any tasks yet</h3>
                <p className="text-xs text-gray-400">Post assignments, club websites, or design tasks to get student bids.</p>
                <Link
                  to="/post-job"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] text-white text-xs font-bold rounded-xl hover:bg-[#006640] transition-colors"
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
                        Budget: <strong className="text-gray-800">${job.budget}</strong> • Deadline: {formattedDeadline}
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

        {activeTab === 'deliverables' && (
          <div className="space-y-4">
            {loadingOrders ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-2xs">
                <Loader2 className="w-6 h-6 animate-spin text-[#007a4d] mx-auto" />
              </div>
            ) : activeDeliverables.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-xs text-gray-400">
                No active deliverables awaiting review right now.
              </div>
            ) : (
              activeDeliverables.map((ord) => (
                <div
                  key={ord._id}
                  className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-gray-400">ORD-{ord._id?.slice(-4).toUpperCase()}</span>
                    <h3 className="text-sm font-bold text-gray-900">{ord.gig?.title || ord.requirements?.split('\n')[0]}</h3>
                    <p className="text-xs text-gray-500">
                      Assigned Student: <strong className="text-gray-800">{ord.seller?.name || 'Student'}</strong> • Amount: <strong className="text-[#007a4d]">${ord.price}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {ord.status === 'delivered' ? (
                      <button
                        type="button"
                        onClick={() => setSelectedOrderForInspect(ord)}
                        className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Inspect & Approve</span>
                      </button>
                    ) : (
                      <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl font-bold">
                        Work in Progress
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs">
            <h3 className="text-base font-bold text-gray-900 mb-4">Completed Orders History</h3>
            {pastCompleted.length === 0 ? (
              <p className="text-xs text-gray-400">No completed orders yet.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {pastCompleted.map((ord) => (
                  <div key={ord._id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{ord.gig?.title || 'Custom Task'}</p>
                      <p className="text-gray-400">Student: {ord.seller?.name} • Paid: ${ord.price}</p>
                    </div>
                    <span className="text-[#007a4d] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed & Escrow Paid
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

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
                          <p className="text-[11px] text-gray-400">{prop.student?.university} • {prop.student?.studentRegNumber}</p>
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
                className="px-5 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
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

      {ratingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <h3 className="text-base font-bold text-gray-900">Rate Student's Work</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="p-1 cursor-pointer"
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
                placeholder="Share your experience working with this student..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRatingOrder(null)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 cursor-pointer"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-5 py-2 bg-[#007a4d] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}