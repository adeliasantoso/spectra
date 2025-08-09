import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = ({ toast, onRemove }) => {
  const getToastStyles = () => {
    const baseStyles = "flex items-center px-4 py-3 rounded-xl backdrop-blur-xl border transform transition-all duration-300 ease-out animate-slide-in hover:scale-[1.02] shadow-lg";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-white/95 text-gray-900 border-green-200/50 shadow-green-100/50`;
      case 'error':
        return `${baseStyles} bg-white/95 text-gray-900 border-red-200/50 shadow-red-100/50`;
      case 'warning':
        return `${baseStyles} bg-white/95 text-gray-900 border-amber-200/50 shadow-amber-100/50`;
      case 'info':
        return `${baseStyles} bg-white/95 text-gray-900 border-blue-200/50 shadow-blue-100/50`;
      default:
        return `${baseStyles} bg-white/95 text-gray-900 border-gray-200/50 shadow-gray-100/50`;
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return (
          <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gradient-to-br from-red-400 to-rose-500 rounded-lg flex items-center justify-center shadow-red-200/60">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-amber-200/60">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'info':
        return (
          <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-blue-200/60">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 mr-3 flex-shrink-0 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-gray-200/60">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <div className="text-gray-800 text-sm font-medium">{toast.message}</div>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 flex-shrink-0 w-6 h-6 rounded-full hover:bg-gray-100/80 transition-all duration-200 flex items-center justify-center group"
      >
        <svg className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm w-full">
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