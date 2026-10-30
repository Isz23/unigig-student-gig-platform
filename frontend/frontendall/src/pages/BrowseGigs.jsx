import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function BrowseGigs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Coding & Tech',
    'Academics & Tutoring',
    'Graphics & UI/UX',
    'Writing & Translation',
  ];

  // Dummy Marketplace Gigs List
  const gigs = [
    {
      id: 1,
      title: 'Responsive React & Tailwind Web App Development',
      category: 'Coding & Tech',
      price: 35,
      delivery: '2 Days',
      rating: 4.9,
      reviews: 38,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      student: {
        id: 'std-001',
        name: 'Dulaksha Nipun',
        university: 'South Eastern University of Sri Lanka',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 2,
      title: 'Object-Oriented Programming (Java) & DSA Tutoring',
      category: 'Academics & Tutoring',
      price: 20,
      delivery: '1 Day',
      rating: 5.0,
      reviews: 19,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop',
      student: {
        id: 'std-002',
        name: 'Sanduni Fernando',
        university: 'University of Peradeniya',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 3,
      title: 'Minimalist Club Event Posters & Vector Badges',
      category: 'Graphics & UI/UX',
      price: 15,
      delivery: '1 Day',
      rating: 4.8,
      reviews: 27,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      student: {
        id: 'std-003',
        name: 'Kavindu Perera',
        university: 'University of Moratuwa',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      },
    },
  ];

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Explore Campus Gigs & Services
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Hire verified university peers for assignments, coding, design, and academic support.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by gig title or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#007a4d] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md hover:border-[#007a4d]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 1. Gig Image -> Clickable Link to GigDetails */}
                <Link to={`/gig/${gig.id}`} className="block relative overflow-hidden group">
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#007a4d] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {gig.category}
                  </span>
                </Link>

                <div className="p-5 space-y-4">
                  {/* 2. Student Info -> Clickable Link to Student Profile */}
                  <div className="flex items-center gap-3">
                    <Link to={`/student/${gig.student.id}`}>
                      <img
                        src={gig.student.avatar}
                        alt={gig.student.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20 hover:opacity-80 transition-opacity"
                      />
                    </Link>
                    <div>
                      <Link
                        to={`/student/${gig.student.id}`}
                        className="text-xs font-bold text-gray-900 hover:text-[#007a4d] flex items-center gap-1 transition-colors"
                      >
                        <span>{gig.student.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </Link>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{gig.student.university}</p>
                    </div>
                  </div>

                  {/* 3. Gig Title -> Clickable Link to GigDetails */}
                  <Link to={`/gig/${gig.id}`} className="block group">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#007a4d] transition-colors line-clamp-2 leading-snug">
                      {gig.title}
                    </h3>
                  </Link>

                  {/* Rating & Delivery */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-extrabold text-gray-800">{gig.rating}</span>
                      <span className="text-[11px] text-gray-400">({gig.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{gig.delivery}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & View Details Link */}
              <div className="p-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Starting at</span>
                  <span className="text-base font-black text-[#007a4d]">${gig.price}</span>
                </div>

                <Link
                  to={`/gig/${gig.id}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-gray-50 hover:bg-[#007a4d] hover:text-white text-gray-700 text-xs font-bold rounded-xl transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}