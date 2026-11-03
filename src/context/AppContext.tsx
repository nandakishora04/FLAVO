import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  BangaloreLocation,
  CartItem,
  FilterState,
  LiveOrder,
  MenuItem,
  OrderStatus,
  Restaurant,
  DeliveryPartner
} from '../types';
import { BANGALORE_LOCATIONS, RESTAURANTS_DATA, PROMO_COUPONS } from '../data/bangaloreData';

interface AppContextType {
  selectedLocation: BangaloreLocation;
  setSelectedLocation: (loc: BangaloreLocation) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  cart: CartItem[];
  cartRestaurant: Restaurant | null;
  addToCart: (dish: MenuItem, restaurant: Restaurant, selectedOptions?: { [groupTitle: string]: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  activeRestaurantModal: Restaurant | null;
  setActiveRestaurantModal: (restaurant: Restaurant | null) => void;
  
  customizerDish: { item: MenuItem; restaurant: Restaurant } | null;
  setCustomizerDish: (dish: { item: MenuItem; restaurant: Restaurant } | null) => void;
  
  liveOrder: LiveOrder | null;
  setLiveOrder: React.Dispatch<React.SetStateAction<LiveOrder | null>>;
  orderHistory: LiveOrder[];
  isTrackingOpen: boolean;
  setIsTrackingOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  
  placeOrder: (
    address: string,
    instructions: string,
    paymentMethod: string,
    couponCode: string | null,
    tip: number
  ) => void;
  
  sendRiderMessage: (text: string) => void;
  fastForwardTracking: () => void;
  jumpToStatus: (status: OrderStatus) => void;
  
  appliedCoupon: string | null;
  setAppliedCoupon: (code: string | null) => void;
  couponDiscount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_RIDER: DeliveryPartner = {
  id: 'dp-blr-1',
  name: 'Manjunath Gowda',
  phone: '+91 98450 18273',
  vehicle: 'Ather 450X EV Scooter',
  vehicleNumber: 'KA 03 EV 8892',
  rating: 4.9,
  totalTrips: 4210,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  vaccinated: true,
  evGreenBadge: true
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<BangaloreLocation>(BANGALORE_LOCATIONS[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: null,
    fastDeliveryOnly: false,
    pureVegOnly: false,
    rating4Plus: false,
    hasOffers: false,
    sortBy: 'relevance'
  });
  
  const resetFilters = () => {
    setFilterState({
      searchQuery: '',
      selectedCategory: null,
      fastDeliveryOnly: false,
      pureVegOnly: false,
      rating4Plus: false,
      hasOffers: false,
      sortBy: 'relevance'
    });
  };
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartRestaurant, setCartRestaurant] = useState<Restaurant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('FLAVOFIRST');
  
  const [activeRestaurantModal, setActiveRestaurantModal] = useState<Restaurant | null>(null);
  const [customizerDish, setCustomizerDish] = useState<{ item: MenuItem; restaurant: Restaurant } | null>(null);
  
  const [liveOrder, setLiveOrder] = useState<LiveOrder | null>(null);
  const [orderHistory, setOrderHistory] = useState<LiveOrder[]>([]);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  let couponDiscount = 0;
  if (appliedCoupon) {
    const coupon = PROMO_COUPONS.find(c => c.code === appliedCoupon);
    if (coupon && cartSubtotal >= coupon.minOrder) {
      if (coupon.discountPercent > 0) {
        couponDiscount = Math.min((cartSubtotal * coupon.discountPercent) / 100, coupon.maxDiscount);
      } else {
        couponDiscount = coupon.maxDiscount;
      }
    }
  }

  const addToCart = (
    dish: MenuItem,
    restaurant: Restaurant,
    selectedOptions?: { [groupTitle: string]: string }
  ) => {
    // If cart has items from another restaurant, confirm reset
    if (cartRestaurant && cartRestaurant.id !== restaurant.id && cart.length > 0) {
      const confirmReset = window.confirm(
        `Your cart contains dishes from ${cartRestaurant.name}. Reset cart to add items from ${restaurant.name}?`
      );
      if (!confirmReset) return;
      setCart([]);
    }
    
    setCartRestaurant(restaurant);
    
    // Calculate extra price from selected options
    let unitPrice = dish.price;
    if (selectedOptions && dish.options) {
      dish.options.forEach(optGroup => {
        const choiceName = selectedOptions[optGroup.title];
        const match = optGroup.choices.find(c => c.name === choiceName);
        if (match) unitPrice += match.extraPrice;
      });
    }

    const cartLineId = `${dish.id}-${JSON.stringify(selectedOptions || {})}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartLineId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const item = updated[existingIndex];
        const newQty = item.quantity + 1;
        updated[existingIndex] = {
          ...item,
          quantity: newQty,
          itemTotal: newQty * unitPrice
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartLineId,
            menuItem: dish,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            quantity: 1,
            selectedOptions,
            itemTotal: unitPrice
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== cartItemId);
      if (updated.length === 0) {
        setCartRestaurant(null);
      }
      return updated;
    });
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const unitPrice = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: newQty * unitPrice
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setCartRestaurant(null);
  };

  // Place Order function
  const placeOrder = (
    address: string,
    instructions: string,
    paymentMethod: string,
    couponCode: string | null,
    tip: number
  ) => {
    if (!cartRestaurant || cart.length === 0) return;

    const deliveryFee = cartSubtotal > 199 ? 0 : 35;
    const platformFee = 5;
    const gstTax = Math.round(cartSubtotal * 0.05);
    const totalAmount = Math.max(0, cartSubtotal + deliveryFee + platformFee + gstTax + tip - couponDiscount);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const orderNumber = `FLV-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: LiveOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      restaurant: cartRestaurant,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      platformFee,
      gstTax,
      tipAmount: tip,
      discountAmount: couponDiscount,
      totalAmount,
      deliveryAddress: address,
      deliveryInstructions: instructions,
      paymentMethod,
      status: 'placed',
      progressPercent: 12,
      estimatedDeliveryMins: cartRestaurant.deliveryTimeMins,
      currentRiderCoords: { ...cartRestaurant.areaCoords },
      riderSpeedKmh: 0,
      createdAt: timeStr,
      deliveryPartner: DEFAULT_RIDER,
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed & Confirmed',
          description: `Received at ${timeStr}. Sent to ${cartRestaurant.name} kitchen.`,
          time: timeStr,
          completed: true
        },
        {
          status: 'preparing',
          title: 'Kitchen Preparing Dishes',
          description: 'Chef is handcrafting your authentic order fresh.',
          time: '',
          completed: false
        },
        {
          status: 'picked_up',
          title: 'Delivery Partner Assigned & Picked Up',
          description: `${DEFAULT_RIDER.name} collected hot packaged food.`,
          time: '',
          completed: false
        },
        {
          status: 'on_the_way',
          title: 'On The Way (Live GPS)',
          description: `Cruising on ${selectedLocation.name} main corridor.`,
          time: '',
          completed: false
        },
        {
          status: 'delivered',
          title: 'Delivered at Doorstep',
          description: 'Enjoy your hot meal! Rate your FLAVO experience.',
          time: '',
          completed: false
        }
      ],
      driverChatMessages: [
        {
          sender: 'rider',
          text: `Namaskara! I am ${DEFAULT_RIDER.name}, your FLAVO delivery partner. I'm picking up your order from ${cartRestaurant.name}.`,
          time: timeStr
        }
      ]
    };

