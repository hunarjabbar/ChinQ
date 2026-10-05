import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Minimal, High-Quality Editorial Newsroom Icon (Static SVG, not motion)
 * Perfectly matches selectors:
 * - rect:nth-of-type(1)
 * - path:nth-of-type(2)
 */
export function MinimalNewsroomIcon({ className = 'w-6 h-6', size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      {/* rect 1: Newspaper Card Surface */}
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        className="fill-red-50/60 dark:fill-brand-950/30"
      />
      {/* path 1: Masthead top headline bar */}
      <path
        d="M 6.5 8 L 17.5 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* path 2: First article line (Selected by CSS Selector 7!) */}
      <path
        d="M 6.5 12 L 13 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* path 3: Second article line */}
      <path
        d="M 6.5 15.5 L 11 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* rect 2: Photo stamp block */}
      <rect
        x="14.5"
        y="11"
        width="3"
        height="4.5"
        rx="0.75"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Minimal, High-Quality Live Broadcast Icon (Static SVG via <img>, not motion)
 * Perfectly matches selector:
 * - img:nth-of-type(1)
 */
export function MinimalLiveBroadcastImage({
  className = 'w-6 h-6',
  alt = 'Live Broadcast Transmission',
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src="/icons/minimal-broadcast-live.svg"
      alt={alt}
      className={`object-contain transition-transform duration-300 group-hover:scale-110 ${className}`}
      loading="eager"
    />
  );
}

/**
 * Minimal, High-Quality Media & Cinema Studio Icon (Static SVG, not motion)
 * Perfectly matches selector:
 * - svg:nth-of-type(1) > path:nth-of-type(1)
 */
export function MinimalMediaFilmIcon({ className = 'w-6 h-6', size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      {/* path 1: Camera body enclosure (Selected by CSS Selector 1!) */}
      <path
        d="M 3 6 C 3 4.895 3.895 4 5 4 L 14 4 C 15.105 4 16 4.895 16 6 L 16 18 C 16 19.105 15.105 20 14 20 L 5 20 C 3.895 20 3 19.105 3 18 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        className="fill-red-50/60 dark:fill-brand-950/30"
      />
      {/* path 2: Lens cone */}
      <path
        d="M 16 9.5 L 21 7 V 17 L 16 14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Aperture iris */}
      <circle cx="8.5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" fill="white" />
      <circle cx="12.5" cy="12" r="0.8" fill="currentColor" />
      {/* Top spool pins */}
      <line x1="6.5" y1="4" x2="6.5" y2="2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12.5" y1="4" x2="12.5" y2="2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
