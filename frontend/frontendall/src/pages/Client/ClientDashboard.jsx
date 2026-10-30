import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  DollarSign,
  Clock,
  Plus,
  CheckCircle2,
  Star,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  X,
  Check,
  Eye,
  AlertCircle,
  FileText,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'activeOrders' | 'completed'

  // Modals state
  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [inspectDeliverableOrder, setInspectDeliverableOrder] = useState(null);
  const [ratingOrder, setRatingOrder] = useState(null);
  const [ratingValue, setRatingValue] = useState(5);
  const [reviewFeedback, setReviewFeedback] = useState('');

  // 1. Client ගේ Posted Task Requests (Reverse Bidding)
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
          coverLetter:
            'I have pre-configured Vite and Tailwind CSS component systems for campus clubs. Can deliver fully mobile-responsive code with clean Git commits.',
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
          coverLetter:
            'Experienced with frontend styling and Lucide React icons. Ready to start immediately.',
          rating: 4.7,
          completedGigs: 8
        }
      ]
    },
    {
      id: 'JOB-9482',
      title: 'Vector Logo Redesign for Tech Summit',
      category: 'Graphics & UI/UX',
      budget: 20,
      deadline: 'Nov 03, 2026',
      status: 'Assigned',
      proposalsCount: 1,
      proposals: []
    }
  ]);

  // 2. Active Orders (Escrow Locked & Deliverable Submitted)
  const [activeOrders, setActiveOrders] = useState([
    {
      orderId: 'ORD-9477',
      jobId: 'JOB-9481',
      title: 'Responsive React & Tailwind Web App',
      studentName: 'Dulaksha Nipun',
      studentReg: 'SEU/IS/22/ICT/047',
      amount: 35,
      escrowStatus: 'Funds Locked in Escrow',
      orderStatus: 'Deliverable Submitted',
      submittedDate: 'Oct 30, 2026 - 04:30 PM',
      deliverable: {
        note: 'Completed all components, verified responsiveness on mobile, and resolved build warnings.',
        liveUrl: 'https://unigig-demo.vercel.app',
        githubUrl: 'https://github.com/dulaksha/unigig-frontend'
      }
    }
  ]);

  // 3. Completed Orders History
  const [completedOrders, setCompletedOrders] = useState([
    {
      orderId: 'ORD-8812',
      title: 'Campus Hackathon Banner & Social Pack',
      studentName: 'Sajini Hansika',
      amount: 25,
      completedDate: 'Oct 22, 2026',
      ratingGiven: 5,
      review: 'Exceptional creative design and swift turnaround time!'
    }
  ]);

  // Handle Accepting a Bid
  const handleAcceptProposal = (job, proposal) => {
    const newOrder = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      jobId: job.id,
      title: job.title,
      studentName: proposal.studentName,
      studentReg: proposal.studentReg,
      amount: proposal.bidAmount,
      escrowStatus: 'Funds Locked in Escrow',
      orderStatus: 'In Progress',
      submittedDate: null,
      deliverable: null
    };

    setActiveOrders((prev) => [newOrder, ...prev]);

    setPostedJobs((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? { ...j, status: 'Assigned', proposals: [] }
          : j
      )
    );

    setSelectedJobForBids(null);
    alert(`🎉 Proposal accepted! $${proposal.bidAmount} has been locked into Escrow for ${proposal.studentName}.`);
  };

  // Handle Releasing Escrow Payment
  const handleReleasePayment = (order) => {
    setActiveOrders((prev) => prev.filter((o) => o.orderId !== order.orderId));

    const completedEntry = {
      orderId: order.orderId,
      title: order.title,
      studentName: order.studentName,
      amount: order.amount,
      completedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      ratingGiven: 5,
      review: 'Work accepted and payment released.'
    };

    setCompletedOrders((prev) => [completedEntry, ...prev]);
    setInspectDeliverableOrder(null);
    setRatingOrder(completedEntry);
  };

  // Submit Rating Feedback
  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (ratingOrder) {
      setCompletedOrders((prev) =>
        prev.map((ord) =>
          ord.orderId === ratingOrder.orderId
            ? { ...ord, ratingGiven: ratingValue, review: reviewFeedback || 'Great collaboration!' }
            : ord
        )
      );
    }
    setRatingOrder(null);
    setReviewFeedback('');
    alert('⭐ Thank you for rating the student freelancer!');
  };

  return (
    <div className="min-h-screen bg-gray-50/70 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ---------------- 1. Client Hub Header ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Campus Buyer / Client Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Client Management Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
              Post task requests, review student reverse bids, communicate directly, and release escrow payments upon approval.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/messages"
              className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold border border-gray-200 shadow-sm flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#007a4d]" />
              <span>Campus Chats</span>
            </Link>

            <Link
              to="/post-job"
              className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-2 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Task Request</span>
            </Link>
          </div>
        </div>

        {/* ---------------- 2. Overview Stats ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Escrow Protected Funds</p>
              <h3 className="text-xl font-extrabold text-gray-900">$35.00</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Active Campus Projects</p>
              <h3 className="text-xl font-extrabold text-gray-900">{activeOrders.length} In Progress</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Completed Jobs</p>
              <h3 className="text-xl font-extrabold text-gray-900">{completedOrders.length} Approved</h3>
            </div>
          </div>
        </div>

        {/* ---------------- 3. Tabs Navigation ---------------- */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
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
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'activeOrders' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Active Deliverables ({activeOrders.length})</span>
            {activeOrders.some((o) => o.orderStatus === 'Deliverable Submitted') && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
            {activeTab === 'activeOrders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('completed')}
            className={`pb-3 transition-colors relative flex items-center gap-2 ${
              activeTab === 'completed' ? 'text-[#007a4d]' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            <span>Past Completed ({completedOrders.length})</span>
            {activeTab === 'completed' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#007a4d]" />
            )}
          </button>
        </div>

        {/* ---------------- 4. Tab 1: Posted Tasks & Reverse Bids ---------------- */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {job.id}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {job.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'Open for Bids'
                          ? 'bg-blue-50 text-blue-700'
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
                      className="px-4 py-2 bg-emerald-50 text-[#007a4d] hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
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

        {/* ---------------- 5. Tab 2: Active Orders & Deliverable Inspection ---------------- */}
        {activeTab === 'activeOrders' && (
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#007a4d]">{order.orderId}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {order.escrowStatus}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{order.title}</h3>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400">Locked Amount</span>
                    <h4 className="text-lg font-extrabold text-[#007a4d]">${order.amount}.00</h4>
                  </div>
                </div>

                {/* Student Info and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="text-xs text-gray-600">
                    <p>
                      Assigned Student:{' '}
                      <strong className="text-gray-900">{order.studentName}</strong> ({order.studentReg})
                    </p>
                    <p className="text-gray-400 mt-0.5">Status: {order.orderStatus}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct Chat with Student */}
                    <Link
                      to="/messages"
                      className="px-3.5 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      title="Direct Chat with Student"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#007a4d]" />
                      <span>Chat</span>
                    </Link>

                    {/* Inspect Deliverable Button */}
                    {order.deliverable ? (
                      <button
                        type="button"
                        onClick={() => setInspectDeliverableOrder(order)}
                        className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect Deliverable</span>
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Work in progress</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---------------- 6. Tab 3: Completed Orders History ---------------- */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gray-500">{order.orderId}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                      Payment Released
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{order.title}</h3>
                  <p className="text-xs text-gray-500">
                    Completed by <strong className="text-gray-800">{order.studentName}</strong> on {order.completedDate}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-xs text-gray-400">Total Paid</span>
                    <h4 className="text-base font-extrabold text-gray-900">${order.amount}.00</h4>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold">{order.ratingGiven}.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ---------------- Modal 1: Review Student Proposals (Bids) ---------------- */}
      {selectedJobForBids && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Review Student Reverse Bids</h3>
                <p className="text-xs text-gray-500">{selectedJobForBids.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForBids(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {selectedJobForBids.proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{prop.studentName}</h4>
                      <p className="text-xs text-gray-500">
                        {prop.university} • <span className="font-mono text-gray-600">{prop.studentReg}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400">Bid Offer</span>
                      <h4 className="text-base font-extrabold text-[#007a4d]">${prop.bidAmount}</h4>
                      <span className="text-[10px] text-gray-500">{prop.deliveryDays}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 bg-white p-3 rounded-xl border border-gray-100 italic leading-relaxed">
                    "{prop.coverLetter}"
                  </p>

                  {/* Actions: Chat & Accept Bid */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <Link
                      to="/messages"
                      onClick={() => setSelectedJobForBids(null)}
                      className="px-3.5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#007a4d]" />
                      <span>Chat with Student</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAcceptProposal(selectedJobForBids, prop)}
                      className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept Bid & Hire Student</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Modal 2: Inspect Deliverable & Release Escrow ---------------- */}
      {inspectDeliverableOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Inspect Student Deliverable</h3>
                <p className="text-xs text-gray-500">{inspectDeliverableOrder.orderId}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectDeliverableOrder(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <span className="font-bold text-gray-900">Student Submission Note:</span>
                <p className="italic text-gray-600">{inspectDeliverableOrder.deliverable.note}</p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-gray-900">Verification Links:</span>
                <div className="flex flex-col gap-2">
                  <a
                    href={inspectDeliverableOrder.deliverable.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-between font-medium text-[#007a4d]"
                  >
                    <span>{inspectDeliverableOrder.deliverable.liveUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={inspectDeliverableOrder.deliverable.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-between font-medium text-gray-800"
                  >
                    <span>{inspectDeliverableOrder.deliverable.githubUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Releasing payment will immediately transfer ${inspectDeliverableOrder.amount} from Escrow to the student.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setInspectDeliverableOrder(null)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleReleasePayment(inspectDeliverableOrder)}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Approve Work & Release Escrow (${inspectDeliverableOrder.amount})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Modal 3: Rate & Review Student ---------------- */}
      {ratingOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-emerald-50 text-[#007a4d] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Rate Student Freelancer</h3>
              <p className="text-xs text-gray-500">
                Leave feedback for <strong className="text-gray-800">{ratingOrder.studentName}</strong> to build their campus reputation.
              </p>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="flex justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingValue(star)}
                    className="p-1 focus:outline-none transition-transform active:scale-90"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= ratingValue
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
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
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
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