
import React from 'react';
import { motion } from 'motion/react';
import { Locale } from '../types';
import { useI18n } from '../hooks/useI18n';
import { Globe2, TrendingUp, Ship, Train, Construction, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  locationEn: string;
  locationAr: string;
  locationZh: string;
  locationCkb: string;
  nameEn: string;
  nameAr: string;
  nameZh: string;
  nameCkb: string;
  progress: number;
  statusEn: string;
  statusAr: string;
  statusZh: string;
  statusCkb: string;
}

const PROJECTS: Project[] = [
  {
    id: 'br-1',
    locationEn: 'Maysan Province',
    locationAr: 'محافظة ميسان',
    locationZh: '梅桑省',
    locationCkb: 'پارێزگای مەیسان',
    nameEn: 'Solar Farm Stage 2',
    nameAr: 'مزرعة الطاقة الشمسية - المرحلة الثانية',
    nameZh: '太阳能发电场第二阶段',
    nameCkb: 'وێستگەی کارەبای سۆلار - قۆناغی ٢',
    progress: 85,
    statusEn: 'Structural Commissioning',
    statusAr: 'التشغيل الهيكلي',
    statusZh: '结构调试中',
    statusCkb: 'لە قۆناغی کارپێکردندایە'
  },
  {
    id: 'br-2',
    locationEn: 'Anbar Refinery',
    locationAr: 'مصفى الأنبار',
    locationZh: '安巴尔炼油厂',
    locationCkb: 'پاڵاوگەی ئەنبار',
    nameEn: 'Technical Feasibility',
    nameAr: 'الجدوى الفنية',
    nameZh: '技术可行性研究',
    nameCkb: 'لێکۆڵینەوەی تەکنیکی',
    progress: 32,
    statusEn: 'Preliminary Design',
    statusAr: 'التصميم الأولي',
    statusZh: '初步设计阶段',
    statusCkb: 'دیزاینی سەرەتایی'
  },
  {
    id: 'br-3',
    locationEn: 'Al-Faw Port',
    locationAr: 'ميناء الفاو',
    locationZh: '法奥港',
    locationCkb: 'بەندەری فاو',
    nameEn: 'Deepwater Berth 5',
    nameAr: 'رصيف المياه العميقة ٥',
    nameZh: '深水泊位 5 号',
    nameCkb: 'بەندەری ئاوی قووڵ ٥',
    progress: 94,
    statusEn: 'Final Inspection',
    statusAr: 'الفحص النهائي',
    statusZh: '最终验收阶段',
    statusCkb: 'پشکنینی کۆتایی'
  },
  {
    id: 'br-4',
    locationEn: 'Baghdad-Basra Railway',
    locationAr: 'سكة حديد بغداد-البصرة',
    locationZh: '巴格达-巴士拉铁路',
    locationCkb: 'هێڵی ئاسنی بەغدا-بەسرە',
    nameEn: 'Signal Digitization',
    nameAr: 'رقمنة الإشارات',
    nameZh: '信号数字化改造',
    nameCkb: 'دیجیتاڵکردنی ئاماژەکان',
    progress: 60,
    statusEn: 'Fiber Installation',
    statusAr: 'تركيب الألياف الضوئية',
    statusZh: '光纤铺设中',
    statusCkb: 'دانانی فایبەر ئۆپتیک'
  }
];

export function BeltRoadTrackingSection({ lang }: { lang: Locale }) {
  const { t } = useI18n(lang);
  const isRtl = lang === 'ar' || lang === 'ckb';

  const getLocalized = (p: Project, field: 'location' | 'name' | 'status') => {
    if (lang === 'ar') return p[`${field}Ar`];
    if (lang === 'zh') return p[`${field}Zh`];
    if (lang === 'ckb') return p[`${field}Ckb`];
    return p[`${field}En`];
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-900 border-t-4 border-brand-800 p-4 sm:p-6 md:p-8 shadow-xs rounded-lg animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-brand-800 pb-4 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-800 text-white rounded-sm shadow-sm">
            <Globe2 className="w-5 h-5 animate-spin-slow" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-brand-800 dark:text-neutral-100">
            {t('beltRoad')}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 size={14} />
          <span>{t('liveProjectTelemetry')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROJECTS.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-neutral-500 block">
                  {getLocalized(project, 'location')}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-ink-900 dark:text-neutral-100 leading-tight">
                  {getLocalized(project, 'name')}
                </h3>
              </div>
              <div className="p-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-brand-800 dark:text-brand-400">
                {project.id === 'br-1' && <Construction size={18} />}
                {project.id === 'br-2' && <TrendingUp size={18} />}
                {project.id === 'br-3' && <Ship size={18} />}
                {project.id === 'br-4' && <Train size={18} />}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-[11px] font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-widest">
                  {getLocalized(project, 'status')}
                </span>
                <span className="text-sm font-black text-brand-800 dark:text-brand-400">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-neutral-700 h-2 rounded-full overflow-hidden border border-gray-200/50 dark:border-neutral-600/50 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-brand-800 h-full rounded-full shadow-[0_0_8px_rgba(153,27,27,0.3)]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-5 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-brand-800 dark:text-brand-400" size={20} />
          <p className="text-xs font-bold text-gray-600 dark:text-neutral-400 uppercase tracking-wider">
            {t('totalProjectedInvestment')}
          </p>
        </div>
        <button className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 bg-brand-800 text-white rounded-xs hover:bg-brand-900 transition-colors cursor-pointer shadow-sm">
          {t('viewRoadmap')}
        </button>
      </div>
    </section>
  );
}
