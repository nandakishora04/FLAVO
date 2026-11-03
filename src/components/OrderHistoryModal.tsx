import React from 'react';
import { X, Clock, CheckCircle2, RotateCcw, UtensilsCrossed } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderHistoryModal: React.FC = () => {
  const {
    isOrderHistoryOpen,
    setIsOrderHistoryOpen,
    orderHistory,
    setLiveOrder,
    setIsTrackingOpen,
    addToCart,
    setIsCartOpen
  } = useApp();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="text-base font-bold text-stone-900">Your Bengaluru Orders</h3>
            <p className="text-xs text-stone-500">Track active deliveries or reorder favorites</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {orderHistory.length === 0 ? (
            <div className="py-16 text-center text-stone-400 flex flex-col items-center">
              <UtensilsCrossed className="w-12 h-12 opacity-30 mb-2" />
              <p className="text-sm font-bold text-stone-700">No past orders yet</p>
              <p className="text-xs text-stone-400 mt-1">
                Order authentic biryani, burgers or dosas to see them here!
              </p>
            </div>
          ) : (
            orderHistory.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{order.restaurant.name}</h4>
                    <p className="text-xs text-stone-500">{order.restaurant.locality} · {order.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      order.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-[#ff4b26]/10 text-[#ff4b26] border border-[#ff4b26]/20 animate-pulse'
                    }`}>
                      {order.status === 'delivered' ? 'Delivered' : 'In Progress'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="text-xs text-stone-600 space-y-1">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex justify-between">
                      <span>{it.quantity}x {it.menuItem.name}</span>
                      <span className="font-mono tabular-nums">₹{it.itemTotal}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar: Total and Action Buttons */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-stone-500">Bill Total: </span>
                    <strong className="text-stone-900 font-mono tabular-nums">₹{order.totalAmount}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live track if order is ongoing */}
                    {order.status !== 'delivered' && (
                      <button
                        type="button"
                        onClick={() => {
                          setLiveOrder(order);
                          setIsOrderHistoryOpen(false);
                          setIsTrackingOpen(true);
                        }}
                        className="px-3 py-1.5 bg-[#ff4b26] text-white rounded-xl text-xs font-bold shadow-2xs hover:bg-[#e03a16] transition-colors cursor-pointer"
                      >
                        Track Live GPS
                      </button>
                    )}

                    {/* Reorder Button */}
                    <button
                      type="button"
                      onClick={() => {
                        order.items.forEach(it => addToCart(it.menuItem, order.restaurant, it.selectedOptions));
                        setIsOrderHistoryOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
