import { BangaloreLocation, Restaurant } from '../types';

export const BANGALORE_LOCATIONS: BangaloreLocation[] = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    area: '100ft Road / 12th Main',
    landmark: 'Near Indiranagar Metro Station',
    pincode: '560038',
    coords: { x: 58, y: 44 }
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    area: '4th Block, 80ft Road',
    landmark: 'Near Sony World Signal',
    pincode: '560034',
    coords: { x: 52, y: 64 }
  },
  {
    id: 'hsr-layout',
    name: 'HSR Layout',
    area: 'Sector 1 & 2',
    landmark: 'Near BDA Complex',
    pincode: '560102',
    coords: { x: 62, y: 78 }
  },
  {
    id: 'mg-road',
    name: 'MG Road / Church Street',
    area: 'Central Business District (CBD)',
    landmark: 'Brigade Road Junction',
    pincode: '560001',
    coords: { x: 48, y: 38 }
  },
  {
    id: 'jayanagar',
    name: 'Jayanagar',
    area: '4th Block Complex',
    landmark: 'Opposite Cool Joint',
    pincode: '560011',
    coords: { x: 38, y: 68 }
  },
  {
    id: 'malleshwaram',
    name: 'Malleshwaram',
    area: 'Sampige Road & Margosa',
    landmark: 'Near 8th Cross',
    pincode: '560003',
    coords: { x: 34, y: 26 }
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    area: 'ITPB Road / Hope Farm',
    landmark: 'Near Nexus Whitefield',
    pincode: '560066',
    coords: { x: 86, y: 46 }
  },
  {
    id: 'bellandur',
    name: 'Bellandur',
    area: 'Green Glen Layout, ORR',
    landmark: 'Near EcoSpace Tech Park',
    pincode: '560103',
    coords: { x: 74, y: 70 }
  }
];

export const CUISINE_CATEGORIES = [
  { id: 'all', name: 'All Cuisines', icon: '🍽️', count: 10 },
  { id: 'biryani', name: 'Biryani', icon: '🍚', count: 8 },
  { id: 'south-indian', name: 'South Indian', icon: '🥞', count: 6 },
  { id: 'burgers', name: 'Burgers', icon: '🍔', count: 5 },
  { id: 'pizza', name: 'Pizzas', icon: '🍕', count: 4 },
  { id: 'desserts', name: 'Desserts & DBC', icon: '🍨', count: 4 },
  { id: 'rolls-kebabs', name: 'Kebabs & Rolls', icon: '🌯', count: 6 },
  { id: 'andhra', name: 'Andhra Spicy', icon: '🌶️', count: 5 },
  { id: 'chinese', name: 'Chinese & Momos', icon: '🥟', count: 4 },
  { id: 'coffee', name: 'Filter Kaapi & Chai', icon: '☕', count: 5 }
];

