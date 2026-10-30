import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Briefcase,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Client Check State (Simulation: true නම් client ලෙස login වී ඇත)
  const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Standard');

  const gig = {
    id: id || '1',
    title: 'Responsive React & Tailwind Web App Development',
    category: 'Coding & Tech',
    student: {
      id: 'std-001',
      name: 'Dulaksha Nipun',
      university: 'South Eastern University of Sri Lanka',
      rating: 4.9,
      reviewsCount: 38,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    },
    packages: {
      Basic: { price: 20, delivery: '1 Day', desc: 'Single component/form bug fixing and responsive styling.' },
      Standard: { price: 35, delivery: '2 Days', desc: 'Full multi-component frontend feature with clean Tailwind CSS.' },
      Premium: { price: 60, delivery: '4 Days', desc: 'Complete frontend web application with API integration.' }
    }
  };

  const handleContinueOrder = () => {
    if (!isClientLoggedIn) {
      // Client ලෙස login වී නැත්නම් access modal එක පෙන්වයි
      setShowClientModal(true);
    } else {
      alert(`Proceeding to checkout with ${selectedTier} package ($${gig.packages[selectedTier].price})`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">

        <Link
          to="/browse"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Gig Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                {gig.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {gig.title}
              </h1>

              {/* Student Name Clickable Link */}
              <div className="flex items-center gap-3 pt-2">
                <Link to={`/student/${gig.student.id}`}>
                  <img
                    src={gig.student.avatar}
                    alt={gig.student.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20 hover:opacity-80 transition-opacity"
                  />
                </Link>
                <div>
                  <Link
                    to={`/student/${gig.student.id}`}
                    className="text-sm font-bold text-gray-900 hover:text-[#007a4d] flex items-center gap-1.5 transition-colors"
                  >
                    <span>{gig.student.name}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </Link>
                  <p className="text-xs text-gray-500">{gig.student.university}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-600 space-y-3">
                <p>
                  I will develop clean, modular, and fully responsive React web applications styled with Tailwind CSS. Includes clear code documentation and Git version tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Checkout Box */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5 sticky top-24">
              <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
                {['Basic', 'Standard', 'Premium'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      selectedTier === tier
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase font-bold">{selectedTier} Package</span>
                  <span className="text-2xl font-extrabold text-[#007a4d]">
                    ${gig.packages[selectedTier].price}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {gig.packages[selectedTier].desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                <Clock className="w-4 h-4 text-[#007a4d]" />
                <span>{gig.packages[selectedTier].delivery} Delivery</span>
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={handleContinueOrder}
                className="w-full py-3 bg-[#007a4d] hover:bg-[#006640] text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Continue (${gig.packages[selectedTier].price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ---------------- Client Access / Login Modal ---------------- */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-gray-100 space-y-5 text-center relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowClientModal(false)}
              className="absolute right-5 top-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
              <Briefcase className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-gray-900">
                Client Access Required
              </h3>
              <p className="text-xs text-gray-500">
                To order this gig and hire <strong className="text-gray-800">{gig.student.name}</strong>, you need to sign in with a Client / Buyer account or switch workspace.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsClientLoggedIn(true);
                  setShowClientModal(false);
                  alert('Switched to Client Mode! You can now place the order.');
                }}
                className="w-full py-2.5 bg-[#007a4d] hover:bg-[#006640] text-white font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Switch to Client Account
              </button>

              <Link
                to="/login"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl block transition-colors"
              >
                Log In as Client
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}