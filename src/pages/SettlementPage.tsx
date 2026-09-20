import { useParams, Link } from 'react-router-dom';
import { Locale } from '../types';
import { PaymentAndSourcingSection } from '../components/PaymentAndSourcingSection';
import { Home, ChevronRight, ChevronLeft, ShieldCheck, Coins } from 'lucide-react';

export function SettlementPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const validLangs: Locale[] = ['en', 'ar', 'zh', 'ckb'];
  const safeLang = (validLangs.includes(lang as Locale) ? lang : 'en') as Locale;
  const isRtl = safeLang === 'ar' || safeLang === 'ckb';

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
        <Link 
          to={`/${safeLang}`} 
          className="inline-flex items-center gap-1 hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
        >
          <Home size={14} />
          <span>{safeLang === 'ar' ? 'الرئيسية' : safeLang === 'zh' ? '首页' : safeLang === 'ckb' ? 'سەرەکی' : 'Home'}</span>
        </Link>
        {isRtl ? <ChevronLeft size={13} className="text-neutral-400" /> : <ChevronRight size={13} className="text-neutral-400" />}
        <span className="inline-flex items-center gap-1.5 font-bold text-brand-900 dark:text-white">
          <Coins size={14} className="text-brand-800 dark:text-brand-400" />
          <span>
            {safeLang === 'ar' 
              ? 'بوابة التسويات النقدية والتوريد الثنائي' 
              : safeLang === 'zh' 
              ? '中伊双边清算与源头集采门户' 
              : safeLang === 'ckb' 
              ? 'دەروازەی یەکلاییکردنەوەی دارایی و دابینکردن' 
              : 'Bilateral Settlement & Sourcing Portal'}
          </span>
        </span>
      </nav>

      {/* Reused Canonical Component */}
      <PaymentAndSourcingSection lang={safeLang} />
    </div>
  );
}

export default SettlementPage;
