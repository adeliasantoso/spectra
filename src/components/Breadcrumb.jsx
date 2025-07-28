import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = ({ customPath = null, className = "" }) => {
  const location = useLocation();
  
  // Custom breadcrumb data for different pages
  const breadcrumbMap = {
    '/': [{ label: 'Home', path: '/' }],
    '/shop': [
      { label: 'Home', path: '/' },
      { label: 'Shop', path: '/shop' }
    ],
    '/about': [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' }
    ],
    '/contact': [
      { label: 'Home', path: '/' },
      { label: 'Contact', path: '/contact' }
    ],
    '/cart': [
      { label: 'Home', path: '/' },
      { label: 'Cart', path: '/cart' }
    ]
  };

  // Handle product detail pages
  if (location.pathname.startsWith('/product/')) {
    breadcrumbMap[location.pathname] = [
      { label: 'Home', path: '/' },
      { label: 'Shop', path: '/shop' },
      { label: 'Spectra 1.0', path: location.pathname }
    ];
  }
  

  const breadcrumbs = customPath || breadcrumbMap[location.pathname] || [
    { label: 'Home', path: '/' }
  ];

  if (breadcrumbs.length <= 1) return null;

  return (
    <div className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <svg 
                  className="w-4 h-4 text-gray-400 mx-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Current page - not clickable
                <span className="text-gray-900 font-medium flex items-center">
                  {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                  {crumb.label}
                </span>
              ) : (
                // Clickable breadcrumb
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 flex items-center hover:underline"
                >
                  {crumb.icon && <span className="mr-2">{crumb.icon}</span>}
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;