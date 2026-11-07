import { useState } from 'react';
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
  Lock
} from 'lucide-react';

export default function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('2 Days');
  const [coverLetter, setCoverLetter] = useState('');

  const jobPosts = [
    {
      id: 'JOB-102',
      title: 'Need React & Tailwind Developer for Annual Tech Fest Landing Page',
      category: 'Coding & Tech',
      budget: 50.0,
      deadline: 'Nov 05, 2026',
      client: {
        id: 'cl-101',
        name: 'Kavindu Perera',
        university: 'University of Moratuwa',
        role: 'IEEE Student Branch',
      },
      proposalsCount: 6,
      postedDate: '1 day ago',
      description:
        'We require an interactive, mobile-responsive landing page for our university tech symposium. Starter Figma designs are ready. Needs clean component code in React & Tailwind CSS.',
      skills: ['React', 'Tailwind CSS', 'Responsive UI', 'Git'],
    },
    {
      id: 'JOB-105',
      title: 'Object-Oriented Programming (Java) Lab Assignment Bug Fixing',
      category: 'Coding & Tech',
      budget: 30.0,
      deadline: 'Oct 31, 2026',
      client: {
        id: 'cl-102',
        name: 'Sanduni Fernando',
        university: 'University of Peradeniya',
        role: 'Faculty of Engineering',
      },
      proposalsCount: 3,
      postedDate: '4 hours ago',
      description:
        'Having runtime exceptions in an OOP Java project using polymorphism and file handling. Need an experienced student peer to debug and explain the corrections via clean code.',
      skills: ['Java', 'OOP', 'Debugging', 'Exception Handling'],
    },
    {
      id: 'JOB-098',
      title: 'Peer Tutoring for Data Structures & Algorithms (Trees & Graph Traversal)',
      category: 'Academics & Tutoring',
      budget: 25.0,
      deadline: 'Nov 02, 2026',
      client: {
        id: 'cl-103',
        name: 'Tharindu Wickramasinghe',
        university: 'SLIIT',
        role: 'Computing Faculty',
      },
      proposalsCount: 5,
      postedDate: '2 days ago',
      description:
        'Looking for an ICT/CS senior student to conduct a 1-on-1 virtual revision session covering BFS, DFS, and Binary Search Tree balancing ahead of semester midterms.',
      skills: ['Data Structures', 'Algorithms', 'Tutoring'],
    },
    {
      id: 'JOB-110',
      title: 'Event T-Shirt & Digital Badge Vector Illustration',
      category: 'Graphics & UI/UX',
      budget: 40.0,
      deadline: 'Nov 07, 2026',
      client: {
        id: 'cl-104',
        name: 'Ahamed Musfira',
        university: 'South Eastern University of Sri Lanka',
        role: 'Student Union',
      },
      proposalsCount: 4,
      postedDate: 'Just now',
      description:
        'Need vector badge emblems and modern minimalist t-shirt artwork for our upcoming campus sports meet. Deliverables must include editable AI/SVG vector files.',
      skills: ['Adobe Illustrator', 'Vector Art', 'Graphic Design'],
    },
  ];

  const categories = [
    'All',
    'Coding & Tech',
    'Academics & Tutoring',
    'Graphics & UI/UX',
    'Writing & Proofreading',
  ];

  const filteredJobs = jobPosts.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.client.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenBidModal = (job) => {
    setSelectedJob(job);
    setBidAmount(job.budget.toString());
    setCoverLetter('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">

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

        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
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
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white text-xs font-bold rounded-xl transition-all"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-7 shadow-2xs hover:border-emerald-200 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-gray-400">{job.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {job.category}
                    </span>
                    <span className="text-xs text-gray-400">Posted {job.postedDate}</span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs text-gray-400 font-medium">Client Budget:</span>
                    <span className="text-lg sm:text-xl font-black text-[#007a4d]">${job.budget.toFixed(2)}</span>
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

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link
                    to={`/client/${job.client.id}`}
                    className="flex items-center gap-3 hover:opacity-90 transition-opacity group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#007a4d] border border-emerald-100 flex items-center justify-center font-bold text-xs uppercase group-hover:bg-[#007a4d] group-hover:text-white transition-colors">
                      {job.client.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-[#007a4d] transition-colors">
                          {job.client.name}
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
                      </div>
                      <p className="text-[11px] text-gray-400">
                        {job.client.role} • {job.client.university}
                      </p>
                    </div>
                  </Link>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                    <div className="text-left sm:text-right text-xs">
                      <span className="font-bold text-gray-800">{job.proposalsCount} Proposals</span>
                      <p className="text-[11px] text-gray-400">Deadline: {job.deadline}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenBidModal(job)}
                      className="px-4 sm:px-5 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Submit Proposal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

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
                  Client: <span className="font-semibold text-gray-700">{selectedJob.client.name}</span> • Client Budget: <span className="font-bold text-[#007a4d]">${selectedJob.budget}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors shrink-0"
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
                    Turnaround Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#007a4d] focus:bg-white cursor-pointer"
                    >
                      <option>1 Day (Express)</option>
                      <option>2 Days</option>
                      <option>3 Days</option>
                      <option>5 Days</option>
                      <option>7 Days</option>
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
                  placeholder="Explain why your experience fits this task, the tech stack you will use, and your past coursework/portfolio samples..."
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
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}