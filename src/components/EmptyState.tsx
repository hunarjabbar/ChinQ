import React from 'react';
import { Newspaper } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-16 px-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
        {icon || <Newspaper size={32} />}
      </div>
      <div className="max-w-md space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {(actionLabel && (onAction || actionHref)) && (
        <div className="pt-2">
          {actionHref ? (
            <Button as="a" href={actionHref} variant="outline" size="sm">
              {actionLabel}
            </Button>
          ) : (
            <Button onClick={onAction} variant="outline" size="sm">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
