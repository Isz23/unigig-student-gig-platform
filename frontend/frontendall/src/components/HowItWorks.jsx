import { Search, ShieldCheck, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      numberColor: 'text-emerald-200',
      icon: Search,
      iconBg: 'bg-[#eaf8f1]',
      iconColor: 'text-[#007a4d]',
      title: 'Post Tasks or Browse Gigs',
      description:
        'Post your project specs for reverse bidding or explore pre-packaged services from verified campus peers across universities.',
    },
    {
      number: '02',
      numberColor: 'text-emerald-200',
      icon: ShieldCheck,
      iconBg: 'bg-[#eaf8f1]',
      iconColor: 'text-[#007a4d]',
      title: 'Lock Funds in Escrow',
      description:
        'Accept a proposal and deposit payment securely into the milestone Escrow vault before the student starts working. Zero upfront risk.',
    },
    {
      number: '03',
      numberColor: 'text-emerald-200',
      icon: Trophy,
      iconBg: 'bg-[#eaf8f1]',
      iconColor: 'text-[#007a4d]',
      title: 'Inspect, Release & Review',
      description:
        'Inspect live URLs and source repositories. Release payments with one click and leave verified ratings for student portfolios.',
    },
  ];

  return (
    <section className="w-full bg-[#fbfdfc] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#eaf8f1] border border-emerald-100 text-[#00875a] text-xs font-bold tracking-wider uppercase mb-3">
            Simple & Transparent
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2.5">
            How UniGig Works
          </h2>

          <p className="text-gray-500 text-xs sm:text-sm max-w-lg leading-relaxed">
            Getting your campus projects done or monetizing your skills is streamlined with automated bidding and milestone Escrow protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white border border-gray-100 rounded-3xl p-7 sm:p-9 flex flex-col items-center text-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-1 hover:border-emerald-100 transition-all duration-300"
              >
                <span
                  className={`absolute top-6 right-8 text-3xl sm:text-4xl font-black select-none ${step.numberColor}`}
                >
                  {step.number}
                </span>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-xs border border-emerald-100/50 ${step.iconBg}`}
                >
                  <IconComponent className={`w-7 h-7 stroke-[2.2] ${step.iconColor}`} />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/browse-jobs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#007a4d] hover:text-[#006640] transition-colors"
          >
            <span>See task requests currently open for bidding</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}