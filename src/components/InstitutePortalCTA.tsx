import { Link, useNavigate } from 'react-router-dom';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

interface InstitutePortalCTAProps {
  lang: Locale;
  variant?: 'button' | 'card' | 'navItem';
  className?: string;
}

export function InstitutePortalCTA({ lang, variant = 'button', className }: InstitutePortalCTAProps) {
  const { t } = useI18n(lang);
  const navigate = useNavigate();
  const href = `/${lang}/institute`;

  const handleNavigation = (e: React.MouseEvent) => {
    // Preserve locale in cookie and localStorage for cross-portal consistency
    try {
      document.cookie = `ica_locale=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('ica_locale', lang);
    } catch (err) {
      console.warn('Failed to persist locale:', err);
    }

    // Ping check (simulated since it's same app, but following user spec)
    const isLinkBroken = false; 
    if (isLinkBroken) {
      e.preventDefault();
      toast.error(t('toastInstituteUnavailable'));
      return;
    }
  };

  if (variant === 'navItem') {
    return (
      <Link
        to={href}
        onClick={handleNavigation}
        className={cn(
          "nav-link text-[11px] font-black uppercase tracking-widest px-3 py-2 rounded-lg transition-all duration-300",
          "text-neutral-500 hover:text-brand-800 dark:text-neutral-400 dark:hover:text-brand-400 hover:bg-brand-800/5",
          className
        )}
        aria-label={t('instituteCtaAriaLabel')}
      >
        {t('instituteCtaNavLabel')}
      </Link>
    );
  }

  if (variant === 'card') {
    return (
      <Link
        to={href}
        onClick={handleNavigation}
        className={cn(
          "group block relative overflow-hidden bg-[#0F172A] text-[#F8FAFC] p-8 sm:p-12 rounded-2xl border-l-[6px] border-[#D97706] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-800/30",
          className
        )}
        aria-label={t('instituteCtaAriaLabel')}
      >
        <div className="relative z-10 flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D97706] mb-4 block">
            {t('instituteCtaEyebrow')}
          </span>
          <h3 className="text-2xl sm:text-4xl font-serif font-black mb-4 tracking-tight leading-tight max-w-2xl text-white">
            {t('instituteCtaTitle')}
          </h3>
          <p className="text-sm text-neutral-400 font-medium leading-relaxed max-w-xl mb-10">
            {t('instituteCtaSubtitle')}
          </p>
          <div className="flex items-center gap-2 text-[#0284C7] font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all group-hover:text-[#38bdf8]">
            {t('instituteCtaCta')} 
            <span className="text-xl leading-none transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-brand-800/20 transition-all duration-1000"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#D97706]/5 rounded-full blur-2xl"></div>
      </Link>
    );
  }

  return (
    <Link
      to={href}
      onClick={handleNavigation}
      className={cn(
        "inline-flex items-center gap-3 px-6 py-3.5 bg-[#0F172A] text-[#F8FAFC] rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 hover:bg-brand-800 shadow-lg shadow-brand-800/20 hover:shadow-brand-800/40 active:scale-95 group",
        className
      )}
      aria-label={t('instituteCtaAriaLabel')}
    >
      {t('instituteCtaCta')}
      <span className="text-lg leading-none transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
    </Link>
  );
}
