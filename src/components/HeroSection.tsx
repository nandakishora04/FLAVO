import React from 'react';
import { Zap, ShieldCheck, Navigation, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANGALORE_LOCATIONS } from '../data/bangaloreData';

export const HeroSection: React.FC = () => {
  const { selectedLocation, setSelectedLocation, setIsLocationModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1e0814] via-[#2a0b1c] to-[#12040d] text-white py-10 sm:py-14 border-b border-stone-800">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4b26]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Hero & Copy */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Hyperlocal Bangalore Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-amber-300 font-semibold border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hyperlocal Food Delivery · Namma Bengaluru</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white text-balance">
              Craving Bengaluru’s <span className="text-[#ff5200]">Iconic Flavours</span>, Delivered In 22 Mins.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
              From Meghana’s fiery Andhra biryani and Truffles’ gourmet burgers to Vidyarthi Bhavan’s legendary butter masala dosa — tracked live on real GPS from kitchen to doorstep.
            </p>

            {/* Popular Bengaluru Areas Quick Switcher */}
            <div className="pt-2">
              <span className="text-xs text-stone-400 block mb-2 font-medium">
                Select your delivery hub:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {BANGALORE_LOCATIONS.slice(0, 5).map((loc) => {
                  const isActive = loc.id === selectedLocation.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#ff4b26] text-white shadow-md'
                          : 'bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white border border-white/10'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>{loc.name}</span>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white border border-dashed border-stone-600 hover:border-stone-400 transition-colors cursor-pointer"
                >
                  + More Areas
                </button>
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ff4b26]/20 flex items-center justify-center text-[#ff4b26]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">22-Min Speed</h4>
                  <p className="text-[11px] text-stone-400">Hyperlocal radius routing</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Live GPS Tracking</h4>
                  <p className="text-[11px] text-stone-400">Turn-by-turn rider telemetry</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Zero Spills</h4>
                  <p className="text-[11px] text-stone-400">Insulated thermal carry bags</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: FLAVO Official Brand Logo & Live Promo Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl w-full max-w-sm shadow-2xl flex flex-col items-center text-center">
              
              {/* Brand Logo Asset */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg border border-white/20 mb-4 bg-stone-900">
                <img
                  src="/assets/aistudio/image_c5f887be.png"
                  alt="FLAVO Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                Welcome to
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                FLAVO BENGALURU
              </h3>
              
              <p className="text-xs text-stone-300 mt-2">
                Order now from 500+ top eateries in Indiranagar, Koramangala, and HSR.
              </p>

              {/* Promo Banner Code */}
              <div className="mt-4 w-full p-3 bg-linear-to-r from-[#ff4b26]/20 to-amber-500/20 border border-[#ff4b26]/40 rounded-2xl flex items-center justify-between text-xs">
                <div className="text-left">
                  <span className="block text-[10px] text-amber-300 font-mono font-bold uppercase">First Order Offer</span>
                  <span className="font-bold text-white">40% OFF up to ₹120</span>
                </div>
                <span className="font-mono font-black text-amber-300 bg-white/10 px-2 py-1 rounded-md text-[11px] border border-amber-300/30">
                  FLAVOFIRST
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
