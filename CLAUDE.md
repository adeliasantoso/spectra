# Claude Code Configuration

## Project Overview
**Spectra Website** - Modern e-commerce platform for futuristic smart glasses brand

### Tech Stack
- **Frontend**: React 19.1.0 with Vite 7.0.4
- **Styling**: Tailwind CSS v3.4.17
- **Routing**: React Router DOM v7.7.0 (HashRouter for GitHub Pages)
- **Language**: JavaScript (ES6+)
- **State Management**: React Context API
- **Deployment**: GitHub Pages

## Development Commands
```bash
npm run dev       # Start development server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Deploy to GitHub Pages
npm run lint      # Run ESLint (if configured)
```

## Project Architecture

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navigation.jsx   # Smart navbar with scroll animations
│   ├── Footer.jsx       # Footer component
│   ├── CartIcon.jsx     # Shopping cart icon
│   ├── Breadcrumb.jsx   # Navigation breadcrumbs
│   ├── ToastContainer.jsx # Toast notifications
│   ├── FAQ.jsx          # FAQ accordion component
│   ├── ProductQuickView.jsx # Product quick view modal
│   ├── LoadingSpinner.jsx # Loading indicator
│   ├── OptimizedImage.jsx # Performance optimized images
│   ├── OptimizedVideo.jsx # Performance optimized videos
│   ├── CustomCursor.jsx # Custom cursor interactions
│   ├── InteractiveButton.jsx # Enhanced button components
│   ├── LoadingScreen.jsx # Loading screen component
│   ├── MagneticElement.jsx # Magnetic hover effects
│   ├── ParallaxSection.jsx # Parallax scroll effects
│   ├── ScrollIndicator.jsx # Scroll progress indicator
│   └── TiltCard.jsx     # 3D tilt card effects
├── context/             # React Context providers
│   ├── CartContext.jsx  # Shopping cart state
│   ├── ToastContext.jsx # Toast notification system
│   └── WishlistContext.jsx # Wishlist management
├── pages/               # Route-level components
│   ├── Home.jsx         # Homepage with video carousel
│   ├── Shop.jsx         # Product catalog
│   ├── About.jsx        # About page
│   ├── Contact.jsx      # Contact page
│   ├── Cart.jsx         # Shopping cart
│   ├── ProductDetail.jsx # Product detail page
│   ├── Checkout.jsx     # Checkout process
│   └── OrderSuccess.jsx # Order confirmation page
├── sections/            # Homepage sections
│   ├── Hero.jsx         # Hero video section
│   ├── ProductIntro.jsx # Product introduction
│   ├── Features.jsx     # Product features
│   ├── CallToAction.jsx # CTA section
│   ├── About.jsx        # About section
│   └── SocialGallery.jsx # Social media gallery
├── utils/               # Utility functions
│   └── performance.js   # Performance monitoring utilities
└── assets/              # Static assets
    └── images/          # Image placeholders
```

### State Management
- **CartContext**: Manages shopping cart state (add, remove, quantity)
- **ToastContext**: Handles notification system (success, error, info, warning)
- **WishlistContext**: Manages wishlist functionality (add, remove, toggle)

### Routing Configuration
```javascript
// Uses HashRouter for GitHub Pages compatibility
Routes:
- /                    # Homepage
- /shop               # Product catalog
- /about              # About page  
- /contact            # Contact page
- /cart               # Shopping cart
- /product/:id        # Product detail
```

## Key Features Implemented

### 🏠 Homepage
- **Hero Section**: Video background with animated title
- **Smart Navigation**: Auto-hide/show navbar on scroll with smooth animations
- **Video Carousel**: Interactive carousel with 4 product videos and navigation
- **Product Introduction**: "Introducing new Spectra 1.0" with animations
- **Background Textures**: Subtle patterns for visual interest
- **Interactive Elements**: Clickable product, hover effects, play/pause controls
- **FAQ Section**: Expandable accordion with fade-in animations
- **Responsive Design**: Mobile-first approach

### 🛍️ E-commerce Functionality
- **Product Detail Page**: Complete specifications, testimonials, gallery
- **Shopping Cart**: Add/remove items, quantity management, fixed navbar overlap
- **Toast Notifications**: User feedback for actions
- **Breadcrumb Navigation**: Clear page hierarchy
- **Interactive Elements**: Loading states, hover effects
- **Wishlist System**: Save products for later

### 🎨 Design System
- **Color Palette**: Gray/white gradients with blue/purple accents
- **Typography**: Modern, clean fonts with proper hierarchy  
- **Animations**: Subtle CSS animations and transitions
- **Layout**: CSS Grid and Flexbox for responsive layouts

### 🚀 Performance Optimizations
- **HashRouter**: GitHub Pages compatibility
- **Lazy Loading**: Images and components (ready for implementation)
- **Optimized Bundle**: Vite build optimization
- **CSS Purging**: Tailwind CSS unused style removal

## Interactive Components

### FAQ Section
```javascript
// Expandable accordion with fade-in animations
- Clean line separator design (no boxes)
- Smooth expand/collapse transitions
- Mobile-responsive layout
- 11 comprehensive Q&A items covering product features, privacy, shopping
```

### Toast Notification System
```javascript
// Usage examples:
const { success, error, warning, info } = useToast();

