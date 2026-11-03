import React, { useState } from 'react';
import { MapPin, Search, Check, Navigation, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANGALORE_LOCATIONS } from '../data/bangaloreData';
import { BangaloreLocation } from '../types';

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedLocation, setSelectedLocation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isLocationModalOpen) return null;

  const filteredLocations = BANGALORE_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.landmark.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.pincode.includes(searchTerm)
  );

  const handleSelect = (loc: BangaloreLocation) => {
    setSelectedLocation(loc);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ff4b26]/10 flex items-center justify-center text-[#ff4b26]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Select Bangalore Delivery Area</h3>
              <p className="text-xs text-stone-500">Fastest hyperlocal rider dispatch in 20-30 mins</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search area, landmark or pincode in Bengaluru..."
              className="w-full pl-9.5 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ff4b26]/30 focus:border-[#ff4b26]"
            />
          </div>
        </div>

        {/* Quick GPS detect */}
        <div className="px-5 py-3 border-b border-stone-100 bg-stone-50/30 flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleSelect(BANGALORE_LOCATIONS[0])}
            className="flex items-center gap-2 text-xs font-semibold text-[#ff4b26] hover:text-[#e03a16] transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Use current GPS location (Indiranagar 100ft Rd)</span>
          </button>
          <span className="text-[11px] text-stone-400 font-mono">Bengaluru, KA</span>
        </div>

        {/* Location List */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {filteredLocations.map((loc) => {
            const isSelected = loc.id === selectedLocation.id;
            return (
              <div
                key={loc.id}
                onClick={() => handleSelect(loc)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-[#ff4b26] bg-[#ff4b26]/5 shadow-xs'
                    : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#ff4b26] text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      {loc.name}
                      <span className="text-[10px] font-mono text-stone-400 font-normal">
                        PIN {loc.pincode}
                      </span>
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">{loc.area}</p>
                    <p className="text-[11px] text-stone-400">{loc.landmark}</p>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-[#ff4b26] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-stone-400 hover:text-[#ff4b26]">Select</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
