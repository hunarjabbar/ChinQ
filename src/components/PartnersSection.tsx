import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { ExternalLink, X, Building2 } from 'lucide-react';
import { Locale } from '../types';

interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionZh: string;
  descriptionCkb: string;
  isActive: boolean;
  order: number;
}

const FALLBACK_PARTNERS: PartnerItem[] = [
  {
    id: 'p-asiacell',
    name: 'Asiacell',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Asiacell_logo.svg',
    websiteUrl: 'https://www.asiacell.com',
    descriptionEn: 'Asiacell is a leading provider of quality mobile telecommunications and data services in Iraq.',
    descriptionAr: 'آسيا سيل هي المزود الرائد لخدمات الاتصالات المتنقلة والبيانات عالية الجودة في العراق.',
    descriptionZh: 'Asiacell 是伊拉克领先的优质移动通信和数据服务提供商。',
    descriptionCkb: 'ئاسیاسێڵ پێشەنگە لە دابینکردنی خزمەتگوزارییەکانی پەیوەندی مۆبایل و داتا لە عێراق.',
    isActive: true,
    order: 1
  },
  {
    id: 'p-petrochina',
    name: 'PetroChina Iraq',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/PetroChina_logo.svg/1200px-PetroChina_logo.svg.png',
    websiteUrl: 'http://www.petrochina.com.cn',
    descriptionEn: 'Major energy infrastructure developer participating in Halfaya and Rumaila energy projects.',
    descriptionAr: 'مطور رئيسي للبنية التحتية للطاقة يشارك في مشاريع حقل الحلفاية والرميلة.',
    descriptionZh: '参与哈法亚与鲁迈拉能源项目的大型能源基础设施建设企业。',
    descriptionCkb: 'گەورە پەرەپێدەری ژێرخانی وزە لە پرۆژەکانی نەوتی حەلفایە و ڕومێلە.',
    isActive: true,
    order: 2
  },
  {
    id: 'p-cosco',
    name: 'COSCO Shipping',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/COSCO_Shipping_logo.svg/1280px-COSCO_Shipping_logo.svg.png',
    websiteUrl: 'https://lines.coscoshipping.com',
    descriptionEn: 'Global container shipping giant securing bilateral maritime logistics between China and Umm Qasr port.',
    descriptionAr: 'عملاق الشحن البحري العالمي لتأمين الخدمات اللوجستية البحرية بين الصين وميناء أم قصر.',
    descriptionZh: '保障中国至伊拉克乌姆盖斯尔港双向海运物流的全球航运巨擘。',
    descriptionCkb: 'کۆمپانیای گەورەی گواستنەوەی دەریایی نێوان چین و بەندەری ئوم قەسر.',
    isActive: true,
    order: 3
  }
];

