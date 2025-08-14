import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration (best practice for most websites)
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // Only scroll to top if route actually changed (not just hash or query params)
    const currentPath = pathname.split('?')[0].split('#')[0];
    const storedPath = sessionStorage.getItem('lastPath');
    
    if (storedPath !== currentPath) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      sessionStorage.setItem('lastPath', currentPath);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;