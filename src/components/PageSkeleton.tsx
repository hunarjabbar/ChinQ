import React from 'react';

interface PageSkeletonProps {
  variant?: 'summit' | 'institute' | 'visacentre' | 'default';
}

export function PageSkeleton({ variant = 'default' }: PageSkeletonProps) {
  return (
    <div className="min-h-[75vh] w-full bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-8 flex flex-col gap-6">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-64 sm:h-80 bg-neutral-200 dark:bg-neutral-800 rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 sm:p-10 shadow-sm animate-shimmer">
        <div className="w-3/4 h-8 bg-neutral-300 dark:bg-neutral-700 rounded-md mb-4 animate-shimmer opacity-85" />
        <div className="w-1/2 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-md mb-2 animate-shimmer opacity-85" />
        <div className="w-1/3 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-md animate-shimmer opacity-85" />
      </div>

      {/* Metrics / Cards Row Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-xl shadow-sm flex flex-col gap-3">
            <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-shimmer" />
            <div className="w-2/3 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-shimmer" />
            <div className="w-full h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-shimmer opacity-75" />
          </div>
        ))}
      </div>

      {/* Main Content Sections Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="w-1/3 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2 animate-shimmer" />
          <div className="w-full h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-shimmer opacity-75" />
          <div className="w-full h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-shimmer opacity-75" />
          <div className="w-4/5 h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-shimmer opacity-75" />
          <div className="w-2/3 h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md animate-shimmer opacity-75" />
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="w-1/2 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2 animate-shimmer" />
          <div className="w-full h-20 bg-neutral-100 dark:bg-neutral-800 rounded-xl animate-shimmer opacity-75" />
          <div className="w-full h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg mt-auto animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
