import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import AppInitializer from './components/AppInitializer.jsx'
import NetworkStatus from './components/NetworkStatus.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { initScrollAnimations } from './utils/scrollAnimation.js'
import { initWhiteScreenDetection } from './utils/whiteScreenDetection.js'

// Lazy load pages for better performance
import { lazy } from 'react'
const Home = lazy(() => import('./pages/Home.jsx'))
const Shop = lazy(() => import('./pages/Shop.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess.jsx'))

// Initialize scroll animations
initScrollAnimations();

// Initialize white screen detection
initWhiteScreenDetection();

// Disable browser scroll restoration globally for best UX practice
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AppInitializer>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <NetworkStatus />
                <Suspense fallback={<div className="fixed inset-0 bg-white flex items-center justify-center z-50"><div className="text-center space-y-4"><div className="text-3xl font-light text-gray-900 tracking-[0.2em]">SPECTRA</div><div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div><p className="text-sm text-gray-600">Loading...</p></div></div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                  </Routes>
                </Suspense>
                <ToastContainer />
              </Router>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </AppInitializer>
    </ErrorBoundary>
  </StrictMode>,
)

// Unregister service worker in development to prevent issues
if ('serviceWorker' in navigator && import.meta.env.DEV) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Dev: Unregistered service worker');
    }
  });
}

// Register Service Worker for caching and offline support
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  // Only register service worker in production
  window.addEventListener('load', () => {
    const swPath = import.meta.env.BASE_URL + 'sw.js';
    
    navigator.serviceWorker.register(swPath)
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Aggressive update check every 10 seconds
        setInterval(() => {
          registration.update();
        }, 10000);
        
        // Listen for service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            console.log('New service worker found, preparing for update...');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New SW installed, clearing cache and reloading...');
                  // Clear all caches first
                  caches.keys().then((cacheNames) => {
                    return Promise.all(
                      cacheNames.map((cacheName) => {
                        if (cacheName.startsWith('spectra-')) {
                          console.log('Clearing cache:', cacheName);
                          return caches.delete(cacheName);
                        }
                      })
                    );
                  }).then(() => {
                    // Force hard reload
                    window.location.reload(true);
                  });
                } else {
                  console.log('First SW installation');
                }
              }
            });
          }
        });

        // Listen for controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('SW controller changed, hard reloading...');
          window.location.reload(true);
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