export const PROMO_COUPONS = [
  {
    code: 'FLAVOFIRST',
    discountPercent: 40,
    maxDiscount: 120,
    minOrder: 199,
    description: '40% OFF up to ₹120 on your first FLAVO order'
  },
  {
    code: 'BENGALURU50',
    discountPercent: 50,
    maxDiscount: 100,
    minOrder: 249,
    description: 'Flat 50% OFF up to ₹100 for Namma Bengaluru'
  },
  {
    code: 'FREEDEL',
    discountPercent: 0,
    maxDiscount: 45,
    minOrder: 149,
    description: 'Free Zero-Fee Hyperlocal Delivery'
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: 'meghana-foods',
    name: 'Meghana Foods',
    tagline: 'Authentic Andhra Spiced Biryani & Starters',
    rating: 4.6,
    totalRatings: '34K+ ratings',
    deliveryTimeMins: 22,
    distanceKm: 1.8,
    costForTwo: 500,
    cuisines: ['Biryani', 'Andhra', 'North Indian', 'Seafood'],
    locality: 'Indiranagar',
    zone: 'East Bengaluru',
    areaCoords: { x: 56, y: 42 },
    address: '544, 1st Floor, Chinmaya Mission Hospital Rd, Indiranagar',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    discountOffer: '40% OFF up to ₹80',
    isPureVeg: false,
    isFeatured: true,
    menu: [
      {
        id: 'mf-1',
        name: 'Meghana Special Chicken Biryani',
        price: 360,
        description: 'Iconic Andhra-style boneless chicken biryani tossed in signature spicy red masala served with salan and chilled onion raita.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.8,
        ratingCount: 14200,
        bestseller: true,
        spiceLevel: 'Spicy',
        customizable: true,
        options: [
          {
            title: 'Portion Size',
            choices: [
              { name: 'Regular (Serves 1-2)', extraPrice: 0 },
              { name: 'Jumbo Pack (Serves 2-3)', extraPrice: 190 }
            ]
          },
          {
            title: 'Accompaniment',
            choices: [
              { name: 'Standard Raita & Mirchi Salan', extraPrice: 0 },
              { name: 'Extra Salan & Boiled Egg', extraPrice: 40 },
              { name: 'Extra Fried Onions & Salan', extraPrice: 35 }
            ]
          }
        ]
      },
      {
        id: 'mf-2',
        name: 'Paneer 555 Dry',
        price: 310,
        description: 'Tender cottage cheese strips wok-tossed with curry leaves, crushed green chillies, garlic, and cashew nuts.',
        isVeg: true,
        category: 'Starters',
        rating: 4.7,
        ratingCount: 5100,
        bestseller: true,
        spiceLevel: 'Medium'
      },
      {
        id: 'mf-3',
        name: 'Chicken Boneless 65',
        price: 330,
        description: 'Deep-fried marinated chicken bites infused with curd, aromatic spices, roasted coriander, and crispy curry leaves.',
        isVeg: false,
        category: 'Starters',
        rating: 4.8,
        ratingCount: 9800,
        bestseller: true,
        spiceLevel: 'Fiery'
      },
      {
        id: 'mf-4',
        name: 'Meghana Special Mutton Biryani',
        price: 430,
        description: 'Succulent baby goat meat slow-cooked in traditional fragrant dum rice with crushed spices and fresh mint.',
        isVeg: false,
        category: 'Biryani Mains',
        rating: 4.7,
        ratingCount: 6300,
        bestseller: false,
        spiceLevel: 'Spicy'
      },
      {
        id: 'mf-5',
        name: 'Special Veg Dum Biryani',
        price: 290,
        description: 'Fresh farm carrots, beans, peas, and paneer cubes layered with aromatic aged basmati rice and saffron essence.',
        isVeg: true,
        category: 'Biryani Mains',
        rating: 4.5,
        ratingCount: 4200,
        bestseller: false,
        spiceLevel: 'Medium'
      }
    ]
  },
  {
    id: 'truffles',
    name: 'Truffles',
    tagline: 'Legendary American Burgers, Steaks & Shakes',
    rating: 4.5,
    totalRatings: '48K+ ratings',
    deliveryTimeMins: 25,
    distanceKm: 2.4,
    costForTwo: 600,
    cuisines: ['Burgers', 'American', 'Continental', 'Desserts'],
    locality: 'Koramangala',
    zone: 'South Bengaluru',
    areaCoords: { x: 50, y: 62 },
    address: '93/A, Appareddy Palya, 4th Block, Koramangala',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    discountOffer: '50% OFF up to ₹100',
    isPureVeg: false,
    isFeatured: true,
    menu: [
      {
        id: 'tr-1',
        name: 'All American Cheese Burger',
        price: 260,
        description: 'Signature juicy grilled chicken patty with melted double cheddar cheese, dill pickles, lettuce, caramelized onions and mustard mayo.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.8,
        ratingCount: 16500,
        bestseller: true,
        customizable: true,
        options: [
          {
            title: 'Fries Choice',
            choices: [
              { name: 'Classic Salted Fries', extraPrice: 0 },
              { name: 'Spicy Peri-Peri Seasoned Fries', extraPrice: 40 },
              { name: 'Cheesy Loaded Fries', extraPrice: 75 }
            ]
          },
          {
            title: 'Add-Ons',
            choices: [
              { name: 'No Extra Add-on', extraPrice: 0 },
              { name: 'Extra Cheddar Slice', extraPrice: 35 },
              { name: 'Fried Egg & Bacon Crisp', extraPrice: 65 }
            ]
          }
        ]
      },
      {
        id: 'tr-2',
        name: 'Crispy Cottage Cheese Burger',
        price: 240,
        description: 'Crumb-fried crispy spiced paneer block with creamy coleslaw, sweet relish, and chipotle garlic drizzle.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.6,
        ratingCount: 7800,
        bestseller: true,
        customizable: true
      },
      {
        id: 'tr-3',
        name: 'Peri-Peri Crinkle Fries (Large)',
        price: 160,
        description: 'Golden crunchy crinkle cut potatoes dusted heavily with African bird’s eye chili spice and garlic salt.',
        isVeg: true,
        category: 'Sides & Bites',
        rating: 4.7,
        ratingCount: 11200,
        bestseller: true
      },
      {
        id: 'tr-4',
        name: 'Ferrero Rocher Thick Shake',
        price: 220,
        description: 'Indulgent thick shake blended with whole Ferrero Rocher chocolates, Nutella swirl, hazelnut crust, and whipped topping.',
        isVeg: true,
        category: 'Beverages & Shakes',
        rating: 4.9,
        ratingCount: 8900,
        bestseller: true
      }
    ]
  },
  {
    id: 'vidyarthi-bhavan',
    name: 'Vidyarthi Bhavan',
    tagline: 'Bengaluru Heritage Crispy Benne Dosa Since 1943',
    rating: 4.7,
    totalRatings: '52K+ ratings',
    deliveryTimeMins: 20,
    distanceKm: 1.2,
    costForTwo: 200,
    cuisines: ['South Indian', 'Breakfast', 'Coffee'],
    locality: 'Malleshwaram',
    zone: 'West Bengaluru',
    areaCoords: { x: 36, y: 28 },
    address: 'Gandhi Bazaar Main Rd, Basavanagudi & Malleshwaram',
    imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    discountOffer: 'FLAT ₹50 OFF on ₹199',
    isPureVeg: true,
    isFeatured: true,
    menu: [
      {
        id: 'vb-1',
        name: 'VB Special Masala Dosa (Benne Roast)',
        price: 95,
        description: 'Legendary thick yet ultra-crispy butter roasted dosa stuffed with spiced potato palya, served with unlimited thick coconut chutney.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.9,
        ratingCount: 28000,
        bestseller: true,
        customizable: false
      },
      {
        id: 'vb-2',
        name: 'Crispy Medu Vada (2 Pcs)',
        price: 65,
        description: 'Golden fried savory lentil doughnuts with crushed peppercorns and ginger, accompanied by hot coconut chutney.',
        isVeg: true,
        category: 'Breakfast Specials',
        rating: 4.7,
        ratingCount: 12400,
        bestseller: false
      },
      {
        id: 'vb-3',
        name: 'Kesari Bath (Pineapple Ghee Halwa)',
        price: 60,
        description: 'Semolina dessert infused with pure Nandini ghee, real pineapple bits, saffron, raisins, and roasted cashew nuts.',
        isVeg: true,
        category: 'Sweets',
        rating: 4.8,
        ratingCount: 6500,
        bestseller: true
      },
      {
        id: 'vb-4',
        name: 'Pure Degree Filter Kaapi',
        price: 45,
        description: 'Freshly decocted chicory-coffee beans brewed with frothy whole milk, poured authentic tumbler style.',
        isVeg: true,
        category: 'Beverages',
        rating: 4.9,
        ratingCount: 19800,
        bestseller: true
      }
    ]
  },
  {
    id: 'corner-house',
    name: 'Corner House Ice Cream',
    tagline: 'Home of the Original Death By Chocolate (DBC)',
    rating: 4.8,
    totalRatings: '41K+ ratings',
    deliveryTimeMins: 18,
    distanceKm: 0.9,
    costForTwo: 350,
    cuisines: ['Desserts', 'Ice Cream', 'Shakes'],
    locality: 'Indiranagar',
    zone: 'East Bengaluru',
    areaCoords: { x: 60, y: 46 },
    address: '1st Stage, Near CMH Hospital, Indiranagar',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    discountOffer: '20% OFF on all sundaes',
    isPureVeg: true,
    isFeatured: true,
    menu: [
      {
        id: 'ch-1',
        name: 'Death By Chocolate (Original DBC)',
        price: 240,
        description: 'Iconic dessert with warm rich chocolate cake, scoops of velvety vanilla ice cream, drenched in secret hot fudge, and topped with roasted peanuts and cherries.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.95,
        ratingCount: 32000,
        bestseller: true,
        customizable: true,
        options: [
          {
            title: 'Fudge Intensity',
            choices: [
              { name: 'Standard Hot Fudge', extraPrice: 0 },
              { name: 'Extra Hot Fudge Cup (60ml)', extraPrice: 45 },
              { name: 'Double Fudge & Roasted Nuts', extraPrice: 70 }
            ]
          }
        ]
      },
      {
        id: 'ch-2',
        name: 'Cake Fudge Sundae',
        price: 180,
        description: 'Soft vanilla sponge cake soaked in simmering dark chocolate sauce and topped with double scoops of vanilla.',
        isVeg: true,
        category: 'Sundaes',
        rating: 4.8,
        ratingCount: 8400,
        bestseller: true
      },
      {
        id: 'ch-3',
        name: 'Trilogy Sundae',
        price: 210,
        description: 'Trio of strawberry, chocolate and butterscotch ice creams layered with fresh canned fruits, jelly, and hot chocolate fudge.',
        isVeg: true,
        category: 'Sundaes',
        rating: 4.6,
        ratingCount: 4200,
        bestseller: false
      },
      {
        id: 'ch-4',
        name: 'Roasted Almond Fudge Tub (500ml)',
        price: 360,
        description: 'Take-home family tub of Swiss chocolate cream studded with crunchy roasted California almonds.',
        isVeg: true,
        category: 'Take-Home Tubs',
        rating: 4.8,
        ratingCount: 3100,
        bestseller: false
      }
    ]
  },
  {
    id: 'rameshwaram-cafe',
    name: 'The Rameshwaram Cafe',
    tagline: 'Ghee-Loaded Pure South Indian Delights',
    rating: 4.7,
    totalRatings: '39K+ ratings',
    deliveryTimeMins: 24,
    distanceKm: 2.1,
    costForTwo: 300,
    cuisines: ['South Indian', 'Street Food', 'Coffee'],
    locality: 'Indiranagar',
    zone: 'East Bengaluru',
    areaCoords: { x: 57, y: 48 },
    address: '12th Main Road, HAL 2nd Stage, Indiranagar',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    discountOffer: '30% OFF up to ₹60',
    isPureVeg: true,
    isFeatured: true,
    menu: [
      {
        id: 'rc-1',
        name: 'Ghee Podi Tatte Idli',
        price: 110,
        description: 'Giant soft plate idli drenched in aromatic pure desi ghee and sprinkled liberally with spicy gun powder (karam podi).',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.9,
        ratingCount: 21000,
        bestseller: true
      },
      {
        id: 'rc-2',
        name: 'Ghee Garlic Roast Dosa',
        price: 145,
        description: 'Thin crispy crepe smeared with fiery red garlic paste and lavish ladles of fragrant cow ghee.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.8,
        ratingCount: 14000,
        bestseller: true
      },
      {
        id: 'rc-3',
        name: 'Open Butter Masala Dosa',
        price: 135,
        description: 'Open face dosa topped with buttery spiced potato mash, crunchy veggies, and grated coconut.',
        isVeg: true,
        category: 'Dosas',
        rating: 4.7,
        ratingCount: 7800,
        bestseller: false
      },
      {
        id: 'rc-4',
        name: 'Rameshwaram Special Kaapi',
        price: 50,
        description: 'Frothy hot filter coffee with authentic South Indian chicory ratio, served in hot thermal takeaway container.',
        isVeg: true,
        category: 'Beverages',
        rating: 4.8,
        ratingCount: 16500,
        bestseller: true
      }
    ]
  },
  {
    id: 'empire-restaurant',
    name: 'Hotel Empire',
    tagline: 'Bengaluru Nightlife Legend: Grilled Chicken & Kebabs',
    rating: 4.4,
    totalRatings: '44K+ ratings',
    deliveryTimeMins: 28,
    distanceKm: 3.1,
    costForTwo: 550,
    cuisines: ['Kebabs & Rolls', 'Biryani', 'Mughlai', 'Arabian'],
    locality: 'Koramangala',
    zone: 'South Bengaluru',
    areaCoords: { x: 53, y: 66 },
    address: '80ft Road, 6th Block, Koramangala',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    discountOffer: '₹125 OFF on ₹399',
    isPureVeg: false,
    isFeatured: false,
    menu: [
      {
        id: 'emp-1',
        name: 'Empire Special Grilled Chicken (Half)',
        price: 290,
        description: 'Juicy tender whole bone-in chicken marinated in house spiced curd and grilled over hot coals, served with mayonnaise and mint dip.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.7,
        ratingCount: 17400,
        bestseller: true
      },
      {
        id: 'emp-2',
        name: 'Coin Parotta (3 Pcs) with Salan',
        price: 80,
        description: 'Flaky layered Malabar-style mini parottas beaten fresh on griddle, accompanied by spicy chicken salan.',
        isVeg: true,
        category: 'Breads & Accompaniments',
        rating: 4.6,
        ratingCount: 8900,
        bestseller: true
      },
      {
        id: 'emp-3',
        name: 'Juicy Chicken Kebab (Empire Style)',
        price: 260,
        description: 'Crispy deep-fried spicy red chicken pieces with lime wedges and pickled onions.',
        isVeg: false,
        category: 'Starters',
        rating: 4.7,
        ratingCount: 13200,
        bestseller: true
      },
      {
        id: 'emp-4',
        name: 'Ghee Rice with Chicken Gravy',
        price: 220,
        description: 'Fragrant jeera samba rice sautéed in golden ghee, fried cashews, and raisins with rich curry sauce.',
        isVeg: false,
        category: 'Mains',
        rating: 4.5,
        ratingCount: 5400,
        bestseller: false
      }
    ]
  },
  {
    id: 'nagarjuna-chimney',
    name: 'Nagarjuna Restaurant',
    tagline: 'Hearty Andhra Meals & Fiery Chili Chicken',
    rating: 4.6,
    totalRatings: '29K+ ratings',
    deliveryTimeMins: 30,
    distanceKm: 3.5,
    costForTwo: 650,
    cuisines: ['Andhra', 'Biryani', 'South Indian'],
    locality: 'MG Road / Church Street',
    zone: 'Central Bengaluru',
    areaCoords: { x: 46, y: 40 },
    address: '44/1, Residency Road, Shanthala Nagar',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    discountOffer: '25% OFF above ₹499',
    isPureVeg: false,
    isFeatured: false,
    menu: [
      {
        id: 'nag-1',
        name: 'Nagarjuna Andhra Chili Chicken',
        price: 340,
        description: 'The benchmark green chili chicken starter simmered with freshly pounded Andhra spices and crushed garlic.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.9,
        ratingCount: 18200,
        bestseller: true
      },
      {
        id: 'nag-2',
        name: 'Andhra Royal Meals Box',
        price: 360,
        description: 'Complete meal box with hot rice, Gunpowder (Podi) with Pure Ghee, Sambar, Rasam, Majjiga Pulusu, Curd, Papad, and Payasam.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.8,
        ratingCount: 9600,
        bestseller: true
      },
      {
        id: 'nag-3',
        name: 'Mutton Roast Fry',
        price: 440,
        description: 'Tender lamb chunks dry roasted in iron kadai with caramelized shallots, black pepper, and curry leaves.',
        isVeg: false,
        category: 'Starters',
        rating: 4.7,
        ratingCount: 6100,
        bestseller: false
      }
    ]
  },
  {
    id: 'toit-brewpub-bites',
    name: 'Toit Kitchen & Bites',
    tagline: 'Artisanal Woodfired Sourdough Pizzas & Starters',
    rating: 4.7,
    totalRatings: '31K+ ratings',
    deliveryTimeMins: 26,
    distanceKm: 1.6,
    costForTwo: 800,
    cuisines: ['Pizzas', 'Continental', 'Bites'],
    locality: 'Indiranagar',
    zone: 'East Bengaluru',
    areaCoords: { x: 55, y: 44 },
    address: '298, 100 Feet Rd, Near BDA Complex, Indiranagar',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    discountOffer: '₹100 OFF with TOIT100',
    isPureVeg: false,
    isFeatured: false,
    menu: [
      {
        id: 'toit-1',
        name: 'Smoked Chicken & Jalapeño Woodfired Pizza (11")',
        price: 490,
        description: 'Hand-tossed sourdough crust topped with San Marzano tomato pomodoro, smoked herb chicken, pickled jalapenos, and buffalo mozzarella.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.8,
        ratingCount: 9200,
        bestseller: true
      },
      {
        id: 'toit-2',
        name: 'Quattro Formaggi Pizza (Four Cheese)',
        price: 470,
        description: 'Gorgonzola, smoked scamorza, sharp parmesan, and creamy fior di latte mozzarella with fresh basil.',
        isVeg: true,
        category: 'Woodfired Pizzas',
        rating: 4.7,
        ratingCount: 6800,
        bestseller: true
      },
      {
        id: 'toit-3',
        name: 'Loaded Pulled Pork Nachos',
        price: 360,
        description: 'Crisp tortilla chips baked with slow-braised BBQ pulled pork, melted monterey jack cheese, pico de gallo, and sour cream.',
        isVeg: false,
        category: 'Bar Bites',
        rating: 4.8,
        ratingCount: 4500,
        bestseller: false
      }
    ]
  },
  {
    id: 'leons-burgers',
    name: "Leon's Burgers & Wings",
    tagline: 'Crispy Gourmet Fried Chicken & Burgers',
    rating: 4.5,
    totalRatings: '26K+ ratings',
    deliveryTimeMins: 22,
    distanceKm: 1.9,
    costForTwo: 450,
    cuisines: ['Burgers', 'Wings', 'Fast Food'],
    locality: 'HSR Layout',
    zone: 'South Bengaluru',
    areaCoords: { x: 63, y: 76 },
    address: '27th Main Rd, 1st Sector, HSR Layout',
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    discountOffer: '40% OFF up to ₹80',
    isPureVeg: false,
    isFeatured: false,
    menu: [
      {
        id: 'lb-1',
        name: 'Royal Crispy Chicken Zinger Burger',
        price: 230,
        description: 'Crunchy golden buttermilk fried chicken breast fillet with spicy garlic aioli, crunchy iceberg lettuce in toasted sesame brioche.',
        isVeg: false,
        category: 'Bestsellers',
        rating: 4.7,
        ratingCount: 11400,
        bestseller: true
      },
      {
        id: 'lb-2',
        name: 'Fiery Peri-Peri Wings (6 Pcs)',
        price: 240,
        description: 'Crispy fried chicken wings tossed in tangy and hot peri peri glaze with cooling ranch dip.',
        isVeg: false,
        category: 'Wings',
        rating: 4.8,
        ratingCount: 7600,
        bestseller: true
      },
      {
        id: 'lb-3',
        name: 'Crispy Paneer Supreme Burger',
        price: 210,
        description: 'Thick marinated cottage cheese steak crumb-fried with thousand island sauce and sliced gherkins.',
        isVeg: true,
        category: 'Burgers',
        rating: 4.5,
        ratingCount: 4900,
        bestseller: false
      }
    ]
  },
  {
    id: 'asha-tiffins',
    name: 'Asha Tiffins',
    tagline: 'Bengaluru Quick Morning & Evening Ghee Delights',
    rating: 4.6,
    totalRatings: '33K+ ratings',
    deliveryTimeMins: 19,
    distanceKm: 1.4,
    costForTwo: 220,
    cuisines: ['South Indian', 'Breakfast', 'Chaat'],
    locality: 'HSR Layout',
    zone: 'South Bengaluru',
    areaCoords: { x: 61, y: 79 },
    address: '14th Main Rd, Sector 4, HSR Layout',
    imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&auto=format&fit=crop&q=80',
    discountOffer: 'FLAT ₹40 OFF',
    isPureVeg: true,
    isFeatured: false,
    menu: [
      {
        id: 'at-1',
        name: 'Ghee Podi Button Idli (14 mini pcs)',
        price: 90,
        description: 'Bite-sized coin idlis tossed in melted pure ghee and traditional spicy molagapodi gunpowder.',
        isVeg: true,
        category: 'Bestsellers',
        rating: 4.9,
        ratingCount: 15400,
        bestseller: true
      },
      {
        id: 'at-2',
        name: 'Crispy Rava Onion Masala Dosa',
        price: 105,
        description: 'Lacy semolina crepe roasted crisp with diced red onions, green chillies, and cumin seeds.',
        isVeg: true,
        category: 'Dosas',
        rating: 4.6,
        ratingCount: 8100,
        bestseller: true
      },
      {
        id: 'at-3',
        name: 'Hot Sambhar Vada (2 Pcs)',
        price: 65,
        description: 'Golden crispy lentil donuts submerged in steaming drumstick shallot sambhar and topped with fresh coriander.',
        isVeg: true,
        category: 'Breakfast',
        rating: 4.7,
        ratingCount: 6700,
        bestseller: false
      }
    ]
  }
];
