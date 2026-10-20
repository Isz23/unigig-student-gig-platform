import { Star } from 'lucide-react';

export default function CampusStories() {
  const testimonials = [
    {
      id: 1,
      quote:
        '"UniGig saved my GPA! I found an MIT peer who tutored me through Vector Calculus right before midterms. Explanations were ten times better than the professor\'s lecture."',
      author: 'David Miller',
      role: 'Georgia Tech • Mechanical Engineering',
      avatar:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
      highlighted: true, // පළමු card එකේ කොළ පැහැති border එක සඳහා
    },
    {
      id: 2,
      quote:
        '"I earned over $800 last semester designing club posters and helping classmates fix their React bugs between classes. UniGig is the best platform for campus hustlers."',
      author: 'Sophia Martinez',
      role: 'Stanford • Computer Science',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      highlighted: false,
    },
    {
      id: 3,
      quote:
        '"Got my resume reviewed by a senior who interned at Google. I revamped my bullet points following their advice and landed 4 internship interviews in two weeks!"',
      author: 'Kavya Patel',
      role: 'UC Berkeley • Data Science',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      highlighted: false,
    },
  ];

  return (
    <section className="w-full bg-[#fbfdfc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= Header Section ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#e6f7ef] text-[#00875a] text-xs font-bold tracking-wider uppercase mb-4">
            Campus Stories
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            Loved by Students Across Universities
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            See how undergraduates and postgrads use UniGig to ace coursework, fund their tuition, and
            build career portfolios
          </p>
        </div>

        {/* ================= Cards Grid (3 Columns) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 ${
                item.highlighted
                  ? 'border-2 border-[#86efac]'
                  : 'border border-gray-100'
              }`}
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 italic text-sm sm:text-[15px] leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div className="leading-tight">
                  <h3 className="text-sm font-bold text-[#0f172a]">
                    {item.author}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
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