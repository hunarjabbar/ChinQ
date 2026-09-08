import React from 'react';
import { createPortal } from 'react-dom';
import { Article, Locale } from '../types';
import { ArticleDetail } from './ArticleDetail';

interface ArticleModalProps {
  article: Article;
  lang: Locale;
  onClose: () => void;
}

export function ArticleModal({ article, lang, onClose }: ArticleModalProps) {
  return createPortal(
    <div 
      className="fixed inset-0 z-[100] bg-white dark:bg-neutral-900 flex flex-col items-center justify-start overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-6xl bg-white dark:bg-neutral-900 min-h-screen flex flex-col relative text-start transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar */}
        <div className="px-6 py-4 bg-brand-800 text-white border-b border-brand-700 flex justify-between items-center shrink-0 sticky top-0 z-20">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-200">
            {lang === 'ar' ? 'بوابة الأخبار والتحليلات السيادية' : lang === 'zh' ? '主权新闻与深度报道专栏' : lang === 'ckb' ? 'دەروازەی هەواڵ و شیکردنەوە' : 'Sovereign Editorial Dossier'}
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-brand-200 font-bold text-xs uppercase tracking-widest bg-brand-900/60 hover:bg-brand-950 px-4 py-2 rounded-lg transition-colors cursor-pointer border border-brand-700 shadow-sm"
          >
            {lang === 'ar' ? '✕ إغلاق النافذة' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭窗口' : '✕ Close Dossier'}
          </button>
        </div>

        <ArticleDetail article={article} lang={lang} />
      </div>
    </div>,
    document.body
  );
}
