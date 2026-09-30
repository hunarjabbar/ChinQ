import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'hero' | 'grid' | 'full';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card' }) => {
  if (type === 'hero') {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-6 sm:p-10 animate-pulse space-y-4">
        <div className="h-4 bg-neutral-800 rounded w-24"></div>
        <div className="h-8 bg-neutral-700 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-800 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
        <div className="pt-4 flex gap-3">
          <div className="h-10 bg-[var(--color-brand-800)]/40 rounded w-36"></div>
          <div className="h-10 bg-neutral-800 rounded w-28"></div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-4 animate-pulse space-y-3">
        <div className="h-6 bg-neutral-800 rounded w-1/4 mb-4"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 bg-neutral-800/60 rounded flex items-center justify-between px-4">
            <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
            <div className="h-4 bg-neutral-700 rounded w-1/5"></div>
            <div className="h-4 bg-neutral-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-3">
            <div className="h-40 bg-neutral-800 rounded-md"></div>
            <div className="h-4 bg-neutral-700 rounded w-20"></div>
            <div className="h-5 bg-neutral-700 rounded w-4/5"></div>
            <div className="h-3 bg-neutral-800 rounded w-full"></div>
            <div className="h-3 bg-neutral-800 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 animate-pulse space-y-3">
      <div className="h-4 bg-neutral-700 rounded w-1/4"></div>
      <div className="h-5 bg-neutral-700 rounded w-3/4"></div>
      <div className="h-3 bg-neutral-800 rounded w-full"></div>
      <div className="h-3 bg-neutral-800 rounded w-2/3"></div>
      <div className="pt-2 flex justify-between items-center">
        <div className="h-3 bg-neutral-800 rounded w-20"></div>
        <div className="h-6 bg-neutral-800 rounded w-24"></div>
      </div>
    </div>
  );
};
