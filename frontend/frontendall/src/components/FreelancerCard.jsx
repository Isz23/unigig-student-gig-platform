import { useNavigate } from 'react-router-dom';
import { Star, MessageSquare, ShieldCheck } from 'lucide-react';

export default function FreelancerCard({ freelancer }) {
  const navigate = useNavigate();

  const handleMessage = () => {
    if (freelancer?.id || freelancer?._id) {
      navigate(`/messages?peerId=${freelancer.id || freelancer._id}`);
    } else {
      navigate('/messages');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-emerald-100 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-[#007a4d]/25 shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
                  {freelancer.name}
                </h3>
                <ShieldCheck className="w-3.5 h-3.5 text-[#007a4d] shrink-0" />
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 truncate">
                {freelancer.school}
              </p>
            </div>
          </div>

          <span className="bg-[#eaf8f1] border border-emerald-100 text-[#007a4d] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
            {freelancer.badge}
          </span>
        </div>

        <div className="my-4 bg-gray-50/90 rounded-xl px-3.5 py-2 flex items-center gap-2 text-xs font-semibold text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-900">{freelancer.rating}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">{freelancer.completedOrders}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {freelancer.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white border border-gray-200/80 text-gray-600 rounded-lg text-[11px] sm:text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleMessage}
        className="w-full bg-[#007a4d] hover:bg-[#006640] text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Message Peer</span>
      </button>
    </div>
  );
}