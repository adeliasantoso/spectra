import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser scroll restoration (best practice for most websites)
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }

    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' to avoid visual jump, change to 'smooth' if you want animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;