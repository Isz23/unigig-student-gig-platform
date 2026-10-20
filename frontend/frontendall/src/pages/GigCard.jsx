import React from 'react';

const GigCard = ({ title, image, price, rating, reviews, sellerName, sellerAvatar, isLiked }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition duration-300 group flex flex-col justify-between">
      <div>
        {/* Card Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {/* Like / Favorite Button */}
          <button className="absolute top-3 right-3 bg-slate-900/40 hover:bg-slate-900/60 text-white p-2 rounded-full backdrop-blur-xs transition">
            <svg
              className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Card Details */}
        <div className="p-4">
          {/* Seller Info */}
          {sellerName && (
            <div className="flex items-center gap-2 mb-2">
              <img
                src={sellerAvatar || 'https://via.placeholder.com/150'}
                alt={sellerName}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-semibold text-slate-600">{sellerName}</span>
            </div>
          )}

          {/* Gig Title */}
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-emerald-600 cursor-pointer transition">
            {title}
          </h3>
        </div>
      </div>

      {/* Card Footer (Rating & Price) */}
      <div className="p-4 pt-0 border-t border-slate-50 flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
          <span className="text-amber-400">★</span>
          <span>{rating}</span>
          <span className="text-slate-400">({reviews})</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-medium block leading-none">STARTING AT</span>
          <span className="text-sm font-extrabold text-slate-900">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;