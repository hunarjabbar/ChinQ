import DOMPurify from 'dompurify';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Article, Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS, ckb } from 'date-fns/locale';
import { ArticleSocialBar } from './SocialLinks';
import { ListCollapse, ChevronRight } from 'lucide-react';
import { ADDITIONAL_TOPICS } from '../data/topics';

interface ArticleDetailProps {
  article: Article;
  lang: Locale;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  hideFloatingProgress?: boolean;
}

export function ArticleDetail({ 
  article, 
  lang, 
  scrollContainerRef,
  hideFloatingProgress = false
}: ArticleDetailProps) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const getTranslation = useCallback((article: Article) => {
    return article.translations.find(tr => tr.lang === lang) || 
           article.translations.find(tr => tr.lang === 'en') || 
           article.translations[0];
  }, [lang]);

  const getCategoryName = useCallback((category: any) => {
    if (!category) return '';
    if (lang === 'ar') return category.nameAr || category.name;
    if (lang === 'zh') return category.nameZh || category.name;
    if (lang === 'ckb') {
      const topic = ADDITIONAL_TOPICS.find(t => t.slug === category.slug || t.nameEn === (category.nameEn || category.name) || t.name === category.name);
      if (topic && topic.nameCkb) return topic.nameCkb;
      const name = category.nameEn || category.name;
      if (name === 'Energy') return 'وزە';
      if (name === 'Economy') return 'ئابووری';
      if (name === 'Culture') return 'کالچەر';
      if (name === 'AI') return 'زیرەکی دەستکرد';
      if (name === 'Food & Beverage') return 'خۆراک و خواردنەوە';
      if (name === 'Expo') return 'پێشانگا';
      if (name === 'Business Statistics') return 'ئاماری بازرگانی';
      if (name === 'Opinion') return 'بۆچوون';
      if (name === 'Politics') return 'سیاسەت';
      if (name === 'Technology') return 'تەکنەلۆژیا';
      if (name === 'Belt & Road') return 'پشتوێن و ڕێگا';
      if (name === 'Historical Figures') return 'کەسایەتییە مێژووییەکان';
      return name;
    }
    return category.nameEn || category.name;
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' ? ar : lang === 'ckb' ? ckb : lang === 'zh' ? zhCN : enUS, [lang]);

  const formatTimeAgo = useCallback((dateInput: string | Date | number) => {
    const d = new Date(dateInput);
    if (lang === 'ckb') {
      const now = Date.now();
      const diffMs = Math.max(0, now - d.getTime());
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffMin < 1) return 'ئێستا';
      if (diffMin === 1) return '١ خولەک پێش ئێستا';
      if (diffMin < 60) return `${diffMin} خولەک پێش ئێستا`;
      if (diffHr === 1) return '١ کاتژمێر پێش ئێستا';
      if (diffHr < 24) return `${diffHr} کاتژمێر پێش ئێستا`;
      if (diffDays === 1) return 'دوێنێ';
      if (diffDays < 30) return `${diffDays} ڕۆژ پێش ئێستا`;
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths < 12) return `${diffMonths} مانگ پێش ئێستا`;
      return `${Math.floor(diffDays / 365)} ساڵ پێش ئێستا`;
    }
    return formatDistanceToNow(d, { addSuffix: true, locale: dateLocale });
  }, [lang, dateLocale]);
  const tr = getTranslation(article);

  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      const parsedHeadings = elements.map((el, index) => {
        let id = el.id;
        if (!id) {
          id = 'heading-' + index + '-' + el.textContent?.trim().replace(/\W+/g, '-').toLowerCase();
          el.id = id;
        }
        return {
          id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3
        };
      });
      setHeadings(parsedHeadings);
    }
  }, [tr?.content, lang]);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/${lang}/article/${article.slug}` : `/${lang}/article/${article.slug}`;
  const shareText = tr?.title || '';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(
    hideFloatingProgress
      ? {}
      : {
          target: containerRef,
          container: (scrollContainerRef as React.RefObject<HTMLElement>) || undefined,
          offset: ["start start", "end end"]
        }
  );
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.0001
  });

  return (
    <div className="flex flex-col w-full bg-white dark:bg-neutral-900 text-ink-900 dark:text-neutral-100" ref={containerRef}>
      {/* Refined Standalone Reading Progress Bar (shown when not in modal) */}
      {!hideFloatingProgress && (
        <div className="fixed top-0 left-0 right-0 h-[3.5px] bg-neutral-200/60 dark:bg-neutral-800/60 z-[100] overflow-hidden pointer-events-none backdrop-blur-xs">
          <motion.div 
            className={`h-full ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]`}
            style={{ 
              scaleX, 
              transformOrigin: isRtl ? 'right center' : 'left center' 
            }}
          />
        </div>
      )}
      
      {/* Article Content */}
      <div className="p-6 md:p-12 touch-pan-y overscroll-y-contain">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 dark:border-neutral-800 pb-6 shrink-0">
          <span className="text-xs font-black uppercase text-brand-800 dark:text-brand-300 tracking-widest bg-brand-50 dark:bg-brand-950/50 border border-brand-800/10 dark:border-brand-500/20 px-3 py-1 rounded w-fit">
            {getCategoryName(article.category)}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black leading-tight text-center text-brand-900 dark:text-neutral-100 tracking-tight mb-8">
          {tr?.title}
        </h1>

        <div className="flex justify-center items-center gap-3 text-xs font-bold uppercase mb-12 opacity-80 text-brand-900 dark:text-neutral-300 border-y border-double border-brand-800/20 dark:border-neutral-700/60 py-3">
          <span>By {(article as any).author?.name || 'Staff Writer'}</span>
          <span>•</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'ckb' ? 'ku' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span>•</span>
          <span>{formatTimeAgo(article.createdAt)}</span>
        </div>

        {article.imageUrl && (
          <div className="w-full mb-12 overflow-hidden rounded-xs border border-brand-800/10 dark:border-neutral-800 shadow-sm">
            <img 
              src={article.imageUrl} 
              alt={tr?.title || 'Article Image'} 
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}

        {headings.length > 0 && (
          <div className="mb-10 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-4 text-brand-900 dark:text-neutral-100 border-b border-gray-200 dark:border-neutral-700 pb-2">
              <ListCollapse className="w-5 h-5 text-brand-800 dark:text-brand-400" />
              {lang === 'ar' ? 'محتويات المقال' : lang === 'zh' ? '目录' : lang === 'ckb' ? 'پێڕست' : 'Table of Contents'}
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              {headings.map((heading) => (
                <li 
                  key={heading.id} 
                  className={`flex items-start gap-2 transition-colors hover:text-brand-800 dark:hover:text-brand-400 ${heading.level === 3 ? (lang === 'ar' || lang === 'ckb' ? 'mr-4' : 'ml-4') : 'font-medium'}`}
                >
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 text-gray-400 dark:text-neutral-500 ${lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''}`} />
                  <a href={`#${heading.id}`} onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-gray-600 dark:text-neutral-300 hover:text-brand-800 dark:hover:text-brand-400 leading-snug">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editorial typography body */}
        <div 
          className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed text-gray-800 dark:text-neutral-200 space-y-6 whitespace-pre-wrap md:px-4"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {tr?.content ? (
            <div ref={contentRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr.content) }} />
          ) : (
            <p>{tr?.excerpt}</p>
          )}
        </div>
        
        {/* Bottom Sharing & Global Follow Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-neutral-800 flex flex-col items-center gap-6">
          <p className="text-xs font-bold uppercase text-gray-500 dark:text-neutral-400 tracking-widest">
            {lang === 'zh' ? '分享与传播报道' : lang === 'ar' ? 'مشاركة الخبر والتقرير' : 'Share & Distribute Article'}
          </p>
          <ArticleSocialBar 
            articleTitle={shareText}
            articleUrl={shareUrl}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
