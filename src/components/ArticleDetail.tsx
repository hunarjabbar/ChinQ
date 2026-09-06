import DOMPurify from 'dompurify';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Article, Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { formatDistanceToNow } from 'date-fns';
import { ar, zhCN, enUS } from 'date-fns/locale';
import { ArticleSocialBar } from './SocialLinks';
import { ListCollapse, ChevronRight } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  lang: Locale;
}

export function ArticleDetail({ article, lang }: ArticleDetailProps) {
  const { t } = useI18n(lang);

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
      return name;
    }
    return category.nameEn || category.name;
  }, [lang]);

  const dateLocale = useMemo(() => lang === 'ar' ? ar : lang === 'zh' ? zhCN : enUS, [lang]);
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

  return (
    <div className="flex flex-col w-full">
      {/* Article Content */}
      <div className="p-6 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
          <span className="text-[10px] font-black uppercase text-brand-800 tracking-widest bg-brand-50 px-2 py-1 rounded w-fit">
            {getCategoryName(article.category)}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-center text-ink-900 tracking-tight mb-8">
          {tr?.title}
        </h1>

        <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase mb-12 opacity-60 text-ink-900 border-y border-double border-brand-800/20 py-3">
          <span>By {(article as any).author?.name || 'Staff Writer'}</span>
          <span>•</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: dateLocale })}</span>
        </div>

        {article.imageUrl && (
          <div className="w-full mb-12 overflow-hidden rounded-xs border border-brand-800/10 shadow-sm">
            <img 
              src={article.imageUrl} 
              alt={tr?.title || 'Article Image'} 
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}

        
        {headings.length > 0 && (
          <div className="mb-10 bg-paper-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold font-serif mb-4 text-ink-900 border-b border-gray-200 pb-2">
              <ListCollapse className="w-5 h-5 text-brand-800" />
              {lang === 'ar' ? 'محتويات المقال' : lang === 'zh' ? '目录' : lang === 'ckb' ? 'پێڕست' : 'Table of Contents'}
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              {headings.map((heading) => (
                <li 
                  key={heading.id} 
                  className={`flex items-start gap-2 transition-colors hover:text-brand-800 ${heading.level === 3 ? (lang === 'ar' || lang === 'ckb' ? 'mr-4' : 'ml-4') : 'font-medium'}`}
                >
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 text-gray-400 ${lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''}`} />
                  <a href={`#${heading.id}`} onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-gray-600 hover:text-brand-800 leading-snug">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Editorial typography body */}
        <div 
          className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
          dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
        >
          {tr?.content ? (
            <div ref={contentRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr.content) }} />
          ) : (
            <p>{tr?.excerpt}</p>
          )}
        </div>
        
        {/* Bottom Sharing & Global Follow Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
          <p className="text-xs font-bold uppercase text-gray-500 tracking-widest">
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