export default function PartnersSection({ lang }: { lang: Locale }) {
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: ['0%', '-50%'],
      transition: { repeat: Infinity, duration: 32, ease: 'linear', repeatType: 'loop' }
    });
  }, [controls]);

  const { data: partners = FALLBACK_PARTNERS } = useQuery<PartnerItem[]>({
    queryKey: ['partners-home'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/partners');
        if (!res.ok) return FALLBACK_PARTNERS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data : FALLBACK_PARTNERS;
      } catch {
        return FALLBACK_PARTNERS;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: FALLBACK_PARTNERS
  });

  if (partners.length === 0) return null;

  const t = {
    en: { title: 'Strategic Partners & Sponsors', visitWebsite: 'Visit Official Website', close: 'Close Portal', type: 'Collaborating Partner' },
    ar: { title: 'الشركاء الاستراتيجيون والرعاة', visitWebsite: 'زيارة الموقع الرسمي', close: 'إغلاق النافذة', type: 'شريك متعاون' },
    zh: { title: '战略合作伙伴与赞助商', visitWebsite: '访问官方网站', close: '关闭窗口', type: '合作伙伴' },
    ckb: { title: 'هاوبەشە ستراتیژییەکان و سپۆنسەرەکان', visitWebsite: 'سەردانی ماڵپەڕی فەرمی بکە', close: 'داخستن', type: 'هاوبەشی هاوکار' }
  }[lang];

  return (
    <div className="w-full relative overflow-hidden my-8">
      <div className="absolute inset-0 bg-neutral-900/40 z-10" />
      <div className="absolute inset-0 z-0">
        <img src="https://iraqchinainstitute.org/wp-content/uploads/2025/02/16b-1024x731.png" alt="Background" className="w-full h-full object-cover blur-sm opacity-60" />
      </div>
      <div className="relative z-20 w-full bg-brand-800/80 py-16 backdrop-blur-md shadow-2xl border-y border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 mb-12 flex justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-widest text-white uppercase border-b-2 border-brand-800 pb-3 flex items-center gap-3">
            <span className="w-3 h-3 bg-brand-800 rounded-sm" />
            {t.title}
          </h2>
        </div>

        <div 
          className="relative w-full flex overflow-hidden border-y border-brand-800/50 py-10 bg-brand-950/40 backdrop-blur-xl shadow-inner"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({
          x: ['0%', '-50%'],
          transition: { repeat: Infinity, duration: 32, ease: 'linear', repeatType: 'loop' }
        })}
      >
        <motion.div 
          className="flex items-stretch gap-6 sm:gap-8 px-6 sm:px-8 whitespace-nowrap"
          animate={controls}
          style={{ width: 'max-content' }}
        >
          {[...partners, ...partners].map((p, idx) => (
            <div 
              key={`${p.id}-${idx}`} 
              onClick={() => setSelectedPartner(p)}
              className="cursor-pointer group/card flex-shrink-0 w-[280px] sm:w-[320px] bg-black/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-brand-800 hover:bg-black/70 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="h-16 w-full flex items-center justify-center">
                <img src={p.logoUrl} alt={p.name} className="h-full object-contain max-w-[180px] grayscale opacity-70 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="w-full h-px bg-neutral-800 my-2" />
              <div className="text-center">
                <h4 className="font-serif font-bold text-white text-lg group-hover/card:text-brand-400 transition-colors truncate w-full">{p.name}</h4>
                <p className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest mt-1">{t.type}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPartner && (
          <div 
            className="fixed inset-0 z-[100] bg-white dark:bg-neutral-900 flex flex-col items-center justify-start overflow-y-auto"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-4xl bg-white dark:bg-neutral-900 min-h-screen flex flex-col relative text-start transition-all"
              onClick={e => e.stopPropagation()}
              dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
            >
              {/* Header toolbar */}
              <div className="px-6 py-4 bg-ink-900 text-white border-b border-brand-800 flex justify-between items-center shrink-0 sticky top-0 z-20 shadow-md">
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-brand-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {t.type}
                </div>
                <button 
                  onClick={() => setSelectedPartner(null)}
                  className="text-white hover:text-brand-200 font-mono font-bold text-xs uppercase tracking-widest bg-brand-800 hover:bg-brand-900 px-4 py-2 rounded-md transition-colors cursor-pointer border border-brand-700 shadow-sm"
                >
                  ✕ {t.close}
                </button>
              </div>
              
              <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center text-center">
                <div className="w-full max-w-sm mb-10 p-10 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-lg shadow-sm flex items-center justify-center">
                  <img src={selectedPartner.logoUrl} alt={selectedPartner.name} className="h-32 object-contain" referrerPolicy="no-referrer" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black font-serif text-ink-900 dark:text-neutral-100 mb-6">{selectedPartner.name}</h3>
                
                <div className="w-16 h-1 bg-brand-800 mb-8 rounded-full" />
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-neutral-300 mb-12 leading-relaxed font-sans max-w-2xl text-justify md:text-center">
                  {lang === 'ar' && selectedPartner.descriptionAr 
                    ? selectedPartner.descriptionAr 
                    : lang === 'zh' && selectedPartner.descriptionZh 
                      ? selectedPartner.descriptionZh 
                      : lang === 'ckb' && selectedPartner.descriptionCkb
                        ? selectedPartner.descriptionCkb
                        : selectedPartner.descriptionEn}
                </p>
                
                {selectedPartner.websiteUrl && (
                  <a 
                    href={selectedPartner.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-brand-800 hover:bg-brand-900 text-white px-8 py-4 text-sm font-black uppercase tracking-widest rounded-md transition-colors duration-300 shadow-sm"
                  >
                    {t.visitWebsite}
                    <ExternalLink size={18} className={lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}