    setLiveOrder(newOrder);
    setOrderHistory(prev => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    setIsTrackingOpen(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  // Real-time tracking lifecycle simulation
  useEffect(() => {
    if (!liveOrder || liveOrder.status === 'delivered' || liveOrder.status === 'cancelled') {
      return;
    }

    const interval = setInterval(() => {
      setLiveOrder(currentOrder => {
        if (!currentOrder || currentOrder.status === 'delivered') return currentOrder;

        const currentProg = currentOrder.progressPercent;
        const restCoords = currentOrder.restaurant.areaCoords;
        const destCoords = selectedLocation.coords;

        // Auto progression logic
        let newStatus: OrderStatus = currentOrder.status;
        let newProg = currentProg + 2.5;
        let newSpeed = 24 + Math.floor(Math.sin(newProg) * 8);

        if (newProg >= 25 && currentOrder.status === 'placed') {
          newStatus = 'preparing';
        } else if (newProg >= 45 && currentOrder.status === 'preparing') {
          newStatus = 'picked_up';
        } else if (newProg >= 60 && currentOrder.status === 'picked_up') {
          newStatus = 'on_the_way';
        } else if (newProg >= 100) {
          newProg = 100;
          newStatus = 'delivered';
          newSpeed = 0;
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.5 }
            });
          } catch {
            // ignore
          }
        }

        // Interpolate rider coordinates between restaurant and customer address
        const ratio = Math.min(1, Math.max(0, (newProg - 45) / 55));
        const riderX = restCoords.x + (destCoords.x - restCoords.x) * ratio;
        const riderY = restCoords.y + (destCoords.y - restCoords.y) * ratio;

        const updatedTimeline = currentOrder.timeline.map(t => {
          if (t.status === 'placed' && newProg >= 10) return { ...t, completed: true };
          if (t.status === 'preparing' && newProg >= 25) return { ...t, completed: true };
          if (t.status === 'picked_up' && newProg >= 45) return { ...t, completed: true };
          if (t.status === 'on_the_way' && newProg >= 60) return { ...t, completed: true };
          if (t.status === 'delivered' && newProg >= 100) return { ...t, completed: true };
          return t;
        });

        // Remaining time estimate
        const remainingMinutes = Math.max(1, Math.ceil(currentOrder.restaurant.deliveryTimeMins * (1 - newProg / 100)));

        return {
          ...currentOrder,
          status: newStatus,
          progressPercent: newProg,
          riderSpeedKmh: newStatus === 'on_the_way' ? newSpeed : (newStatus === 'delivered' ? 0 : 12),
          currentRiderCoords: { x: riderX, y: riderY },
          estimatedDeliveryMins: remainingMinutes,
          timeline: updatedTimeline
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [liveOrder?.id, liveOrder?.status, selectedLocation]);

  // Fast forward simulator
  const fastForwardTracking = () => {
    if (!liveOrder || liveOrder.status === 'delivered') return;
    setLiveOrder(curr => {
      if (!curr) return null;
      const targetPercent = Math.min(100, curr.progressPercent + 25);
      let targetStatus: OrderStatus = curr.status;
      if (targetPercent >= 100) targetStatus = 'delivered';
      else if (targetPercent >= 60) targetStatus = 'on_the_way';
      else if (targetPercent >= 45) targetStatus = 'picked_up';
      else if (targetPercent >= 25) targetStatus = 'preparing';

      const restCoords = curr.restaurant.areaCoords;
      const destCoords = selectedLocation.coords;
      const ratio = Math.min(1, Math.max(0, (targetPercent - 45) / 55));
      const riderX = restCoords.x + (destCoords.x - restCoords.x) * ratio;
      const riderY = restCoords.y + (destCoords.y - restCoords.y) * ratio;

      if (targetStatus === 'delivered') {
        try {
          confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        } catch {}
      }

      return {
        ...curr,
        status: targetStatus,
        progressPercent: targetPercent,
        currentRiderCoords: { x: riderX, y: riderY },
        riderSpeedKmh: targetStatus === 'delivered' ? 0 : 28,
        estimatedDeliveryMins: Math.max(1, Math.ceil(curr.restaurant.deliveryTimeMins * (1 - targetPercent / 100))),
        timeline: curr.timeline.map(t => {
          if (targetStatus === 'delivered') return { ...t, completed: true };
          if (t.status === 'placed' && targetPercent >= 10) return { ...t, completed: true };
          if (t.status === 'preparing' && targetPercent >= 25) return { ...t, completed: true };
          if (t.status === 'picked_up' && targetPercent >= 45) return { ...t, completed: true };
          if (t.status === 'on_the_way' && targetPercent >= 60) return { ...t, completed: true };
          return t;
        })
      };
    });
  };

  const jumpToStatus = (status: OrderStatus) => {
    if (!liveOrder) return;
    let prog = 15;
    if (status === 'preparing') prog = 35;
    if (status === 'picked_up') prog = 52;
    if (status === 'on_the_way') prog = 75;
    if (status === 'delivered') {
      prog = 100;
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
    }

    setLiveOrder(curr => {
      if (!curr) return null;
      const restCoords = curr.restaurant.areaCoords;
      const destCoords = selectedLocation.coords;
      const ratio = Math.min(1, Math.max(0, (prog - 45) / 55));
      const riderX = restCoords.x + (destCoords.x - restCoords.x) * ratio;
      const riderY = restCoords.y + (destCoords.y - restCoords.y) * ratio;

      return {
        ...curr,
        status,
        progressPercent: prog,
        currentRiderCoords: { x: riderX, y: riderY },
        riderSpeedKmh: status === 'on_the_way' ? 29 : (status === 'delivered' ? 0 : 15),
        estimatedDeliveryMins: status === 'delivered' ? 0 : Math.max(1, Math.ceil(curr.restaurant.deliveryTimeMins * (1 - prog / 100))),
        timeline: curr.timeline.map(t => {
          if (status === 'delivered') return { ...t, completed: true };
          if (t.status === 'placed') return { ...t, completed: true };
          if (t.status === 'preparing') return { ...t, completed: prog >= 35 };
          if (t.status === 'picked_up') return { ...t, completed: prog >= 50 };
          if (t.status === 'on_the_way') return { ...t, completed: prog >= 70 };
          return t;
        })
      };
    });
  };

  // Chat with delivery partner
  const sendRiderMessage = (text: string) => {
    if (!liveOrder) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add customer message
    setLiveOrder(curr => {
      if (!curr) return null;
      return {
        ...curr,
        driverChatMessages: [
          ...curr.driverChatMessages,
          { sender: 'customer', text, time: now }
        ]
      };
    });

    // Auto simulated rider reply after 1.5 seconds
    setTimeout(() => {
      const riderReplies = [
        "Received! I will make sure to ring when I reach your building.",
        "Got it, riding safely through 100ft road now. Almost there!",
        "Yes, food is securely packed in the hot thermal bag.",
        "Understood, will leave at your society reception/gate as requested."
      ];
      const randomReply = riderReplies[Math.floor(Math.random() * riderReplies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setLiveOrder(curr => {
        if (!curr) return null;
        return {
          ...curr,
          driverChatMessages: [
            ...curr.driverChatMessages,
            { sender: 'rider', text: randomReply, time: replyTime }
          ]
        };
      });
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        filterState,
        setFilterState,
        resetFilters,
        cart,
        cartRestaurant,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        activeRestaurantModal,
        setActiveRestaurantModal,
        customizerDish,
        setCustomizerDish,
        liveOrder,
        setLiveOrder,
        orderHistory,
        isTrackingOpen,
        setIsTrackingOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        placeOrder,
        sendRiderMessage,
        fastForwardTracking,
        jumpToStatus,
        appliedCoupon,
        setAppliedCoupon,
        couponDiscount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
