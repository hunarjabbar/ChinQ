import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
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
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-xs sm:text-sm',
    lg: 'px-6 py-3.5 text-sm sm:text-base',
  }[size];

  const variantClasses = {
    primary:
      'bg-brand-800 hover:bg-brand-900 text-white font-black uppercase tracking-wider border border-transparent shadow-sm hover:shadow-md active:scale-98',
    outline:
      'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-bold uppercase tracking-wider border border-neutral-300 dark:border-neutral-700 active:scale-98',
    ghost:
      'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 font-bold active:scale-98',
  }[variant];

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-160 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-800 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:-translate-y-0.5';

  const combinedClass = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClass} aria-disabled={disabled}>
        {children}
        {icon && <span className="cta-arrow shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClass} disabled={disabled} {...props}>
      {children}
      {icon && <span className="cta-arrow shrink-0">{icon}</span>}
    </button>
  );
}

export default Button;
