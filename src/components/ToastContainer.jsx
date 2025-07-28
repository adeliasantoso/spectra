import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast, onRemove }) => {
  const getToastStyles = () => {
    const baseStyles = "flex items-center justify-between px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md border-0 transform transition-all duration-500 ease-out animate-slide-in";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-black/90 text-white`;
      case 'error':
        return `${baseStyles} bg-red-500/95 text-white`;
      case 'warning':
        return `${baseStyles} bg-amber-500/95 text-white`;
      case 'info':
        return `${baseStyles} bg-black/90 text-white`;
      default:
        return `${baseStyles} bg-black/90 text-white`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <div className="w-6 h-6 mr-3 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 mr-3 flex-shrink-0 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 mr-3 flex-shrink-0 bg-amber-600 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v6a1 1 0 11-2 0V3a1 1 0 011-1zm0 10a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-6 h-6 mr-3 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 mr-3 flex-shrink-0 bg-gray-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center flex-1">
        {getIcon()}
        <div className="flex-1">
          {toast.title && (
            <div className="font-medium text-sm mb-0.5">{toast.title}</div>
          )}
          <div className="text-sm font-medium">{toast.message}</div>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-3 flex-shrink-0 rounded-full p-1 hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full">
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;