import React from 'react';
import { motion } from 'framer-motion';

export interface AnimatedPlatformIconProps {
  themeType: 'newsroom' | 'live' | 'media';
  className?: string;
  isHovered?: boolean;
}

/**
 * Animated Platform Icon Suite
 * Implements high-fidelity, vector-animated icons for Newsroom (Search & Dispatch),
 * Live Broadcast (Transmission Tower & Radio Waves), and Media Hub (Rotating Reel & Studio Lens).
 * Resource Reference: Magnific / Flaticon Animated Search & Broadcast Suite (#19026536)
 */
export function AnimatedPlatformIcon({ themeType, className = '', isHovered = false }: AnimatedPlatformIconProps) {
  if (themeType === 'live') {
    return <AnimatedLiveTowerIcon className={className} isHovered={isHovered} />;
  }

  if (themeType === 'media') {
    return <AnimatedMediaStudioIcon className={className} isHovered={isHovered} />;
  }

  return <AnimatedNewsroomSearchIcon className={className} isHovered={isHovered} />;
}

/**
 * 1. Animated Newsroom & Search Wire Icon
 * Features diplomatic dispatch document, animated headline shimmer,
 * and an animated search magnifying glass (reflecting resource 19026536: search animated icon).
 */
export function AnimatedNewsroomSearchIcon({ className = '', isHovered = false }: { className?: string; isHovered?: boolean }) {
  return (
    <div className={`relative w-10 h-10 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Document Sheet Shadow / Back Fold */}
        <rect
          x="7"
          y="9"
          width="26"
          height="32"
          rx="3"
          className="fill-red-100/60 dark:fill-brand-900/30"
        />

        {/* Main Document Body */}
        <motion.rect
          x="9"
          y="7"
          width="26"
          height="33"
          rx="3"
          className="fill-white dark:fill-neutral-900 stroke-red-600 dark:stroke-red-500"
          strokeWidth="2"
          animate={{
            y: isHovered ? [7, 6, 7] : 7,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Red Header Bar */}
        <rect
          x="12"
          y="11"
          width="20"
          height="4.5"
          rx="1"
          className="fill-red-600 dark:fill-red-500"
        />

        {/* Text Line 1 */}
        <line
          x1="12"
          y1="19.5"
          x2="28"
          y2="19.5"
          className="stroke-slate-700 dark:stroke-neutral-300"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Text Line 2 */}
        <line
          x1="12"
          y1="24.5"
          x2="24"
          y2="24.5"
          className="stroke-slate-400 dark:stroke-neutral-500"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Text Line 3 */}
        <line
          x1="12"
          y1="29.5"
          x2="20"
          y2="29.5"
          className="stroke-slate-300 dark:stroke-neutral-600"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Red Press Seal Dot */}
        <circle cx="15" cy="34.5" r="2" className="fill-red-600" />
        <circle cx="21" cy="34.5" r="1.25" className="fill-slate-300 dark:fill-neutral-600" />

        {/* Animated Magnifying Search Loupe (Resource 19026536 query=search) */}
        <motion.g
          animate={{
            x: isHovered ? [0, 2, -1, 0] : [0, 1.5, 0],
            y: isHovered ? [0, -2, 1, 0] : [0, -1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Glass Glow Radial Ring */}
          <circle
            cx="31"
            cy="27"
            r="8.5"
            className="fill-red-50/80 dark:fill-red-950/40 stroke-red-600"
            strokeWidth="2.25"
          />

          {/* Internal Lens Light Reflection Arc */}
          <path
            d="M 27 24 A 5.5 5.5 0 0 1 33 24"
            className="stroke-white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Magnifier Center Discovery Focus Dot */}
          <motion.circle
            cx="31"
            cy="27"
            r="2"
            className="fill-red-600"
            animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Magnifier Handle */}
          <line
            x1="37"
            y1="33"
            x2="43"
            y2="39"
            className="stroke-red-600"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="37"
            y1="33"
            x2="40"
            y2="36"
            className="stroke-amber-400"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Top Active Wire Pulse Beacon */}
        <g>
          <circle cx="34" cy="9" r="3.5" className="fill-red-600/30 animate-ping" />
          <circle cx="34" cy="9" r="2.25" className="fill-red-600" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Animated Live Broadcast Tower Icon
 * Features vector transmission mast, blinking apex beacon,
 * and radiating concentric radio waves (#E60000 / Red-600).
 */
export function AnimatedLiveTowerIcon({ className = '', isHovered = false }: { className?: string; isHovered?: boolean }) {
  return (
    <div className={`relative w-10 h-10 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Radiating Radio Wave 1 (Inner) */}
        <motion.path
          d="M 18 19 A 8.5 8.5 0 0 1 30 19"
          className="stroke-red-600 dark:stroke-red-500"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: isHovered ? [0.95, 1.05, 0.95] : [1, 1, 1],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Radiating Radio Wave 2 (Middle) */}
        <motion.path
          d="M 14 15 A 14 14 0 0 1 34 15"
          className="stroke-red-600 dark:stroke-red-500"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{
            opacity: [0.15, 0.85, 0.15],
            scale: isHovered ? [0.93, 1.07, 0.93] : [1, 1, 1],
          }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.25, ease: 'easeInOut' }}
        />

        {/* Radiating Radio Wave 3 (Outer) */}
        <motion.path
          d="M 10 11 A 19.5 19.5 0 0 1 38 11"
          className="stroke-red-600/80 dark:stroke-red-400/80"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{
            opacity: [0, 0.7, 0],
            scale: isHovered ? [0.9, 1.1, 0.9] : [1, 1, 1],
          }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
        />

        {/* Pulsing Live Beacon Glow at Tower Apex */}
        <motion.circle
          cx="24"
          cy="20"
          r="4.5"
          className="fill-red-500/40"
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <circle cx="24" cy="20" r="2.75" className="fill-red-600 dark:fill-red-500 stroke-white stroke-1" />

        {/* Antenna Mast Pin */}
        <line
          x1="24"
          y1="22"
          x2="24"
          y2="26"
          className="stroke-slate-900 dark:stroke-white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Transmission Tower Legs */}
        <path
          d="M 22 26 L 15 42 M 26 26 L 33 42"
          className="stroke-slate-900 dark:stroke-white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Upper Horizontal Crossbar */}
        <line
          x1="20"
          y1="31"
          x2="28"
          y2="31"
          className="stroke-slate-900 dark:stroke-white"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Lower Horizontal Crossbar */}
        <line
          x1="18"
          y1="36"
          x2="30"
          y2="36"
          className="stroke-slate-900 dark:stroke-white"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Inner X-Bracing */}
        <line
          x1="18.5"
          y1="31"
          x2="29.5"
          y2="36"
          className="stroke-red-600"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <line
          x1="29.5"
          y1="31"
          x2="18.5"
          y2="36"
          className="stroke-red-600"
          strokeWidth="1.75"
          strokeLinecap="round"
        />

        {/* Ground Platform Base Line */}
        <line
          x1="12"
          y1="42"
          x2="36"
          y2="42"
          className="stroke-slate-800 dark:stroke-neutral-300"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * 3. Animated Multimedia Studio & Film Reel Icon
 * Features dual spinning cinematic film spools, camera body,
 * and a glowing projector beam light.
 */
