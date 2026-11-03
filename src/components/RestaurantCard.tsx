import React, { useState } from 'react';
import { Star, Clock, MapPin, Utensils, Sparkles } from 'lucide-react';
import { Restaurant } from '../types';
import { useApp } from '../context/AppContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { setActiveRestaurantModal } = useApp();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      onClick={() => setActiveRestaurantModal(restaurant)}
      className="group relative bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      {/* Visual Image Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
        {!imageFailed ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Zero broken image resilient fallback container */
          <div className="w-full h-full bg-linear-to-br from-[#1e0814] to-[#ff4b26]/80 flex flex-col items-center justify-center text-white p-4 text-center">
            <Utensils className="w-8 h-8 opacity-80 mb-2" />
            <span className="font-bold text-sm tracking-wide">{restaurant.name}</span>
            <span className="text-[11px] opacity-75">{restaurant.locality}, Bengaluru</span>
          </div>
        )}

        {/* Scrim gradient overlay for typography readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Promo Discount Tag on bottom of image */}
        {restaurant.discountOffer && (
          <div className="absolute bottom-2.5 left-3 text-white font-extrabold text-sm tracking-tight drop-shadow-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{restaurant.discountOffer}</span>
          </div>
        )}

        {/* Pure Veg Indicator */}
        {restaurant.isPureVeg && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-600/95 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            PURE VEG
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#ff4b26] transition-colors leading-snug">
              {restaurant.name}
            </h3>
            {/* Rating */}
            <div className="flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-lg text-xs font-bold shrink-0 font-mono">
              <Star className="w-3 h-3 fill-current" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {restaurant.tagline}
          </p>

          {/* Unboxed Metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium mt-2.5">
            <span className="flex items-center gap-1 text-stone-800 font-semibold font-mono">
              <Clock className="w-3.5 h-3.5 text-[#ff4b26]" />
              {restaurant.deliveryTimeMins} mins
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-mono tabular-nums">₹{restaurant.costForTwo} for two</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-500 truncate">{restaurant.locality}</span>
          </div>

          {/* Cuisines */}
          <div className="mt-2 text-xs text-stone-500 truncate">
            {restaurant.cuisines.join(', ')}
          </div>
        </div>

        {/* Bottom subtle bar: distance & quick action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-stone-400" />
            <span className="font-mono">{restaurant.distanceKm} km away</span>
          </span>
          <span className="font-semibold text-[#ff4b26] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            View Menu →
          </span>
        </div>
      </div>
    </article>
  );
};
