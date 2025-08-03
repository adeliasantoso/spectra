// Product data for Spectra ecosystem
import spectraGlassesImage from '../assets/images/landing-page/spectra1.png';
import productPov2 from '../assets/images/product-page/product-pov-2.png';
import productPov3 from '../assets/images/product-page/product-pov-3.png';

// Spectra Buds images
import spectraBudsFront from '../assets/images/product-page/spectra-buds/front-pov.png';
import spectraBudsRear from '../assets/images/product-page/spectra-buds/rear-pov.png';
import spectraBudsSide from '../assets/images/product-page/spectra-buds/side-pov.png';

// Spectra Display images
import spectraDisplayFront from '../assets/images/product-page/spectra-display/front-pov.png';
import spectraDisplayRear from '../assets/images/product-page/spectra-display/rear-pov.png';
import spectraDisplaySide from '../assets/images/product-page/spectra-display/side-pov.png';

// Spectra Watch images
import spectraWatchFront from '../assets/images/product-page/spectra-watch/front-pov.png';
import spectraWatchRear from '../assets/images/product-page/spectra-watch/rear-pov.png';
import spectraWatchSide from '../assets/images/product-page/spectra-watch/side-pov.png';

// Product categories
export const CATEGORIES = {
  WEARABLES: 'wearables',
  AUDIO: 'audio',
  DISPLAY: 'display'
};

