import React from 'react';

// Base Skeleton Component
export const Skeleton = ({ className = "", width, height, circle = false }) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";
  const shapeClasses = circle ? "rounded-full" : "rounded";
  const sizeClasses = width && height ? "" : "w-full h-4";
  
  return (
    <div 
      className={`${baseClasses} ${shapeClasses} ${sizeClasses} ${className}`}
      style={{ 
        width: width, 
        height: height,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite'
      }}
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6 animate-pulse">
    <Skeleton className="aspect-square mb-4 rounded-lg" />
    <Skeleton className="h-6 mb-2" />
    <Skeleton className="h-4 w-3/4 mb-3" />
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
  </div>
);

// Product Detail Skeleton
export const ProductDetailSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
    {/* Image Gallery Skeleton */}
    <div className="space-y-4">
      <Skeleton className="aspect-square rounded-xl" />
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>

    {/* Product Info Skeleton */}
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width="20px" height="20px" />
            ))}
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-16 mb-3" />
        <div className="flex space-x-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-20 rounded-lg" />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-20 mb-3" />
        <div className="flex items-center space-x-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-12 rounded-lg" />
      <Skeleton className="h-4 w-48" />
    </div>
  </div>
);

// Review Skeleton
export const ReviewSkeleton = () => (
  <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
    <div className="flex items-start space-x-4">
      <Skeleton width="48px" height="48px" circle />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} width="16px" height="16px" />
            ))}
          </div>
        </div>
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-3 w-20 mt-3" />
      </div>
    </div>
  </div>
);

// Page Loading Skeleton
export const PageSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Header Skeleton */}
    <div className="bg-white border-b animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-12" />
          <span className="mx-2 text-gray-400">/</span>
          <Skeleton className="h-4 w-16" />
          <span className="mx-2 text-gray-400">/</span>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="max-w-7xl mx-auto px-6 py-12">
      <ProductDetailSkeleton />
    </div>
  </div>
);

// Navigation Skeleton
export const NavigationSkeleton = () => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-gray-600/80 animate-pulse">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <div className="hidden md:flex items-center space-x-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;