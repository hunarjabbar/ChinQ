import { useState } from 'react';
import { Locale } from '../types';
import { Globe, Search, Sparkles, Loader2, AlertCircle, BookOpen, Radio } from 'lucide-react';

interface GroundedNewsHubProps {
  lang: Locale;
}

export function GroundedNewsHub({ lang }: GroundedNewsHubProps) {
  const [source, setSource] = useState<'local' | 'international'>('international');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [cardLangs, setCardLangs] = useState<Record<string, Locale>>({});

  // Labels based on current language
  const text = {
    title: lang === 'ar' ? 'سلك المخابرات الصحفية الثنائية' : lang === 'ckb' ? 'تۆڕی هەواڵی مێدیایی دوولایەنە' : lang === 'zh' ? '中伊双边新闻情报电讯' : 'Bilateral Press Intelligence Wire',
    subtitle: lang === 'ar' 
      ? 'مسح التطورات والتقارير في الوقت الفعلي من الوكالات المحلية العراقية والصحافة الدولية.' 
      : lang === 'ckb' 
      ? 'سەیرکردنی زانیاری و نوێکارییەکان لە سەرچاوە ناوخۆیی و نێودەوڵەتییەکان لە کاتی ڕاستەقینەدا.' 
      : lang === 'zh' 
      ? '实时扫描检索伊拉克本地媒体与国际权威社论的双边经贸及民生合作进展。' 
      : 'Real-time search grounding across local Iraqi outlets and international bureaus tracking bilateral progress.',
    sourceSelect: lang === 'ar' ? 'منظور المصدر' : lang === 'ckb' ? 'ڕوانگەی سەرچاوە' : lang === 'zh' ? '新闻视角选择' : 'Source Perspective',
    localTitle: lang === 'ar' ? 'الصحافة المحلية العراقية' : lang === 'ckb' ? 'ڕۆژنامەوانی ناوخۆیی عێراقی' : lang === 'zh' ? '伊拉克本地视角' : 'Local Iraqi Press',
    localDesc: lang === 'ar' ? 'شفق نيوز، رووداو، المدى، وكالة الأنباء العراقية' : lang === 'ckb' ? 'شەفەق نیوز، ڕووداو، مەدا، ئاژانسی هەواڵی عێراقی' : lang === 'zh' ? '沙法克通讯社、鲁道、 المدى 报、伊拉克通讯社' : 'Shafaq News, Rudaw, Al-Mada, Iraqi News Agency',
    intlTitle: lang === 'ar' ? 'الصحافة الدولية العالمية' : lang === 'ckb' ? 'ڕۆژنامەوانی نێودەوڵەتی' : lang === 'zh' ? '全球国际视角' : 'International Press',
    intlDesc: lang === 'ar' ? 'رويترز، بلومبرغ، كايشين، تلفزيون الصين المركزي، شينخوا' : lang === 'ckb' ? 'ڕۆیتەرز، بلومبێرگ، کایشین، شینخوا، سی جی تی ئێن' : lang === 'zh' ? '路透社、彭博社、财新、央视新闻、新华社' : 'Reuters, Bloomberg, Caixin, CGTN, Xinhua',
    searchPlaceholder: lang === 'ar' ? 'أدخل موضوعاً (مثال: ميناء الفاو الكبير)...' : lang === 'ckb' ? 'بابەتێک بنووسە (بۆ نموونە: بەندەری گەورەی فاو)...' : lang === 'zh' ? '输入合作课题（如：法奥大港、学校建设）...' : 'Enter cooperating theme (e.g. Al-Faw Grand Port, Smart Schools)...',
    btnSearch: lang === 'ar' ? 'تحليل ومسح المصادر' : lang === 'ckb' ? 'سۆران و پشکنینی سەرچاوەکان' : lang === 'zh' ? '检索并翻译双边报道' : 'Scan & Translate Sources',
    quickTopics: lang === 'ar' ? 'مواضيع سريعة المقترحة:' : lang === 'ckb' ? 'بابەتە پێشنیارکراوەکان:' : lang === 'zh' ? '热门聚焦专题快速检索:' : 'Featured Hotspots:',
    curatedHeadline: lang === 'ar' ? 'أرشيف التغطية الصحفية المميزة' : lang === 'ckb' ? 'ئەرشیفی ڕاپۆرتە مێدیاییە دیارەکان' : lang === 'zh' ? '中伊双边特稿精选' : 'Curated Bilateral News Archives'
  };

  const quickThemeOptions = [
    { label: lang === 'ar' ? 'ميناء الفاو' : lang === 'ckb' ? 'بەندەری فاو' : lang === 'zh' ? '法奥港进度' : 'Al Faw Port progress', q: 'Al Faw Grand Port' },
    { label: lang === 'ar' ? 'تسوية اليوان' : lang === 'ckb' ? 'مامەڵەی یوان' : lang === 'zh' ? '人民币结算' : 'Yuan currency settlement', q: 'Central bank Yuan trade settlement' },
    { label: lang === 'ar' ? 'تقليل حرق الغاز' : lang === 'ckb' ? 'کەمکردنەوەی غازی سووتاو' : lang === 'zh' ? '中石油气田合作' : 'CNPC Gas flaring capture', q: 'CNPC Basra gas capture deal' },
    { label: lang === 'ar' ? 'مشروع المدارس' : lang === 'ckb' ? 'پڕۆژەی قوتابخانەکان' : lang === 'zh' ? '示范性学校' : 'PowerChina Schools', q: 'PowerChina schools Iraq' }
  ];

  const handleSearch = async (queryText?: string) => {
    const activeTopic = queryText || topic;
    if (!activeTopic.trim()) return;
    
    setIsLoading(true);
    setError('');
    setResults([]);
    
    try {
      const res = await fetch('/api/public/news-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, topic: activeTopic })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to communicate with news grounding engine.');
      }
      
      setResults(data.articles || []);
      // Default lang toggle for results to active user lang
      const initLangs: Record<string, Locale> = {};
      (data.articles || []).forEach((art: any) => {
        initLangs[art.slug] = lang;
      });
      setCardLangs(initLangs);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected routing or compilation error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white border-y border-[#111111]/10 py-12 px-6">
      <div className="max-w-[1024px] mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-[#990000]/10 text-[#990000] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles size={13} />
            Grounding Intelligence
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-[#111111]">
            {text.title}
          </h2>
          <p className="text-sm text-neutral-600">
            {text.subtitle}
          </p>
        </div>

        {/* Source Switcher & Form */}
        <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-lg space-y-6">
          
          {/* Tabs */}
          <div className="space-y-2 text-start">
            <span className="text-[10px] uppercase font-black text-neutral-500 tracking-wider">
              {text.sourceSelect}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* International Press Option */}
              <button
                type="button"
                onClick={() => setSource('international')}
                className={`p-4 border text-start transition-all cursor-pointer rounded ${
                  source === 'international' 
                    ? 'border-[#990000] bg-red-50/50 shadow-sm' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                  <Globe className={source === 'international' ? 'text-[#990000]' : 'text-neutral-400'} size={16} />
                  {text.intlTitle}
                </div>
                <p className="text-xs text-neutral-500 mt-1">{text.intlDesc}</p>
              </button>

              {/* Local Iraqi Press Option */}
              <button
                type="button"
                onClick={() => setSource('local')}
                className={`p-4 border text-start transition-all cursor-pointer rounded ${
                  source === 'local' 
                    ? 'border-[#990000] bg-red-50/50 shadow-sm' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                  <Radio className={source === 'local' ? 'text-[#990000] animate-pulse' : 'text-neutral-400'} size={16} />
                  {text.localTitle}
                </div>
                <p className="text-xs text-neutral-500 mt-1">{text.localDesc}</p>
              </button>
            </div>
          </div>

          {/* Input & Search Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 text-neutral-400" size={16} />
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder={text.searchPlaceholder}
                className="w-full border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm rounded focus:outline-none focus:ring-1 focus:ring-[#990000]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !topic.trim()}
              className="bg-neutral-900 hover:bg-[#990000] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sourcing...
                </>
              ) : (
                <>
                  <Search size={14} />
                  {text.btnSearch}
                </>
              )}
            </button>
          </div>

          {/* Quick theme buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200/60">
            <span className="text-xs text-neutral-500 font-bold">{text.quickTopics}</span>
            {quickThemeOptions.map((opt) => (
              <button
                key={opt.q}
                onClick={() => {
                  setTopic(opt.q);
                  handleSearch(opt.q);
                }}
                disabled={isLoading}
                className="bg-white hover:bg-neutral-100 text-neutral-800 text-[11px] font-bold py-1.5 px-3 border border-neutral-200 rounded transition-all cursor-pointer disabled:opacity-50"
              >
                {opt.label}
              </button>
            ))}
          </div>

        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="border border-neutral-200 rounded-lg p-12 text-center bg-neutral-50/50 space-y-4 animate-pulse">
            <Loader2 size={36} className="animate-spin text-[#990000] mx-auto" />
            <div className="space-y-1">
              <p className="font-bold text-neutral-800">Scaffolding grounded intelligence...</p>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Executing real-time search queries and generating translations. This takes around 10-15 seconds.
              </p>
            </div>
          </div>
        )}

        {/* Error Block */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded flex items-start gap-3 text-start">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-700" />
            <div className="space-y-1">
              <p className="font-bold">Execution Paused</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Live Grounded Search Results */}
        {results.length > 0 && (
          <div className="space-y-6 text-start">
            <div className="flex items-center justify-between border-b border-[#990000] pb-2">
              <h3 className="font-serif font-black text-xl text-neutral-900 flex items-center gap-2">
                <Globe size={20} className="text-[#990000]" />
                {lang === 'ar' ? 'النتائج المسترجعة الحية' : lang === 'ckb' ? 'ئەنجامە زانیارییەکان' : lang === 'zh' ? '实时检索报道结果' : 'Live Grounded Press Results'}
              </h3>
              <span className="text-[10px] bg-neutral-900 text-white font-bold px-2 py-0.5 uppercase tracking-wide">
                Verified Facts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((art) => {
                const currentLang = cardLangs[art.slug] || lang;
                const tr = art.translations.find((t: any) => t.lang === currentLang) || art.translations[0];

                return (
                  <article key={art.slug} className="border border-neutral-200 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
                    <div className="space-y-4 p-5">
                      {/* Image block */}
                      <div className="h-44 bg-neutral-100 relative rounded overflow-hidden">
                        <img 
                          src={art.imageUrl} 
                          alt={tr?.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-[#990000] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
                          {art.categorySlug}
                        </span>
                        <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                          {art.sourceName}
                        </span>
                      </div>

                      {/* Lang Switcher bar */}
                      <div className="flex gap-1 border-b border-neutral-100 pb-2">
                        {(['en', 'ar', 'zh', 'ckb'] as const).map(l => (
                          <button
                            key={l}
                            onClick={() => setCardLangs(prev => ({ ...prev, [art.slug]: l }))}
                            className={`text-[10px] px-2 py-0.5 font-bold rounded cursor-pointer ${currentLang === l ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                          >
                            {l.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      {/* Content text */}
                      <div className="space-y-2">
                        <h4 className="font-serif font-black text-base text-neutral-950 leading-snug tracking-tight">
                          {tr?.title}
                        </h4>
                        <p className="text-xs text-neutral-500 italic">
                          {tr?.excerpt}
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed line-clamp-4">
                          {tr?.content}
                        </p>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 border-t border-neutral-100 flex items-center gap-2">
                      <BookOpen size={12} className="text-[#990000]" />
                      <span className="text-[10px] text-neutral-500 font-bold uppercase">
                        Sourced & Grounded Live via ChinQ Agent
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
