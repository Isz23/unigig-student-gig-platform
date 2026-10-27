import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  Calendar,
  Layers,
  FileText,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding & Tech');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const categories = [
    'Coding & Tech',
    'Academics & Tutoring',
    'Graphics & UI/UX',
    'Writing & Proofreading',
    'Video & Animation',
    'Campus Services',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJobRequest = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      budget: parseFloat(budget) || 0,
      deadline,
      description,
      skills: skills.split(',').map((s) => s.trim()),
      status: 'Open',
      proposalsCount: 0,
      createdAt: new Date().toISOString(),
    };

    console.log('New Job Request Submitted:', newJobRequest);
    alert('🎉 Your job request has been published! Students can now submit bids.');
    navigate('/clientdashboard'); // Post වූ පසු නැවත Client Dashboard එකට රැගෙන යයි
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            to="/clientdashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Client Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reverse Bidding Model</span>
          </span>
        </div>

        {/* Header Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Post a Task / Job Request
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Specify your requirements, set your budget, and receive competitive proposals from university peers.
          </p>
        </div>

        {/* Job Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. Job Basics */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">1</span>
              <span>Job Overview</span>
            </h2>

            {/* Task Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Task / Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Build an Event Registration Form in React & Node.js"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Clearly describe what you need done in one line.
              </p>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Budget & Deadline */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">2</span>
              <span>Budget & Timeline</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Estimated Budget ($ USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    required
                    min="5"
                    step="5"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 35"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 font-bold"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Held securely in Escrow until you review the task.
                </p>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Required Deadline *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Detailed Requirements */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">3</span>
              <span>Detailed Requirements</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Task Scope & Description *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the assignment/task guidelines, expected deliverables, formatting requirements, and any starter code or files..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Preferred Skills / Technologies
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Tailwind CSS, Python, C++, Figma"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clientdashboard')}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Job Request</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}