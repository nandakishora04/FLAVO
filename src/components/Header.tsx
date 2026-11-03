import React from 'react';
import { MapPin, Search, ShoppingBag, Sparkles, Navigation2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    selectedLocation,
    setIsLocationModalOpen,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
    liveOrder,
    setIsTrackingOpen,
    setIsOrderHistoryOpen,
    filterState,
    setFilterState
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark with attached Logo */}
        <div className="flex items-center gap-6 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src="/assets/aistudio/image_c5f887be.png"
              alt="FLAVO Logo"
              className="w-10 h-10 object-contain rounded-xl shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-extrabold tracking-tight text-[#ff4b26] group-hover:text-[#e03a16] transition-colors">
              flavo
            </span>
          </a>

          {/* Hyperlocal Bangalore Location Switcher */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden sm:flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 border-l border-stone-200 pl-4 py-1 text-left transition-colors cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-[#ff4b26] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 text-xs flex items-center gap-1">
                {selectedLocation.name}
                <span className="text-[10px] text-stone-400 font-normal">▼</span>
              </span>
              <span className="text-[11px] text-stone-500 truncate max-w-[130px] lg:max-w-[180px]">
                {selectedLocation.area}
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links & Search Trigger */}
        <nav className="flex-1 max-w-xl mx-2 hidden md:flex items-center gap-3">
          {/* Quick Search Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search dishes or restaurants (e.g. Meghana biryani, Truffles, Benne dosa)..."
              className="w-full pl-9.5 pr-4 py-2 bg-stone-100 hover:bg-stone-50 focus:bg-white border border-stone-200/80 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ff4b26]/30 focus:border-[#ff4b26] transition-all"
            />
            {filterState.searchQuery && (
              <button
                type="button"
                onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Actions (Tracking Badge + Orders + Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Live Order Real-time Tracking Trigger */}
          {liveOrder && (
            <button
              type="button"
              onClick={() => setIsTrackingOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#ff4b26]/10 hover:bg-[#ff4b26]/20 border border-[#ff4b26]/30 rounded-xl text-[#ff4b26] text-xs font-semibold transition-all cursor-pointer shadow-xs animate-pulse"
              title="View live GPS delivery tracking"
            >
              <Navigation2 className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Track Order</span>
              <span className="text-[11px] font-mono tabular-nums bg-[#ff4b26] text-white px-1.5 py-0.2 rounded-md">
                {liveOrder.estimatedDeliveryMins}m
              </span>
            </button>
          )}

          {/* Past Orders History Button */}
          <button
            type="button"
            onClick={() => setIsOrderHistoryOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Orders</span>
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-[#ff4b26] hover:bg-[#e03a16] text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="font-mono text-xs tabular-nums border-l border-white/30 pl-2">
                ₹{cartSubtotal}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Search Bar Row */}
      <div className="md:hidden px-4 pb-2.5 pt-0">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search restaurants, biryani, burgers, dosas..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100 text-xs rounded-lg text-stone-800 placeholder-stone-400 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
          />
        </div>
      </div>
    </header>
  );
};
