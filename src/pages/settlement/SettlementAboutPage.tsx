import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Landmark, CheckCircle2, ArrowRightLeft, Layers, Users, Zap } from 'lucide-react';
import { Locale } from '../../types';
import { SettlementLayout } from '../../components/settlement/SettlementLayout';
import { ComplianceBadges } from '../../components/settlement/ComplianceBadges';
import { getSettlementTranslation } from '../../locales/settlementTranslations';

export function SettlementAboutPage() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const lang = (paramLang === 'ck' ? 'ckb' : paramLang || 'en') as Locale;
  const t = (key: string) => getSettlementTranslation(lang, key);
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  return (
    <SettlementLayout lang={lang}>
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-gray-200 pb-8">
          <div className="pay-badge">
            Bilateral Clearing Model
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            {isAr ? 'عن بوابة تسهيل التسوية المباشرة' : isZh ? '关于本币直接结算促进中心' : isCkb ? 'دەربارەی دەروازەی پاکتاوی ڕاستەوخۆ' : 'About Payment Settlement Facilitation'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {isAr 
              ? 'تأسس مكتب تسهيل التسوية المالية التابع للوكالة العراقية الصينية لتجاوز التحديات الهيكلية في التجارة البينية، وتوفير قناة مقاصة سيادية مباشرة بين الدينار العراقي واليوان الصيني.'
              : isZh 
              ? '伊拉克-中国通讯社（ICA）支付结算促进中心致力于消除中伊双边经贸往来中的结算堵点，建立基于中伊本币直接清算的跨境金融基础设施通道。'
              : isCkb 
              ? 'نووسینگەی ئاسانکاری پاکتاوی دارایی بۆ نەهێشتنی بەربەستەکان و دابینکردنی کەناڵێکی ڕاستەوخۆ لە نێوان دینار و یوان دامەزراوە.'
              : 'Established under sovereign bilateral trade consensus, the ICA Payment Settlement Facilitation Desk eliminates intermediary financial friction by enabling direct IQD ⇄ RMB clearing rails between Iraqi commerce and Chinese industrial supply chains.'}
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Zero Third-Currency Drag</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bypassing traditional USD correspondent networks eliminates two currency conversion spreads and third-party bank holding delays.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Sovereign Compliance</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Full adherence to Central Bank of Iraq foreign currency platform directives and People's Bank of China CIPS cross-border clearing standards.
            </p>
          </div>

          <div className="pay-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-black text-gray-900">Enterprise Facilitation</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Dedicated bilateral desk assisting importers, contractors, and industrial partners with documentation review and accredited partner bank dispatch.
            </p>
          </div>
        </div>

        {/* Clearing Architecture Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-black text-gray-900">
            {isAr ? 'هيكلية مسار المقاصة السيادية' : isZh ? '双边直接清算链路架构' : isCkb ? 'پێکهاتەی پاکتاوی سەروەری' : 'The Bilateral Clearing Architecture'}
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              In conventional cross-border commerce between Iraq and China, trade payments have historically traversed a tortuous three-step path: Iraqi Dinar (IQD) was converted to US Dollars (USD), transmitted across Western intermediary correspondent banks, and finally reconverted into Chinese Yuan (RMB) in China. This inefficient model burdened trade with cumulative spreads of 4% to 8%, exposed legitimate commercial transactions to arbitrary SWIFT holds, and prolonged settlement cycles up to 10 business days.
            </p>
            <p>
              Under the direct bilateral framework endorsed by the Central Bank of Iraq (CBI) and the People's Bank of China (PBoC), commercial settlement occurs directly:
            </p>
            <ul className="space-y-2 ps-4 list-disc text-gray-700">
              <li>Iraqi corporate buyers deposit IQD with accredited Iraqi commercial clearing banks.</li>
              <li>The bank matches bilateral reserves or utilizes sovereign central bank swap allocations.</li>
              <li>Funds are credited directly to Chinese manufacturers in RMB via the Cross-Border Interbank Payment System (CIPS) or digital e-CNY settlement accounts within 24 to 48 hours.</li>
            </ul>
          </div>
        </div>

        {/* Compliance Badges */}
        <ComplianceBadges lang={lang} />

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <Link
            to={`/${lang}/settlement/inquiry`}
            className="pay-btn-primary px-6 py-3 rounded-xl font-black text-xs shadow-md"
          >
            Submit Settlement Inquiry
          </Link>
          <Link
            to={`/${lang}/settlement/calculator`}
            className="pay-btn-secondary px-6 py-3 rounded-xl font-bold text-xs"
          >
            Calculate Direct Parity Savings
          </Link>
        </div>

      </div>
    </SettlementLayout>
  );
}
