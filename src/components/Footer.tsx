import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BANGALORE_LOCATIONS } from '../data/bangaloreData';

export const Footer: React.FC = () => {
  const { setSelectedLocation } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/image_c5f887be.png"
                alt="FLAVO Logo"
                className="w-8 h-8 object-contain rounded-lg"
              />
              <span className="text-xl font-black tracking-tight text-white">flavo</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bengaluru’s premier hyperlocal food delivery network. Connecting you with legendary local kitchens in 20-30 minutes with live GPS telemetry.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Food Safety Certified</span>
            </div>
          </div>

          {/* Bengaluru Locations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Delivery Areas in Bengaluru
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              {BANGALORE_LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#ff4b26] transition-colors cursor-pointer text-left"
                  >
                    {loc.name} · {loc.pincode}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cuisines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Popular Bengaluru Cravings
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>Meghana Style Andhra Biryani</li>
              <li>Crispy Mysore Benne Masala Dosa</li>
              <li>Truffles Gourmet Cheese Burgers</li>
              <li>Corner House Death by Chocolate</li>
              <li>Ghee Podi Tatte Idli &amp; Filter Kaapi</li>
              <li>Woodfired Sourdough Pizzas</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              FLAVO Bengaluru Support
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Available 7:00 AM – 3:00 AM for all orders across Bengaluru.
            </p>
            <div className="space-y-1 text-xs text-stone-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ff4b26]" />
                <span className="font-mono">+91 (080) 4920-3300</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff4b26]" />
                <span>support@flavo.in</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff4b26]" />
                <span>Indiranagar 100ft Rd, Bengaluru 560038</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} FLAVO Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#terms" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="#partner" className="hover:text-stone-300 transition-colors">Partner with FLAVO</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
