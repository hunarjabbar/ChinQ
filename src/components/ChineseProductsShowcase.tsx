import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Locale, ChineseProduct } from '../types';
import { apiFetch } from '../lib/api';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X, ArrowUpRight, CheckCircle, ShieldCheck, Mail, Sparkles, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { useNavigate } from 'react-router-dom';

interface Props {
  lang: Locale;
}

const CATEGORY_NAMES: Record<string, Record<Locale, string>> = {
  ALL: {
    en: 'All Imports',
    ar: 'كافة المنتجات',
    zh: '全部进出口',
    ckb: 'هەموو بەرهەمەکان'
  },
  AUTOMOTIVE: {
    en: 'Automotive & EVs',
    ar: 'السيارات والكهربائية',
    zh: '汽车与新能源',
    ckb: 'ئۆتۆمبێل و کارەبایی'
  },
  SOLAR_ENERGY: {
    en: 'Solar & Renewable',
    ar: 'الطاقة الشمسية والبديلة',
    zh: '光伏与可再生能源',
    ckb: 'وزەی خۆر و پاک'
  },
  HEAVY_MACHINERY: {
    en: 'Heavy Machinery',
    ar: 'الآليات الثقيلة والإنشاءات',
    zh: '重型工程机械',
    ckb: 'ئامێری قورس و بیناسازی'
  },
  HOME_APPLIANCES: {
    en: 'Climate & Appliances',
    ar: 'التكييف والأجهزة المنزلية',
    zh: '智能家电与温控',
    ckb: 'سپلێت و ئامێری ماڵەوە'
  },
  CONSUMER_ELECTRONICS: {
    en: 'Electronics & AIoT',
    ar: 'الإلكترونيات والذكاء الاصطناعي',
    zh: '消费电子与物联网',
    ckb: 'ئەلیکترۆنیات و تەکنەلۆژیا'
  }
};

