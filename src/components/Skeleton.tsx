import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle' | 'card';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = 'rect',
  width,
  height,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const customStyle: React.CSSProperties = {
    ...style,
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  if (variant === 'circle') {
    return (
      <div
        className={`rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`}
        style={customStyle}
        {...props}
      />
    );
  }

  if (variant === 'text') {
    return (
      <div
        className={`h-4 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`}
        style={customStyle}
        {...props}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 animate-pulse ${className}`}
        style={customStyle}
        {...props}
      >
        <div className="aspect-video w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-1/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-6 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-4 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`}
      style={customStyle}
      {...props}
    />
  );
}

export default Skeleton;
