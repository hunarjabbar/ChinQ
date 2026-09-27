import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowUpRight, KeyRound } from 'lucide-react';
import { Locale } from '../../types';

interface CiseHubFooterLoginProps {
  lang?: Locale;
  className?: string;
}

export function CiseHubFooterLogin({ lang = 'en', className = '' }: CiseHubFooterLoginProps) {
  const isRtl = lang === 'ar' || lang === 'ckb';

  const labels = {
    badge: {
      en: 'Sovereign Control Centre',
      ar: 'مركز القيادة السيادي',
      zh: '智库主权指挥中心',
      ckb: 'سەنتەری فەرماندەیی سەروەری'
    },
    title: {
      en: 'CISE Command Hub',
      ar: 'بوابة قيادة المعهد الصيني',
      zh: 'CISE 智库指挥中心入口',
      ckb: 'دەروازەی فەرماندەیی پەیمانگا'
    },
    subtitle: {
      en: 'Authenticated portal access for accredited CISE fellows, researchers, and administrators.',
      ar: 'منصة تسجيل الدخول الآمنة للزملاء والباحثين والإداريين المعتمدين.',
      zh: '面向 CISE 获批学者、高级研究员与机构管理员的特许登录通道。',
      ckb: 'پلاتفۆرمی چوونەژوورەوەی پارێزراو بۆ شارەزایان و توێژەرانی پەیمانگا.'
    },
    cta: {
      en: 'Enter Command Hub',
      ar: 'دخول مركز القيادة',
      zh: '进入指挥中心',
      ckb: 'چوونەژوورەوەی فەرماندەیی'
    }
  };

  const currentLabel = {
    badge: labels.badge[lang] || labels.badge.en,
    title: labels.title[lang] || labels.title.en,
    subtitle: labels.subtitle[lang] || labels.subtitle.en,
    cta: labels.cta[lang] || labels.cta.en,
  };

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-amber-500/20 text-white shadow-xl backdrop-blur-md space-y-3 relative overflow-hidden group ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-colors"></div>
      
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Lock size={15} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400/90 block">
              {currentLabel.badge}
            </span>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white group-hover:text-amber-300 transition-colors">
              {currentLabel.title}
            </h4>
          </div>
        </div>

        <Link
          to="/hub/login"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all shrink-0 min-h-[36px]"
        >
          <KeyRound size={13} />
          <span>{currentLabel.cta}</span>
          <ArrowUpRight size={13} className="rtl:rotate-270" />
        </Link>
      </div>

      <p className="text-[11px] text-neutral-400 leading-relaxed font-medium relative z-10">
        {currentLabel.subtitle}
      </p>
    </div>
  );
}
