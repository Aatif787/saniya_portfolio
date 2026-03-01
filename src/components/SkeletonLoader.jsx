import React from 'react';

const SkeletonLoader = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200/20 rounded-xl ${className}`}></div>
);

export const SectionSkeleton = () => (
  <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <SkeletonLoader className="h-12 w-1/3 mx-auto mb-8" />
    <SkeletonLoader className="h-4 w-1/2 mx-auto mb-16" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-4">
          <SkeletonLoader className="aspect-video w-full" />
          <SkeletonLoader className="h-6 w-3/4" />
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLoader;
