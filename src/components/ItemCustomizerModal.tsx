import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ItemCustomizerModal: React.FC = () => {
  const { customizerDish, setCustomizerDish, addToCart, setIsCartOpen } = useApp();

  if (!customizerDish) return null;
  const { item, restaurant } = customizerDish;

  // Initialize options state with default first choices
  const initialSelections: { [groupTitle: string]: string } = {};
  if (item.options) {
    item.options.forEach(group => {
      if (group.choices.length > 0) {
        initialSelections[group.title] = group.choices[0].name;
      }
    });
  }

  const [selections, setSelections] = useState<{ [groupTitle: string]: string }>(initialSelections);

  // Calculate dynamic price
  let calculatedPrice = item.price;
  if (item.options) {
    item.options.forEach(group => {
      const selectedName = selections[group.title];
      const found = group.choices.find(c => c.name === selectedName);
      if (found) calculatedPrice += found.extraPrice;
    });
  }

  const handleConfirm = () => {
    addToCart(item, restaurant, selections);
    setCustomizerDish(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-start justify-between">
          <div className="flex items-start gap-2.5">
            {/* Veg / Non veg icon */}
            <div className={`mt-1 w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 leading-snug">{item.name}</h3>
              <p className="text-xs text-stone-500 mt-0.5">Customize your order preferences</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCustomizerDish(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Body */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          {item.options?.map((group) => (
            <div key={group.title} className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {group.title}
                </h4>
                <span className="text-[11px] text-[#ff4b26] font-semibold">Required</span>
              </div>

              <div className="space-y-1.5">
                {group.choices.map((choice) => {
                  const isSelected = selections[group.title] === choice.name;
                  return (
                    <label
                      key={choice.name}
                      onClick={() => setSelections(prev => ({ ...prev, [group.title]: choice.name }))}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#ff4b26] bg-[#ff4b26]/5 shadow-2xs'
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#ff4b26] bg-[#ff4b26]' : 'border-stone-300'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-stone-800">{choice.name}</span>
                      </div>
                      <span className="font-mono text-stone-600 tabular-nums">
                        {choice.extraPrice > 0 ? `+₹${choice.extraPrice}` : 'Free'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer with total price & Add action */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-stone-500 block uppercase font-medium">Item Total</span>
            <span className="text-lg font-bold text-stone-900 font-mono tabular-nums">₹{calculatedPrice}</span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-[#ff4b26] hover:bg-[#e03a16] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Add Item to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