success('Item added to cart!');
error('Failed to process request');
warning('Stock running low');
info('Color selection updated');
```

### Product Detail Features
- **Updated Positioning**: Focus on AI personalization and smart recommendations
- **Customer Testimonials**: Real user stories about interior design, grocery delivery, business tools, fashion, and investing
- **Image Gallery**: Optimized product views without duplicates
- **Responsive Tabs**: Description, Specifications, Reviews

### Breadcrumb Navigation
- Automatic path detection
- Custom breadcrumb support
- Responsive design
- Hover animations

### Shopping Cart
- Fixed navbar overlap issues
- Persistent state (localStorage ready)
- Real-time total calculation
- Quantity controls
- Remove item functionality

### Wishlist System
- Add/remove products from wishlist
- Heart animation on toggle
- Persistent storage integration ready

## Deployment

### GitHub Pages Setup
```bash
# Deploy command
npm run deploy

# Builds project and pushes to gh-pages branch
# Live URL: https://adeliasantoso.github.io/spectra
```

### Build Configuration
- **Base Path**: `/spectra/` for GitHub Pages
- **Asset Optimization**: Automatic image and code splitting
- **Browser Support**: Modern browsers (ES6+)

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Consistent naming conventions
- Comment complex logic
- Use TypeScript-style JSDoc when needed

### State Management Patterns
```javascript
// Context Provider Pattern
<ToastProvider>
  <CartProvider>
    <App />
  </CartProvider>
</ToastProvider>

// Hook Usage
const { success } = useToast();
const { addToCart } = useCart();
```

### Animation Guidelines
- Use CSS transitions for micro-interactions
- Implement loading states for async operations
- Follow 60fps performance targets
- Test on mobile devices

## Recent Updates & Improvements

### ✅ Completed Features
- **Smart Navigation Bar**: Auto-hide/show navbar on scroll with smooth animations, stays visible during hero section
- **Video Carousel System**: Interactive 4-video carousel with dots navigation, auto-advance, and 3D transitions
- **Video Play/Pause Controls**: Working play/pause buttons on all USP section videos with proper state management
- **Performance Optimization**: Added RequestAnimationFrame for smooth 60fps scroll handling and debounced interactions
- **FAQ Section**: Added comprehensive FAQ with 11 Q&A items, expandable accordion design
- **Product Detail Enhancements**: Updated positioning copy, customer testimonials, optimized image gallery
- **Cart Page Fix**: Resolved navbar overlap issue with proper padding
- **Wishlist Integration**: Full wishlist context and functionality
- **Contact Page**: Fixed syntax errors, functional contact form
- **Enhanced Components**: Added OptimizedVideo, performance utilities, and modern UI components
- **About Page Hero Image Fix**: Resolved object-position issues by replacing OptimizedImage component with direct img tag

### FAQ Content Areas Covered:
1. Product introduction and capabilities
2. Personalization and AI recommendations  
3. Device connectivity and setup
4. Privacy and data security
5. Pricing and subscription model
6. Shopping and purchase experience
7. Advertisement personalization

## Future Enhancements Ready for Implementation

### High Priority
- [ ] Mobile navigation menu functionality
- [ ] SEO meta tags per page
- [ ] Error boundary components
- [ ] Performance monitoring integration

### Medium Priority
- [ ] User authentication system
- [ ] Product filtering and search
- [ ] Multi-language support
- [ ] Advanced image optimization

### Low Priority
- [ ] 360° product viewer
- [ ] AR preview functionality
- [ ] Advanced analytics integration
- [ ] A/B testing framework

## Testing
```bash
# Run tests (when implemented)
npm test

# E2E tests (when implemented)  
npm run test:e2e

