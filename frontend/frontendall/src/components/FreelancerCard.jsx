import { Star, MessageSquare } from 'lucide-react';

export default function FreelancerCard({ freelancer }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">
      
      {/* ---------------- Top Row: Profile & Badge ---------------- */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={freelancer.avatar}
            alt={freelancer.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00a86b]"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {freelancer.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {freelancer.school}
            </p>
          </div>
        </div>

        {/* Level / Status Badge */}
        <span className="bg-[#eaf8f1] text-[#00875a] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
          {freelancer.badge}
        </span>
      </div>

      {/* ---------------- Middle Row: Rating & Orders Pill ---------------- */}
      <div className="my-5 bg-gray-50/80 rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs font-semibold text-gray-600">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="font-bold text-gray-900">{freelancer.rating}</span>
        </div>
        <span className="text-gray-300">•</span>
        <span>{freelancer.completedOrders}</span>
      </div>

      {/* ---------------- Skills / Tags ---------------- */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {freelancer.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* ---------------- Bottom Button ---------------- */}
      <button
        type="button"
        className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Message Peer</span>
      </button>

    </div>
  );
}