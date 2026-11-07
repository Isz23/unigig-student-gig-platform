import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GigCard from './GigCard';
import GigDetailsModal from './GigDetailsModal';

export default function FeaturedGigs() {
  const [favorites, setFavorites] = useState({});
  const [selectedGig, setSelectedGig] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const featuredGigs = [
    {
      id: 1,
      category: 'Tutoring & Academics',
      badge: "Dean's List",
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Sanduni Fernando',
        school: 'UoP • Engineering',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will tutor Calculus, VLSM networking & provide handwritten step-by-step notes',
      description: 'Struggling with limits, integrals, or network subnetting? I will conduct a 1-on-1 tutoring session and give you access to formula sheets and solved past exam papers.',
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
        name: 'Dulaksha Nipun',
        school: 'SEUSL • ICT Junior',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will build a responsive React & Tailwind web application or fix frontend bugs',
      description: 'Need help with your front-end web project or assignment? I will write clean, modular React and Tailwind CSS components tailored for university submissions.',
      rating: '5.0',
      reviews: 94,
      turnaround: '2 Days',
      price: 35,
    },
    {
      id: 3,
      category: 'Design & Branding',
      badge: 'Featured Creator',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Kavindu Senanayake',
        school: 'UoM • Design Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will design modern student club posters, event flyers, and social media kits',
      description: 'Get eye-catching vector designs, stage banners, and promotional graphics made for student clubs and campus societies using Figma and Adobe Illustrator.',
      rating: '4.8',
      reviews: 67,
      turnaround: '1 Day',
      price: 15,
    },
    {
      id: 4,
      category: 'Writing & Reports',
      badge: 'Scholar',
      badgeColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop',
      seller: {
        name: 'Anuki Perera',
        school: 'UoC • English Lit',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      },
      title: 'I will proofread your university thesis, essays, or lab reports with APA/IEEE format',
      description: 'Thorough review of academic structure, tone, grammar, and bibliography formatting following strict APA 7th or IEEE academic standards.',
      rating: '5.0',
      reviews: 142,
      turnaround: '1 Day',
      price: 18,
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-gray-50/60 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf8f1] text-[#00875a] text-xs font-semibold mb-2 border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Top Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Featured Student Gigs
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Top-rated academic and creative services provided by verified peers
            </p>
          </div>

          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#007a4d] hover:text-[#006640] transition-colors group"
          >
            <span>Explore All Gigs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGigs.map((gig) => (
            <GigCard
              key={gig.id}
              gig={gig}
              isFavorite={!!favorites[gig.id]}
              onToggleFavorite={toggleFavorite}
              onClick={() => setSelectedGig(gig)}
            />
          ))}
        </div>

      </div>

      <GigDetailsModal
        gig={selectedGig}
        isOpen={Boolean(selectedGig)}
        onClose={() => setSelectedGig(null)}
      />
    </section>
  );
}