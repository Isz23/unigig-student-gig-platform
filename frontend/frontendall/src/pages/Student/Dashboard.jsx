import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Star,
  Clock,
  Plus,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  UserCheck,
  Briefcase
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview, gigs, orders, reviews

  // Dummy Student Profile Data
  const student = {
    name: 'Dulaksha Nipun',
    university: 'South Eastern University of Sri Lanka',
    major: 'BSc (Hons) in ICT • Networking & Security',
    studentId: 'SEU/IS/22/ICT/047',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 4.9,
    reviewsCount: 38,
    balance: 145.0,
    pendingClearance: 40.0,
  };

  // Dummy Active Gigs posted by student (Seller View)
  const myGigs = [
    {
      id: 1,
      title: 'Responsive React & Tailwind Web App Development',
      category: 'Coding & Tech',
      price: 35,
      ordersInQueue: 2,
      impressions: 480,
      status: 'Active',
    },
    {
      id: 2,
      title: 'University Club Posters & Social Media Graphics',
      category: 'Graphics & UI/UX',
      price: 15,
      ordersInQueue: 1,
      impressions: 290,
      status: 'Active',
    },
    {
      id: 3,
      title: 'Computer Networks & Subnetting Problem Tutoring',
      category: 'Academics & Tutoring',
      price: 20,
      ordersInQueue: 0,
      impressions: 160,
      status: 'Paused',
    },
  ];

  // Dummy Orders (Orders placed or received)
  const orders = [
    {
      id: 'ORD-9482',
      title: 'Calculus I Handwritten Notes & Step-by-Step Solutions',
      peer: 'Alex Chen (MIT)',
      amount: 20.0,
      type: 'Bought (Buyer)',
      deadline: 'Tomorrow, 5:00 PM',
      status: 'In Progress',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      id: 'ORD-9477',
      title: 'Responsive React & Tailwind Web App Development',
      peer: 'Kavindu Perera (UoM)',
      amount: 35.0,
      type: 'Sold (Seller)',
      deadline: 'Oct 28, 2026',
      status: 'Delivered',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      id: 'ORD-9321',
      title: 'Research Paper APA 7th Proofreading & Bibliography',
      peer: 'Emily Watson (Oxford)',
      amount: 18.0,
      type: 'Bought (Buyer)',
      deadline: 'Completed on Oct 20',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  // Dummy Reviews Data (Client & Peer Feedback)
  const reviews = [
    {
      id: 1,
      reviewer: 'Kavindu Perera',
      university: 'University of Moratuwa',
      rating: 5,
      date: '2 days ago',
      gigTitle: 'Responsive React & Tailwind Web App Development',
      comment: 'Super fast delivery and clean React code! The UI was responsive across mobile screens. Highly recommended for semester projects.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop'
    },
    {
      id: 2,
      reviewer: 'Sanduni Fernando',
      university: 'University of Peradeniya',
      rating: 5,
      date: '1 week ago',
      gigTitle: 'Computer Networks & Subnetting Problem Tutoring',
      comment: 'Explained VLSM subnetting calculations very clearly in a 40-minute session. Helped me pass my lab exam without any issues!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop'
    },
    {
      id: 3,
      reviewer: 'Tharindu Wickramasinghe',
      university: 'SLIIT',
      rating: 4.8,
      date: '3 weeks ago',
      gigTitle: 'University Club Posters & Social Media Graphics',
      comment: 'Great eye for design and typography. Minor revision requested was fixed within an hour. Excellent communication.',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=120&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ---------------- 1. Top Profile Header Banner ---------------- */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-[#007a4d]/10"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                  {student.name}
                </h1>
                <span className="inline-flex items-center gap-1 bg-[#eaf8f1] text-[#00875a] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Student</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {student.university} • <span className="text-gray-700 font-medium">{student.studentId}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{student.major}</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/browse-jobs"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              <Briefcase className="w-4 h-4 text-[#007a4d]" />
              <span>Apply to Jobs</span>
            </Link>

            <Link
              to="/create-gig"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-[#007a4d] hover:bg-[#006640] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Gig</span>
            </Link>
          </div>
        </div>

        {/* ---------------- 2. Metrics & Earnings Grid ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Available Balance</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${student.balance.toFixed(2)}</h3>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Ready for withdrawal
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Orders</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">2</h3>
              <span className="text-[11px] text-gray-500 mt-1 block">1 Buyer • 1 Seller</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Clearance</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${student.pendingClearance.toFixed(2)}</h3>
              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> In Escrow security
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Student Rating Card (Click to open reviews) */}
          <div 
            onClick={() => setActiveTab('reviews')}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#007a4d]/30 transition-all"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Student Rating</p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1 flex items-center gap-1.5">
                {student.rating}
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </h3>
              <span className="text-[11px] text-[#007a4d] font-semibold mt-1 block hover:underline">
                View all {student.reviewsCount} reviews →
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* ---------------- 3. Tab Navigation ---------------- */}
        <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold overflow-x-auto">
          {[
            { id: 'overview', label: 'Recent Activity' },
            { id: 'gigs', label: 'My Posted Gigs' },
            { id: 'orders', label: 'All Orders' },
            { id: 'reviews', label: `Reviews & Feedback (${student.reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#007a4d] border-b-2 border-[#007a4d]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- 4. Tab Content Area ---------------- */}

        {/* Tab 1: Overview / Recent Activity */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-extrabold text-gray-900">Current Ongoing Tasks</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#007a4d] hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-400">{ord.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                        <span className="text-[11px] text-gray-500 font-medium">({ord.type})</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{ord.title}</h4>
                      <p className="text-xs text-gray-500">
                        Peer: <strong className="text-gray-700">{ord.peer}</strong> • Deadline: {ord.deadline}
                      </p>
                    </div>
                    <div className="text-right sm:shrink-0">
                      <span className="text-sm font-extrabold text-[#007a4d]">${ord.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Campus Tips & Trust Widget */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-gray-900">Escrow Security Active</h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-2">
                  All peer payments are held safely in escrow. Funds are only transferred after the deliverable is approved according to university guidelines.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6">
                <Link
                  to="/browse"
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Explore Other Gigs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: My Posted Gigs (Seller View) */}
        {activeTab === 'gigs' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">My Service Gigs</h3>
                <p className="text-xs text-gray-500 mt-0.5">Manage your active service offerings and view statistics</p>
              </div>
              <Link
                to="/create-gig"
                className="inline-flex items-center gap-1.5 bg-[#007a4d] hover:bg-[#006640] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Gig</span>
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {myGigs.map((gig) => (
                <div key={gig.id} className="py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {gig.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${gig.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {gig.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900">{gig.title}</h4>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <div>
                      <span className="block font-bold text-gray-900 text-sm">${gig.price}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Starting Price</span>
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900 text-sm">{gig.ordersInQueue}</span>
                      <span className="text-[10px] text-gray-400 uppercase">In Queue</span>
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900 text-sm">{gig.impressions}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Impressions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: All Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-extrabold text-gray-900 mb-6">Complete Order Records</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-bold">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Gig Service</th>
                    <th className="pb-3">Peer Student</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50">
                      <td className="py-4 font-mono font-bold text-gray-900">{ord.id}</td>
                      <td className="py-4 font-semibold text-gray-900">{ord.title}</td>
                      <td className="py-4 text-gray-500">{ord.peer}</td>
                      <td className="py-4 font-bold text-[#007a4d]">${ord.amount.toFixed(2)}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews & Feedback */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                  <span>Client & Peer Feedback</span>
                  <span className="text-xs bg-emerald-50 text-[#007a4d] px-2.5 py-0.5 rounded-full font-bold">
                    100% Positive
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Verified reviews given by students & clients on completed task orders.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-200/70">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl font-extrabold text-gray-900">{student.rating}</span>
                </div>
                <div className="h-7 w-px bg-gray-200"></div>
                <div className="text-left text-xs">
                  <p className="font-bold text-gray-800">{student.reviewsCount} Total Reviews</p>
                  <p className="text-[11px] text-gray-500">5-Star Campus Rank</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-5 rounded-2xl bg-gray-50/60 border border-gray-100 hover:border-gray-200 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.avatar} 
                        alt={rev.reviewer} 
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900">{rev.reviewer}</h4>
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Verified Order
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{rev.university}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800 ml-1">{rev.rating}</span>
                      <span className="text-xs text-gray-400">• {rev.date}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 bg-white px-3 py-1.5 rounded-xl border border-gray-100 inline-block font-medium">
                    Order for: <span className="font-bold text-gray-800">{rev.gigTitle}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}