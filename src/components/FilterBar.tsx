import React from 'react';
import { SlidersHorizontal, Zap, Star, Leaf, Percent, ArrowUpDown, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FilterBar: React.FC = () => {
  const { filterState, setFilterState, resetFilters } = useApp();

  const isAnyFilterActive =
    filterState.fastDeliveryOnly ||
    filterState.pureVegOnly ||
    filterState.rating4Plus ||
    filterState.hasOffers ||
    filterState.sortBy !== 'relevance' ||
    filterState.selectedCategory !== null;

  return (
    <div className="py-4 border-b border-stone-200/80 bg-white/70 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Interactive filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Fast Delivery (<25 mins) */}
          <button
            type="button"
            onClick={() => setFilterState(prev => ({ ...prev, fastDeliveryOnly: !prev.fastDeliveryOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterState.fastDeliveryOnly
                ? 'bg-[#ff4b26] border-[#ff4b26] text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${filterState.fastDeliveryOnly ? 'fill-current' : 'text-amber-500'}`} />
            <span>Fast Delivery (&lt; 25 mins)</span>
          </button>

          {/* Rating 4.0+ */}
          <button
            type="button"
            onClick={() => setFilterState(prev => ({ ...prev, rating4Plus: !prev.rating4Plus }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterState.rating4Plus
                ? 'bg-[#ff4b26] border-[#ff4b26] text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterState.rating4Plus ? 'fill-current' : 'text-amber-500'}`} />
            <span>Rating 4.0+</span>
          </button>

          {/* Pure Veg */}
          <button
            type="button"
            onClick={() => setFilterState(prev => ({ ...prev, pureVegOnly: !prev.pureVegOnly }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterState.pureVegOnly
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Leaf className={`w-3.5 h-3.5 ${filterState.pureVegOnly ? 'text-white' : 'text-emerald-600'}`} />
            <span>Pure Veg</span>
          </button>

          {/* Offers */}
          <button
            type="button"
            onClick={() => setFilterState(prev => ({ ...prev, hasOffers: !prev.hasOffers }))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              filterState.hasOffers
                ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Offers &amp; Discounts</span>
          </button>

          {/* Reset button if active */}
          {isAnyFilterActive && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sortSelect" className="text-xs font-semibold text-stone-500 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </label>
          <select
            id="sortSelect"
            value={filterState.sortBy}
            onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#ff4b26]/30 focus:border-[#ff4b26] cursor-pointer"
          >
            <option value="relevance">Relevance (Recommended)</option>
            <option value="fastest">Delivery Time: Fastest First</option>
            <option value="rating">Rating: High to Low</option>
            <option value="costLowHigh">Cost: Low to High</option>
            <option value="costHighLow">Cost: High to Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};
