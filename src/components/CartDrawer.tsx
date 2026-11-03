import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Tag, ShieldCheck, MapPin, Bike, Check, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PROMO_COUPONS } from '../data/bangaloreData';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartRestaurant,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    selectedLocation,
    placeOrder,
    appliedCoupon,
    setAppliedCoupon,
    couponDiscount
  } = useApp();

  const [addressLine, setAddressLine] = useState(`${selectedLocation.name}, Flat 402, Magnolia Heights, ${selectedLocation.area}`);
  const [deliveryNote, setDeliveryNote] = useState('Leave with apartment security / Ring doorbell once');
  const [selectedTip, setSelectedTip] = useState<number>(30);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'cod'>('upi');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const deliveryFee = cartSubtotal > 199 || appliedCoupon === 'FREEDEL' ? 0 : 35;
  const platformFee = 5;
  const gstTax = Math.round(cartSubtotal * 0.05);
  const totalAmount = Math.max(0, cartSubtotal + deliveryFee + platformFee + gstTax + selectedTip - couponDiscount);

  const handleApplyCoupon = (code: string) => {
    const coupon = PROMO_COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase().trim());
    if (!coupon) {
      setCouponError('Invalid promo code');
      return;
    }
    if (cartSubtotal < coupon.minOrder) {
      setCouponError(`Min order of ₹${coupon.minOrder} required for ${coupon.code}`);
      return;
    }
    setAppliedCoupon(coupon.code);
    setCouponError('');
    setCouponInput('');
  };

  const handleCheckout = () => {
    if (cart.length === 0 || !cartRestaurant) return;
    placeOrder(
      addressLine,
      deliveryNote,
      paymentMode.toUpperCase(),
      appliedCoupon,
      selectedTip
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ff4b26]/10 flex items-center justify-center text-[#ff4b26]">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">Your FLAVO Bag</h3>
                {cartRestaurant && (
                  <p className="text-xs text-stone-500 truncate max-w-[220px]">
                    From {cartRestaurant.name} · {cartRestaurant.locality}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-3">
                  <Bike className="w-8 h-8 opacity-40 text-stone-400" />
                </div>
                <h4 className="text-base font-bold text-stone-800">Your bag is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explore Bengaluru's finest biryani, butter masala dosas, and artisanal burgers to get started.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-[#ff4b26] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#e03a16] transition-colors cursor-pointer"
                >
                  Browse Restaurants
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar */}
                {cartSubtotal < 199 && (
                  <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                    <span>Add <strong>₹{199 - cartSubtotal}</strong> more for Free Delivery!</span>
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3 divide-y divide-stone-100">
                  {cart.map((line) => (
                    <div key={line.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1">
                        <div className={`mt-1 w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                          line.menuItem.isVeg ? 'border-emerald-600' : 'border-rose-600'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${line.menuItem.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 leading-snug">
                            {line.menuItem.name}
                          </div>
                          {line.selectedOptions && Object.keys(line.selectedOptions).length > 0 && (
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {Object.entries(line.selectedOptions).map(([key, val]) => `${key}: ${val}`).join(' · ')}
                            </div>
                          )}
                          <div className="text-xs font-mono font-bold text-stone-800 tabular-nums mt-1">
                            ₹{line.itemTotal}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          {line.quantity === 1 ? <Trash2 className="w-3 h-3 text-rose-500" /> : <Minus className="w-3 h-3" />}
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-stone-900">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address & Instructions */}
                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff4b26]" />
                      Deliver to: {selectedLocation.name}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">Hyperlocal</span>
                  </div>
                  <input
                    type="text"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="Complete flat, building, floor..."
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
                  />
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    placeholder="Delivery instructions (e.g. leave at door)"
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-600 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
                  />
                </div>

                {/* Tip Delivery Partner */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                    <span>Tip your delivery partner</span>
                    <span className="text-stone-400 font-normal">100% goes to rider</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 20, 30, 50].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedTip(amt)}
                        className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                          selectedTip === amt
                            ? 'bg-[#ff4b26] border-[#ff4b26] text-white shadow-2xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {amt === 0 ? 'No tip' : `₹${amt}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Coupon Module */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#ff4b26]" />
                    <span className="text-xs font-bold text-stone-900">Apply FLAVO Coupon</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-900">
                      <div>
                        <strong>{appliedCoupon}</strong> applied! You saved ₹{couponDiscount}
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-emerald-700 hover:text-emerald-900 font-bold ml-2 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        placeholder="Try FLAVOFIRST or BENGALURU50"
                        className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs uppercase font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
                      />
                      <button
                        type="button"
                        onClick={() => handleApplyCoupon(couponInput)}
                        className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-600">
                  <h4 className="font-bold text-stone-900 mb-2">Bill Summary</h4>
                  <div className="flex justify-between">
                    <span>Item Total</span>
                    <span className="font-mono tabular-nums text-stone-900">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hyperlocal Delivery Fee</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span className="font-mono tabular-nums text-stone-900">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST &amp; Restaurant Packaging</span>
                    <span className="font-mono tabular-nums text-stone-900">₹{gstTax}</span>
                  </div>
                  {selectedTip > 0 && (
                    <div className="flex justify-between text-stone-800">
                      <span>Delivery Tip</span>
                      <span className="font-mono tabular-nums">₹{selectedTip}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Coupon Discount</span>
                      <span className="font-mono tabular-nums">-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                    <span>To Pay</span>
                    <span className="font-mono tabular-nums text-[#ff4b26] text-base">₹{totalAmount}</span>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-stone-900">Payment Option</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'UPI (GPay/PhonePe)' },
                      { id: 'card', label: 'Card / NetBanking' },
                      { id: 'cod', label: 'Cash on Delivery' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setPaymentMode(mode.id as any)}
                        className={`p-2 rounded-xl text-[11px] font-medium text-center border transition-all cursor-pointer ${
                          paymentMode === mode.id
                            ? 'border-[#ff4b26] bg-[#ff4b26]/5 text-[#ff4b26] font-bold shadow-2xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Action */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-stone-200 bg-white shadow-lg shrink-0">
              <div className="flex items-center justify-between mb-2 text-xs text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Live GPS Rider Tracking included
                </span>
                <span className="font-mono text-stone-900 font-bold">~{cartRestaurant?.deliveryTimeMins || 25} mins</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 bg-[#ff4b26] hover:bg-[#e03a16] text-white text-sm font-bold rounded-2xl shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-between"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium opacity-90">Place Order</span>
                  <span className="font-mono tabular-nums text-base">₹{totalAmount}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span>Start Live Tracking</span>
                  <span className="text-lg">→</span>
                </div>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