# Lighthouse performance audit
npm run audit
```

## Troubleshooting

### Common Issues
1. **Blank page after deployment**: Check HashRouter configuration
2. **Images not loading**: Verify asset paths and build process
3. **Toast not showing**: Ensure ToastProvider wraps app
4. **Cart state reset**: Check CartProvider placement
5. **Hero image positioning issues**: When object-position styles don't work with OptimizedImage component, use direct `<img>` tag instead

### Image Position Adjustments Guide
When adjusting hero image positioning in About.jsx:
- Use inline `style={{ objectPosition: 'center X%' }}` for direct control
- Lower percentages (0-30%) = show upper part of image
- Higher percentages (70-100%) = show lower part of image  
- 50% = center position
- If OptimizedImage component interferes, replace with direct `<img>` tag
- Current About page hero uses `objectPosition: 'center 10%'` to show upper portion

### Debug Mode
```javascript
// Enable debug logging
localStorage.setItem('debug', 'true');
```

## Content & Messaging Updates

### Product Positioning
- **Main Focus**: "Welcome to a new dimension of personalization"
- **Value Proposition**: AI-powered wearable that learns user preferences
- **Key Benefits**: Real-time adaptation, ambient intelligence, privacy-first design
- **Target Audience**: Users seeking intelligent, personalized technology experiences

### Customer Testimonials Themes
- **Home & Lifestyle**: Interior design assistance in small towns
- **Daily Convenience**: Automated grocery shopping and delivery
- **Business Support**: Creative tools for small businesses (pottery example)
- **Personal Style**: AI-powered fashion recommendations
- **Financial Growth**: Investment guidance and savings optimization

## Video Asset Links

### ImageKit CDN Video Assets
All videos hosted on ImageKit CDN (https://ik.imagekit.io/ohyemuffin/asset/video/):

1. **Hero Section Video**
   - **Current**: `Futuristic_Smart_Glasses_Video_Generation.mp4?updatedAt=1754214351100`
   - **Previous**: `https://drive.google.com/uc?export=download&id=1zXmE4fsjzJcGTNnie8mlQQlAwHsCJsP3`
   - **Original**: `https://ik.imagekit.io/ohyemuffin/asset/video/dipake.mp4?updatedAt=1753676071907`
   - Used in: Hero background, main landing page video
   - Source: ImageKit CDN

2. **Video Carousel Section**
   - **Expand the Universe**: `expand-the-universe.mp4?updatedAt=1753676355743`
   - **Unlock Life Without Barriers**: `unlock.mp4?updatedAt=1753676356747` 
   - **See Through Your Thoughts**: `AI_Fashion_Design_Assistance_Video.mp4?updatedAt=1753676356653`
   - **Cancel Unwanted Noise**: `cancel-unwanted-noice.mp4?updatedAt=1753676357536`
   - **Previous Carousel Videos (BACKUP)**:
     - `AI_TV_Tailors_Content_for_Family.mp4?updatedAt=1754214349805`
     - `Watch_Tracks_Active_Lifestyle.mp4?updatedAt=1754214349971` 
     - `Immersive_Audio_on_a_Busy_Street.mp4?updatedAt=1754214349985`
     - `smart-recognition.mp4?updatedAt=1753676355632`
   - Used in: Interactive video carousel with 8-second auto-advance
   - Features: Animated black texture background, dots navigation, smooth transitions

3. **Expand the Universe**
   - **Current**: `AI_TV_Tailors_Content_for_Family.mp4?updatedAt=1754214349805` (Spectra Display)
   - **Previous**: `expand-the-universe.mp4?updatedAt=1753676355743`
   - Used in: "Expand your universe" section

4. **Unlock Life Without Barriers**
   - **Current**: `Watch_Tracks_Active_Lifestyle.mp4?updatedAt=1754214349971` (Spectra Watch)
   - **Previous**: `unlock.mp4?updatedAt=1753676356747`
   - Used in: "Unlock a life without barriers" section

5. **Cancel Unwanted Noise**
   - **Current**: `Immersive_Audio_on_a_Busy_Street.mp4?updatedAt=1754214349985` (Spectra Buds)
   - **Previous**: `cancel-unwanted-noice.mp4?updatedAt=1753676357536`
   - Used in: "Cancel the unwanted noise" section

6. **See Through Your Thoughts**
   - **Current**: `AI_Fashion_Design_Assistance_Video.mp4?updatedAt=1753676356653` (Used in carousel)
   - **Previous**: `look-through-your-head.mp4?updatedAt=1753676357987`
   - Used in: "See through your thoughts" section

7. **Intuitive Insights**
   - `terakhir-sebelum-product.mp4?updatedAt=1753676358212`
   - Used in: Full-width video USP section 2

### Video Usage Context
- All videos are set to autoplay, muted, loop, and playsInline
- Videos serve as background elements and feature demonstrations
- Each video supports the corresponding section's messaging
- Fallback background colors provided for loading states