import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  DollarSign,
  Clock,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Layers,
  Tag
} from 'lucide-react';

export default function CreateGig() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academics & Tutoring');
  const [turnaround, setTurnaround] = useState('1 Day');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  const [packages, setPackages] = useState({
    basic: { name: 'Quick Help', price: 15, delivery: '1 Day', desc: 'Basic solution / 30-min tutoring' },
    standard: { name: 'Full Assignment', price: 30, delivery: '2 Days', desc: 'Complete breakdown & source files' },
    premium: { name: 'Comprehensive VIP', price: 50, delivery: '3 Days', desc: 'End-to-end guidance + live 1-on-1 call' },
  });

  const categories = [
    'Academics & Tutoring',
    'Coding & Tech',
    'Graphics & UI/UX',
    'Writing & Proofreading',
    'Video & Media',
    'Campus Services',
  ];

  const handlePackageChange = (tier, field, value) => {
    setPackages((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/stddashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <Link
            to="/stddashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-[#007a4d] bg-[#eaf8f1] px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Verified Creator</span>
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Post a New Campus Gig
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Offer your skills, notes, or project assistance to fellow university peers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center text-xs font-black">1</span>
              <span>Gig Overview</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Gig Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. I will tutor Object-Oriented Programming (Java) & debug assignments"
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 placeholder-gray-400"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Be clear and concise. Peer buyers search for specific course subjects, technologies, or skills.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Standard Delivery Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
                  >
                    <option>1 Day (Urgent)</option>
                    <option>2 Days</option>
                    <option>3 Days</option>
                    <option>5 Days</option>
                    <option>7 Days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center text-xs font-black">2</span>
              <span>Pricing Packages</span>
            </h2>
            <p className="text-xs text-gray-500">
              Set student-friendly pricing for Basic, Standard, and Premium tiers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tier 1: Basic</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="5"
                      value={packages.basic.price}
                      onChange={(e) => handlePackageChange('basic', 'price', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#007a4d] focus:outline-none focus:border-[#007a4d]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.basic.name}
                    onChange={(e) => handlePackageChange('basic', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Included Scope</label>
                  <input
                    type="text"
                    value={packages.basic.desc}
                    onChange={(e) => handlePackageChange('basic', 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-[#eaf8f1]/30 space-y-3 relative shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d]">Tier 2: Standard (Popular)</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="10"
                      value={packages.standard.price}
                      onChange={(e) => handlePackageChange('standard', 'price', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-emerald-200 rounded-lg text-sm font-bold text-[#007a4d] focus:outline-none focus:border-[#007a4d]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.standard.name}
                    onChange={(e) => handlePackageChange('standard', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Included Scope</label>
                  <input
                    type="text"
                    value={packages.standard.desc}
                    onChange={(e) => handlePackageChange('standard', 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tier 3: Premium</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <div className="relative">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="15"
                      value={packages.premium.price}
                      onChange={(e) => handlePackageChange('premium', 'price', e.target.value)}
                      className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#007a4d] focus:outline-none focus:border-[#007a4d]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.premium.name}
                    onChange={(e) => handlePackageChange('premium', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Included Scope</label>
                  <input
                    type="text"
                    value={packages.premium.desc}
                    onChange={(e) => handlePackageChange('premium', 'desc', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#007a4d]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center text-xs font-black">3</span>
              <span>Description & Tags</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Service Description *
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain what you will deliver, which tools you use (VS Code, NetBeans, Figma, etc.), and what you need from the peer before starting..."
                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 leading-relaxed placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Skills & Tags (comma separated)
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. React, Tailwind, Python, Subnetting, Proofreading"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#eaf8f1] text-[#007a4d] flex items-center justify-center text-xs font-black">4</span>
              <span>Cover Image</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Image Web URL (Unsplash or direct image link)
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {imageUrl && (
              <div className="mt-3">
                <p className="text-[11px] font-bold text-gray-500 mb-1">Live Image Preview:</p>
                <div className="w-52 aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-2xs">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-[#eaf8f1]/50 border border-emerald-100 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#007a4d] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-600 leading-relaxed">
                UniGig Escrow Protection: Client funds are placed into escrow immediately when an order is placed, guaranteeing your payout upon deliverable review.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/stddashboard')}
              className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-2.5 bg-[#007a4d] hover:bg-[#00633e] text-white rounded-xl font-bold text-xs shadow-2xs transition-all active:scale-95 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Campus Gig</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}