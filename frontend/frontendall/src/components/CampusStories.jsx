import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function CampusStories() {
  const testimonials = [
    {
      id: 1,
      quote:
        '"UniGig saved my semester project! I connected with a campus peer who helped me debug my React & Tailwind state management issues right before submission deadlines."',
      author: 'Dinuka Jayasinghe',
      role: 'UoM • Computer Science & Eng',
      avatar:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 2,
      quote:
        '"I earned flexible pocket money last term designing IEEE club flyers and tutoring junior peers in programming between lectures. Milestone Escrow payouts give total peace of mind."',
      author: 'Rashmi Wickramasinghe',
      role: 'SEUSL • ICT Junior',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 3,
      quote:
        '"Got my resume reviewed and revamped by a final-year senior. Their practical tips on highlighting GitHub projects helped me secure three software intern interviews within a month."',
      author: 'Kavindu Pathirana',
      role: 'UoP • Electrical & Electronic Eng',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
  ];

  return (
    <section className="w-full bg-[#fbfdfc] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-xs font-bold tracking-wider uppercase mb-3">
            Campus Stories
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2.5">
            Loved by Students Across Universities
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm max-w-xl leading-relaxed">
            See how undergraduates use UniGig to ace technical coursework, build credible portfolios, and earn independently between lectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 relative border-2 border-[#007a4d]/30 bg-gradient-to-b from-[#eaf8f1]/30 to-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-500 fill-amber-500"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-emerald-100" />
                </div>

                <p className="text-gray-600 italic text-xs sm:text-sm leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="mt-7 pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div className="leading-tight min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                      {item.author}
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}