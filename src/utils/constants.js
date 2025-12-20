// src/utils/constants.js

export const BUSINESS_INFO = {
  name: 'BellyBuys Enterprise',
  tagline: 'Exquisite Culinary Experiences Delivered with Excellence',
  description: 'Premium catering services, weekend meals, private chef experiences, and reliable logistics in Ile-Ife, Osun State, Nigeria.',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'bellybuys@example.com',
  phone: '+2348142287713',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+2348142287713',
  address: 'Ajebamidele, Ile-Ife, Osun State, Nigeria',
  instagram: '@belly__buys',
  location: {
    city: 'Ile-Ife',
    state: 'Osun State',
    country: 'Nigeria'
  }
};

export const SERVICES = [
  {
    id: 'weekend-meals',
    title: 'Weekend Meals',
    description: 'Delicious, home-style meals delivered fresh every weekend. Perfect for families who want to enjoy quality time without cooking.',
    features: ['Fresh ingredients', 'Variety of cuisines', 'Timely delivery', 'Customizable portions'],
    operatingHours: 'Friday - Sunday',
    icon: '',
    image: '/images/services/nice-hero2.jpg',
    cta: 'Order Now'
  },
  {
    id: 'catering',
    title: 'Catering Services',
    description: 'Professional catering for weddings, corporate events, parties, and special occasions. We bring culinary excellence to your celebrations.',
    features: ['Event planning', 'Menu customization', 'Professional staff', 'Full setup & cleanup'],
    operatingHours: 'Daily',
    icon: '',
    image: '/images/services/catering.jpg',
    cta: 'Book Event'
  },
  {
    id: 'private-chef',
    title: 'Private Chef',
    description: 'Experience restaurant-quality meals in the comfort of your home. Our skilled chefs create personalized culinary experiences.',
    features: ['Personal menu planning', 'In-home service', 'Special dietary needs', 'Cooking classes available'],
    operatingHours: 'Daily',
    icon: '',
    image:  '/images/hero/hero-2.jpg',
    cta: 'Hire a Chef'
  },
  {
    id: 'logistics',
    title: 'BellyBuys Logistics',
    description: 'Swift and reliable delivery services. Pickups, deliveries, and errands handled with care and efficiency.',
    features: ['Same-day delivery', 'Package tracking', 'Secure handling', 'Affordable rates'],
    operatingHours: 'Friday - Sunday',
    icon: '',
    image: '/images/services/logistics.jpg',
    cta: 'Schedule Pickup'
  },
  {
    id: 'cooking-utensils',
    title: 'Cooking Utensils Rentals',
    description: 'Quality cooking equipment and utensils for rent. Everything you need for your event or home cooking needs.',
    features: ['Wide selection', 'Clean & sanitized', 'Flexible rental periods', 'Delivery included'],
    operatingHours: 'Daily',
    icon: '',
    image: '/images/services/utensils.jpg',
    cta: 'View Inventory'
  },
  {
    id: 'bulk-cooking',
    title: 'Bulk Cooking',
    description: 'Large-scale meal preparation for institutions, companies, and events. Consistent quality in every batch.',
    features: ['Scalable portions', 'Cost-effective', 'Meal planning', 'Nutritional balance'],
    operatingHours: 'Daily',
    icon: '',
    image: '/images/services/bulk-cooking.jpg',
    cta: 'Request Quote'
  },
  {
    id: 'food-bowls',
    title: 'Food Bowls',
    description: 'Mobile food stations for festivals, markets, and outdoor events. Bring the BellyBuys experience anywhere.',
    features: ['Portable setup', 'Variety of menus', 'Professional staff', 'Full equipment provided'],
    operatingHours: 'By Appointment',
    icon: '',
    image: '/images/services/food-booth.jpg',
    cta: 'Book Booth'
  }
];

