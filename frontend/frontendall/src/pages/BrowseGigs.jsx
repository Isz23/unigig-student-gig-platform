import { useState } from 'react';
import { Search, SlidersHorizontal, DollarSign, RotateCcw } from 'lucide-react';
import GigCard from '../components/GigCard';
import GigDetailsModal from '../components/GigDetailsModal';

export default function BrowseGigs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('all'); // Budget state
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState({});
  const [selectedGig, setSelectedGig] = useState(null); // Click කරන Gig එක තබා ගන්නා state එක

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Categories List
  const categories = [
    'All',
    'Tutoring & Academics',
    'Tech & Coding',
    'Design',
    'Writing',
    'Video',
  ];

  // Gigs Data
  const allGigs = [
    {
      id: 1,
      category: 'Tutoring & Academics',
      badge: "Dean's List",
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Alex Chen',
        school: 'MIT • Math Major',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will tutor Calculus I & II and provide handwritten step-by-step notes',
      description: 'Struggling with limits, derivatives, integrals or multivariable calculus? I will conduct a 1-on-1 tutoring session and give you access to my curated formula sheets and solved past exam questions.',
      rating: '4.9',
      reviews: 128,
      turnaround: '1 Day',
      price: 20,
    },
    {
      id: 2,
      category: 'Tech & Coding',
      badge: 'Top Student Seller',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Sophia Martinez',
        school: 'Stanford • CS Junior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will build a responsive React & Vite web application or fix your bugs',
      description: 'Need help with your front-end web project or assignment? I will write clean, well-commented React and Tailwind CSS components tailored for university submissions.',
      rating: '5.0',
      reviews: 94,
      turnaround: '2 Days',
      price: 35,
    },
    {
      id: 3,
      category: 'Design',
      badge: 'Featured Creator',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Marcus Vance',
        school: 'Brown Univ • Design Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will design modern student club posters, event flyers, and social media...',
      description: 'Get eye-catching vector designs, stage pandals, and promotional graphics made for student clubs and campus societies using Figma and Adobe Illustrator.',
      rating: '4.8',
      reviews: 67,
      turnaround: '1 Day',
      price: 15,
    },
    {
      id: 4,
      category: 'Writing',
      badge: 'Scholar',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Emily Watson',
        school: 'Oxford • English Lit',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will proofread your university thesis, essays, or lab reports with APA/IEEE...',
      description: 'Thorough review of academic structure, tone, grammar, and bibliography formatting following strict APA 7th or IEEE academic standards.',
      rating: '5.0',
      reviews: 142,
      turnaround: '1 Day',
      price: 18,
    },
    {
      id: 5,
      category: 'Video',
      badge: 'Top Video Editor',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Daniel Kim',
        school: 'USC • Media Arts',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will edit cinematic YouTube videos, podcast clips, and TikTok campus reels',
      description: 'High-energy edits with captions, sound design, and color grading optimized for TikTok, Instagram Reels, and YouTube projects.',
      rating: '4.9',
      reviews: 81,
      turnaround: '2 Days',
      price: 25,
    },
    {
      id: 6,
      category: 'Tech & Coding',
      badge: 'Intern @ Big Tech',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Priya Sharma',
        school: 'UC Berkeley • CS Senior',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will teach Python algorithms and conduct mock software engineering...',
      description: 'Master Data Structures and Algorithms with step-by-step logic tracing, LeetCode style problems, and technical interview prep.',
      rating: '5.0',
      reviews: 115,
      turnaround: '1 Day',
      price: 30,
    },
  ];

  // Reset Filters Function
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setBudgetFilter('all');
    setSortBy('default');
  };

  // Category, Search & Budget Filtering Logic
  const filteredGigs = allGigs
    .filter((gig) => {
      // 1. Category Filter
      const matchCategory =
        selectedCategory === 'All' || gig.category === selectedCategory;

      // 2. Search Filter
      const matchSearch =
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Budget Filter
      let matchBudget = true;
      if (budgetFilter === 'under-20') {
        matchBudget = gig.price < 20;
      } else if (budgetFilter === '20-30') {
        matchBudget = gig.price >= 20 && gig.price <= 30;
      } else if (budgetFilter === 'above-30') {
        matchBudget = gig.price > 30;
      }

      return matchCategory && matchSearch && matchBudget;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Explore Campus Gigs
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Find and hire verified student peers across top universities
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">

        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by gig or seller name..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#007a4d] transition-colors"
          />
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">

          {/* 1. Budget Filter Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-gray-500">Budget:</span>
            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-gray-800 font-bold"
            >
              <option value="all">Any Budget</option>
              <option value="under-20">Under $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="above-30">$30 & Above</option>
            </select>
          </div>

          {/* 2. Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-gray-800 font-bold"
            >
              <option value="default">Recommended</option>
              <option value="price-low">Budget: Low to High</option>
              <option value="price-high">Budget: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* 3. Reset Button */}
          {(selectedCategory !== 'All' || searchQuery !== '' || budgetFilter !== 'all' || sortBy !== 'default') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 px-3 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8 pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#007a4d] text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gigs Grid */}
      {filteredGigs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              isFavorite={!!favorites[gig.id]}
              onToggleFavorite={toggleFavorite}
              onClick={() => setSelectedGig(gig)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No campus gigs match your budget and filter criteria.</p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-3 text-xs font-semibold text-[#007a4d] hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Gig Details Modal Popup */}
      <GigDetailsModal
        gig={selectedGig}
        isOpen={Boolean(selectedGig)}
        onClose={() => setSelectedGig(null)}
      />

    </div>
  );
}