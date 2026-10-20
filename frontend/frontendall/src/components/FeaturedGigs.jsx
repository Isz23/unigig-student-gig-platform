import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import GigCard from './GigCard';

export default function FeaturedGigs() {
  const [activeFilter, setActiveFilter] = useState('All Gigs');
  const [favorites, setFavorites] = useState({ 2: true, 4: true });

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filters = [
    'All Gigs',
    'Tutoring & Academics',
    'Tech & Coding',
    'Design',
    'Writing',
    'Video',
  ];

  const gigs = [
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
      rating: '5.0',
      reviews: 115,
      turnaround: '1 Day',
      price: 30,
    },
    {
      id: 7,
      category: 'Writing',
      badge: 'Peer Advisor',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Jordan Lee',
        school: 'Harvard • Business & Econ',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will optimize your internship resume and LinkedIn profile to beat ATS...',
      rating: '4.9',
      reviews: 198,
      turnaround: '2 Days',
      price: 22,
    },
    {
      id: 8,
      category: 'Design',
      badge: 'Campus Pro',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Chloe Bennet',
        school: 'NYU • Photography',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will take professional graduation portraits and student LinkedIn...',
      rating: '4.9',
      reviews: 54,
      turnaround: '3 Days',
      price: 40,
    },
  ];

  const filteredGigs =
    activeFilter === 'All Gigs'
      ? gigs
      : gigs.filter((gig) => gig.category === activeFilter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
            Featured Campus Gigs
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Outstanding services provided by top-rated university peers
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-[#007a4d] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Gigs Grid (Using GigCard with Props) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredGigs.map((gig) => (
          <GigCard
            key={gig.id}
            gig={gig}
            isFavorite={!!favorites[gig.id]}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Bottom Button */}
      <div className="mt-12 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95"
        >
          <span>Browse All 8 Campus Gigs</span>
          <ArrowRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>

    </section>
  );
}