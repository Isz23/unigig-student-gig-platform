import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  DollarSign,
  Clock,
  Send,
  X,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Loader2
} from 'lucide-react';
import API from '../../api/axios';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal & Bid submission state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState(3);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch real jobs from Backend API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/jobs');
      if (res.data?.success) {
        setJobs(res.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const categories = [
    'All',
    'Academics & Tutoring',
    'Coding & Tech',
    'Graphics & UI/UX',
    'Writing & Proofreading',
    'Video & Media',
    'Campus Services',
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client?.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.client?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenBidModal = (job) => {
    // Client protection
    const jobClientId = job.client?._id ? job.client._id.toString() : job.client?.toString();
    const currentUserId = currentUser?._id ? currentUser._id.toString() : currentUser?.id?.toString();

    if (jobClientId === currentUserId) {
      alert('You cannot bid on your own posted task.');
      return;
    }

    if (currentUser?.role === 'client') {
      alert('Client accounts cannot submit bids. Please use a student account to bid.');
      return;
    }

    setSelectedJob(job);
    setBidAmount(job.budget?.toString() || '');
    setDeliveryDays(3);
    setCoverLetter('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!bidAmount || Number(bidAmount) <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (!coverLetter.trim()) {
      alert('Please provide a short cover note or pitch.');
      return;
    }

    try {
      setSubmitting(true);
      const jobId = selectedJob._id;
      const res = await API.post(`/jobs/${jobId}/proposals`, {
        bidAmount: Number(bidAmount),
        deliveryDays: Number(deliveryDays),
        coverLetter: coverLetter.trim()
      });

      if (res.data?.success) {
        alert('🎉 Proposal submitted successfully! The client will review your bid.');
        handleCloseModal();
        fetchJobs();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit proposal.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reverse Bidding Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Campus Task Requests & Job Board
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl leading-relaxed">
              Browse projects posted by university clients and student clubs. Submit your competitive proposal and work securely through verified milestone Escrow payouts.
            </p>
          </div>

          <Link
            to="/stddashboard"
            className="self-start md:self-center px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:border-[#007a4d] hover:text-[#007a4d] hover:bg-emerald-50/40 transition-all shadow-2xs whitespace-nowrap"
          >
            My Student Dashboard
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 shadow-2xs space-y-3 sm:space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keywords (e.g. React, Java, Tutoring, Vector, University)..."
              className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#007a4d] text-white shadow-xs'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Area */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-2xs flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-7 h-7 text-[#007a4d] animate-spin" />
              <p className="text-xs font-semibold text-gray-500">Loading campus task requests...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto shadow-2xs space-y-3">
              <Briefcase className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mx-auto" />
              <h3 className="text-sm font-bold text-gray-900">No Job Requests Found</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Try searching with different keywords or switch categories to view other student task requests.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const displayId = `JOB-${job._id?.slice(-4).toUpperCase()}`;
              const clientName = job.client?.name || 'Verified Client';
              const clientUniversity = job.client?.university || 'Sri Lankan University';
              const proposalsCount = job.proposals?.length || 0;
              const formattedDeadline = job.deadline
                ? new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Flexible';
              const postedDate = job.createdAt
                ? new Date(job.createdAt).toLocaleDateString()
                : 'Recently';

              const jobClientId = job.client?._id ? job.client._id.toString() : job.client?.toString();
              const currentUserId = currentUser?._id ? currentUser._id.toString() : currentUser?.id?.toString();
              const isOwnTask = jobClientId === currentUserId;
              const isClient = currentUser?.role === 'client';

              return (
                <div
                  key={job._id}
                  className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-7 shadow-2xs hover:border-emerald-200 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-gray-400">{displayId}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {job.category}
                      </span>
                      <span className="text-xs text-gray-400">Posted {postedDate}</span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs text-gray-400 font-medium">Client Budget:</span>
                      <span className="text-lg sm:text-xl font-black text-[#007a4d]">
                        ${Number(job.budget || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                      {job.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#007a4d] border border-emerald-100 flex items-center justify-center font-bold text-xs uppercase">
                        {clientName.substring(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-gray-900">
                            {clientName}
                          </span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                        </div>
                        <p className="text-[11px] text-gray-400">
                          {clientUniversity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                      <div className="text-left sm:text-right text-xs">
                        <span className="font-bold text-gray-800">{proposalsCount} Proposals</span>
                        <p className="text-[11px] text-gray-400">Deadline: {formattedDeadline}</p>
                      </div>

                      {/* Client Protection / Own Task Restriction */}
                      {isOwnTask || isClient ? (
                        <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-xs font-bold border border-gray-200">
                          {isOwnTask ? 'Your Posted Task' : 'Client View Only'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenBidModal(job)}
                          className="px-4 sm:px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                        >
                          <span>Submit Proposal</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Proposal Submission Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">

            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-[#007a4d] uppercase tracking-wider bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                  Proposal Submission
                </span>
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mt-1 leading-snug">
                  Bid for: {selectedJob.title}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Client: <span className="font-semibold text-gray-700">{selectedJob.client?.name || 'Client'}</span> • Client Budget:{' '}
                  <span className="font-bold text-[#007a4d]">${selectedJob.budget}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Bid Price ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      required
                      min="5"
                      step="1"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-[#007a4d] focus:outline-none focus:border-[#007a4d] focus:bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Amount you will receive upon task approval.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Turnaround Time (Days) *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={deliveryDays}
                      onChange={(e) => setDeliveryDays(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#007a4d] focus:bg-white cursor-pointer"
                    >
                      <option value={1}>1 Day (Express)</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={5}>5 Days</option>
                      <option value={7}>7 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Cover Letter / Proposal Note *
                </label>
                <textarea
                  required
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why your skills fit this task, your planned implementation approach, and relevant coursework experience..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 leading-relaxed"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#007a4d] shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Funds will be deposited into the UniGig Milestone Escrow vault before you begin. Once your submission is accepted, payment is immediately released to your wallet.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all cursor-pointer disabled:bg-gray-400"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Proposal</span>
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