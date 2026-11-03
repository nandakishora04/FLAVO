import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Search, Plus, Minus, Sparkles, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';

export const RestaurantDetailModal: React.FC = () => {
  const {
    activeRestaurantModal,
    setActiveRestaurantModal,
    cart,
    addToCart,
    updateQuantity,
    setCustomizerDish
  } = useApp();

  const [menuSearch, setMenuSearch] = useState('');
  const [vegFilterOnly, setVegFilterOnly] = useState(false);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('All');

  if (!activeRestaurantModal) return null;
  const restaurant = activeRestaurantModal;

  // Extract unique categories from this restaurant's menu
  const categories = ['All', ...Array.from(new Set(restaurant.menu.map(m => m.category)))];

  const filteredMenu = restaurant.menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesVeg = vegFilterOnly ? item.isVeg : true;
    const matchesCat = selectedMenuCategory === 'All' ? true : item.category === selectedMenuCategory;
    return matchesSearch && matchesVeg && matchesCat;
  });

  const getItemCartQuantity = (dish: MenuItem) => {
    return cart
      .filter(c => c.menuItem.id === dish.id && c.restaurantId === restaurant.id)
      .reduce((sum, c) => sum + c.quantity, 0);
  };

  const handleAddClick = (dish: MenuItem) => {
    if (dish.customizable) {
      setCustomizerDish({ item: dish, restaurant });
    } else {
      addToCart(dish, restaurant);
    }
  };

  const handleMinusClick = (dish: MenuItem) => {
    const match = cart.find(c => c.menuItem.id === dish.id && c.restaurantId === restaurant.id);
    if (match) {
      updateQuantity(match.id, match.quantity - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Restaurant Identity */}
        <div className="relative bg-stone-900 text-white shrink-0">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <img
              src={restaurant.imageUrl}
              alt=""
              className="w-full h-full object-cover blur-xs"
            />
          </div>

          <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{restaurant.name}</h2>
                {restaurant.isPureVeg && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    PURE VEG
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-300 mt-1 max-w-xl">{restaurant.tagline}</p>

              {/* Unboxed metadata row */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 mt-3 font-medium">
                <span className="flex items-center gap-1 bg-emerald-600/90 text-white px-2 py-0.5 rounded-md font-bold font-mono">
                  <Star className="w-3 h-3 fill-current" />
                  {restaurant.rating} ({restaurant.totalRatings})
                </span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="flex items-center gap-1 text-white font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#ff4b26]" />
                  {restaurant.deliveryTimeMins} mins
                </span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="font-mono tabular-nums">₹{restaurant.costForTwo} for two</span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {restaurant.locality} ({restaurant.distanceKm} km)
                </span>
              </div>
            </div>

            {/* Close Button & Discount Promo */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setActiveRestaurantModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {restaurant.discountOffer && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff4b26] text-white rounded-xl text-xs font-bold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{restaurant.discountOffer}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar inside Restaurant Menu */}
        <div className="p-3.5 sm:px-6 sm:py-3 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <div className="relative w-full max-w-sm">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search within menu..."
                className="w-full pl-8.5 pr-3 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#ff4b26]"
              />
            </div>

            <button
              type="button"
              onClick={() => setVegFilterOnly(!vegFilterOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                vegFilterOnly
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Veg Only</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedMenuCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMenuCategory === cat
                    ? 'bg-stone-900 text-white font-semibold shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Dish Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredMenu.length === 0 ? (
            <div className="py-16 text-center text-stone-400 flex flex-col items-center">
              <Utensils className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm font-semibold">No dishes match your filter</p>
              <p className="text-xs text-stone-400 mt-1">Try clearing search or veg filter</p>
            </div>
          ) : (
            filteredMenu.map((dish) => {
              const qtyInCart = getItemCartQuantity(dish);

              return (
                <div
                  key={dish.id}
                  className="p-4 sm:p-5 rounded-2xl border border-stone-200/80 hover:border-stone-300 bg-white hover:bg-stone-50/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left: Dish Information */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {/* Veg / Non-Veg badge */}
                      <div className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                        dish.isVeg ? 'border-emerald-600' : 'border-rose-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                      </div>

                      {dish.bestseller && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                          ★ Bestseller
                        </span>
                      )}

                      {dish.spiceLevel && (
                        <span className="text-[10px] text-stone-500 font-medium">
                          · {dish.spiceLevel}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-stone-900 mt-1">{dish.name}</h4>

                    <div className="text-sm font-extrabold text-stone-900 font-mono tabular-nums mt-0.5">
                      ₹{dish.price}
                    </div>

                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed max-w-xl">
                      {dish.description}
                    </p>

                    {dish.rating && (
                      <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium mt-2">
                        <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                        <span className="font-bold text-stone-800">{dish.rating}</span>
                        <span>({dish.ratingCount} reviews)</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Add to Cart Stepper */}
                  <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
                    {qtyInCart === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAddClick(dish)}
                        className="w-full sm:w-28 py-2 px-4 rounded-xl border border-[#ff4b26] text-[#ff4b26] hover:bg-[#ff4b26] hover:text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95 text-center flex flex-col items-center justify-center"
                      >
                        <span>ADD</span>
                        {dish.customizable && (
                          <span className="text-[9px] font-normal lowercase tracking-normal -mt-0.5 opacity-80">
                            customizable
                          </span>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#ff4b26] text-white rounded-xl shadow-xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleMinusClick(dish)}
                          className="px-3 py-2 hover:bg-black/10 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-2 font-mono text-xs font-bold tabular-nums">
                          {qtyInCart}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddClick(dish)}
                          className="px-3 py-2 hover:bg-black/10 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
