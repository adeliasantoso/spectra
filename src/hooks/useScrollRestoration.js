import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook for scroll restoration
export const useScrollRestoration = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Save current scroll position before route change
    const saveScrollPosition = () => {
      const scrollData = {
        x: window.scrollX,
        y: window.scrollY,
        timestamp: Date.now()
      };
      sessionStorage.setItem(`scroll-${location.pathname}`, JSON.stringify(scrollData));
    };

    // Restore scroll position after route change
    const restoreScrollPosition = () => {
      const savedScroll = sessionStorage.getItem(`scroll-${location.pathname}`);
      if (savedScroll) {
        const { x, y, timestamp } = JSON.parse(savedScroll);
        
        // Only restore if saved recently (within 5 minutes)
        const fiveMinutes = 5 * 60 * 1000;
        if (Date.now() - timestamp < fiveMinutes) {
          window.scrollTo(x, y);
          return;
        }
      }
      
      // Default: scroll to top
      window.scrollTo(0, 0);
    };

    // Save scroll position when leaving page
    window.addEventListener('beforeunload', saveScrollPosition);
    
    // Restore scroll position with small delay to ensure DOM is ready
    const timeoutId = setTimeout(restoreScrollPosition, 100);
    
    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      clearTimeout(timeoutId);
      saveScrollPosition(); // Save position when component unmounts
    };
  }, [location.pathname]);
};

export default useScrollRestoration;