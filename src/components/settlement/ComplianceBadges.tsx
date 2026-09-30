import React from 'react';
import { ShieldCheck, Landmark, CheckCircle, Scale, FileCode2 } from 'lucide-react';
import { Locale } from '../../types';

interface Props {
  lang: Locale;
  compact?: boolean;
}

export function ComplianceBadges({ lang, compact = false }: Props) {
  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';

  const badges = [
    {
      icon: Landmark,
      title: isAr ? 'البنك المركزي العراقي' : isZh ? '伊拉克央行 (CBI)' : isCkb ? 'بانکی ناوەندی عێراق' : 'Central Bank of Iraq (CBI)',
      sub: isAr ? 'توجيهات التسوية المباشرة باليوان' : isZh ? '人民币直接结算监管指引' : isCkb ? 'ڕێنماییەکانی پاکتاو بە یوان' : 'Direct Yuan Clearing Directives',
      href: 'https://cbi.iq'
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'بنك الشعب الصيني (PBoC)' : isZh ? '中国人民银行 (PBoC)' : isCkb ? 'بانکی گەلی چین' : 'People\'s Bank of China (PBoC)',
      sub: isAr ? 'بروتوكول CIPS عبر الحدود' : isZh ? 'CIPS 跨境人民币清算体系' : isCkb ? 'پڕۆتۆکۆڵی CIPS' : 'CIPS Cross-Border Protocol',
      href: 'http://www.pbc.gov.cn'
    },
    {
      icon: Scale,
      title: isAr ? 'مكافحة غسل الأموال' : isZh ? '反洗钱与反恐融资 (AML/CFT)' : isCkb ? 'دژە سپیکردنەوەی پارە' : 'Iraqi AML Law No. 39',
      sub: isAr ? 'قانون رقم ٣٩ لسنة ٢٠١٥' : isZh ? '2015年第39号反洗钱法严格审查' : isCkb ? 'یاسای ٣٩ی ٢٠١٥' : 'Law No. 39 of 2015 Compliance',
      href: 'https://cbi.iq'
    },
    {
      icon: FileCode2,
      title: 'ISO 20022',
      sub: isAr ? 'معيار المراسلات المالية الدولية' : isZh ? '国际标准金融报文规范' : isCkb ? 'ستانداردی دارایی نێودەوڵەتی' : 'Financial Messaging Standard',
      href: 'https://www.iso20022.org'
    }
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((b, i) => (
          <span 
            key={i} 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[11px] font-bold text-neutral-700 dark:text-neutral-300 shadow-xs"
          >
            <b.icon size={13} className="text-brand-800 dark:text-brand-400" />
            <span>{b.title}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6">
      {badges.map((badge, idx) => (
        <a 
          key={idx}
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          className="pay-card p-4 flex flex-col justify-between border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 dark:hover:border-brand-700 bg-white dark:bg-neutral-900 group shadow-xs transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-800 dark:text-brand-400 flex items-center justify-center group-hover:bg-brand-800 group-hover:text-white transition-colors">
              <badge.icon size={18} />
            </div>
            <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-black text-ink-950 dark:text-white group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
              {badge.title}
            </div>
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
              {badge.sub}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
