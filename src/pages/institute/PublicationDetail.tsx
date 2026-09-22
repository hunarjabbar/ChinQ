import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Locale, Publication } from '../../types';
import { 
  FileText, 
  Download, 
  Share2, 
  Quote, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  MessageSquare,
  Database,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { MediaRequestForm } from '../../components/institute/MediaRequestForm';
import { useI18n } from '../../hooks/useI18n';
import { toast } from 'sonner';

export function PublicationDetail() {
  const { lang = 'en' } = useParams<{ lang: Locale; slug: string }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const { t, formatDate, formatBillion, formatPercent } = useI18n(lang);
  
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isCiteModalOpen, setIsCiteModalOpen] = useState(false);
  const [activeCitationFormat, setActiveCitationFormat] = useState<'apa' | 'chicago' | 'mla' | 'data'>('apa');
  const [isMediaDrawerOpen, setIsMediaDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const citations: Record<string, string> = {
    apa: 'Wang, W., & Al-Husseini, Z. (2024). Mapping the Iraq–China Development Corridor. Chinese Institute for Strategic and Economic Studies.',
    chicago: 'Wang, Wang, and Ziyad Al-Husseini. "Mapping the Iraq–China Development Corridor." Chinese Institute for Strategic and Economic Studies, 2024.',
    mla: 'Wang, Wang, and Ziyad Al-Husseini. "Mapping the Iraq–China Development Corridor." Chinese Institute for Strategic and Economic Studies, 2024.',
    data: 'Chinese Institute for Strategic and Economic Studies (2024). CISE Trade Flow Dataset v2.4. Iraqi-Chinese Agency.',
  };

  const copyCitationToClipboard = () => {
    try {
      navigator.clipboard.writeText(citations[activeCitationFormat]);
      setCopied(true);
      toast.success(t('citationCopied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Publication data with full localized content
  const publication: Publication = {
    id: '1',
    slug: 'mapping-iraq-china-development-corridor',
    type: 'WHITE_PAPER',
    titleEn: 'Mapping the Iraq–China Development Corridor: Infrastructure, Energy, & Sovereign Debt',
    titleAr: 'تخطيط ممر التنمية العراقي الصيني: البنية التحتية، الطاقة، والديون السيادية',
    titleZh: '伊拉克—中国发展走廊：基础设施、能源与主权债务分析',
    titleCkb: 'نەخشەی ڕێڕەوی گەشەپێدانی عێراق-چین: ژێرخان، وزە و قەرزە سەروەرییەکان',
    excerptEn: 'An exhaustive analysis of the convergence between Iraq\'s Development Road and the BRI.',
    excerptAr: 'تحليل شامل للتقارب والاندماج الاستراتيجي بين طريق التنمية العراقي ومبادرة الحزام والطريق.',
    excerptZh: '对伊拉克“发展道路”倡议与中方“一带一路”战略对接的深度全景评估。',
    excerptCkb: 'شیکردنەوەیەکی هەمەلایەنە بۆ گونجاندن و یەکگرتنی ڕێگەی گەشەپێدانی عێراق لەگەڵ دەستپێشخەری پشتێنە و ڕێگە.',
    contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
    imageUrl: 'https://images.unsplash.com/photo-1521295121812-af46571d9ec6?auto=format&fit=crop&q=80&w=1200',
    authors: ['Dr. Wang Wei', 'Ziyad Al-Husseini'],
    topics: ['Energy', 'Infrastructure', 'Macroeconomics'],
    region: 'BILATERAL',
    dataCitationEligible: true,
    publishedAt: '2024-09-15',
    createdAt: '2024-09-15',
    updatedAt: '2024-09-15',
  };

  const sections = [
    { id: 'executive-summary', label: t('executiveSummary') },
    { id: 'methodology', label: t('dataMethodology') },
    { id: 'infrastructure', label: t('infrastructureNodes') },
    { id: 'fiscal', label: t('fiscalImplications') },
    { id: 'policy', label: t('policyGuidance') },
    { id: 'conclusion', label: t('conclusion') },
  ];

  const currentTitle = 
    lang === 'ar' ? publication.titleAr :
    lang === 'zh' ? publication.titleZh :
    lang === 'ckb' ? publication.titleCkb :
    publication.titleEn;

  const currentExcerpt = 
    lang === 'ar' ? publication.excerptAr :
    lang === 'zh' ? publication.excerptZh :
    lang === 'ckb' ? publication.excerptCkb :
    publication.excerptEn;

  const authorName = 
    lang === 'zh' ? '王巍 博士' :
    lang === 'ar' ? 'د. وانغ وي' :
    lang === 'ckb' ? 'دکتۆر وانگ وی' :
    'Dr. Wang Wei';

  const authorInitials = lang === 'zh' ? '王' : lang === 'ckb' || lang === 'ar' ? 'و.و' : 'WW';

  return (
    <div className="bg-white dark:bg-[#0a0a0a]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Article Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-[#F1F5F9] dark:bg-neutral-800 z-50">
        <motion.div 
          className="h-full bg-[#0284C7]" 
          initial={{ width: '0%' }}
          animate={{ width: '30%' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Link 
          to={`/${lang}/institute/publications`} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-[#0284C7] transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
          <span>{t('backToResearchArchive')}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Sidebar: Sticky TOC & Controls */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-28 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#D97706] border-b border-neutral-100 dark:border-neutral-800 pb-3">
                {t('contents')}
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "text-left rtl:text-right px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between group cursor-pointer",
                      activeSection === section.id 
                        ? "bg-[#0F172A] text-white" 
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900"
                    )}
                  >
                    <span>{section.label}</span>
                    <ChevronRight size={14} className={cn(
                      "transition-all rtl:rotate-180",
                      activeSection === section.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 rtl:translate-x-2 group-hover:opacity-50"
                    )} />
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-[#D97706] pb-3">
                {t('actions')}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => toast.success('Preparing official PDF download...')}
                  className="flex items-center gap-3 px-4 py-3 bg-[#0F172A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-md cursor-pointer"
                >
                  <Download size={16} />
                  <span>{t('downloadPdf')}</span>
                </button>
                <button 
                  onClick={() => setIsCiteModalOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <Quote size={16} />
                  <span>{t('citeThisWork')}</span>
                </button>
                <button 
                  onClick={() => setIsMediaDrawerOpen(true)}
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>{t('expertBooking')}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <article className="lg:col-span-9 space-y-12">
            <header className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#0284C7] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest shadow-md">
                  {t('whitePaper')}
                </span>
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded border border-emerald-100 dark:border-emerald-900/50">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">{t('verifiedStrategicData')}</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.2] tracking-tight">
                {currentTitle}
              </h1>

              <div className="flex flex-wrap items-center gap-8 pt-4 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[#0F172A] dark:text-white border border-neutral-200 dark:border-neutral-700 font-black text-xs">
                    {authorInitials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0284C7]">{t('leadAuthor')}</span>
                    <span className="text-xs font-black text-[#0F172A] dark:text-white"><bdi>{authorName}</bdi></span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{t('published')}</span>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                    <bdi>{formatDate(publication.publishedAt)}</bdi>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{t('pillar')}</span>
                  <span className="text-xs font-black text-neutral-800 dark:text-neutral-200">{t('energyBri')}</span>
                </div>
              </div>
            </header>

            {/* Reading Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none space-y-12 leading-relaxed">
              <section id="executive-summary" className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F172A] dark:text-white border-l-4 border-[#D97706] pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
                  {t('executiveSummary')}
                </h2>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed font-semibold text-neutral-800 dark:text-neutral-200">
                    {currentExcerpt}
                  </p>
                  <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {t('bilateralCorridorEfficiencyStudy')}
                  </p>
                </div>
                <blockquote className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-base leading-relaxed not-italic">
                  <bdi>{t('alfawQuote')}</bdi>
                </blockquote>
              </section>

              <section id="infrastructure" className="space-y-8">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#0F172A] dark:text-white">
                  {t('infrastructureNodeAnalysis')}
                </h2>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {t('infraSatelliteDataDesc')}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h4 className="text-xs font-black text-[#0F172A] dark:text-white uppercase mb-4">{t('northernCorridorSulaymaniyah')}</h4>
                    <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4 overflow-hidden">
                      <div className="h-full bg-[#0284C7] w-[82%] rounded-full transition-all duration-1000" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      <span>{t('operationalEfficiency')}</span>
                      <span className="text-[#0284C7] text-sm"><bdi>{formatPercent(82)}</bdi></span>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    <h4 className="text-xs font-black text-[#0F172A] dark:text-white uppercase mb-4">{t('southernCorridorBasraFaw')}</h4>
                    <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4 overflow-hidden">
                      <div className="h-full bg-[#D97706] w-[44%] rounded-full transition-all duration-1000" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      <span>{t('operationalEfficiency')}</span>
                      <span className="text-[#D97706] text-sm"><bdi>{formatPercent(44)}</bdi></span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Embed Widget */}
              <div className="not-prose bg-[#0F172A] rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#0284C720,transparent)]" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#D97706]">
                      <Database size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{t('bilateralDataAppendix')}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight">{t('liveTradeFlowDashboard')}</h3>
                    <p className="text-xs text-neutral-300 font-medium max-w-sm leading-relaxed">
                      {t('liveTradeDatasetsAnchored')}
                    </p>
                    <Link to={`/${lang}/institute/data-hub`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0284C7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                      <span>{t('openDataHub')}</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </Link>
                  </div>
                  <div className="w-full max-w-[220px] aspect-square flex items-center justify-center border border-white/10 rounded-full relative p-4">
                    <div className="absolute inset-4 border border-[#D97706]/30 rounded-full animate-pulse" />
                    <div className="text-center">
                      <span className="block text-2xl lg:text-3xl font-black tracking-tight"><bdi>{formatBillion(52.4)}</bdi></span>
                      <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-[#D97706] mt-1">{t('annualTrade')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-12 border-t border-neutral-100 dark:border-neutral-800">
              <div className="bg-[#F8FAFC] dark:bg-neutral-900/50 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center gap-8">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Author"
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-4 text-center md:text-left rtl:md:text-right">
                  <div>
                    <h4 className="text-lg font-black text-[#0F172A] dark:text-white uppercase tracking-tight"><bdi>{authorName}</bdi></h4>
                    <p className="text-xs font-black text-[#0284C7] uppercase tracking-widest">{t('wangWeiTitle')}</p>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-2xl">
                    {t('wangWeiBio')}
                  </p>
                  <Link to={`/${lang}/institute/experts`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0F172A] dark:text-white hover:text-[#0284C7] transition-colors">
                    <span>{t('viewFullProfile')}</span>
                    <ChevronRight size={14} className="rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Citation Modal */}
      <AnimatePresence>
        {isCiteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCiteModalOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/10"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{t('citeThisWork')}</h2>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('sovereignResearchIntegrity')}</p>
                  </div>
                  <button 
                    onClick={() => setIsCiteModalOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex border-b border-neutral-100 dark:border-neutral-800">
                  {(['apa', 'chicago', 'mla', 'data'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setActiveCitationFormat(format)}
                      className={cn(
                        "px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 cursor-pointer",
                        activeCitationFormat === format 
                          ? "border-[#0284C7] text-[#0284C7]" 
                          : "border-transparent text-neutral-400 hover:text-neutral-600"
                      )}
                    >
                      {format === 'data' ? t('dataProvenance') : format.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0284C7]">
                        {t('format')}: <bdi className="uppercase">{activeCitationFormat}</bdi>
                      </span>
                      <button 
                        onClick={copyCitationToClipboard}
                        className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#0F172A] dark:hover:text-white transition-colors group cursor-pointer"
                      >
                        {copied ? <Check size={12} className="text-emerald-500" /> : <Share2 size={12} className="group-hover:scale-110 transition-transform" />}
                        <span>{copied ? t('citationCopied') : t('copyCitation')}</span>
                      </button>
                    </div>
                    <div 
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                      className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 font-mono text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed select-all text-left"
                    >
                      {citations[activeCitationFormat]}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 text-emerald-600">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t('verifiedStrategicData')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Media Request Drawer */}
      <AnimatePresence>
        {isMediaDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMediaDrawerOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl bg-white dark:bg-neutral-900 shadow-2xl h-full overflow-y-auto"
            >
              <div className="p-8 lg:p-12 space-y-12">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tight">{t('expertBooking')}</h2>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{t('instituteTitle')}</p>
                  </div>
                  <button 
                    onClick={() => setIsMediaDrawerOpen(false)}
                    className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl hover:scale-110 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 bg-[#F8FAFC] dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D97706] flex items-center justify-center text-[#0F172A] font-black text-xs">
                      CI
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#0F172A] dark:text-white">{t('expertBooking')}</h4>
                      <p className="text-[9px] font-bold text-neutral-400">{currentTitle}</p>
                    </div>
                  </div>
                </div>

                <MediaRequestForm 
                  expertName={authorName}
                  publicationTitle={currentTitle} 
                  onSuccess={() => setIsMediaDrawerOpen(false)} 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

