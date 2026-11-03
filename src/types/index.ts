export type VegStatus = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isVeg: boolean;
  category: string;
  rating?: number;
  ratingCount?: number;
  bestseller?: boolean;
  imageUrl?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | 'Fiery';
  customizable?: boolean;
  options?: {
    title: string;
    choices: { name: string; extraPrice: number }[];
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  totalRatings: string;
  deliveryTimeMins: number;
  distanceKm: number;
  costForTwo: number;
  cuisines: string[];
  locality: string;
  zone: string;
  areaCoords: { x: number; y: number }; // Relative coordinate on Bangalore map
  address: string;
  imageUrl: string;
  discountOffer: string;
  isPureVeg: boolean;
  isFeatured?: boolean;
  menu: MenuItem[];
}

export interface CartItem {
  id: string; // unique cart line id (dishId + selected options)
  menuItem: MenuItem;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  selectedOptions?: { [groupTitle: string]: string };
  itemTotal: number;
}

export interface BangaloreLocation {
  id: string;
  name: string;
  area: string;
  landmark: string;
  pincode: string;
  coords: { x: number; y: number };
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'picked_up'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  rating: number;
  totalTrips: number;
  avatarUrl: string;
  vaccinated: boolean;
  evGreenBadge: boolean;
}

export interface LiveOrder {
  id: string;
  orderNumber: string;
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  gstTax: number;
  tipAmount: number;
  discountAmount: number;
  totalAmount: number;
  deliveryAddress: string;
  deliveryInstructions: string;
  paymentMethod: string;
  status: OrderStatus;
  progressPercent: number; // 0 to 100
  estimatedDeliveryMins: number;
  currentRiderCoords: { x: number; y: number };
  riderSpeedKmh: number;
  createdAt: string;
  deliveryPartner: DeliveryPartner;
  timeline: {
    status: OrderStatus;
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
  driverChatMessages: {
    sender: 'rider' | 'customer';
    text: string;
    time: string;
  }[];
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string | null;
  fastDeliveryOnly: boolean;
  pureVegOnly: boolean;
  rating4Plus: boolean;
  hasOffers: boolean;
  sortBy: 'relevance' | 'fastest' | 'rating' | 'costLowHigh' | 'costHighLow';
}
