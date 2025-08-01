# Claude Code Configuration

## Project Overview
**Spectra Vision Website** - Modern e-commerce platform for AR smart glasses

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
│   ├── Navigation.jsx   # Header navigation
│   ├── Footer.jsx       # Footer component
│   ├── CartIcon.jsx     # Shopping cart icon
│   ├── Breadcrumb.jsx   # Navigation breadcrumbs
│   ├── ToastContainer.jsx # Toast notifications
│   ├── FAQ.jsx          # FAQ accordion component
│   ├── ProductQuickView.jsx # Product quick view modal
│   ├── LoadingSpinner.jsx # Loading indicator
│   └── OptimizedImage.jsx # Performance optimized images
├── context/             # React Context providers
│   ├── CartContext.jsx  # Shopping cart state
│   ├── ToastContext.jsx # Toast notification system
│   └── WishlistContext.jsx # Wishlist management
├── pages/               # Route-level components
│   ├── Home.jsx         # Homepage
│   ├── Shop.jsx         # Product catalog
│   ├── About.jsx        # About page
│   ├── Contact.jsx      # Contact page
│   ├── Cart.jsx         # Shopping cart
│   └── ProductDetail.jsx # Product detail page
├── sections/            # Homepage sections
│   ├── Hero.jsx         # Hero video section
│   ├── ProductIntro.jsx # Product introduction
│   ├── Features.jsx     # Product features
│   ├── CallToAction.jsx # CTA section
│   ├── About.jsx        # About section
│   └── SocialGallery.jsx # Social media gallery
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
- **Product Introduction**: "Introducing new Spectra 1.0" with animations
- **Background Textures**: Subtle patterns for visual interest
- **Interactive Elements**: Clickable product, hover effects
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
# Live URL: https://adeliasantoso.github.io/spectra-vision
```

### Build Configuration
- **Base Path**: `/spectra-vision/` for GitHub Pages
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
- **FAQ Section**: Added comprehensive FAQ with 11 Q&A items, expandable accordion design
- **Product Detail Enhancements**: Updated positioning copy, customer testimonials, optimized image gallery
- **Cart Page Fix**: Resolved navbar overlap issue with proper padding
- **Wishlist Integration**: Full wishlist context and functionality
- **Contact Page**: Fixed syntax errors, functional contact form
- **Performance**: Removed duplicate images, cleaned unused imports

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