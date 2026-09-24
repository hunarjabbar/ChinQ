import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'breaking' | 'category' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  }[size];

  const variantClasses = {
    default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700',
    breaking: 'bg-red-600 text-white font-black tracking-wider uppercase border border-red-700 shadow-sm animate-pulse',
    category: 'bg-brand-800 text-white font-bold tracking-wider uppercase border border-brand-700 shadow-xs',
    outline: 'bg-transparent text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-bold transition-colors ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {variant === 'breaking' && <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-ping" />}
      {children}
    </span>
  );
}

export default Badge;
