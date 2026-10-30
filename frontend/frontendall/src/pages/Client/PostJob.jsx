import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DollarSign,
  Calendar,
  Sparkles,
  ArrowLeft,
  Send,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Coding & Tech');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      title,
      category,
      budget: parseFloat(budget),
      deadline,
      description,
      skills: skills.split(',').map((s) => s.trim()),
      postedDate: 'Just now',
    };

    console.log('New Task Request Posted:', newJob);
    alert(`🎉 Task Request "${title}" published to UniGig Marketplace! Students can now submit their bids.`);
    navigate('/clientdashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        <Link
          to="/clientdashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Client Hub</span>
        </Link>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Reverse Bidding Task Request
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Post a Campus Task Request
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Post your project requirements and receive competitive proposals directly from verified university students.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Task Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Need React Developer for Club Website or Calculus Problem Tutoring..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
              />
            </div>

            {/* Category & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                >
                  <option>Coding & Tech</option>
                  <option>Academics & Tutoring</option>
                  <option>Graphics & UI/UX</option>
                  <option>Writing & Proofreading</option>
                  <option>Video & Animation</option>
                </select>
              </div>

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
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="50"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Deadline & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Delivery Deadline *
                </label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Tailwind, OOP, Java..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Task Description & Deliverables Scope *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you need, any starter files or Figma links, and expected outcomes..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
              />
            </div>

            {/* Escrow note */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-3 text-xs text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Funds will only be deducted into Escrow once you select and accept a student's proposal.</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Publish Task Request</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}