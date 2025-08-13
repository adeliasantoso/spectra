import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const AppInitializer = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const initialize = async () => {
    try {
      console.log('App: Starting initialization...');
      
      // Check if we're on the correct domain
      const currentDomain = window.location.hostname;
      console.log('Current domain:', currentDomain);
      
      // Wait for DOM to be fully loaded
      if (document.readyState !== 'complete') {
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', resolve, { once: true });
          }
        });
      }

      // Check if required scripts are loaded
      if (!window.React) {
        console.warn('React not detected, but continuing...');
      }

      // Test basic functionality
      const testElement = document.createElement('div');
      testElement.innerHTML = 'test';
      document.body.appendChild(testElement);
      document.body.removeChild(testElement);

      // Check localStorage availability
      try {
        localStorage.setItem('app-test', 'test');
        localStorage.removeItem('app-test');
      } catch (e) {
        console.warn('localStorage not available:', e);
      }

      // Small delay to ensure everything is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('App: Initialization complete');
      setIsInitialized(true);
      setInitError(null);
      
    } catch (error) {
      console.error('App initialization error:', error);
      setInitError(error);
    }
  };

  useEffect(() => {
    initialize();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setInitError(null);
    setIsInitialized(false);
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (initError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Failed
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Failed to initialize the application. This might be due to network issues or browser compatibility.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Retry ({retryCount + 1})
            </button>
            
            <button
              onClick={handleReload}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>

          {import.meta.env.DEV && (
            <details className="mt-6 text-left bg-gray-50 p-4 rounded text-xs">
              <summary className="cursor-pointer font-medium text-gray-700">
                Error Details
              </summary>
              <pre className="mt-2 text-red-600 whitespace-pre-wrap">
                {initError.toString()}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-4">
          <div className="text-3xl font-light text-gray-900 tracking-[0.2em]">
            SPECTRA
          </div>
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-600">
            {retryCount > 0 ? `Initializing... (Retry ${retryCount})` : "Initializing..."}
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default AppInitializer;