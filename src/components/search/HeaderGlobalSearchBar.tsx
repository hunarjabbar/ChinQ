import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight, Newspaper, Radio, CreditCard, Calendar, Briefcase, Building2, Flame, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import { Locale } from '../../types';
import { portalStore } from '../../data/portalData';

interface HeaderGlobalSearchBarProps {
  lang: Locale;
  className?: string;
}

type SearchCategory = 'all' | 'news' | 'portals' | 'projects' | 'summit';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag?: string;
}

export function HeaderGlobalSearchBar({ lang, className = '' }: HeaderGlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Global keyboard shortcut (Cmd+K / Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('close-header-notifications'));
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    const handleClose = () => setIsOpen(false);
    window.addEventListener('close-header-search', handleClose);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('close-header-search', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Static Portals & Projects Index
  const staticIndex: SearchResultItem[] = useMemo(() => [
    {
      id: 'portal-newsroom',
      title: isAr ? 'غرفة الأخبار والدبلوماسية' : isZh ? '全球新闻与融媒体中心' : isCkb ? 'ژووری هەواڵی دیپلۆماسی' : 'ICA Global Newsroom',
      subtitle: isAr ? 'نشرات الأخبار الرسمية والتقارير الاستراتيجية' : isZh ? '官方双边外交电讯与主权研判' : isCkb ? 'تێلیگرافی دیپلۆماسی و شیکردنەوەی فەرمی' : 'Official Diplomatic Dispatches & Dossiers',
      category: 'portals',
      categoryLabel: isAr ? 'بوابة' : isZh ? '门户' : isCkb ? 'سەکۆ' : 'Portal',
      url: `/${lang}/newsroom`,
      icon: Newspaper,
      tag: 'Newsroom'
    },
    {
      id: 'portal-live',
      title: isAr ? 'البوابة الحية والبث المباشر' : isZh ? '24小时实时双边视讯直播' : isCkb ? 'دەروازەی پەخشی ڕاستەوخۆ' : 'Live Broadcast Transmission',
      subtitle: isAr ? 'تغطية الفعاليات والمؤتمرات الاقتصادية' : isZh ? '高清双语峰会全天候实况转播' : isCkb ? 'پەخشی کۆنفرانس و قسەکردنەکان' : 'High-Definition Bilateral Summit Streams',
      category: 'portals',
      categoryLabel: isAr ? 'بث مباشر' : isZh ? '直播' : isCkb ? 'ڕاستەوخۆ' : 'Live',
      url: `/${lang}/live`,
      icon: Radio,
      tag: 'Broadcast'
    },
    {
      id: 'portal-settlement',
      title: isAr ? 'مقاصة التسوية المالية المباشرة' : isZh ? '中伊双边直接货币清算轨道' : isCkb ? 'سیستەمی یەکلاکردنەوەی دارایی ڕاستەوخۆ' : 'Direct IQD / RMB Financial Settlement Rail',
      subtitle: isAr ? 'حاسبة العملات والتحويل التجاري السيادي' : isZh ? '第纳尔与人民币跨境结算结算平台' : isCkb ? 'حیساباتی دراو و بازرگانی نێوان عێراق و چین' : 'Sovereign Currency Conversion & FX Rail',
      category: 'portals',
      categoryLabel: isAr ? 'تسوية' : isZh ? '结算' : isCkb ? 'یەکلاکردنەوە' : 'Finance',
      url: `/${lang}/settlement`,
      icon: CreditCard,
      tag: 'e-CNY / IQD'
    },
    {
      id: 'portal-summit',
      title: isAr ? 'قمة السليمانية للشراكة الثنائية 2026' : isZh ? '2026 苏莱曼尼亚双边经贸投资峰会' : isCkb ? 'لووتکەی هاوبەشی سلێمانی ٢٠٢٦' : 'Sulaymaniyah Bilateral Partnership Summit 2026',
      subtitle: isAr ? 'التسجيل للمشاركين وجدول الأعمال والمعارض' : isZh ? '政企撮合、展区展位申请与主旨日程' : isCkb ? 'تۆمارکردنی بەشداربووان و ئەجێندا' : 'Delegate Registration, Pavilions & Matchmaking',
      category: 'summit',
      categoryLabel: isAr ? 'قمة' : isZh ? '峰会' : isCkb ? 'لووتکە' : 'Summit',
      url: `/${lang}/summit`,
      icon: Calendar,
      tag: 'Summit 2026'
    },
    {
      id: 'portal-consultancy',
      title: isAr ? 'الاستشارات المؤسسية والقانونية' : isZh ? '主权战略与法务政策咨询机构' : isCkb ? 'ڕاوێژکاری ستراتیژی و یاسایی' : 'Strategic & Legal Institutional Consultancy',
      subtitle: isAr ? 'دعم المستثمرين وتأسيس الشراكات وتراخيص التجارة' : isZh ? '伊中双向合规出海与投融资专项辅导' : isCkb ? 'پشتیوانی وەبەرهێنەران و یاسا بازرگانییەکان' : 'Cross-border Regulatory & Investment Advisory',
      category: 'portals',
      categoryLabel: isAr ? 'استشارات' : isZh ? '智库' : isCkb ? 'ڕاوێژ' : 'Advisory',
      url: `/${lang}/institute/consultancy`,
      icon: Briefcase,
      tag: 'Consultancy'
    },
    {
      id: 'project-faw',
      title: isAr ? 'مشروع ميناء الفاو الكبير الاستراتيجي' : isZh ? '法奥大港综合枢纽深水港工程' : isCkb ? 'پڕۆژەی بەندەری فاو' : 'Al Faw Grand Port Strategic Deepwater Project',
      subtitle: isAr ? 'المحطة البحرية الأكبر في الخليج وشريان التجارة' : isZh ? '连接海湾与欧亚大陆的战略级干线港口' : isCkb ? 'گەورەترین بەندەری کەنداو و ڕێگای ئاوریشم' : 'Key Gulf Maritime Terminal Linking Silk Road Corridor',
      category: 'projects',
      categoryLabel: isAr ? 'مشروع سيادي' : isZh ? '重大项目' : isCkb ? 'پڕۆژەی ستراتیژی' : 'Megaproject',
      url: `/${lang}/newsroom?tag=Faw`,
      icon: Building2,
      tag: '$2.6B Port'
    },
    {
      id: 'project-development-road',
      title: isAr ? 'طريق التنمية والقناة الجافة' : isZh ? '发展之路与陆桥干线铁路工程' : isCkb ? 'ڕێگای گەشەپێدان' : 'Development Road & Dry Canal Railway',
      subtitle: isAr ? 'شبكة القطارات السريعة والطرق الدولية' : isZh ? '贯穿伊拉克南北并连通欧洲的陆上大动脉' : isCkb ? 'هێڵی ئاسنی نێودەوڵەتی خێرا' : 'Multi-modal High-Speed Rail Connecting Iraq to Europe',
      category: 'projects',
      categoryLabel: isAr ? 'بنية تحتية' : isZh ? '基建走廊' : isCkb ? 'ژێرخان' : 'Infrastructure',
      url: `/${lang}/newsroom?tag=DevelopmentRoad`,
      icon: Globe2,
      tag: '$17B Corridor'
    }
  ], [lang, isAr, isZh, isCkb]);

  // Dynamic news articles from portal store
  const articleIndex: SearchResultItem[] = useMemo(() => {
    try {
      const articles = portalStore.getNewsArticles().filter(a => a.status === 'published');
      return articles.slice(0, 15).map(a => {
        const title = a.title[lang as keyof typeof a.title] || a.title.en;
        const excerpt = a.excerpt[lang as keyof typeof a.excerpt] || a.excerpt.en;
        return {
          id: `article-${a.id}`,
          title,
          subtitle: excerpt,
          category: 'news',
          categoryLabel: isAr ? 'تقرير صحفي' : isZh ? '即时报道' : isCkb ? 'ڕاپۆرت' : 'Dispatch',
          url: `/${lang}/newsroom/${a.slug}`,
          icon: Newspaper,
          tag: typeof a.category === 'string' ? a.category : (a.category as any)?.name || 'News'
        };
      });
    } catch {
      return [];
    }
  }, [lang, isAr, isZh, isCkb]);

  // Combined searchable dataset
  const allItems = useMemo(() => [...staticIndex, ...articleIndex], [staticIndex, articleIndex]);

  // Filtered results
  const filteredResults = useMemo(() => {
    let items = allItems;
    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return items.slice(0, 6);
    }

    return items.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSubtitle = item.subtitle.toLowerCase().includes(trimmed);
      const matchTag = item.tag ? item.tag.toLowerCase().includes(trimmed) : false;
      return matchTitle || matchSubtitle || matchTag;
    }).slice(0, 8);
  }, [allItems, activeCategory, query]);

  // Trending Suggestions
  const trendingQueries = useMemo(() => [
    { label: isAr ? 'ميناء الفاو' : isZh ? '法奥大港' : isCkb ? 'بەندەری فاو' : 'Al Faw Port', q: 'Faw' },
    { label: isAr ? 'طريق التنمية' : isZh ? '发展之路' : isCkb ? 'ڕێگای گەشەپێدان' : 'Development Road', q: 'Development' },
    { label: isAr ? 'تسوية اليوان الرقمي' : isZh ? '数字人民币结算' : isCkb ? 'یەکلاکردنەوەی یوان' : 'e-CNY Settlement', q: 'Settlement' },
    { label: isAr ? 'قمة 2026' : isZh ? '2026 峰会' : isCkb ? 'لووتکە' : 'Summit 2026', q: 'Summit' },
    { label: isAr ? 'الطاقة الشمسية' : isZh ? '光伏绿电' : isCkb ? 'وزەی خۆر' : 'Solar Microgrid', q: 'Solar' },
  ], [isAr, isZh, isCkb]);

  const handleSelectResult = (item: SearchResultItem) => {
    setIsOpen(false);
    navigate(item.url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (filteredResults.length > 0 && selectedIndex < filteredResults.length) {
      handleSelectResult(filteredResults[selectedIndex]);
    } else {
      setIsOpen(false);
      navigate(`/${lang}/newsroom/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* CLEAN GLASS LEAN GLOBAL SEARCH BAR */}
      <form onSubmit={handleFormSubmit} className="relative w-full">
        <div
          className={`group relative flex items-center h-9 sm:h-9.5 rounded-full px-3.5 transition-all duration-200 backdrop-blur-md border ${
            isOpen
              ? 'bg-white/25 border-white/60 shadow-lg ring-2 ring-white/30 text-white'
              : 'bg-white/15 hover:bg-white/20 border-white/25 text-white/95 hover:border-white/40 shadow-xs'
          }`}
        >
          {/* Search Icon with Glass Specular Spark */}
          <Search
            size={15}
            className={`shrink-0 transition-colors ${
              isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
            }`}
          />

          {/* Search Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onFocus={() => {
              window.dispatchEvent(new CustomEvent('close-header-notifications'));
              setIsOpen(true);
            }}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              if (!isOpen) {
                window.dispatchEvent(new CustomEvent('close-header-notifications'));
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              isAr
                ? 'ابحث في الأخبار الرسمية، الاتفاقيات، القمة، ومشاريع طريق الحرير...'
                : isZh
                ? '全局检索官方电讯、双边协定、峰会、以及主权基建项目...'
                : isCkb
                ? 'گەڕان لە هەواڵەکان، ڕێککەوتنەکان، لووتکە و پڕۆژەکان...'
                : 'Search sovereign dispatches, bilateral accords, summit & Silk Road projects...'
            }
            className="flex-1 bg-transparent px-2.5 text-xs sm:text-[13px] font-medium text-white placeholder-white/70 focus:outline-none w-full"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Action Tools / Clear / Shortcut Chip */}
          <div className="flex items-center gap-1.5 shrink-0 ms-1">
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="w-5 h-5 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="Clear query"
              >
                <X size={12} />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/15 border border-white/25 text-white/80 select-none pointer-events-none">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </form>

      {/* FLOATING GLASS DROPDOWN (Interactive Live Suggestions & Scopes) */}
      {isOpen && (
        <div
          className="absolute top-full mt-2.5 inset-x-0 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-neutral-700/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {/* Top Filter Chips Row */}
          <div className="flex items-center gap-1.5 p-2.5 border-b border-slate-100 dark:border-neutral-800 overflow-x-auto text-[11px] font-bold">
            {(
              [
                { id: 'all', label: isAr ? 'الكل' : isZh ? '全部' : isCkb ? 'هەموو' : 'All' },
                { id: 'news', label: isAr ? 'غرفة الأخبار' : isZh ? '官方新闻' : isCkb ? 'هەواڵ' : 'News' },
                { id: 'portals', label: isAr ? 'البوابات' : isZh ? '直达门户' : isCkb ? 'سەکۆکان' : 'Portals' },
                { id: 'summit', label: isAr ? 'القمة' : isZh ? '双边峰会' : isCkb ? 'لووتکە' : 'Summit' },
                { id: 'projects', label: isAr ? 'المشاريع' : isZh ? '主权项目' : isCkb ? 'پڕۆژەکان' : 'Projects' },
              ] as { id: SearchCategory; label: string }[]
            ).map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[340px] overflow-y-auto p-1.5 space-y-1">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100 ring-1 ring-red-200 dark:ring-red-900/50'
                        : 'hover:bg-slate-50 dark:hover:bg-neutral-800/60 text-slate-800 dark:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100/70 dark:bg-brand-950/60 text-red-600 dark:text-red-400 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1 text-start">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate">
                            {item.title}
                          </span>
                          {item.tag && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 shrink-0">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-red-600 shrink-0 ms-2">
                      <span className="hidden sm:inline text-[10px] font-mono opacity-60">
                        {item.categoryLabel}
                      </span>
                      <ArrowRight size={13} className="rtl:rotate-180 opacity-70" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-slate-400 dark:text-neutral-500 text-xs">
                {isAr
                  ? 'لم يتم العثور على نتائج مباشرة. اضغط Enter للبحث في الأرشيف الدبلوماسي الكامل.'
                  : isZh
                  ? '未找到精准匹配项。请按回车键在档案库中进行全文检索。'
                  : isCkb
                  ? 'هیچ دەرئەنجامێک نەدۆزرایەوە. ئینتەر دابگرە بۆ گەڕانی تەواو.'
                  : 'No exact matches found. Press Enter to search full diplomatic archive.'}
              </div>
            )}
          </div>

          {/* Bottom Trending Suggestions & Actions Footer */}
          <div className="p-2.5 bg-slate-50/80 dark:bg-neutral-850/80 border-t border-slate-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-bold flex items-center gap-1 text-[10px] uppercase">
                <Flame size={12} className="text-amber-500" />
                <span>{isAr ? 'شائع:' : isZh ? '热门热搜:' : isCkb ? 'باو:' : 'Trending:'}</span>
              </span>
              {trendingQueries.map((trend, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuery(trend.q);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-neutral-300 hover:text-red-700 text-[10px] font-bold border border-slate-200 dark:border-neutral-700 transition-colors cursor-pointer"
                >
                  {trend.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleFormSubmit}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
            >
              <span>{isAr ? 'عرض كافة النتائج' : isZh ? '查看全部结果' : isCkb ? 'بینینی هەموو ئەنجامەکان' : 'View full archive'}</span>
              <ChevronRight size={11} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderGlobalSearchBar;
