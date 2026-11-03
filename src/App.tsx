import React, { useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryCarousel } from './components/CategoryCarousel';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { LocationModal } from './components/LocationModal';
import { RestaurantDetailModal } from './components/RestaurantDetailModal';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { LiveOrderTrackingModal } from './components/LiveOrderTrackingModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { ActiveOrderFloatingBar } from './components/ActiveOrderFloatingBar';
import { Footer } from './components/Footer';
import { RESTAURANTS_DATA } from './data/bangaloreData';
import { UtensilsCrossed, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { filterState, selectedLocation, resetFilters } = useApp();

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS_DATA.filter((restaurant) => {
      // 1. Search Query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = restaurant.name.toLowerCase().includes(q);
        const matchesCuisine = restaurant.cuisines.some(c => c.toLowerCase().includes(q));
        const matchesLocality = restaurant.locality.toLowerCase().includes(q);
        const matchesDish = restaurant.menu.some(m =>
          m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCuisine && !matchesLocality && !matchesDish) {
          return false;
        }
      }

      // 2. Category selection from "What's on your mind?"
      if (filterState.selectedCategory) {
        const cat = filterState.selectedCategory.toLowerCase();
        const matchesCuisine = restaurant.cuisines.some(c => c.toLowerCase().includes(cat));
        const matchesDish = restaurant.menu.some(m =>
          m.category.toLowerCase().includes(cat) || m.name.toLowerCase().includes(cat)
        );
        if (!matchesCuisine && !matchesDish) {
          return false;
        }
      }

      // 3. Fast delivery (<25 mins)
      if (filterState.fastDeliveryOnly && restaurant.deliveryTimeMins > 25) {
        return false;
      }

      // 4. Pure veg
      if (filterState.pureVegOnly && !restaurant.isPureVeg) {
        return false;
      }

      // 5. Rating 4.0+
      if (filterState.rating4Plus && restaurant.rating < 4.0) {
        return false;
      }

      // 6. Offers
      if (filterState.hasOffers && !restaurant.discountOffer) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'fastest') {
        return a.deliveryTimeMins - b.deliveryTimeMins;
      }
      if (filterState.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (filterState.sortBy === 'costLowHigh') {
        return a.costForTwo - b.costForTwo;
      }
      if (filterState.sortBy === 'costHighLow') {
        return b.costForTwo - a.costForTwo;
      }
      return 0; // relevance
    });
  }, [filterState]);

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <HeroSection />

      {/* "What's on your mind?" Horizontal Category Carousel */}
      <CategoryCarousel />

      {/* Filter and Sort Toolbar */}
      <FilterBar />

      {/* Restaurant Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
              Top Food Spots in {selectedLocation.name}, Bengaluru
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {filteredRestaurants.length} verified hyperlocal restaurants near {selectedLocation.area}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4b26]" />
            <span>Average ETA: <strong>22 mins</strong></span>
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-3xl border border-stone-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
              <UtensilsCrossed className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-base font-bold text-stone-900">No restaurants match your filters</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm">
              We couldn't find any spots matching your criteria. Try resetting your search or filter tags.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#ff4b26] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#e03a16] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      {/* Floating Active Order Bar (bottom anchored) */}
      <ActiveOrderFloatingBar />

      {/* Modals & Overlays */}
      <LocationModal />
      <RestaurantDetailModal />
      <ItemCustomizerModal />
      <CartDrawer />
      <LiveOrderTrackingModal />
      <OrderHistoryModal />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Header />
      <MainContent />
    </AppProvider>
  );
}
