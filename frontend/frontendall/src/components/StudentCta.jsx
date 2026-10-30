import { PlusCircle } from 'lucide-react';

export default function StudentCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <div className="bg-[#025a36] bg-gradient-to-r from-[#01472a] to-[#025a36] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* වම් පැත්ත: Title සහ Subtitle */}
        <div className="flex flex-col text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Are you a university student with skills?
          </h2>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
            Turn your programming, design, writing, or tutoring talents into a flexible campus income between classes.
          </p>
        </div>

        {/* දකුණු පැත්ත: CTA Button */}
        <div className="shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-2.5 bg-white text-[#025a36] hover:bg-gray-50 active:scale-95 font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm sm:text-base"
          >
            <PlusCircle className="w-5 h-5 text-[#025a36] stroke-[2.3]" />
            <span>Start Selling on UniGig</span>
          </button>
        </div>

      </div>
    </section>
  );
}