import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  X,
  GraduationCap,
  Loader2
} from 'lucide-react';
import API from '../api/axios';
import GigDetailsModal from '../components/GigDetailsModal';

export default function BrowseGigs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedGig, setSelectedGig] = useState(null);

  // Backend Data & Loading States
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const query = searchParams.get('search');
    const cat = searchParams.get('category');
    if (query !== null) setSearchTerm(query);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = [
    'All',
    'Coding & Tech',
    'Academics & Tutoring',
    'Graphics & UI/UX',
    'Writing & Translation',
    'Video & Media',
  ];

  // Backend API එකෙන් Gigs Fetch කිරීම
  useEffect(() => {
    let isMounted = true;
    const fetchGigs = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const params = {};
        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }

        const response = await API.get('/gigs', { params });

        if (isMounted) {
          // Backend එකෙන් response.data.data ලෙස array එක එවයි
          setGigs(response.data?.data || []);
        }
      } catch (err) {
        console.error('Error fetching gigs from backend:', err);
        if (isMounted) {
          setFetchError(err.response?.data?.message || 'Failed to load campus gigs.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Typing කරද්දී excessive requests නොවීමට සුළු debounce එකක්
    const delayDebounceFn = setTimeout(() => {
      fetchGigs();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    const newParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      newParams.set('search', value.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('recommended');
    setSearchParams({});
  };

  // Client-side Sorting Logic
  const sortedGigs = useMemo(() => {
    return [...gigs].sort((a, b) => {
      const priceA = a.price || a.packages?.[0]?.price || 0;
      const priceB = b.price || b.packages?.[0]?.price || 0;
      const ratingA = a.rating || 5.0;
      const ratingB = b.rating || 5.0;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return ratingB - ratingA;
      return 0; // 'recommended' - default backend sort (createdAt: -1)
    });
  }, [gigs, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Campus Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Explore Campus Gigs & Services
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Hire verified university peers for assignments, coding, graphics, and academic tutoring.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-[#007a4d] shadow-2xs cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 shadow-2xs space-y-3 sm:space-y-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by gig title, coursework, technology, or student name..."
              className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#007a4d] focus:bg-white text-gray-800 transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#007a4d] text-white shadow-xs'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#007a4d]" />
            <p className="text-xs font-medium text-gray-500">Fetching live campus gigs...</p>
          </div>
        ) : fetchError ? (
          <div className="bg-white rounded-3xl border border-red-100 p-8 text-center max-w-md mx-auto shadow-2xs space-y-3">
            <p className="text-sm font-bold text-red-600">{fetchError}</p>
            <button
              onClick={() => handleCategorySelect('All')}
              className="px-4 py-2 bg-[#007a4d] text-white text-xs font-bold rounded-xl"
            >
              Retry
            </button>
          </div>
        ) : sortedGigs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#007a4d] flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No gigs matched your search</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Try adjusting your search terms or select another category to discover active student listings.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGigs.map((gig) => {
              const gigId = gig._id || gig.id;
              const displayImage = gig.imageUrl || gig.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';
              const displayPrice = gig.price || gig.packages?.[0]?.price || 15;
              const displayDelivery = gig.turnaround || gig.delivery || '1-2 Days';
              const sellerName = gig.seller?.name || 'Verified Student';
              const sellerAvatar = gig.seller?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop';
              const sellerUni = gig.seller?.university || 'Campus Freelancer';

              return (
                <div
                  key={gigId}
                  onClick={() => setSelectedGig({ ...gig, price: displayPrice, image: displayImage, student: { name: sellerName, avatar: sellerAvatar, university: sellerUni } })}
                  className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                      <img
                        src={displayImage}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs border border-white/10">
                        {gig.category}
                      </span>
                      <span className="absolute top-3 right-3 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {gig.badge || 'Verified'}
                      </span>
                    </div>

                    <div className="p-5 space-y-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={sellerAvatar}
                          alt={sellerName}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-[#007a4d]/25 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-bold text-gray-900 truncate">
                              {sellerName}
                            </h4>
                            <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
                          </div>
                          <p className="text-[11px] text-gray-400 truncate">
                            {sellerUni}
                          </p>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#007a4d] transition-colors line-clamp-2 leading-snug">
                        {gig.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {gig.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-extrabold text-gray-800">{gig.rating || '5.0'}</span>
                          <span className="text-[11px] text-gray-400">({gig.reviewsCount || gig.reviews || 0})</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-[#007a4d]" />
                          <span>{displayDelivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Starting at</span>
                      <span className="text-base font-black text-[#007a4d]">${displayPrice}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGig({ ...gig, price: displayPrice, image: displayImage, student: { name: sellerName, avatar: sellerAvatar, university: sellerUni } });
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#007a4d] text-gray-700 hover:text-white border border-gray-200 hover:border-[#007a4d] text-xs font-bold rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      <GigDetailsModal
        gig={selectedGig}
        isOpen={Boolean(selectedGig)}
        onClose={() => setSelectedGig(null)}
      />
    </div>
  );
}