// All Spectra products
export const PRODUCTS = {
  // AR Glasses
  'spectra-vision': {
    id: 'spectra-vision',
    name: 'Spectra Vision',
    category: CATEGORIES.WEARABLES,
    tagline: '',
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 247,
    images: [
      spectraGlassesImage,
      productPov2,
      productPov3
    ],
    colors: ['Black', 'White', 'Silver'],
    inStock: true,
    description: 'Welcome to a new dimension of personalization. Spectra Vision is a next-generation wearable that brings the power of intelligent personalization into your everyday life. Designed to adapt and respond in real time, it enhances your experience across work, leisure, and everything in between.',
    features: [
      'Ultra-lightweight titanium frame (28g)',
      '4K micro-OLED displays with 120Hz refresh rate',
      'Advanced eye-tracking technology',
      'Spatial audio with noise cancellation',
      '12-hour battery life with fast charging',
      'IPX4 water resistance',
      'Voice control and gesture recognition',
      'Compatible with iOS, Android, and Windows'
    ],
    specifications: {
      'Display': '4K micro-OLED, 120Hz, 3000 nits brightness',
      'Processor': 'Custom neural processing unit',
      'Memory': '8GB RAM, 256GB storage',
      'Connectivity': 'WiFi 6E, Bluetooth 5.3, USB-C',
      'Sensors': 'Accelerometer, Gyroscope, Magnetometer, Ambient light',
      'Camera': 'Dual 8MP cameras with AI processing',
      'Audio': 'Spatial audio speakers, 3-mic array',
      'Battery': '12-hour typical use, 2-hour fast charge',
      'Weight': '28g (without cable)',
      'Compatibility': 'iOS 15+, Android 12+, Windows 11+'
    }
  },

  // Wireless Earbuds
  'spectra-buds': {
    id: 'spectra-buds',
    name: 'Spectra Buds',
    category: CATEGORIES.AUDIO,
    tagline: '',
    price: 299,
    originalPrice: 349,
    rating: 4.6,
    reviewCount: 184,
    images: [
      spectraBudsFront,
      spectraBudsRear,
      spectraBudsSide
    ],
    colors: ['Black', 'White', 'Silver'],
    inStock: true,
    description: 'Welcome to audio that learns you. Spectra Buds are next-generation wireless earbuds that bring intelligent personalization to your listening experience. Designed to adapt in real time, they enhance every moment of your day with perfectly tuned spatial audio that understands your environment and preferences.',
    features: [
      'Adaptive spatial audio with real-time environment detection',
      'Active noise cancellation with transparency mode',
      'Seamless device handoffs across Spectra ecosystem',
      '8-hour battery life, 24 hours with case',
      'Wireless charging case',
      'IPX5 water resistance',
      'Touch controls with gesture recognition',
      'Find My integration'
    ],
    specifications: {
      'Drivers': 'Custom 11mm dynamic drivers',
      'Audio': 'Spatial audio, Dolby Atmos support',
      'Connectivity': 'Bluetooth 5.3, multipoint connection',
      'Sensors': 'Accelerometer, Gyroscope, Force sensor',
      'Microphones': '3-mic array per earbud with beamforming',
      'Battery': '8h earbuds, 24h total with case',
      'Charging': 'USB-C, Qi wireless charging',
      'Weight': '5.4g per earbud',
      'Compatibility': 'iOS 15+, Android 8+, Windows 10+'
    }
  },

  // Smart TV/Display
  'spectra-display': {
    id: 'spectra-display',
    name: 'Spectra Display',
    category: CATEGORIES.DISPLAY,
    tagline: '',
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 92,
    images: [
      spectraDisplayFront,
      spectraDisplayRear,
      spectraDisplaySide
    ],
    colors: ['Black', 'Silver'],
    inStock: true,
    description: 'Welcome to entertainment that knows your family. Spectra Display is a next-generation smart TV that brings the power of intelligent personalization into your living room. Designed to recognize and adapt to each family member, it transforms your viewing experience with content that understands everyone\'s unique preferences.',
    features: [
      'Multi-user recognition with simultaneous personalization',
      '55" 4K QLED display with HDR10+ support',
      'Ambient light and biometric optimization',
      'Family coordination and scheduling intelligence',
      'Voice control with natural language processing',
      'Integrated sound system with spatial audio',
      'Works with all major streaming services',
      'Smart home hub integration'
    ],
    specifications: {
      'Display': '55" 4K QLED, HDR10+, 120Hz refresh rate',
      'Processor': 'Custom AI processing chip',
      'Audio': 'Integrated 2.1 sound system, Dolby Atmos',
      'Connectivity': 'WiFi 6E, Bluetooth 5.3, 4x HDMI 2.1',
      'Sensors': 'Camera with privacy shutter, ambient light sensor',
      'Voice': 'Far-field microphone array',
      'Smart Features': 'Multi-user recognition, content adaptation',
      'Dimensions': '1230 x 710 x 60mm (without stand)',
      'Weight': '18.5kg (without stand)',
      'Compatibility': 'All major streaming platforms, smart home systems'
    }
  },

  // Smartwatch
  'spectra-watch': {
    id: 'spectra-watch',
    name: 'Spectra Watch',
    category: CATEGORIES.WEARABLES,
    tagline: '',
    price: 499,
    originalPrice: 599,
    rating: 4.5,
    reviewCount: 156,
    images: [
      spectraWatchFront,
      spectraWatchRear,
      spectraWatchSide
    ],
    colors: ['Black', 'Silver', 'Gold'],
    inStock: true,
    description: 'Welcome to wellness that adapts to you. Spectra Watch is a next-generation smartwatch that brings intelligent personalization to your health and productivity journey. Designed to learn your patterns and respond in real time, it enhances every aspect of your daily rhythm with insights tailored just for you.',
    features: [
      'Advanced health monitoring with AI insights',
      'Seamless ecosystem integration with handoffs',
      'Always-on LTPO OLED display',
      'Multi-day battery life with fast charging',
      'Comprehensive fitness tracking',
      '5ATM water resistance',
      'ECG and blood oxygen monitoring',
      'Sleep optimization with gentle wake'
    ],
    specifications: {
      'Display': '1.9" LTPO OLED, Always-On, 450 nits brightness',
      'Processor': 'Dual-core with dedicated health chip',
      'Health': 'Heart rate, ECG, SpO2, stress, sleep tracking',
      'Connectivity': 'WiFi, Bluetooth 5.3, Optional LTE',
      'Sensors': 'Accelerometer, Gyroscope, Compass, Altimeter',
      'Battery': '36 hours typical use, 72 hours low power mode',
      'Charging': 'Magnetic wireless charging, 0-80% in 45 minutes',
      'Water Resistance': '5ATM + IP6X dust resistance',
      'Compatibility': 'iOS 15+, Android 8+, seamless with Spectra ecosystem'
    }
  }
};

// Get products by category
export const getProductsByCategory = (category) => {
  return Object.values(PRODUCTS).filter(product => product.category === category);
};

// Get all products as array
export const getAllProducts = () => {
  return Object.values(PRODUCTS);
};

// Get product by ID
export const getProductById = (id) => {
  return PRODUCTS[id] || null;
};

// Featured products for homepage
export const getFeaturedProducts = () => {
  return [
    PRODUCTS['spectra-vision'],
    PRODUCTS['spectra-buds'],
    PRODUCTS['spectra-display'],
    PRODUCTS['spectra-watch']
  ];
};