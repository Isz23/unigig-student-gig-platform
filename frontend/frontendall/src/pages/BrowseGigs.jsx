import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  X,
  GraduationCap
} from 'lucide-react';
import GigDetailsModal from '../components/GigDetailsModal';

export default function BrowseGigs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedGig, setSelectedGig] = useState(null);

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

  const gigs = [
    {
      id: 1,
      title: 'Responsive React & Tailwind Web App Development and Bug Fixing',
      category: 'Coding & Tech',
      badge: 'Top Rated Seller',
      badgeColor: 'text-emerald-400',
      price: 35,
      delivery: '2 Days',
      turnaround: '2 Days',
      rating: 5.0,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      description: 'Need help with your front-end web project or assignment? I will write clean, modular React and Tailwind CSS components tailored for university submissions.',
      student: {
        id: 'std-001',
        name: 'Dulaksha Nipun',
        university: 'South Eastern University of Sri Lanka',
        school: 'SEUSL • ICT Junior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Dulaksha Nipun',
        school: 'SEUSL • ICT Junior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 2,
      title: 'Calculus, Discrete Mathematics & Linear Algebra Tutoring',
      category: 'Academics & Tutoring',
      badge: "Dean's List",
      badgeColor: 'text-emerald-400',
      price: 20,
      delivery: '1 Day',
      turnaround: '1 Day',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
      description: 'Struggling with limits, multivariable calculus, or network subnetting? I will conduct a 1-on-1 tutoring session and give you access to formula sheets and solved past exam papers.',
      student: {
        id: 'std-002',
        name: 'Sanduni Fernando',
        university: 'University of Peradeniya',
        school: 'UoP • Engineering',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Sanduni Fernando',
        school: 'UoP • Engineering',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 3,
      title: 'Modern Student Club Posters, Event Flyers & Figma UI Kits',
      category: 'Graphics & UI/UX',
      badge: 'Featured Creator',
      badgeColor: 'text-emerald-400',
      price: 15,
      delivery: '1 Day',
      turnaround: '1 Day',
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      description: 'Get eye-catching vector designs, stage banners, and promotional graphics made for student clubs and campus societies using Figma and Adobe Illustrator.',
      student: {
        id: 'std-003',
        name: 'Kavindu Senanayake',
        university: 'University of Moratuwa',
        school: 'UoM • Design Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Kavindu Senanayake',
        school: 'UoM • Design Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 4,
      title: 'Academic Proofreading, APA/IEEE Citations & Thesis Review',
      category: 'Writing & Translation',
      badge: 'Honor Scholar',
      badgeColor: 'text-emerald-400',
      price: 18,
      delivery: '1 Day',
      turnaround: '1 Day',
      rating: 5.0,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
      description: 'Thorough review of academic structure, tone, grammar, and bibliography formatting following strict APA 7th or IEEE academic standards.',
      student: {
        id: 'std-004',
        name: 'Anuki Perera',
        university: 'University of Colombo',
        school: 'UoC • English Lit',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Anuki Perera',
        school: 'UoC • English Lit',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 5,
      title: 'Python Data Science, Jupyter Notebooks & SPSS Analysis',
      category: 'Coding & Tech',
      badge: 'Data Specialist',
      badgeColor: 'text-emerald-400',
      price: 30,
      delivery: '2 Days',
      turnaround: '2 Days',
      rating: 4.9,
      reviews: 51,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      description: 'Statistical analysis, hypothesis testing in SPSS, and Python exploratory data analysis with clean visualization charts for campus research reports.',
      student: {
        id: 'std-005',
        name: 'Dinuka Jayasinghe',
        university: 'University of Moratuwa',
        school: 'UoM • CSE Undergraduate',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Dinuka Jayasinghe',
        school: 'UoM • CSE Undergraduate',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop',
      },
    },
    {
      id: 6,
      title: 'Campus Event Highlight Reels, TikTok Edits & Color Grading',
      category: 'Video & Media',
      badge: 'Video Pro',
      badgeColor: 'text-emerald-400',
      price: 25,
      delivery: '2 Days',
      turnaround: '2 Days',
      rating: 4.8,
      reviews: 33,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
      description: 'High-energy short-form video editing, transition syncs, and subtitle animations for university societies, sports meets, and student brand campaigns.',
      student: {
        id: 'std-006',
        name: 'Rashmi Wickramasinghe',
        university: 'South Eastern University of Sri Lanka',
        school: 'SEUSL • Media & Tech',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
      },
      seller: {
        name: 'Rashmi Wickramasinghe',
        school: 'SEUSL • Media & Tech',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
      },
    },
  ];

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

  const filteredGigs = useMemo(() => {
    return gigs
      .filter((gig) => {
        const matchesSearch =
          gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.student.university.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' ||
          gig.category.toLowerCase() === selectedCategory.toLowerCase() ||
          gig.category.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [gigs, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50/60 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-7">
        
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
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

        {filteredGigs.length === 0 ? (
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
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#007a4d] hover:bg-[#00633e] text-white text-xs font-bold rounded-xl transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                onClick={() => setSelectedGig(gig)}
                className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs border border-white/10">
                      {gig.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {gig.badge}
                    </span>
                  </div>

                  <div className="p-5 space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={gig.student.avatar}
                        alt={gig.student.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-[#007a4d]/25 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {gig.student.name}
                          </h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
                        </div>
                        <p className="text-[11px] text-gray-400 truncate">
                          {gig.student.university}
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
                        <span className="font-extrabold text-gray-800">{gig.rating}</span>
                        <span className="text-[11px] text-gray-400">({gig.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#007a4d]" />
                        <span>{gig.delivery}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/40">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Starting at</span>
                    <span className="text-base font-black text-[#007a4d]">${gig.price}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGig(gig);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#007a4d] text-gray-700 hover:text-white border border-gray-200 hover:border-[#007a4d] text-xs font-bold rounded-xl transition-all shadow-2xs active:scale-95"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
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