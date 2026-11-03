import React from 'react';
import { Bike, Navigation2, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ActiveOrderFloatingBar: React.FC = () => {
  const { liveOrder, isTrackingOpen, setIsTrackingOpen } = useApp();

  if (!liveOrder || isTrackingOpen) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg">
      <div
        onClick={() => setIsTrackingOpen(true)}
        className="bg-stone-900 text-white rounded-2xl p-3.5 shadow-2xl border border-stone-700/80 hover:bg-stone-850 transition-all cursor-pointer flex items-center justify-between gap-3 group"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-[#ff4b26] flex items-center justify-center text-white shrink-0 shadow-md">
            <Bike className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white group-hover:text-[#ff4b26] transition-colors">
                {liveOrder.status === 'delivered'
                  ? 'Order Delivered!'
                  : `${liveOrder.deliveryPartner.name.split(' ')[0]} is on the way`}
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                #{liveOrder.orderNumber}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 mt-0.5 truncate max-w-[200px] sm:max-w-xs">
              {liveOrder.restaurant.name} · {liveOrder.status === 'delivered' ? 'Delivered' : `Arriving in ~${liveOrder.estimatedDeliveryMins}m`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-stone-400 block uppercase font-medium">Live GPS</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              {liveOrder.riderSpeedKmh} km/h
            </span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/10 group-hover:bg-[#ff4b26] text-white flex items-center justify-center transition-colors">
            <Navigation2 className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};
