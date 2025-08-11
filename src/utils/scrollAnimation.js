/**
 * Scroll Animation System
 * Handles intersection observer for scroll-triggered animations
 * Works both ways (scroll up and down)
 */

class ScrollAnimationManager {
  constructor() {
    this.observer = null;
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          
          if (entry.isIntersecting) {
            // Element is visible - add visible class
            element.classList.add('visible');
            this.animatedElements.add(element);
          } else {
            // Element is not visible - remove visible class (so it can animate again)
            element.classList.remove('visible');
            this.animatedElements.delete(element);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
      }
    );

    // Initialize existing elements
    this.observeElements();
    
    // Re-initialize when DOM changes (for dynamically added elements)
    this.setupMutationObserver();
  }

  observeElements() {
    // Find all elements with scroll animation classes
    const elements = document.querySelectorAll(`
      .scroll-fade-up,
      .scroll-slide-left, 
      .scroll-slide-right,
      .scroll-scale-up,
      .scroll-fade-in,
      .animate-on-scroll
    `);

    elements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  setupMutationObserver() {
    // Watch for new elements added to DOM
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Check if the node itself or its children have scroll animation classes
            const scrollElements = node.querySelectorAll(`
              .scroll-fade-up,
              .scroll-slide-left,
              .scroll-slide-right, 
              .scroll-scale-up,
              .scroll-fade-in,
              .animate-on-scroll
            `);
            
            scrollElements.forEach((element) => {
              this.observer.observe(element);
            });

            // Also check if the node itself has scroll animation classes
            if (node.classList && this.hasScrollAnimationClass(node)) {
              this.observer.observe(node);
            }
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  hasScrollAnimationClass(element) {
    return element.classList.contains('scroll-fade-up') ||
           element.classList.contains('scroll-slide-left') ||
           element.classList.contains('scroll-slide-right') ||
           element.classList.contains('scroll-scale-up') ||
           element.classList.contains('scroll-fade-in') ||
           element.classList.contains('animate-on-scroll');
  }

  // Method to manually add element to observer
  observe(element) {
    if (element && this.observer) {
      this.observer.observe(element);
    }
  }

  // Method to manually remove element from observer
  unobserve(element) {
    if (element && this.observer) {
      this.observer.unobserve(element);
      this.animatedElements.delete(element);
    }
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.animatedElements.clear();
    }
  }
}

// Create global instance
let scrollAnimationManager = null;

// Initialize when DOM is ready
function initScrollAnimations() {
  if (typeof window !== 'undefined' && !scrollAnimationManager) {
    scrollAnimationManager = new ScrollAnimationManager();
  }
  return scrollAnimationManager;
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
}

export { ScrollAnimationManager, initScrollAnimations };
export default scrollAnimationManager;