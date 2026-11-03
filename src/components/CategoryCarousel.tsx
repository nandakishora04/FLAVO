import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CUISINE_CATEGORIES } from '../data/bangaloreData';
import { useApp } from '../context/AppContext';

export const CategoryCarousel: React.FC = () => {
  const { filterState, setFilterState } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catId: string) => {
    if (catId === 'all') {
      setFilterState(prev => ({ ...prev, selectedCategory: null }));
    } else {
      setFilterState(prev => ({
        ...prev,
        selectedCategory: prev.selectedCategory === catId ? null : catId
      }));
    }
  };

  return (
    <section className="py-6 border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
              What's on your mind?
            </h2>
            <p className="text-xs text-stone-500">Craving Bengaluru's best delivered hot to your door</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel items */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
        >
          {CUISINE_CATEGORIES.map((cat) => {
            const isActive =
              (cat.id === 'all' && !filterState.selectedCategory) ||
              filterState.selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex flex-col items-center gap-2 px-3.5 py-3 rounded-2xl shrink-0 transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-[#ff4b26] text-white shadow-md scale-105'
                    : 'bg-white hover:bg-stone-50 border border-stone-200/80 text-stone-800 hover:border-stone-300 shadow-2xs'
                }`}
                style={{ width: '108px' }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                    isActive ? 'bg-white/20' : 'bg-stone-100'
                  }`}
                >
                  {cat.icon}
                </div>
                <span className={`text-xs font-semibold text-center truncate w-full ${isActive ? 'text-white' : 'text-stone-800'}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
