import { Star, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function GigCard({ gig, isFavorite, onToggleFavorite }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={gig.image}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 shadow-sm border border-white/10">
          <ShieldCheck className={`w-3.5 h-3.5 ${gig.badgeColor}`} />
          <span>{gig.badge}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={() => onToggleFavorite(gig.id)}
          aria-label="Save gig"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Seller Info */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <img
            src={gig.seller.avatar}
            alt={gig.seller.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-gray-200"
          />
          <div className="leading-tight">
            <h3 className="text-xs font-bold text-gray-900">{gig.seller.name}</h3>
            <p className="text-[11px] text-gray-500">{gig.seller.school}</p>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#007a4d] transition-colors line-clamp-2 leading-snug mb-3">
          {gig.title}
        </h4>

        {/* Rating & Turnaround */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-gray-900">{gig.rating}</span>
            <span className="text-gray-400">({gig.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{gig.turnaround}</span>
          </div>
        </div>

        {/* Price Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
            Starting at
          </span>
          <span className="text-base font-extrabold text-[#007a4d]">
            ${gig.price}
          </span>
        </div>

      </div>
    </div>
  );
}