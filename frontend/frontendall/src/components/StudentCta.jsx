import { Link } from 'react-router-dom';
import { PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function StudentCta() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#01472a] via-[#007a4d] to-[#015230] rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-emerald-600/30 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold mb-3 border border-white/15 w-fit mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Monetize Your Coursework Skills</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Are you a university student with skills?
          </h2>

          <p className="text-emerald-100/90 text-xs sm:text-sm md:text-base mt-2.5 max-w-2xl leading-relaxed">
            Turn your programming, design, writing, or tutoring talents into a flexible campus income between lectures with verified milestone Escrow payouts.
          </p>
        </div>

        <div className="shrink-0 z-10">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2.5 bg-white text-[#007a4d] hover:bg-emerald-50 active:scale-95 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all text-xs sm:text-sm md:text-base group"
          >
            <PlusCircle className="w-5 h-5 text-[#007a4d] stroke-[2.3]" />
            <span>Start Selling on UniGig</span>
            <ArrowRight className="w-4 h-4 text-[#007a4d] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}