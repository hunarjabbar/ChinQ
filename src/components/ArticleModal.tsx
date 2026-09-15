import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { Article, Locale } from '../types';
import { ArticleDetail } from './ArticleDetail';

interface ArticleModalProps {
  article: Article;
  lang: Locale;
  onClose: () => void;
}

export function ArticleModal({ article, lang, onClose }: ArticleModalProps) {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'ar' || lang === 'ckb';

  // Lock body scroll when modal is open to prevent background scrolling and ensure modal captures all scroll events
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    // Focus scroll container so keyboard arrow/page navigation works immediately
    if (modalScrollRef.current) {
      modalScrollRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const { scrollYProgress } = useScroll({
    container: modalScrollRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.0001
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent accidental close when clicking or dragging on the vertical scrollbar track/thumb
    if (modalScrollRef.current && e.clientX >= modalScrollRef.current.clientWidth) {
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      ref={modalScrollRef}
      tabIndex={-1}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex flex-col items-center justify-start overflow-y-auto overscroll-contain focus:outline-none select-auto"
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
        touchAction: 'pan-y'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="w-full max-w-6xl bg-white dark:bg-neutral-900 min-h-screen flex flex-col relative text-start shadow-2xl transition-all duration-300 my-0 sm:my-4 rounded-t-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header toolbar with integrated reading progress bar */}
        <div className="px-6 py-4 bg-brand-800 text-white flex justify-between items-center shrink-0 sticky top-0 z-30 relative shadow-md rounded-t-xl touch-pan-y">
          <div className="text-xs font-bold uppercase tracking-widest text-brand-200">
            {lang === 'ar' ? 'بوابة الأخبار والتحليلات السيادية' : lang === 'zh' ? '主权新闻与深度报道专栏' : lang === 'ckb' ? 'دەروازەی هەواڵ و شیکردنەوە' : 'Sovereign Editorial Dossier'}
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white hover:text-brand-200 font-bold text-xs uppercase tracking-widest bg-brand-900/60 hover:bg-brand-950 px-4 py-2 rounded-lg transition-colors cursor-pointer border border-brand-700 shadow-sm"
          >
            {lang === 'ar' ? '✕ إغلاق النافذة' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭窗口' : '✕ Close Dossier'}
          </button>

          {/* Integrated Header Reading Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-brand-950/40 overflow-hidden pointer-events-none">
            <motion.div 
              className={`h-full ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-amber-500 via-amber-400 to-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]`}
              style={{ 
                scaleX, 
                transformOrigin: isRtl ? 'right center' : 'left center' 
              }}
            />
          </div>
        </div>

        <ArticleDetail 
          article={article} 
          lang={lang} 
          scrollContainerRef={modalScrollRef} 
          hideFloatingProgress={true} 
        />
      </div>
    </div>,
    document.body
  );
}
