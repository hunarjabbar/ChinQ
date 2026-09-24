import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 ${className}`}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="inline-flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isLast ? 'text-brand-800 dark:text-brand-400 font-black' : ''}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight
                size={14}
                className="text-neutral-300 dark:text-neutral-600 rtl:rotate-180 shrink-0"
              />
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
