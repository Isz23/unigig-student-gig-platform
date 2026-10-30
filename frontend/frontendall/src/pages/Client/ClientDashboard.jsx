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
  FileText
} from 'lucide-react';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs', 'orders', 'completed'

  // Modals State
  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [inspectOrderModal, setInspectOrderModal] = useState(null);
  const [ratingModalOrder, setRatingModalOrder] = useState(null);
  const [clientRating, setClientRating] = useState(5);
  const [clientFeedback, setClientFeedback] = useState('');

  // Dummy Client Profile
  const client = {
    name: 'Kavindu Perera',
    role: 'Club President • IEEE Student Branch',
    university: 'University of Moratuwa',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    activeEscrow: 85.0,
    totalSpent: 340.0,
  };

  // State: Posted Jobs with Student Proposals (Reverse Bidding)
  const [postedJobs, setPostedJobs] = useState([
    {
      id: 'JOB-102',
      title: 'Need React & Tailwind Developer for Annual Tech Fest Landing Page',
      category: 'Coding & Tech',
      budget: 50.0,
      deadline: 'Nov 05, 2026',
      status: 'Open',
      proposals: [
        {
          id: 'PROP-01',
          studentId: 'std-001',
          studentName: 'Dulaksha Nipun',
          university: 'South Eastern University of Sri Lanka',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
          rating: 4.9,
          bidAmount: 45.0,
          deliveryTime: '2 Days',
          coverLetter: 'I have built multiple responsive event landing pages using Vite, React, and Tailwind CSS. Clean component modularity and cross-browser testing guaranteed.',
        },
        {
          id: 'PROP-02',
          studentId: 'std-002',
          studentName: 'Sanduni Fernando',
          university: 'University of Peradeniya',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
          rating: 5.0,
          bidAmount: 50.0,
          deliveryTime: '3 Days',
          coverLetter: 'Experienced frontend developer. Will deliver accessible, mobile-optimized React UI with high Lighthouse performance scores.',
        },
      ],
    },
    {
      id: 'JOB-110',
      title: 'Event T-Shirt & Digital Badge Vector Illustration',
      category: 'Graphics & UI/UX',
      budget: 40.0,
      deadline: 'Nov 07, 2026',
      status: 'Open',
      proposals: [
        {
          id: 'PROP-03',
          studentId: 'std-003',
          studentName: 'Kavindu Perera',
          university: 'University of Moratuwa',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop',
          rating: 4.8,
          bidAmount: 35.0,
          deliveryTime: '1 Day',
          coverLetter: 'Specialized in vector badges and club apparel graphics in Adobe Illustrator. Source .AI/.SVG files included.',
        },
      ],
    },
  ]);

  // State: Active Ongoing Orders (Escrow locked)
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 'ORD-9477',
      jobId: 'JOB-095',
      title: 'Responsive React & Tailwind Web App Development',
      hiredStudent: {
        id: 'std-001',
        name: 'Dulaksha Nipun',
        university: 'SEUSL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop',
      },
      amount: 35.0,
      status: 'Delivered', // 'In Progress' or 'Delivered'
      deadline: 'Tomorrow, 6:00 PM',
      deliverable: {
        url: 'https://github.com/dulaksha/unigig-frontend',
        notes: 'Finished all components with responsive mobile navigation and dynamic profile routes. Ready for review.',
        submittedAt: 'Today, 11:20 AM',
      },
    },
    {
      id: 'ORD-9410',
      jobId: 'JOB-091',
      title: 'Calculus Assignment Review & LaTeX Formatting',
      hiredStudent: {
        id: 'std-002',
        name: 'Sanduni Fernando',
        university: 'UoP',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop',
      },
      amount: 50.0,
      status: 'In Progress',
      deadline: 'Nov 03, 2026',
      deliverable: null,
    },
  ]);

  // State: Completed Tasks History
  const [completedOrders, setCompletedOrders] = useState([
    {
      id: 'ORD-8920',
      title: 'Python Flask API Endpoint Debugging',
      studentName: 'Alex Chen',
      amount: 40.0,
      completedDate: 'Oct 15, 2026',
      ratingGiven: 5,
    },
  ]);

  // 1. Action: Accept Student Bid / Proposal
  const handleAcceptProposal = (job, proposal) => {
    // 1. Create a new Active Order
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      jobId: job.id,
      title: job.title,
      hiredStudent: {
        id: proposal.studentId,
        name: proposal.studentName,
        university: proposal.university,
        avatar: proposal.avatar,
      },
      amount: proposal.bidAmount,
      status: 'In Progress',
      deadline: `${proposal.deliveryTime} from now`,
      deliverable: null,
    };

    setActiveOrders((prev) => [newOrder, ...prev]);

    // 2. Mark Job as Assigned / Closed
    setPostedJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, status: 'Assigned' } : j))
    );

    alert(`🎉 You accepted ${proposal.studentName}'s proposal of $${proposal.bidAmount}! Escrow payment locked and task is now In Progress.`);
    setSelectedJobForBids(null);
    setActiveTab('orders');
  };

  // 2. Action: Approve Deliverable & Release Escrow Funds
  const handleApproveWork = () => {
    const order = inspectOrderModal;
    setInspectOrderModal(null);
    setRatingModalOrder(order);
  };

  // 3. Action: Submit Rating and Complete Order
  const handleFinalizeCompletion = (e) => {
    e.preventDefault();

    // Remove from active orders and append to completed
    setActiveOrders((prev) => prev.filter((o) => o.id !== ratingModalOrder.id));

    setCompletedOrders((prev) => [
      {
        id: ratingModalOrder.id,
        title: ratingModalOrder.title,
        studentName: ratingModalOrder.hiredStudent.name,
        amount: ratingModalOrder.amount,
        completedDate: 'Today',
        ratingGiven: clientRating,
      },
      ...prev,
    ]);

    alert(`✅ Escrow funds of $${ratingModalOrder.amount} released to ${ratingModalOrder.hiredStudent.name}! Feedback saved.`);
    setRatingModalOrder(null);
    setActiveTab('completed');
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ---------------- 1. Top Header Banner ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={client.avatar}
              alt={client.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-500/10"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {client.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Client Hub</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {client.role} • {client.university}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/post-job"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Task Request</span>
            </Link>
          </div>
        </div>

        {/* ---------------- 2. Metrics Grid ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Funds in Escrow</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${client.activeEscrow.toFixed(2)}</h3>
              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> Protected by UniGig Escrow
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Tasks Hired</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{activeOrders.length}</h3>
              <span className="text-[11px] text-blue-600 font-semibold mt-1 block">Students currently working</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Campus Spent</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${client.totalSpent.toFixed(2)}</h3>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> Paid out to students
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* ---------------- 3. Tab Navigation ---------------- */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold overflow-x-auto">
          {[
            { id: 'jobs', label: `My Posted Task Requests (${postedJobs.length})` },
            { id: 'orders', label: `Active Hired Tasks (${activeOrders.length})` },
            { id: 'completed', label: `Completed Deliverables (${completedOrders.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- 4. Tab Content ---------------- */}

        {/* Tab 1: Posted Jobs & Reverse Bidding Proposals */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-gray-200 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-gray-400">{job.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {job.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        job.status === 'Open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-400">Budget: </span>
                    <span className="text-lg font-black text-[#007a4d]">${job.budget.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-gray-900">{job.title}</h3>
                  <p className="text-xs text-gray-400">Deadline: {job.deadline}</p>
                </div>

                {/* Proposals Trigger Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">
                      {job.proposals.length} Student Proposals Submitted
                    </span>
                  </div>

                  {job.status === 'Open' ? (
                    <button
                      type="button"
                      onClick={() => setSelectedJobForBids(job)}
                      className="px-4 py-2 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Proposals ({job.proposals.length})</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400">Student Hired</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Active Orders / Escrow Milestones */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-xs text-gray-500">
                No active hired tasks right now.
              </div>
            ) : (
              activeOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400">{ord.id}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          ord.status === 'Delivered'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {ord.status === 'Delivered' ? 'Delivered • Ready to Inspect' : 'In Progress'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900">{ord.title}</h3>

                    {/* Hired Student Tag */}
                    <div className="flex items-center gap-2 pt-1">
                      <Link to={`/student/${ord.hiredStudent.id}`} className="flex items-center gap-2 group">
                        <img
                          src={ord.hiredStudent.avatar}
                          alt={ord.hiredStudent.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-gray-700 group-hover:text-[#007a4d]">
                          {ord.hiredStudent.name} ({ord.hiredStudent.university})
                        </span>
                      </Link>
                      <span className="text-xs text-gray-400">• Deadline: {ord.deadline}</span>
                    </div>
                  </div>

                  {/* Actions & Escrow Release */}
                  <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block">Escrow Amount</span>
                      <span className="text-base font-black text-[#007a4d]">${ord.amount.toFixed(2)}</span>
                    </div>

                    {ord.status === 'Delivered' ? (
                      <button
                        type="button"
                        onClick={() => setInspectOrderModal(ord)}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Inspect Deliverable</span>
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl">
                        Awaiting Student Submission
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Completed Orders */}
        {activeTab === 'completed' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-gray-900 mb-4">Completed Deliverables History</h3>
            <div className="divide-y divide-gray-100">
              {completedOrders.map((cord) => (
                <div key={cord.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400">{cord.id}</span>
                    <h4 className="text-sm font-bold text-gray-900">{cord.title}</h4>
                    <p className="text-xs text-gray-500">
                      Delivered by <strong className="text-gray-700">{cord.studentName}</strong> • {cord.completedDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-700">${cord.amount.toFixed(2)} Released</span>
                    <div className="flex items-center gap-0.5 justify-end mt-1 text-amber-400">
                      {[...Array(cord.ratingGiven)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ---------------- Modal 1: Review Proposals / Bids for a Job ---------------- */}
      {selectedJobForBids && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">
                  Reverse Bidding Proposals
                </span>
                <h2 className="text-lg font-extrabold text-gray-900 mt-1">
                  Proposals for: {selectedJobForBids.title}
                </h2>
                <p className="text-xs text-gray-500">
                  Target Budget: ${selectedJobForBids.budget}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForBids(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedJobForBids.proposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-5 rounded-2xl bg-gray-50/70 border border-gray-200 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={prop.avatar}
                        alt={prop.studentName}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/student/${prop.studentId}`}
                            className="text-xs font-bold text-gray-900 hover:text-[#007a4d] flex items-center gap-1"
                          >
                            <span>{prop.studentName}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </Link>
                          <span className="text-[10px] text-amber-500 font-bold flex items-center">
                            ★ {prop.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400">{prop.university}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#007a4d]">${prop.bidAmount}</span>
                      <p className="text-[11px] text-gray-500">{prop.deliveryTime} Turnaround</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-100 leading-relaxed">
                    "{prop.coverLetter}"
                  </p>

                  <div className="flex justify-end pt-1">
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

      {/* ---------------- Modal 2: Inspect Deliverable ---------------- */}
      {inspectOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-xl border border-gray-100 space-y-6 relative">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
                  Deliverable Inspection
                </span>
                <h2 className="text-lg font-extrabold text-gray-900 mt-1">
                  Review Submission for {inspectOrderModal.id}
                </h2>
                <p className="text-xs text-gray-500">
                  Delivered by: {inspectOrderModal.hiredStudent.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectOrderModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Submitted Deliverable Link:
                </label>
                <a
                  href={inspectOrderModal.deliverable?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 text-[#007a4d] font-bold text-xs rounded-xl border border-gray-200 transition-colors break-all"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>{inspectOrderModal.deliverable?.url}</span>
                </a>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Student Delivery Notes:
                </label>
                <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed">
                  "{inspectOrderModal.deliverable?.notes}"
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Approving will immediately release the <strong>${inspectOrderModal.amount}</strong> escrow funds to the student.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInspectOrderModal(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold"
              >
                Needs Revisions
              </button>
              <button
                type="button"
                onClick={handleApproveWork}
                className="px-5 py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Approve & Release Funds
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Modal 3: Rate Student & Finalize ---------------- */}
      {ratingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-gray-100 space-y-5 text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 fill-[#007a4d]" />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-gray-900">
                Rate {ratingModalOrder.hiredStudent.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your rating helps build this student's campus reputation and verified portfolio.
              </p>
            </div>

            <form onSubmit={handleFinalizeCompletion} className="space-y-4">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setClientRating(star)}
                    className="p-1 text-amber-400 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= clientRating ? 'fill-amber-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={clientFeedback}
                onChange={(e) => setClientFeedback(e.target.value)}
                placeholder="Write a short review on code quality, responsiveness, and communication..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#007a4d] text-gray-800"
              />

              <button
                type="submit"
                className="w-full py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Submit Review & Release ${ratingModalOrder.amount}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}