import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import ToastContainer from './components/ToastContainer.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
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
  </StrictMode>,
)

// Register Service Worker for caching and offline support
if ('serviceWorker' in navigator && !import.meta.env.DEV) {
  // Only register service worker in production
  window.addEventListener('load', () => {
    const swPath = import.meta.env.BASE_URL + 'sw.js';
    
    navigator.serviceWorker.register(swPath)
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates periodically in production
        setInterval(() => {
          registration.update();
        }, 300000); // Check every 5 minutes
        
        // Listen for service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker available, reloading...');
                
                // Show update notification or auto-reload
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            });
          }
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
