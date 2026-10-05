import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'ghost' 
  | 'outline' 
  | 'dark' 
  | 'destructive' 
  | 'icon-only';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  onAsyncClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => Promise<void> | void;
}

interface RippleData {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  target,
  rel,
  className = '',
  children,
  icon,
  disabled,
  loading: externalLoading,
  success: externalSuccess,
  error: externalError,
  onClick,
  onAsyncClick,
  'aria-label': ariaLabel,
  ...props
}, forwardedRef) {
  const innerRef = useRef<HTMLButtonElement>(null);
  const buttonRef = (forwardedRef as React.RefObject<HTMLButtonElement>) || innerRef;

  const [internalLoading, setInternalLoading] = useState(false);
  const [internalSuccess, setInternalSuccess] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const [isPressed, setIsPressed] = useState(false);

  const isLoading = externalLoading ?? internalLoading;
  const isSuccess = externalSuccess ?? internalSuccess;
  const isError = externalError ?? internalError;

  // Auto-reset success state after 1.2s
  useEffect(() => {
    if (isSuccess && !externalSuccess) {
      const timer = setTimeout(() => {
        setInternalSuccess(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, externalSuccess]);

  // Auto-reset error state after 400ms
  useEffect(() => {
    if (isError && !externalError) {
      const timer = setTimeout(() => {
        setInternalError(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isError, externalError]);

  // Clean up ripples after 600ms
  const createRipple = (clientX?: number, clientY?: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 2;
    
    let x = rect.width / 2;
    let y = rect.height / 2;

    if (clientX !== undefined && clientY !== undefined) {
      x = clientX - rect.left;
      y = clientY - rect.top;
    }

    const newRipple: RippleData = {
      id: Date.now() + Math.random(),
      x: x - rippleSize / 2,
      y: y - rippleSize / 2,
      size: rippleSize,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) {
      e.preventDefault();
      return;
    }

    createRipple(e.clientX, e.clientY);

    if (onAsyncClick) {
      try {
        setInternalLoading(true);
        setInternalError(false);
        await onAsyncClick(e);
        setInternalLoading(false);
        setInternalSuccess(true);
      } catch (err) {
        setInternalLoading(false);
        setInternalError(true);
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      createRipple();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      setIsPressed(false);
    }
  };

  // Base sizing
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs min-h-[36px] sm:min-h-[38px]',
    md: 'px-5 py-2.5 text-xs sm:text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm sm:text-base min-h-[48px]',
  };

  // Canonical CISE Variant styling
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] active:bg-[var(--accent-primary-active)] text-[var(--text-on-accent)] border border-[var(--accent-primary)] shadow-sm hover:shadow-[var(--shadow-blood-glow)] focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
    secondary:
      'bg-transparent hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)] text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] active:text-[var(--accent-primary-active)] border border-[var(--accent-primary)] hover:border-[var(--accent-primary-hover)] active:border-[var(--accent-primary-active)] focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
    outline:
      'bg-transparent hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)] text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] active:text-[var(--accent-primary-active)] border border-[var(--accent-primary)] hover:border-[var(--accent-primary-hover)] active:border-[var(--accent-primary-active)] focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
    ghost:
      'bg-transparent hover:bg-[var(--accent-soft)] active:bg-[var(--accent-soft)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] active:text-[var(--accent-primary-active)] border border-transparent focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
    dark:
      'bg-[var(--surface-dark)] hover:bg-[var(--surface-dark-hover)] active:bg-[var(--surface-dark-active)] text-[var(--text-on-dark)] border border-[var(--surface-dark)] shadow-sm hover:shadow-[var(--shadow-chocolate-glow)] focus-visible:ring-3 focus-visible:ring-[rgba(79,9,5,0.45)]',
    destructive:
      'bg-[var(--color-error)] hover:bg-brand-800 active:bg-brand-900 text-[var(--text-on-accent)] border border-[var(--color-error)] shadow-sm focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
    'icon-only':
      'w-11 h-11 sm:w-10 sm:h-10 p-0 flex items-center justify-center bg-transparent hover:bg-[var(--accent-soft)] text-[var(--text-primary)] hover:text-[var(--accent-primary)] border border-[var(--color-border)] hover:border-[var(--accent-primary)] rounded-xl focus-visible:ring-3 focus-visible:ring-[rgba(200,21,14,0.22)]',
  };

  const isDarkOrPrimary = variant === 'primary' || variant === 'dark' || variant === 'destructive';
  const rippleBg = isDarkOrPrimary ? 'var(--ripple-blood)' : 'var(--ripple-chocolate)';

  const combinedClass = [
    'relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-wide select-none cursor-pointer',
    'transition-all duration-140 ease-out focus:outline-none',
    // Press feedback
    'active:scale-[0.98] active:translate-y-[1px]',
    isPressed ? 'scale-[0.98] translate-y-[1px]' : '',
    // Hover transform
    !disabled && !isLoading && !isSuccess && !isError ? 'hover:-translate-y-[1px]' : '',
    // Variant & Size
    variant === 'icon-only' ? variantClasses['icon-only'] : `${sizeClasses[size]} ${variantClasses[variant]}`,
    // States
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none transform-none shadow-none' : '',
    isLoading ? 'cursor-wait pointer-events-none' : '',
    isSuccess ? 'bg-[var(--color-success)] border-[var(--color-success)] text-white shadow-none' : '',
    isError ? 'bg-[var(--color-error)] border-[var(--color-error)] text-white animate-[buttonShake_400ms_var(--ease-out)]' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {/* Ripple elements */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="cise-ripple-span"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            backgroundColor: rippleBg,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Loading state with inline-start spinner */}
      {isLoading && (
        <Loader2
          size={16}
          className="animate-[buttonSpinner_1s_linear_infinite] shrink-0 inline-start"
          aria-hidden="true"
        />
      )}

      {/* Success checkmark state */}
      {isSuccess && (
        <Check size={18} className="shrink-0 stroke-[2.5]" aria-hidden="true" />
      )}

      {/* Main children or success text */}
      <span
        className={`flex items-center gap-2 transition-opacity duration-140 ${
          isLoading ? 'opacity-85' : 'opacity-100'
        }`}
      >
        {isSuccess ? (children || 'Success') : children}
      </span>

      {/* Optional arrow or icon */}
      {!isLoading && !isSuccess && icon && (
        <span className="cta-arrow shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClass}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        onClick={(e) => {
          createRipple(e.clientX, e.clientY);
          if (onAsyncClick) {
            onAsyncClick(e);
          }
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={props.type || 'button'}
      className={combinedClass}
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-label={ariaLabel}
      aria-live="polite"
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
