import { Search, Handshake, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      numberColor: 'text-[#a7f3d0]', // Soft mint green
      icon: Search,
      iconBg: 'bg-[#e6f7ef]',
      iconColor: 'text-[#00875a]',
      title: 'Find a Campus Peer',
      description:
        'Browse student profiles from your university or peer campuses. Compare portfolios, ratings, and course-relevant expertise.',
    },
    {
      number: '02',
      numberColor: 'text-[#c7d2fe]', // Soft lavender blue
      icon: Handshake,
      iconBg: 'bg-[#eef2ff]',
      iconColor: 'text-[#4f46e5]',
      title: 'Collaborate Securely',
      description:
        'Share project specs, lecture requirements, or club assets. Track turnaround times with student-to-student transparency.',
    },
    {
      number: '03',
      numberColor: 'text-[#a7f3d0]', // Soft mint green
      icon: Trophy,
      iconBg: 'bg-[#e6f7ef]',
      iconColor: 'text-[#00875a]',
      title: 'Approve & Build Reputation',
      description:
        'Receive high-quality deliverables, give peer reviews, and help fellow students build their professional resume and portfolio.',
    },
  ];

  return (
    <section className="w-full bg-[#fbfdfc] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* ================= Header Section ================= */}
        <div className="flex flex-col items-center text-center mb-16">
          
          {/* Top Pill Badge */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#e6f7ef] text-[#00875a] text-xs font-bold tracking-wider uppercase mb-4">
            Simple & Transparent
          </span>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">
            How UniGig Works
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base max-w-xl leading-relaxed">
            Getting your university projects completed or earning from your campus skills is fast, safe, and collaborative
          </p>
        </div>

        {/* ================= Steps Grid (3 Cards) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white border border-gray-100/90 rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Watermark Step Number */}
                <span
                  className={`absolute top-6 right-8 text-3xl sm:text-4xl font-extrabold select-none ${step.numberColor}`}
                >
                  {step.number}
                </span>

                {/* Centered Icon Container */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${step.iconBg}`}
                >
                  <IconComponent className={`w-7 h-7 stroke-[2.2] ${step.iconColor}`} />
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-[#0f172a] mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}