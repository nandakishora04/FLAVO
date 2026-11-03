import React, { useState } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  FastForward,
  ChevronDown,
  ChevronUp,
  MapPin,
  UtensilsCrossed,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BangaloreLiveMap } from './BangaloreLiveMap';
import { OrderStatus } from '../types';

export const LiveOrderTrackingModal: React.FC = () => {
  const {
    liveOrder,
    isTrackingOpen,
    setIsTrackingOpen,
    sendRiderMessage,
    fastForwardTracking,
    jumpToStatus
  } = useApp();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [itemsExpanded, setItemsExpanded] = useState(false);

  if (!isTrackingOpen || !liveOrder) return null;

  const partner = liveOrder.deliveryPartner;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    sendRiderMessage(chatInput.trim());
    setChatInput('');
  };

  const getStatusHeadline = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return 'Order Confirmed by Restaurant';
      case 'preparing':
        return 'Chef is Cooking Your Meal Fresh';
      case 'picked_up':
        return `${partner.name.split(' ')[0]} Collected Your Order`;
      case 'on_the_way':
        return `${partner.name.split(' ')[0]} is On The Way!`;
      case 'delivered':
        return 'Delivered! Bon Appétit! 🎉';
      default:
        return 'Order in Progress';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Sticky Header */}
        <div className="px-5 py-4 border-b border-stone-100 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff4b26]/10 flex items-center justify-center text-[#ff4b26] shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900">
                  {getStatusHeadline(liveOrder.status)}
                </h3>
                <span className="text-[11px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                  #{liveOrder.orderNumber}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                From {liveOrder.restaurant.name} · {liveOrder.restaurant.locality}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Fast-Forward Simulator Button */}
            {liveOrder.status !== 'delivered' && (
              <button
                type="button"
                onClick={fastForwardTracking}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Fast forward delivery simulation"
              >
                <FastForward className="w-3.5 h-3.5 fill-current" />
                <span>Fast-Forward</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsTrackingOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Tracking Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Estimated Time & Progress Bar */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                  {liveOrder.status === 'delivered' ? 'Status' : 'Estimated Delivery Time'}
                </span>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5 flex items-center gap-2">
                  {liveOrder.status === 'delivered' ? (
                    <span className="text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-7 h-7" />
                      Delivered at your doorstep!
                    </span>
                  ) : (
                    <>
                      <Clock className="w-6 h-6 text-[#ff4b26]" />
                      <span>{liveOrder.estimatedDeliveryMins} mins</span>
                      <span className="text-xs font-medium text-stone-400">
                        (by {new Date(Date.now() + liveOrder.estimatedDeliveryMins * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Simulation Quick Stage Switcher */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                <span className="text-[10px] text-stone-300 px-2 font-medium hidden md:inline">Simulate:</span>
                {(['preparing', 'picked_up', 'on_the_way', 'delivered'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => jumpToStatus(st)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                      liveOrder.status === st ? 'bg-[#ff4b26] text-white shadow-xs' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-stone-700/60 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-linear-to-r from-[#ff4b26] to-amber-400 h-2.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${liveOrder.progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1.5">
                <span>Kitchen</span>
                <span>Picked up</span>
                <span>On the way ({liveOrder.progressPercent}%)</span>
                <span>Doorstep</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Map */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#ff4b26]" />
                <span>Hyperlocal Live GPS Tracking · Bengaluru</span>
              </h4>
              <span className="text-[11px] text-stone-500 font-mono">Real-time coordinates</span>
            </div>
            <BangaloreLiveMap order={liveOrder} />
          </div>

          {/* Delivery Partner Profile & Instant Actions */}
          <div className="p-4 sm:p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={partner.avatarUrl}
                  alt={partner.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-xs"
                />
                {partner.evGreenBadge && (
                  <span
                    className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full"
                    title="100% Eco Electric Vehicle Rider"
                  >
                    EV
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-stone-900">{partner.name}</h4>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                    ★ {partner.rating}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  {partner.vehicle} · <span className="font-mono">{partner.vehicleNumber}</span>
                </p>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {partner.totalTrips}+ successful deliveries in Bengaluru
                </p>
              </div>
            </div>

            {/* Quick Action Buttons: Call & Chat */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCallModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Partner</span>
              </button>

              <button
                type="button"
                onClick={() => setChatOpen(!chatOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 ${
                  chatOpen
                    ? 'bg-stone-900 text-white'
                    : 'bg-[#ff4b26] hover:bg-[#e03a16] text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{chatOpen ? 'Close Chat' : 'Chat with Rider'}</span>
              </button>
            </div>
          </div>

          {/* In-App Simulated Driver Chat Drawer */}
          {chatOpen && (
            <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-xs font-bold text-stone-800">
                  Chat with {partner.name}
                </span>
                <span className="text-[10px] text-stone-500">Replies usually in 10s</span>
              </div>

              {/* Messages stream */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {liveOrder.driverChatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl text-xs max-w-xs ${
                        msg.sender === 'customer'
                          ? 'bg-[#ff4b26] text-white rounded-br-none'
                          : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-stone-400 mt-0.5 px-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick preset replies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Please ring when at the gate",
                  "Leave with security guard",
                  "Call upon arrival",
                  "Apartment Tower B, 4th Floor"
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => sendRiderMessage(preset)}
                    className="px-2 py-1 bg-white hover:bg-stone-200/80 border border-stone-200 text-stone-700 text-[11px] rounded-lg transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <form onSubmit={handleSendMessage} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type message for Manjunath..."
                  className="flex-1 px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#ff4b26] text-white rounded-xl text-xs font-bold hover:bg-[#e03a16] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Step-by-Step Delivery Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Delivery Milestones
            </h4>
            <div className="space-y-2 border-l-2 border-stone-200 ml-3 pl-4">
              {liveOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative pb-2 last:pb-0">
                  <div
                    className={`absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                      step.completed
                        ? 'bg-emerald-600 border-emerald-600 shadow-2xs'
                        : 'bg-white border-stone-300'
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${step.completed ? 'text-stone-900' : 'text-stone-400'}`}>
                      {step.title}
                    </span>
                    {step.time && (
                      <span className="text-[10px] font-mono text-stone-400">{step.time}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Order Items & Bill Breakdown */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
            <button
              type="button"
              onClick={() => setItemsExpanded(!itemsExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span>Items in this Order ({liveOrder.items.length})</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-stone-900">Total: ₹{liveOrder.totalAmount}</span>
                {itemsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {itemsExpanded && (
              <div className="p-4 border-t border-stone-200 space-y-2 bg-white text-xs">
                {liveOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-stone-700">
                    <span>
                      {it.quantity}x {it.menuItem.name}
                    </span>
                    <span className="font-mono tabular-nums font-bold">₹{it.itemTotal}</span>
                  </div>
                ))}

                <div className="pt-2 border-t border-stone-100 space-y-1 text-stone-500 text-[11px]">
                  <div className="flex justify-between">
                    <span>Delivery Address</span>
                    <span className="font-medium text-stone-800 text-right max-w-xs">{liveOrder.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-mono font-bold text-stone-800">{liveOrder.paymentMethod}</span>
                  </div>
                  {liveOrder.deliveryInstructions && (
                    <div className="flex justify-between">
                      <span>Instructions</span>
                      <span className="text-stone-700 italic">{liveOrder.deliveryInstructions}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Simulated Phone Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-stone-900 text-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 border border-stone-700 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-pulse">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold">{partner.name}</h4>
              <p className="text-xs text-stone-400 font-mono mt-0.5">{partner.phone}</p>
              <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                Calling via FLAVO Masked Privacy Line...
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCallModalOpen(false)}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
