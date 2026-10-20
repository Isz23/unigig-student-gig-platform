import { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Zap, 
  Star, 
  GraduationCap, 
  Building2, 
  Landmark, 
  BookOpen, 
  Code2 
} from 'lucide-react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  // Popular search tags
  const popularTags = [
    'Calculus',
    'React Web Apps',
    'Resume Review',
    'Figma Posters',
    'Python Coaching',
  ];

  // Trusted universities / organizations
  const trustedPartners = [
    { name: 'MIT Campus', icon: GraduationCap },
    { name: 'Stanford Hub', icon: Building2 },
    { name: 'Berkeley Tech', icon: Landmark },
    { name: 'Oxford Union', icon: BookOpen },
    { name: 'ACM Student Chapters', icon: Code2 },
  ];

  return (
    <section className="relative w-full bg-[#034d2d] bg-gradient-to-br from-[#024427] via-[#034d2d] to-[#01351e] text-white pt-14 lg:pt-20 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= උඩ කොටස: Main Content Grid ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* වම් පැත්ත (Text & Search Bar) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c5936] border border-[#166e44] text-xs sm:text-sm font-medium text-emerald-100 shadow-sm">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>Over 5,000+ Verified University Freelancers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.15] tracking-tight">
              Find the perfect{' '}
              <span className="text-[#00e575]">
                student freelance services
              </span>{' '}
              for your projects.
            </h1>

            {/* Subtitle */}
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-xl">
              Connect with top-rated university peers in coding, tutoring, design, and
              campus services in minutes. Student-friendly rates, trusted turnaround.
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-xl">
              <form 
                onSubmit={(e) => e.preventDefault()}
                className="bg-white rounded-2xl p-1.5 sm:p-2 flex items-center shadow-lg border border-white/20 focus-within:ring-4 focus-within:ring-[#00e575]/20 transition-all"
              >
                <div className="pl-3 pr-2 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'Calculus Tutoring', 'React', or 'Resume'..."
                  className="w-full py-2 px-1 text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  type="submit"
                  className="bg-[#007a4d] hover:bg-[#00633e] text-white px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shrink-0 transition-all active:scale-95 shadow-md"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs sm:text-sm">
              <span className="text-gray-300 font-medium mr-1">Popular:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-gray-100 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* දකුණු පැත්ත (Student Card) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-[2rem] p-4 sm:p-5 shadow-2xl text-gray-800 border border-gray-100">
              
              {/* Image with Featured Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 group">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                  alt="Coding Laptop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-md border border-white/10">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span>Featured Student Seller</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="mt-4 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Sophia Martinez"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00a86b]/40"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">
                    Sophia Martinez
                  </h3>
                  <p className="text-xs font-semibold text-[#00875a] mt-0.5">
                    Stanford CS Junior • Fullstack Specialist
                  </p>
                </div>
              </div>

              {/* Review Quote */}
              <p className="mt-3 text-xs sm:text-sm text-gray-500 italic leading-relaxed">
                "Built and debugged web apps for 90+ campus peer projects and university startups."
              </p>

              {/* Stats */}
              <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-base sm:text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
                    <span>4.9</span>
                    <span className="text-yellow-500 text-sm">★</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                    Seller Rating
                  </div>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    94
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                    Orders Completed
                  </div>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    2 Days
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 font-medium mt-0.5">
                    Avg. Turnaround
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ================= යට කොටස: Trusted By University Banner ================= */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col items-center text-center">
          {/* Cyan / Light Blue Tagline */}
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#38bdf8] mb-4">
            Trusted by students, student clubs & campus innovators across top universities
          </p>

          {/* University List & Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-white">
            {trustedPartners.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-wide">
                  <IconComponent className="w-4 h-4 text-[#00e575] shrink-0" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}