export function AnimatedMediaStudioIcon({ className = '', isHovered = false }: { className?: string; isHovered?: boolean }) {
  return (
    <div className={`relative w-10 h-10 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-sm"
      >
        {/* Projector Light Beam Fan (expands on hover) */}
        <motion.path
          d="M 35 24 L 46 16 L 46 32 Z"
          className="fill-red-600/15 dark:fill-red-500/20"
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main Camera Body */}
        <rect
          x="10"
          y="18"
          width="25"
          height="19"
          rx="3"
          className="fill-white dark:fill-neutral-900 stroke-slate-900 dark:stroke-white"
          strokeWidth="2.2"
        />

        {/* Camera Lens Cone */}
        <path
          d="M 35 23 L 42 18.5 L 42 29.5 L 35 25 Z"
          className="fill-red-600 stroke-red-600"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Center Play Triangle Symbol */}
        <motion.polygon
          points="20,23.5 28,27.5 20,31.5"
          className="fill-red-600"
          animate={{
            scale: isHovered ? [1, 1.15, 1] : [1, 1.05, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dual Film Spools on Top */}
        {/* Left Reel Spool (Spinning) */}
        <g transform="translate(17, 12)">
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            className="fill-red-50 dark:fill-brand-950 stroke-red-600"
            strokeWidth="2"
            animate={{ rotate: isHovered ? 360 : 360 }}
            transition={{
              duration: isHovered ? 3 : 7,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <circle cx="0" cy="0" r="2" className="fill-red-600" />
          <line x1="-4" y1="0" x2="4" y2="0" className="stroke-red-600/80" strokeWidth="1.2" />
          <line x1="0" y1="-4" x2="0" y2="4" className="stroke-red-600/80" strokeWidth="1.2" />
        </g>

        {/* Right Reel Spool (Spinning) */}
        <g transform="translate(28, 12)">
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            className="fill-red-50 dark:fill-brand-950 stroke-red-600"
            strokeWidth="2"
            animate={{ rotate: isHovered ? 360 : 360 }}
            transition={{
              duration: isHovered ? 3 : 7,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <circle cx="0" cy="0" r="2" className="fill-red-600" />
          <line x1="-4" y1="0" x2="4" y2="0" className="stroke-red-600/80" strokeWidth="1.2" />
          <line x1="0" y1="-4" x2="0" y2="4" className="stroke-red-600/80" strokeWidth="1.2" />
        </g>

        {/* Red REC Indicator Dot */}
        <motion.circle
          cx="14"
          cy="22"
          r="1.75"
          className="fill-red-600"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Audio / Level Wave bars under the camera */}
        <line x1="13" y1="33" x2="16" y2="33" className="stroke-slate-400 dark:stroke-neutral-500" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="33" x2="22" y2="33" className="stroke-red-600" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="33" x2="31" y2="33" className="stroke-slate-400 dark:stroke-neutral-500" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default AnimatedPlatformIcon;