function ChineseProductsShowcaseContent({ lang }: Props) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalProduct, setActiveModalProduct] = useState<ChineseProduct | null>(null);

  const { data: products = [], isLoading, isError } = useQuery<ChineseProduct[]>({
    queryKey: ['chinese-products'],
    queryFn: async () => {
      const res = await apiFetch('/api/chinese-products');
      if (!res.ok) throw new Error('Failed to fetch chinese products');
      return res.json();
    }
  });

  const isRtl = lang === 'ar' || lang === 'ckb';

  const categories = ['ALL', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const scrollRef = useRef<HTMLDivElement>(null);
  const accumulatedScrollRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const manualTimeoutRef = useRef<any>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Seamless duplication if there are more than 3 cards to elevate smoothly
  const shouldElevateScroll = filteredProducts.length > 3;
  const displayProducts = shouldElevateScroll
    ? [...filteredProducts, ...filteredProducts]
    : filteredProducts;

  // Reset scroll and accumulator when category filter changes
  useEffect(() => {
    accumulatedScrollRef.current = 0;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectedCategory]);

  // Continuous faster & buttery smooth elevating upward scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !shouldElevateScroll) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();
    // Fastened and silky smooth elevating speed (pixels per second)
    const speed = 58;

    const step = (now: number) => {
      const delta = Math.min((now - lastTimestamp) / 1000, 0.05);
      lastTimestamp = now;

      if (!isHovered && !isManualScrolling && el) {
        const halfHeight = el.scrollHeight / 2;
        if (halfHeight > 0) {
          accumulatedScrollRef.current += speed * delta;
          if (accumulatedScrollRef.current >= halfHeight) {
            accumulatedScrollRef.current -= halfHeight;
          }
          el.scrollTop = accumulatedScrollRef.current;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isManualScrolling, shouldElevateScroll, selectedCategory, filteredProducts.length]);

  const handleScroll = () => {
    if (scrollRef.current) {
      accumulatedScrollRef.current = scrollRef.current.scrollTop;
    }
    setIsManualScrolling(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualScrolling(false);
    }, 1500);
  };

  const getLocalizedTitle = (p: ChineseProduct) => {
    if (lang === 'ar' && p.titleAr) return p.titleAr;
    if (lang === 'zh' && p.titleZh) return p.titleZh;
    if (lang === 'ckb' && p.titleCkb) return p.titleCkb;
    return p.titleEn;
  };

  const getLocalizedDesc = (p: ChineseProduct) => {
    if (lang === 'ar' && p.descriptionAr) return p.descriptionAr;
    if (lang === 'zh' && p.descriptionZh) return p.descriptionZh;
    if (lang === 'ckb' && p.descriptionCkb) return p.descriptionCkb;
    return p.descriptionEn;
  };

  const getCategoryLabel = (cat: string) => {
    return CATEGORY_NAMES[cat]?.[lang] || cat;
  };

  if (isLoading) {
    return (
      <div className="mb-10 p-8 border-s-2 border-brand-800 bg-neutral-50 dark:bg-neutral-800/40 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-neutral-700 w-1/3 mb-4 rounded-xs"></div>
        <div className="h-40 bg-gray-200 dark:bg-neutral-700 w-full rounded-xs"></div>
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div id="chinese-products-showcase" className="mb-12">
      {/* Section Header */}
      <div className="mb-6 border-b-2 border-brand-800 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-brand-800 rounded-sm animate-pulse"></span>
          <h3 className="text-base sm:text-lg font-black uppercase tracking-widest text-brand-800 dark:text-neutral-100">
            {lang === 'ar' ? 'أحدث الابتكارات الصينية!' : lang === 'zh' ? '最新中国前沿创新！' : lang === 'ckb' ? 'نوێترین داهێنانەکانی چین!' : 'Latest Chinese Innovation!'}
          </h3>
        </div>
        <span className="text-[11px] font-bold text-gray-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-1">
          <Sparkles size={12} className="text-brand-800 dark:text-brand-400" />
          {lang === 'ar' ? 'الأكثر طلباً في السوق العراقي' : lang === 'zh' ? '伊拉克热搜' : lang === 'ckb' ? 'پڕخواستترین لە عێراق' : 'Trending in Iraq'}
        </span>
      </div>

      {/* Consolidated Single Sector Selector Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            id="sector-selector-button"
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-brand-800 hover:bg-brand-900 text-white text-xs font-black uppercase tracking-wider rounded-xs shadow-xs transition-colors cursor-pointer border border-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-800/30"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <SlidersHorizontal size={14} className="text-white/80" />
            <span>
              {lang === 'ar' ? `القطاع: ${getCategoryLabel(selectedCategory)}` : lang === 'zh' ? `产品领域: ${getCategoryLabel(selectedCategory)}` : lang === 'ckb' ? `کەرت: ${getCategoryLabel(selectedCategory)}` : `Sector: ${getCategoryLabel(selectedCategory)}`}
            </span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div 
              className="absolute top-full start-0 mt-2 z-30 min-w-[260px] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-xl rounded-xs py-1.5 backdrop-blur-md"
              role="listbox"
            >
              <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-neutral-500 border-b border-gray-100 dark:border-neutral-800 mb-1">
                {lang === 'ar' ? 'اختر قطاع المنتجات' : lang === 'zh' ? '选择创新领域' : lang === 'ckb' ? 'کەرتی بەرهەم هەڵبژێرە' : 'Select Product Sector'}
              </div>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-start px-3.5 py-2 text-xs font-bold tracking-wide flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-brand-800 text-white font-black'
                        : 'text-gray-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{getCategoryLabel(cat)}</span>
                    {isSelected && <Check size={14} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Stream elevation indicator */}
        {shouldElevateScroll && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-neutral-400">
            <span className={`w-1.5 h-1.5 rounded-full ${!isHovered ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
            <span>
              {lang === 'ar' ? 'عرض 3 بطاقات • تمرير صاعد' : lang === 'zh' ? '视窗3张 • 向上浮动滚动' : lang === 'ckb' ? '3 بەرهەم • جوڵەی سەرکەوتوو' : '3 In View • Elevating Stream'}
            </span>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="p-8 text-center border-s-2 border-brand-800 bg-neutral-50 dark:bg-neutral-800/40 text-sm text-gray-500 dark:text-neutral-400">
          {lang === 'ar' ? 'لا توجد منتجات مسجلة في هذا القسم حالياً.' : lang === 'zh' ? '该分类下暂无已发布产品。' : lang === 'ckb' ? 'لە ئێستادا هیچ بەرهەمێک لەم بەشەدا بەردەست نییە.' : 'No products listed in this category.'}
        </div>
      )}

      {/* Borderless Editorial Vertical Feed Container with Inside Top & Bottom Blurry Gradients */}
      <div className="relative overflow-hidden rounded-xs">
        {/* Inside Top Blurry Gradient Overlay */}
        <div 
          className="pointer-events-none absolute top-0 inset-x-0 h-16 sm:h-20 z-20 bg-gradient-to-b from-white via-white/85 to-transparent dark:from-neutral-900 dark:via-neutral-900/85 dark:to-transparent backdrop-blur-[2px]"
          aria-hidden="true"
        />

        {/* Scrollable Feed - Section Size Shorter Showing 3 Cards with Faster & Smoother Elevating Upward Scroll */}
        <div 
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onScroll={handleScroll}
          className="flex flex-col gap-10 overflow-y-auto max-h-[860px] sm:max-h-[960px] lg:max-h-[1080px] px-1 py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayProducts.map((product, idx) => {
            const title = getLocalizedTitle(product);
            const desc = getLocalizedDesc(product);
            const categoryName = getCategoryLabel(product.category);
            const itemKey = `${product.id}-${idx}`;

            return (
              <motion.article 
                key={itemKey}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                className="group cursor-pointer flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1.5 flex-shrink-0"
                onClick={() => setActiveModalProduct(product)}
              >
                {/* Cinematic 16:9 Image container - zero card border, edge-bleeding */}
                <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img 
                    src={product.imageUrl} 
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Category Floating Tag */}
                  <div className="absolute bottom-3 start-3">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest">
                      {categoryName}
                    </span>
                  </div>

                  {/* Direct Action Indicator */}
                  <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-800 text-white p-2 rounded-xs shadow-md">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Editorial Typography & Accents */}
                <div className="px-1 border-s-2 border-transparent group-hover:border-brand-800 ps-4 transition-all duration-300">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                    <h4 className="text-lg font-bold text-ink-900 dark:text-neutral-100 leading-snug group-hover:text-brand-800 dark:group-hover:text-brand-400 transition-colors">
                      {title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-xs font-bold text-brand-800 dark:text-brand-400">
                    <span>
                      {lang === 'ar' ? 'عرض المواصفات وفرص التوريد ←' : lang === 'zh' ? '查看技术规格与采购对接 →' : lang === 'ckb' ? 'بینینی تایبەتمەندی و داواکردن ←' : 'View Specifications & Sourcing Details →'}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Inside Bottom Blurry Gradient Overlay */}
        <div 
          className="pointer-events-none absolute bottom-0 inset-x-0 h-16 sm:h-20 z-20 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-neutral-900 dark:via-neutral-900/85 dark:to-transparent backdrop-blur-[2px]"
          aria-hidden="true"
        />
      </div>

      {/* Interactive Detail & Inquiry Modal Drawer */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: "easeOut" } }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col group/modal transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"
              dir={isRtl ? 'rtl' : 'ltr'}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 end-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 overflow-hidden">
                <img
                  src={activeModalProduct.imageUrl}
                  alt={getLocalizedTitle(activeModalProduct)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/modal:-translate-y-2 hover:-translate-y-2"
                />
                <div className="absolute bottom-3 start-4">
                  <span className="px-3 py-1 bg-brand-800 text-white text-xs font-black uppercase tracking-wider">
                    {getCategoryLabel(activeModalProduct.category)}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto flex-grow space-y-5 scroll-smooth">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-ink-900 dark:text-neutral-100 leading-tight">
                    {getLocalizedTitle(activeModalProduct)}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-brand-800 dark:text-brand-400">
                    <ShieldCheck size={16} />
                    <span>
                      {lang === 'ar' ? 'منتج ومصنّع صيني موثوق ومعتمد للتبادل التجاري العراقي' : lang === 'zh' ? '经由伊中商贸促进机制认证的重点进出口品类' : lang === 'ckb' ? 'بەرهەمی پەسەندکراوی فەرمی بۆ بازاڕی عێراق' : 'Certified for Sino-Iraqi Bilateral Commerce & Procurement'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-neutral-800 pt-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-neutral-500 mb-2">
                    {lang === 'ar' ? 'المواصفات والتحليل' : lang === 'zh' ? '产品概述与市场适用性' : lang === 'ckb' ? 'تایبەتمەندی و شیکاری' : 'Product Overview & Specifications'}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">
                    {getLocalizedDesc(activeModalProduct)}
                  </p>
                </div>

                {/* Bilateral Trade Highlights */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 border-s-4 border-brand-800 space-y-2 text-xs text-gray-600 dark:text-neutral-300">
                  <div className="flex items-center gap-2 font-bold text-ink-900 dark:text-neutral-100">
                    <CheckCircle size={14} className="text-brand-800 dark:text-brand-400" />
                    <span>
                      {lang === 'ar' ? 'دعم الإجراءات الجمركية والترخيص العراقي' : lang === 'zh' ? '伊拉克清关、合规与物流对接支持' : lang === 'ckb' ? 'پشتیوانی گومرگی و مۆڵەت لە عێراق' : 'Iraqi Customs, Tariff & Regulatory Clearance Support'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-ink-900 dark:text-neutral-100">
                    <CheckCircle size={14} className="text-brand-800 dark:text-brand-400" />
                    <span>
                      {lang === 'ar' ? 'تواصل مباشر مع وكلاء التوزيع المعتمدين والمصانع' : lang === 'zh' ? '直通中国品牌制造商与伊拉克授权渠道' : lang === 'ckb' ? 'پەیوەندی ڕاستەوخۆ لەگەڵ بریکار و کۆمپانیاکان' : 'Direct Manufacturer Quotation & Authorized Dealer Channels'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      const inquirySlug = encodeURIComponent(activeModalProduct.titleEn);
                      setActiveModalProduct(null);
                      navigate(`/${lang}/contact?inquiry=${inquirySlug}`);
                    }}
                    className="w-full sm:flex-1 py-3 px-4 bg-brand-800 hover:bg-brand-900 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
                  >
                    <Mail size={16} />
                    <span>
                      {lang === 'ar' ? 'طلب عرض أسعار وتوريد رسمي' : lang === 'zh' ? '申请采购报价与商贸接洽' : lang === 'ckb' ? 'داواکردنی نرخی کۆ و هاوردەکردن' : 'Request Commercial Quotation'}
                    </span>
                  </button>

                  {activeModalProduct.link && (
                    <button
                      onClick={() => {
                        if (activeModalProduct.link) {
                          if (activeModalProduct.link.startsWith('http')) {
                            window.open(activeModalProduct.link, '_blank', 'noopener,noreferrer');
                          } else {
                            navigate(`/${lang}${activeModalProduct.link}`);
                          }
                        }
                      }}
                      className="w-full sm:w-auto py-3 px-4 border border-gray-300 dark:border-neutral-700 hover:border-brand-800 text-ink-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>
                        {lang === 'ar' ? 'الملف التعريفي' : lang === 'zh' ? '官方档案' : lang === 'ckb' ? 'زانیاری زیاتر' : 'Official Portal'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ChineseProductsShowcase({ lang }: Props) {
  return (
    <ErrorBoundary>
      <ChineseProductsShowcaseContent lang={lang} />
    </ErrorBoundary>
  );
}
