import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface DisclosureProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  variant?: 'inline' | 'card' | 'block';
  className?: string;
}

export function Disclosure({
  label,
  children,
  defaultOpen = false,
  variant = 'block',
  className
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const triggerId = `disclosure-trigger-${id}`;
  const panelId = `disclosure-panel-${id}`;

  return (
    <div className={cn(
      "w-full overflow-hidden",
      variant === 'card' && "bg-white border border-gray-200 rounded-xl",
      className
    )}>
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between text-left transition-all duration-200",
          variant === 'block' && "py-4 border-b border-gray-100 hover:bg-gray-50/50 px-2",
          variant === 'card' && "p-5 hover:bg-gray-50/50",
          variant === 'inline' && "py-2 text-sm font-bold text-[brand-800] hover:text-[brand-800]"
        )}
      >
        <span className={cn(
          "font-black tracking-tight",
          variant === 'inline' ? "text-sm" : "text-base text-black"
        )}>
          {label}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-[brand-800] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className={cn(
              "text-sm leading-relaxed text-[#4B5563] space-y-4",
              variant === 'block' && "py-5 px-2",
              variant === 'card' && "p-5 pt-0",
              variant === 'inline' && "py-2 px-1"
            )}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
