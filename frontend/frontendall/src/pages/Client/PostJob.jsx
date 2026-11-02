import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DollarSign,
  Calendar,
  Sparkles,
  ArrowLeft,
  Send,
  ShieldCheck,
  Tag,
  Briefcase
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
    navigate('/clientdashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <Link
            to="/clientdashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Client Hub</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reverse Bidding Marketplace</span>
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#007a4d] bg-[#eaf8f1] px-2.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
              <Briefcase className="w-3 h-3" />
              <span>Campus Project Request</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Post a Campus Task Request
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Post your coursework, development, or creative design requirements and receive competitive proposals directly from verified university students.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 placeholder-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 cursor-pointer font-medium transition-colors"
                >
                  <option>Coding & Tech</option>
                  <option>Academics & Tutoring</option>
                  <option>Graphics & UI/UX</option>
                  <option>Writing & Proofreading</option>
                  <option>Video & Media</option>
                  <option>Campus Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Estimated Budget ($ USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="number"
                    required
                    min="5"
                    step="1"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="50"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-[#007a4d] focus:outline-none focus:border-[#007a4d] focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Delivery Deadline *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Required Skills (Comma separated)
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="React, Tailwind, Java, LaTeX..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 placeholder-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Task Description & Deliverables Scope *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project deliverables, requirements, any starter code or Figma assets, and expected milestones..."
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 leading-relaxed placeholder-gray-400 transition-colors"
              />
            </div>

            <div className="p-4 bg-[#eaf8f1]/50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-xs text-gray-600 leading-relaxed">
              <ShieldCheck className="w-5 h-5 text-[#007a4d] shrink-0 mt-0.5" />
              <span>
                Funds remain safe in your account and will only be deposited into the UniGig Milestone Escrow vault once you review student proposals and officially hire a peer.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/clientdashboard')}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-2"
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