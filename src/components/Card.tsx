import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'article';
  // Article-specific props
  imageUrl?: string | null;
  category?: string;
  categorySlug?: string;
  title?: string;
  excerpt?: string;
  author?: {
    name: string;
    avatar?: string;
    title?: string;
  };
  publishDate?: string;
  readTime?: string;
  href?: string;
  breaking?: boolean;
  featured?: boolean;
  as?: 'div' | 'article' | 'section';
  children?: React.ReactNode;
}

export function Card({
  variant = 'default',
  imageUrl,
  category,
  categorySlug,
  title,
  excerpt,
  author,
  publishDate,
  readTime,
  href,
  breaking,
  featured,
  as: Component = 'div',
  className = '',
  children,
  ...props
}: CardProps) {
  if (variant === 'article' && href) {
    return (
      <Link
        to={href}
        className={`group flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-500 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-180 focus-visible:outline-2 focus-visible:outline-brand-800 focus-visible:outline-offset-2 ${className}`}
      >
        {imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <img
              src={imageUrl}
              alt={title || 'Article thumbnail'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {category && (
              <div className="absolute top-3 inset-inline-start-3 bg-brand-800 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                {category}
              </div>
            )}
            {breaking && (
              <div className="absolute top-3 inset-inline-end-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1.5 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>Breaking</span>
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-[11px] font-bold text-neutral-500 dark:text-neutral-400">
              {publishDate && (
                <span className="flex items-center gap-1">
                  <Calendar size={13} className="text-brand-800 dark:text-brand-400" />
                  <span>{publishDate}</span>
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-1">
                  <Clock size={13} className="text-brand-800 dark:text-brand-400" />
                  <span>{readTime}</span>
                </span>
              )}
            </div>
            {title && (
              <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                {title}
              </h3>
            )}
            {excerpt && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
            {author ? (
              <div className="flex items-center gap-2">
                {author.avatar ? (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] font-black flex items-center justify-center text-neutral-700 dark:text-neutral-200">
                    {author.name.charAt(0)}
                  </span>
                )}
                <span className="text-[11px] font-semibold">{author.name}</span>
              </div>
            ) : <span />}

            <span className="text-brand-800 dark:text-brand-400 font-black text-xs uppercase flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <ArrowRight size={14} className="rtl:rotate-180" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Component
      className={`bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs p-6 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
