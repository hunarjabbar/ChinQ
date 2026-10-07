import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Locale } from '../types';

interface Props {
  lang: Locale;
  customSegments?: Array<{ label: string; href?: string }>;
  className?: string;
}

export function UnifiedBreadcrumb({ lang, customSegments, className = '' }: Props) {
  const location = useLocation();
  const isRtl = lang === 'ar' || lang === 'ckb';

  // Compute segments from pathname if not custom
  let segments = customSegments;
  if (!segments) {
    const parts = location.pathname.split('/').filter(Boolean);
    // Remove language code prefix
    const pathParts = (parts[0] === 'en' || parts[0] === 'ar' || parts[0] === 'zh' || parts[0] === 'ckb')
      ? parts.slice(1)
      : parts;

    let accumulated = `/${lang}`;
    segments = pathParts.map((part) => {
      accumulated += `/${part}`;
      // Clean readable label
      const cleanLabel = part
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      return {
        label: cleanLabel,
        href: accumulated
      };
    });
  }

  if (segments.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`w-full py-2.5 px-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        <li>
          <Link 
            to={`/${lang}`}
            className="flex items-center gap-1 hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
            title="Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {segments.map((seg, idx) => {
          const isLast = idx === segments!.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 rtl:rotate-180 shrink-0" aria-hidden="true" />
              {isLast || !seg.href ? (
                <span className="text-neutral-900 dark:text-neutral-100 font-bold truncate max-w-[200px]" aria-current="page">
                  {seg.label}
                </span>
              ) : (
                <Link 
                  to={seg.href} 
                  className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors truncate max-w-[150px]"
                >
                  {seg.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