export const MENU_ITEMS = [
  {
    id: 1,
    category: 'Rice Dishes',
    name: 'Jollof Rice and Dodo',
    description: 'Classic West African jollof rice with sweet fried plantains',
    prices: [
      { variant: 'With Chicken', price: 4500 },
      { variant: 'With Turkey', price: 6000 }
    ],
    images: ['/images/menu/jollof-1.jpg', '/images/menu/jollof-2.jpg'],
    video: '/videos/menu/jollof.mp4',
    popular: true
  },
  {
    id: 2,
    category: 'Pasta',
    name: 'Stirfry Spaghetti and Dodo',
    description: 'Stir-fried spaghetti with vegetables and plantains',
    prices: [
      { variant: 'With Chicken', price: 4500 },
      { variant: 'With Turkey', price: 6000 }
    ],
    images: ['/images/menu/spaghetti-1.jpg', '/images/menu/spaghetti-2.jpg'],
    video: '/videos/menu/spaghetti.mp4',
    popular: true
  },
  {
    id: 3,
    category: 'Noodles',
    name: 'Stirfry Noodles',
    description: 'Perfectly seasoned stir-fried noodles with protein',
    prices: [
      { variant: 'With Egg', price: 3500 },
      { variant: 'With Chicken and Dodo', price: 6000 }
    ],
    images: ['/images/menu/noodles-1.jpg', '/images/menu/noodles-2.jpg'],
    popular: false
  },
  {
    id: 4,
    category: 'Rice Dishes',
    name: 'White Rice and Assorted Native Stew',
    description: 'Fluffy white rice with rich native sauce',
    prices: [
      { variant: 'With Assorted', price: 5000 },
      { variant: 'Vegetable Sauce', price: 5000 },
      { variant: 'With Fish/Chicken', price: 5000 }
    ],
    images: ['/images/menu/white-rice-1.jpg', '/images/menu/white-rice-2.jpg'],
    popular: false
  },
  {
    id: 5,
    category: 'Soups',
    name: 'Ogbono Soup',
    description: 'Traditional draw soup with your choice of protein',
    prices: [
      { variant: 'With Eba', price: 4000 },
      { variant: 'With Semo', price: 4300 },
      { variant: 'With Poundo', price: 4600 }
    ],
    images: ['/images/menu/ogbono-1.jpg', '/images/menu/ogbono-2.jpg'],
    popular: true
  },
  {
    id: 6,
    category: 'Soups',
    name: 'Vegetables Soup',
    description: 'Nutritious vegetable soup with protein',
    prices: [
      { variant: 'With Eba', price: 4000 },
      { variant: 'With Semo', price: 4300 },
      { variant: 'With Poundo', price: 4600 }
    ],
    images: ['/images/menu/veg-soup-1.jpg', '/images/menu/veg-soup-2.jpg'],
    popular: false
  },
  {
    id: 7,
    category: 'Soups',
    name: 'Edikankong Soup',
    description: 'Delicious Nigerian vegetable soup',
    prices: [
      { variant: 'With Eba', price: 4500 },
      { variant: 'With Semo', price: 4800 },
      { variant: 'With Poundo', price: 5000 }
    ],
    images: ['/images/menu/edikankong-1.jpg', '/images/menu/edikankong-2.jpg'],
    popular: false
  },
  {
    id: 8,
    category: 'Soups',
    name: 'Egusi Soup',
    description: 'Classic melon seed soup with assorted protein',
    prices: [
      { variant: 'With Eba', price: 3500 },
      { variant: 'With Semo', price: 3800 },
      { variant: 'With Poundo', price: 4000 }
    ],
    images: ['/images/menu/egusi-1.jpg', '/images/menu/egusi-2.jpg'],
    popular: true
  },
  {
    id: 9,
    category: 'Soups',
    name: 'Peppersoup',
    description: 'Spicy Nigerian peppersoup',
    prices: [
      { variant: 'Chicken', price: 4500 },
      { variant: 'Intestines', price: 4500 },
      { variant: 'Goatmeat', price: 5000 }
    ],
    images: ['/images/menu/peppersoup-1.jpg', '/images/menu/peppersoup-2.jpg'],
    popular: false
  },
  {
    id: 10,
    category: 'Extras',
    name: 'Additional Items',
    description: 'Enhance your meal with extras',
    prices: [
      { variant: 'Beef', price: 600 },
      { variant: 'Egg', price: 400 },
      { variant: 'Titus Fish', price: 1000 },
      { variant: 'Chicken', price: 2000 },
      { variant: 'Turkey', price: 3500 },
      { variant: 'Moimoi', price: 1000 }
    ],
    images: ['/images/menu/extras-1.jpg'],
    popular: false
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Exquisite Culinary Experiences',
    subtitle: 'Where Every Meal Tells a Story',
    description: 'Experience the finest catering and meal services in Ile-Ife. From weekend delights to grand celebrations, we bring exceptional taste to your table.',
    cta: { text: 'Explore Our Menu', link: '/menu' },
    secondaryCta: { text: 'Book a Service', link: '/contact' },
    media: { type: 'image', src: '/images/hero/hero-19.jpg' }
    },
  {
    id: 2,
    title: 'Private Chef Services',
    subtitle: 'Restaurant Quality at Home',
    description: 'Indulge in personalized culinary experiences with our skilled private chefs. Tailored menus, exceptional service, unforgettable meals.',
    cta: { text: 'Hire a Chef', link: '/services#private-chef' },
    secondaryCta: { text: 'View Portfolio', link: '/portfolio' },
    media: { type: 'image', src: '/images/hero/hero-2.jpg' }
  },
  {
    id: 3,
    title: 'Event Catering Excellence',
    subtitle: 'Making Your Celebrations Memorable',
    description: 'Professional catering for weddings, corporate events, and parties. Let us handle the culinary magic while you enjoy your special moments.',
    cta: { text: 'Plan Your Event', link: '/contact' },
    secondaryCta: { text: 'Our Services', link: '/services' },
    media: { type: 'image', src: '/images/hero/hero-18.jpg' }
  },
  {
    id: 4,
    title: 'Swift & Reliable Logistics',
    subtitle: 'BellyBuys Logistics',
    description: 'Fast, secure delivery services across Ile-Ife. Pickups, deliveries, and errands handled with care and professionalism.',
    cta: { text: 'Schedule Delivery', link: '/services#logistics' },
    secondaryCta: { text: 'Learn More', link: '/about' },
    media: { type: 'image', src: '/images/nice-hero.jpg' }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Adewale Johnson',
    initials: 'AJ',
    rating: 5,
    text: 'BellyBuys catered our wedding and the experience was absolutely phenomenal! The food was delicious, presentation was stunning, and the service was impeccable. Highly recommended!',
    date: '2024-11-15',
    service: 'Catering'
  },
  {
    id: 2,
    name: 'Chinwe Okafor',
    initials: 'CO',
    rating: 5,
    text: 'The weekend meals have been a game-changer for our family. Fresh, tasty, and always delivered on time. We look forward to it every week!',
    date: '2024-11-20',
    service: 'Weekend Meals'
  },
  {
    id: 3,
    name: 'Ibrahim Yusuf',
    initials: 'IY',
    rating: 4,
    text: 'Hired their private chef for a dinner party. The chef was professional, creative, and the food was restaurant-quality. Will definitely book again!',
    date: '2024-10-28',
    service: 'Private Chef'
  }
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Menu', href: '/menu' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
];

export const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    url: `https://instagram.com/${BUSINESS_INFO.instagram.replace('@', '')}`,
    icon: 'instagram'
  },
  {
    platform: 'WhatsApp',
    url: `https://wa.me/${BUSINESS_INFO.whatsapp.replace('+', '')}`,
    icon: 'whatsapp'
  },
  {
    platform: 'Phone',
    url: `tel:${BUSINESS_INFO.phone}`,
    icon: 'phone'
  },
  {
    platform: 'Email',
    url: `mailto:${BUSINESS_INFO.email}`,
    icon: 'email'
  }
];

export const ORDER_CATEGORIES = [
  'Weekend Meals',
  'Event Catering',
  'Private Chef',
  'Bulk Cooking',
  'Utensils Rental',
  'Logistics Service',
  'Food Booth',
  'Other'
];

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};