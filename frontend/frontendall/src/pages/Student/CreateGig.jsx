import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  DollarSign,
  Clock,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CreateGig() {
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academics & Tutoring');
  const [turnaround, setTurnaround] = useState('1 Day');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  // 3-Tier Packages (Basic, Standard, Premium)
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
    'Video & Animation',
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

    const newGigData = {
      title,
      category,
      turnaround,
      description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      tags: tags.split(',').map((t) => t.trim()),
      packages,
      createdAt: new Date().toISOString(),
    };

    console.log('Publishing Campus Gig:', newGigData);
    alert('🎉 Success! Your campus gig has been published.');
    navigate('/stddashboard'); 
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Back Link & Header */}
        <div className="flex items-center justify-between">
          <Link
            to="/stddashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
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

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. Overview Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">1</span>
              <span>Gig Overview</span>
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Gig Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. I will tutor Object-Oriented Programming (Java) & debug assignments"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Be clear and concise. Peer buyers look for specific course subjects or skills.
              </p>
            </div>

            {/* Category & Fast Turnaround Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Standard Delivery Time *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={turnaround}
                    onChange={(e) => setTurnaround(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800 cursor-pointer font-medium"
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

          {/* 2. Package Pricing Tiers */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">2</span>
              <span>Pricing Packages</span>
            </h2>
            <p className="text-xs text-gray-500">
              Set student-friendly pricing for Basic, Standard, and Premium tiers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Basic */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tier 1: Basic</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    min="5"
                    value={packages.basic.price}
                    onChange={(e) => handlePackageChange('basic', 'price', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.basic.name}
                    onChange={(e) => handlePackageChange('basic', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Standard */}
              <div className="p-4 rounded-2xl border-2 border-[#007a4d]/30 bg-emerald-50/20 space-y-3 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#007a4d]">Tier 2: Standard (Popular)</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    min="10"
                    value={packages.standard.price}
                    onChange={(e) => handlePackageChange('standard', 'price', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.standard.name}
                    onChange={(e) => handlePackageChange('standard', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Premium */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tier 3: Premium</span>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    min="15"
                    value={packages.premium.price}
                    onChange={(e) => handlePackageChange('premium', 'price', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-[#007a4d]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1">Package Name</label>
                  <input
                    type="text"
                    value={packages.premium.name}
                    onChange={(e) => handlePackageChange('premium', 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Description & Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">3</span>
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
                placeholder="Explain what you will deliver, which tools you use (VS Code, Figma, etc.), and what you need from the peer before starting..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Skills & Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. React, Tailwind, Python, Networking, Proofreading"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
              />
            </div>
          </div>

          {/* 4. Cover Image Preview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#007a4d] flex items-center justify-center text-xs">4</span>
              <span>Cover Image</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Image Web URL (Unsplash or direct image link)
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white transition-all text-gray-800"
                />
              </div>
            </div>

            {/* Live Preview */}
            {imageUrl && (
              <div className="mt-3">
                <p className="text-[11px] font-bold text-gray-500 mb-1">Live Image Preview:</p>
                <div className="w-48 aspect-[16/10] rounded-xl overflow-hidden border border-gray-200">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Submit & Cancel Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/stddashboard')}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 font-bold text-xs transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-7 py-3 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-2"
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