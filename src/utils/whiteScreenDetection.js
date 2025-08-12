// White Screen Detection and Auto-Recovery
class WhiteScreenDetector {
  constructor() {
    this.checkInterval = 3000; // Check every 3 seconds
    this.retryDelay = 2000; // Wait 2 seconds before retry
    this.maxRetries = 3;
    this.currentRetries = 0;
    this.isChecking = false;
    this.hasContent = false;
    
    this.init();
  }

  init() {
    // Wait for initial page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.startChecking(), 1000);
      });
    } else {
      setTimeout(() => this.startChecking(), 1000);
    }
    
    // Listen for service worker messages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          console.log('Service worker updated, forcing refresh...');
          this.forceRefresh('Service worker updated');
        }
      });
    }
  }

  startChecking() {
    if (this.isChecking) return;
    this.isChecking = true;
    
    console.log('[WhiteScreen] Starting white screen detection...');
    this.checkForWhiteScreen();
    
    // Set up periodic checks
    this.interval = setInterval(() => {
      this.checkForWhiteScreen();
    }, this.checkInterval);
  }

  checkForWhiteScreen() {
    try {
      const hasVisibleContent = this.hasVisibleContent();
      const hasReactRoot = this.hasReactContent();
      const hasErrors = this.hasJavaScriptErrors();
      
      if (!hasVisibleContent || !hasReactRoot || hasErrors) {
        console.warn('[WhiteScreen] Detected potential white screen:', {
          hasVisibleContent,
          hasReactRoot,
          hasErrors,
          retries: this.currentRetries
        });
        
        this.handleWhiteScreen();
      } else {
        // Reset retry counter if content is loaded successfully
        this.currentRetries = 0;
        this.hasContent = true;
      }
    } catch (error) {
      console.error('[WhiteScreen] Error during white screen check:', error);
    }
  }

  hasVisibleContent() {
    // Check for visible content in the DOM
    const body = document.body;
    if (!body) return false;
    
    // Check if body has actual content
    const textContent = body.textContent || body.innerText || '';
    if (textContent.trim().length === 0) return false;
    
    // Check for visible elements (not just whitespace)
    const visibleElements = body.querySelectorAll('*:not(script):not(style):not(meta):not(link)');
    let hasVisibleContent = false;
    
    for (let element of visibleElements) {
      const computedStyle = window.getComputedStyle(element);
      const hasText = (element.textContent || '').trim().length > 0;
      const hasVisibleBackground = computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                                   computedStyle.backgroundColor !== 'transparent';
      const hasImage = element.tagName === 'IMG' || element.tagName === 'VIDEO';
      
      if ((hasText || hasVisibleBackground || hasImage) && 
          computedStyle.display !== 'none' && 
          computedStyle.visibility !== 'hidden' &&
          computedStyle.opacity !== '0') {
        hasVisibleContent = true;
        break;
      }
    }
    
    return hasVisibleContent;
  }

  hasReactContent() {
    // Check for React root elements
    const reactRoot = document.querySelector('#root, [data-reactroot], .react-root');
    if (!reactRoot) return false;
    
    // Check if React root has children
    return reactRoot.children.length > 0;
  }

  hasJavaScriptErrors() {
    // Check for common error indicators
    const errorMessages = [
      'ChunkLoadError',
      'Loading chunk',
      'failed to fetch',
      'Unexpected token',
      'SyntaxError',
      'TypeError: Failed to fetch'
    ];
    
    // Check console errors (basic detection)
    const hasConsoleErrors = window.errorCount > 0;
    
    // Check for error elements in DOM
    const errorElements = document.querySelectorAll('.error, .error-boundary, [data-error]');
    
    return hasConsoleErrors || errorElements.length > 0;
  }

  handleWhiteScreen() {
    if (this.currentRetries >= this.maxRetries) {
      console.error('[WhiteScreen] Max retries reached, giving up');
      this.showErrorMessage();
      return;
    }
    
    this.currentRetries++;
    console.log(`[WhiteScreen] Attempting recovery, retry ${this.currentRetries}/${this.maxRetries}`);
    
    // Try different recovery strategies
    setTimeout(() => {
      switch (this.currentRetries) {
        case 1:
          this.clearCacheAndReload();
          break;
        case 2:
          this.hardRefresh();
          break;
        case 3:
          this.forceRefresh('Maximum retries reached');
          break;
        default:
          this.forceRefresh('Unknown error');
      }
    }, this.retryDelay);
  }

  async clearCacheAndReload() {
    console.log('[WhiteScreen] Clearing cache and reloading...');
    
    try {
      // Clear service worker cache
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration.active) {
          registration.active.postMessage({
            type: 'CACHE_BUST',
            timestamp: Date.now()
          });
        }
      }
      
      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => {
            console.log('[WhiteScreen] Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }
      
      // Wait a bit then reload
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
      
    } catch (error) {
      console.error('[WhiteScreen] Failed to clear cache:', error);
      this.hardRefresh();
    }
  }

  hardRefresh() {
    console.log('[WhiteScreen] Performing hard refresh...');
    
    // Add cache-busting parameters
    const url = new URL(window.location);
    url.searchParams.set('_cb', Date.now());
    url.searchParams.set('_retry', this.currentRetries);
    
    window.location.href = url.toString();
  }

  forceRefresh(reason) {
    console.log('[WhiteScreen] Force refresh:', reason);
    
    // Clear all possible caches
    if (typeof Storage !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    
    // Reload with no-cache headers
    window.location.reload(true);
  }

  showErrorMessage() {
    // Create error overlay
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        font-family: Arial, sans-serif;
      ">
        <div style="text-align: center; max-width: 400px; padding: 40px;">
          <h2 style="color: #333; margin-bottom: 20px;">Loading Issue</h2>
          <p style="color: #666; margin-bottom: 30px;">
            We're having trouble loading the page. This might be due to a temporary connection issue.
          </p>
          <button onclick="window.location.reload(true)" style="
            background: #000;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
          ">
            Try Again
          </button>
          <button onclick="window.location.href = window.location.origin + '/spectra/'" style="
            background: #666;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          ">
            Go Home
          </button>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            If the problem persists, try clearing your browser cache (Ctrl+Shift+R)
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(errorDiv);
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.isChecking = false;
  }
}

// Track JavaScript errors
window.errorCount = 0;
window.addEventListener('error', (event) => {
  window.errorCount++;
  console.error('[WhiteScreen] JavaScript error detected:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  window.errorCount++;
  console.error('[WhiteScreen] Unhandled promise rejection:', event.reason);
});

// Initialize white screen detector
let whiteScreenDetector;

function initWhiteScreenDetection() {
  if (!whiteScreenDetector) {
    whiteScreenDetector = new WhiteScreenDetector();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWhiteScreenDetection);
} else {
  initWhiteScreenDetection();
}

export { WhiteScreenDetector, initWhiteScreenDetection };