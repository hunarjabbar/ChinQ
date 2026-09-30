import React from 'react';
import { cn } from '../../lib/utils';

export type FlaticonVariant = 'regular' | 'bold' | 'solid' | 'thin' | 'brands';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

const sizeMap: Record<string, string> = {
  xs: 'text-[12px] leading-none',
  sm: 'text-[14px] leading-none',
  md: 'text-[16px] leading-none',
  lg: 'text-[20px] leading-none',
  xl: 'text-[24px] leading-none',
  '2xl': 'text-[32px] leading-none',
};

const prefixMap: Record<FlaticonVariant, string> = {
  regular: 'fi-rr',
  bold: 'fi-br',
  solid: 'fi-sr',
  thin: 'fi-tr',
  brands: 'fi-brands',
};

export interface FlaticonIconProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  variant?: FlaticonVariant;
  size?: IconSize;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

/**
 * Universal Flaticon UIcons Component
 * Uses official Flaticon font classes (fi fi-rr-*, fi-sr-*, fi-br-*, fi-brands-*)
 */
export const FlaticonIcon: React.FC<FlaticonIconProps> = ({
  name,
  variant = 'regular',
  size = 'md',
  className,
  ariaLabel,
  ariaHidden = true,
  style,
  ...rest
}) => {
  const prefix = prefixMap[variant] || 'fi-rr';
  const cleanName = name.replace(/^(fi|fi-[a-z]{2}|fi-brands)-/, '');
  const iconClass = `${prefix}-${cleanName}`;

  const isNumericSize = typeof size === 'number';
  const sizeClass = isNumericSize ? '' : sizeMap[size] || sizeMap.md;
  const inlineStyle = isNumericSize ? { fontSize: `${size}px`, lineHeight: 1, ...style } : style;

  return (
    <i
      className={cn(
        'fi',
        iconClass,
        'inline-flex items-center justify-center align-middle transition-colors select-none shrink-0',
        sizeClass,
        className
      )}
      style={inlineStyle}
      aria-hidden={ariaHidden ? 'true' : undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    />
  );
};

export default FlaticonIcon;
