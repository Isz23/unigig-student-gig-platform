import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Clock, 
  RotateCcw, 
  Check, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  MessageSquare,
  Lock
} from 'lucide-react';

export default function GigDetailsModal({ gig, isOpen, onClose }) {
  if (!isOpen || !gig) return null;

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Basic');

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
      price: gig.price ? gig.price + 15 : 35,
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
      price: gig.price ? gig.price + 30 : 50,
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

  const handleMessage = () => {
    onClose();
    if (gig.seller?.id || gig.seller?._id) {
      navigate(`/messages?peerId=${gig.seller.id || gig.seller._id}`);
    } else {
      navigate('/messages');
    }
  };

  const handleContinue = () => {
    onClose();
    navigate(`/stddashboard?gigId=${gig.id || ''}&tier=${activeTab}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[92vh]">
        
        <div className="w-full md:w-3/5 p-5 sm:p-7 overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100">
          
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {gig.category || 'Academics'}
            </span>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d]" />
              <span>Verified Peer Service</span>
            </div>
          </div>

          <h2 className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-snug mb-4">
            {gig.title}
          </h2>

          <div className="flex items-center justify-between flex-wrap gap-3 pb-5 mb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={gig.seller?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'}
                alt={gig.seller?.name}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-[#007a4d]/25 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{gig.seller?.name || 'Campus Peer'}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{gig.seller?.school || 'University Student'}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#007a4d] font-semibold">{gig.badge || "Verified Seller"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/50">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-gray-900">{gig.rating || '5.0'}</span>
              <span className="text-[11px] text-gray-500">({gig.reviews || 0} reviews)</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-5 aspect-video bg-gray-100 shadow-inner">
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              About This Campus Gig
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {gig.description}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#007a4d] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-900">UniGig Escrow Guarantee: </span>
              Payment remains secured in milestone escrow until you inspect the code, notes, or project deliverables and approve release.
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5 p-5 sm:p-7 flex flex-col justify-between bg-white relative">
          
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="flex border-b border-gray-200 mt-3 mb-5">
              {['Basic', 'Standard', 'Premium'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-xs sm:text-sm font-semibold transition-all relative ${
                    activeTab === tab
                      ? 'text-[#007a4d] border-b-2 border-[#007a4d]'
                      : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-gray-900">{currentPkg.name}</h4>
              <span className="text-2xl font-black text-[#007a4d]">${currentPkg.price}</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              {currentPkg.description}
            </p>

            <div className="flex items-center gap-5 text-xs font-semibold text-gray-700 mb-5 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#007a4d]" />
                <span>{currentPkg.delivery}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-[#007a4d]" />
                <span>{currentPkg.revisions}</span>
              </div>
            </div>

            <div className="space-y-2.5 mb-6">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                What's Included:
              </span>
              {currentPkg.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                  <Check className="w-4 h-4 text-[#007a4d] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-[#007a4d] hover:bg-[#00633e] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Continue (${currentPkg.price})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleMessage}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#007a4d]" />
              <span>Contact Peer First</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}