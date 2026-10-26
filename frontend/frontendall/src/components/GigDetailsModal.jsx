import { useState } from 'react';
import { X, Clock, RotateCcw, Check, ArrowRight, Star } from 'lucide-react';

export default function GigDetailsModal({ gig, isOpen, onClose }) {
  if (!isOpen || !gig) return null;

  const [activeTab, setActiveTab] = useState('Basic');

  // Basic, Standard, Premium පැකේජ විස්තර
  const packages = {
    Basic: {
      name: 'Basic Student Tier',
      price: gig.price || 20,
      description: 'Standard deliverable tailored for individual student tasks or assignment help.',
      delivery: gig.turnaround || '1 Day',
      revisions: '2 Revisions',
      features: [
        'Source files / raw notes',
        '1-on-1 Q&A support',
        'Student discount applied',
      ],
    },
    Standard: {
      name: 'Standard Scholar Tier',
      price: (gig.price ? gig.price + 15 : 35),
      description: 'Comprehensive solution with detailed explanations, practice problems, and step-by-step guidance.',
      delivery: '2 Days',
      revisions: '4 Revisions',
      features: [
        'Source files / raw notes',
        '1-on-1 Q&A support',
        'Detailed step-by-step breakdown',
        'Priority peer delivery',
      ],
    },
    Premium: {
      name: 'Premium Honor Tier',
      price: (gig.price ? gig.price + 30 : 50),
      description: 'Full semester assistance, custom formula cheat-sheets, and 1-on-1 video call session.',
      delivery: '3 Days',
      revisions: 'Unlimited Revisions',
      features: [
        'Source files / raw notes',
        'Live 1-on-1 video call session',
        'Custom exam prep & cheat-sheets',
        '24/7 Priority student support',
      ],
    },
  };

  const currentPkg = packages[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      {/* පිටත click කළ විට Modal එක වැසීමට */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* Main Modal Box */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: Overview & Description */}
        <div className="w-full md:w-3/5 p-6 sm:p-8 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100">
          
          <span className="inline-block bg-[#eaf8f1] text-[#00875a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
            {gig.category || 'Academics'}
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-4">
            {gig.title}
          </h2>

          {/* Seller Profile */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-6 mb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={gig.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'}
                alt={gig.seller?.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{gig.seller?.name || 'Alex Chen'}</h4>
                <p className="text-xs text-gray-500">
                  {gig.seller?.school || 'MIT • Math Major'} • <span className="text-[#00875a] font-semibold">{gig.badge || "Dean's List"}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-800">{gig.rating || '4.9'}</span>
              <span className="text-[11px] text-gray-500">({gig.reviews || 128} reviews)</span>
            </div>
          </div>

          {/* Gig Image */}
          <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-gray-100 shadow-inner">
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              About This Campus Gig
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {gig.description || 'Struggling with limits, derivatives, integrals or multivariable calculus? I will conduct a 1-on-1 tutoring session and give you access to my curated formula sheets and solved past exam questions.'}
            </p>
          </div>
        </div>

        {/* Right Side: Pricing & Tier Selector */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mt-2 mb-6">
              {['Basic', 'Standard', 'Premium'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${
                    activeTab === tab
                      ? 'text-[#00875a] border-b-2 border-[#00875a]'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-gray-900">{currentPkg.name}</h4>
              <span className="text-2xl font-extrabold text-[#00875a]">${currentPkg.price}</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-6">
              {currentPkg.description}
            </p>

            {/* Turnaround & Revisions */}
            <div className="flex items-center gap-6 text-xs font-semibold text-gray-700 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00875a]" />
                <span>{currentPkg.delivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#00875a]" />
                <span>{currentPkg.revisions}</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3 mb-8">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                What's Included:
              </span>
              {currentPkg.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-[#00875a] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            className="w-full bg-[#00875a] hover:bg-[#006640] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Continue (${currentPkg.price})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}