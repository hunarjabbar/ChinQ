import { motion } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { Locale } from '../types';
import { EnterpriseSidebar } from './EnterpriseSidebar';
import { SocialFooterShowcase, FloatingSocialDock } from './SocialLinks';
import { NewsletterSignup } from './NewsletterSignup';
import { useI18n } from '../hooks/useI18n';
import { useSiteStore } from '../store/useSiteStore';
import { AlertTriangle, HeartHandshake, GraduationCap, Briefcase } from 'lucide-react';
import { SystemAnnouncementBanner } from './SystemAnnouncementBanner';
import { IcaLogo } from './IcaLogo';
import { LegalModal } from './LegalModal';
import { FooterVisionMission } from './FooterVisionMission';
import { TalentRegistrationModal, TalentRegistrationType } from './TalentRegistrationModal';
import { InstitutePortalCTA } from './InstitutePortalCTA';

export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {
  const { t } = useI18n(lang);
  const { siteName, systemMaintenance, contactEmail, darkMode } = useSiteStore();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');
  const [talentModalOpen, setTalentModalOpen] = useState(false);
  const [talentType, setTalentType] = useState<TalentRegistrationType>('volunteer');

  const openLegalModal = (tab: 'privacy' | 'terms') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const openTalentModal = (type: TalentRegistrationType) => {
    setTalentType(type);
    setTalentModalOpen(true);
  };
  
  useEffect(() => {
    document.title = siteName;
  }, [siteName]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-neutral-950 text-ink-900 dark:text-neutral-100 font-sans flex flex-col transition-colors duration-300 overflow-x-hidden">
      <SystemAnnouncementBanner lang={lang} />
      {systemMaintenance && (
        <div className="w-full bg-brand-600 text-white text-center py-2 px-4 font-bold text-sm tracking-wide flex justify-center items-center gap-2">
          <AlertTriangle size={16} /> 
          System Maintenance: Some features may be temporarily read-only while enterprise upgrades are deployed across regional hubs.
        </div>
      )}

      <Header lang={lang} />
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center flex-grow">
        {children}
      </main>
      <EnterpriseSidebar lang={lang} />
      <footer id="legal" className="w-full bg-white dark:bg-neutral-900 border-t-2 border-ink-900 dark:border-neutral-700 mt-8 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-xs text-neutral-700 dark:text-neutral-300 flex flex-col gap-8">
          <FooterVisionMission lang={lang} />
          {/* Top Section: Grid layout for columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-neutral-100 dark:border-neutral-800">
            
            {/* Initiatives Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                {t('footer.initiativesHeading')}
              </h4>
              <div className="flex flex-col gap-2.5">
                <Link to={`/${lang}/summit`} className="text-neutral-500 hover:text-brand-800 text-xs font-bold uppercase">{t('nav.summit')}</Link>
                <Link to={`/${lang}/chinese-center`} className="text-neutral-500 hover:text-brand-800 text-xs font-bold uppercase">{t('nav.chineseCenter')}</Link>
                <Link to={`/${lang}/visa-centre`} className="text-neutral-500 hover:text-brand-800 text-xs font-bold uppercase">{t('nav.visaCentre')}</Link>
              </div>
            </div>

            {/* Institute Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                {t('footerInstituteHeading')}
              </h4>
              <div className="flex flex-col gap-2.5">
                <InstitutePortalCTA lang={lang} variant="button" className="px-4 py-2 text-[10px]" />
                {[
                  { to: `/${lang}/institute/about`, label: t('footerAbout') },
                  { to: `/${lang}/institute/publications`, label: t('footerPublications') },
                  { to: `/${lang}/institute/data-hub`, label: t('footerDataHub') },
                  { to: `/${lang}/institute/experts`, label: t('footerExperts') },
                ].map((link, idx) => (
                  <Link 
                    key={idx}
                    to={link.to} 
                    className="text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group py-0.5"
                  >
                    <span className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-brand-800 dark:group-hover:bg-brand-400 transition-colors rounded-full shrink-0"></span>
                    <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bilateral Talent & Fellowship Gateway: Two Pulsing Component Red Buttons */}
            <div className="col-span-1 md:col-span-12 bg-white dark:bg-neutral-800/80 rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1.5 max-w-2xl text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-800 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-800"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-brand-800 dark:text-rose-400">
                    {t('talentGatewayTitle')}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-brand-800 dark:text-neutral-100 tracking-tight">
                  {t('talentGatewayJoin')}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  {t('talentGatewayDesc')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                {/* Pulsing Red Button 0: Career Announcement / Talent Acquisition */}
                <button
                  id="btn-career-announcement"
                  type="button"
                  onClick={() => openTalentModal('career')}
                  className="relative group flex items-center justify-center gap-3 px-6 py-3.5 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden shrink-0"
                >
                  {/* Outer Pulsing Glow */}
                  <span className="absolute -inset-0.5 rounded-xl bg-brand-800 opacity-40 group-hover:opacity-75 blur-sm animate-pulse transition duration-1000"></span>
                  
                  {/* Ping Indicator */}
                  <span className="relative flex h-2.5 w-2.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>

                  <Briefcase className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
                  
                  <span className="relative z-10 whitespace-nowrap">
                    {t('careerAnnouncement')}
                  </span>
                </button>

                {/* Pulsing Red Button 1: Become A Volunteer */}
                <button
                  id="btn-volunteer-register"
                  type="button"
                  onClick={() => openTalentModal('volunteer')}
                  className="relative group flex items-center justify-center gap-3 px-6 py-3.5 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden shrink-0"
                >
                  {/* Outer Pulsing Glow */}
                  <span className="absolute -inset-0.5 rounded-xl bg-brand-800 opacity-40 group-hover:opacity-75 blur-sm animate-pulse transition duration-1000"></span>
                  
                  {/* Ping Indicator */}
                  <span className="relative flex h-2.5 w-2.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>

                  <HeartHandshake className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
                  
                  <span className="relative z-10 whitespace-nowrap">
                    {t('becomeVolunteer')}
                  </span>
                </button>

                {/* Pulsing Red Button 2: Become an Intern */}
                <button
                  id="btn-intern-register"
                  type="button"
                  onClick={() => openTalentModal('intern')}
                  className="relative group flex items-center justify-center gap-3 px-6 py-3.5 bg-brand-800 hover:bg-brand-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-800/25 active:scale-98 cursor-pointer border border-brand-700 overflow-hidden shrink-0"
                >
                  {/* Outer Pulsing Glow */}
                  <span className="absolute -inset-0.5 rounded-xl bg-brand-800 opacity-40 group-hover:opacity-75 blur-sm animate-pulse transition duration-1000 delay-300"></span>
                  
                  {/* Ping Indicator */}
                  <span className="relative flex h-2.5 w-2.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-90"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>

                  <GraduationCap className="w-4 h-4 text-white relative z-10 group-hover:scale-110 transition-transform shrink-0" />
                  
                  <span className="relative z-10 whitespace-nowrap">
                    {t('becomeIntern')}
                  </span>
                </button>
              </div>
            </div>
          
            {/* Column 1: Identity, Copyright, and detailed Legal Brief */}
          <div className="md:col-span-3 space-y-5 text-left rtl:text-right">
            <div className="flex items-center gap-3">
              <IcaLogo size={42} variant="mark" />
              <div>
                <div className="text-2xl font-black tracking-tight text-brand-800 rtl:font-sans">
                  {lang === 'ar' ? 'مجموعة الوكالة العراقية الصينية' : lang === 'zh' ? '伊中通讯社传媒集团' : lang === 'ckb' ? 'گرووپی ئاژانسی عێراقی - چینی' : `${siteName} ${t('footerMediaGroup')}`}
                </div>
                <div className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">
                  &copy; {new Date().getFullYear()} {lang === 'ar' ? 'مجموعة الوكالة العراقية الصينية. جميع الحقوق محفوظة.' : lang === 'zh' ? '伊中通讯社传媒集团。保留所有权利。' : lang === 'ckb' ? 'گرووپی ئاژانسی عێراقی - چینی. هەموو مافەکان پارێزراون.' : `${siteName} ${t('footerMediaGroup')}. All rights reserved.`}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-medium text-justify max-w-xl opacity-80">
              {t('footerLegalNotice')}
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              {t('regionalBureaus')}
            </h4>
            <ul className="space-y-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <li className="flex flex-col gap-0.5">
                <span className="font-bold text-brand-800 dark:text-neutral-200 uppercase tracking-wider">{t('baghdadHq')}</span>
                <span className="opacity-75">Karada District, Baghdad, Iraq</span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-bold text-brand-800 dark:text-neutral-200 uppercase tracking-wider">{t('beijingBureau')}</span>
                <span className="opacity-75">Chaoyang District, Beijing, PRC</span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-bold text-brand-800 dark:text-neutral-200 uppercase tracking-wider">{t('basraHub')}</span>
                <span className="opacity-75">Al-Ashar, Basra, Iraq</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Links & Compliance */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
              {lang === 'ar' ? 'القوانين والروابط' : lang === 'zh' ? '法律与链接' : lang === 'ckb' ? 'بەستەر و یاساییەکان' : 'Legal & Links'}
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { id: 'women', to: `/${lang}/women`, label: lang === 'ar' ? 'بوابة المرأة والسياسات' : lang === 'zh' ? '女性与双边政策专区' : lang === 'ckb' ? 'دەروازەی سەرکردایەتی ژنان' : 'Women Leadership Portal' },
                { id: 'tourism', to: `/${lang}/tourism`, label: lang === 'ar' ? 'بوابة السياحة والتبادل' : lang === 'zh' ? '文旅与双向遗产门户' : lang === 'ckb' ? 'دەروازەی گەشتیاری دوولایەنە' : 'Bilateral Tourism Portal' },
                { id: 'books', to: `/${lang}/books`, label: lang === 'ar' ? 'المكتبة المستقلة' : lang === 'zh' ? '主权书库与学术图书' : lang === 'ckb' ? 'کتێبخانەی سەربەخۆ' : 'Sovereign Books Library' },
                { id: 'projects', to: `/${lang}#projects`, label: lang === 'ar' ? 'متابعة مشاريع البنية التحتية' : lang === 'zh' ? '基建管道跟踪' : lang === 'ckb' ? 'پڕۆژەکانی ژێرخان' : 'Infrastructure Pipeline', targetId: 'projects' },
                { id: 'legal-desk', to: `/${lang}#legal`, label: lang === 'ar' ? 'القوانين والامتثال' : lang === 'zh' ? '法规与合规' : lang === 'ckb' ? 'یاسا و پابەندبوون' : 'Legal & Regulatory Desk', targetId: 'legal' },
                { id: 'directory', to: `/${lang}#directory`, label: lang === 'ar' ? 'دليل الشركات الموردة' : lang === 'zh' ? '企业供应商名录' : lang === 'ckb' ? 'پێڕستی کۆمپانیاکان' : 'Enterprise Supplier Directory', targetId: 'directory' },
                { id: 'settlement', to: `/${lang}/settlement`, label: lang === 'ar' ? 'التسويات النقدية والتوريد' : lang === 'zh' ? '双边结算与原厂采购' : lang === 'ckb' ? 'یەکلاییکردنەوەی دارایی و دابینکردن' : 'Bilateral Settlement & Sourcing' },
                { id: 'about', to: `/${lang}/about`, label: lang === 'ar' ? 'حول الوكالة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارەی ئاژانس' : 'About Iraqi-Chinese Agency' },
                { id: 'join', to: `/${lang}/join`, label: lang === 'ar' ? 'انضم لشبكة المحررين' : lang === 'zh' ? '加入编辑团队' : lang === 'ckb' ? 'پەیوەندی بە دەستەی سەرنووسەرانەوە بکە' : 'Join Editorial Team' },
                { id: 'admin', to: `/${lang}/admin`, label: lang === 'ar' ? 'بوابة المؤسسة' : lang === 'zh' ? '企业后台' : lang === 'ckb' ? 'دەروازەی دامەزراوە' : 'Enterprise Portal' }
              ].map((link) => (
                <Link 
                  key={link.id}
                  to={link.to} 
                  aria-label={link.id === 'about' ? (
                    lang === 'ar' ? 'فتح نافذة حول الوكالة العراقية الصينية' :
                    lang === 'zh' ? '打开关于伊拉克中国机构模态框' :
                    lang === 'ckb' ? 'کردنەوەی پەنجەرەی دەربارە' :
                    'Open About Modal'
                  ) : undefined}
                  onClick={(e) => {
                    if (link.targetId) {
                      const el = document.getElementById(link.targetId);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 group py-0.5"
                >
                  <span className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 group-hover:bg-brand-800 dark:group-hover:bg-brand-400 transition-colors rounded-full shrink-0"></span>
                  <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">{link.label}</span>
                </Link>
              ))}
              
              {/* Dedicated Legal & Privacy Hub Triggers */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
                <button
                  onClick={() => openLegalModal('privacy')}
                  className="text-left rtl:text-right text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 group py-0.5"
                >
                  <span className="w-1.5 h-1.5 bg-brand-800 dark:bg-brand-400 group-hover:scale-125 transition-transform rounded-full shrink-0"></span>
                  <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                    {t('privacyRights')}
                  </span>
                </button>
                <button
                  onClick={() => openLegalModal('terms')}
                  className="text-left rtl:text-right text-neutral-500 hover:text-brand-800 dark:hover:text-brand-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 group py-0.5"
                >
                  <span className="w-1.5 h-1.5 bg-brand-800 dark:bg-brand-400 group-hover:scale-125 transition-transform rounded-full shrink-0"></span>
                  <span className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                    {t('termsOfUse')}
                  </span>
                </button>
              </div>

              <div className="text-neutral-400 dark:text-neutral-500 text-xs pt-4 mt-1 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5">
                <div className="text-brand-800 dark:text-neutral-200 font-bold uppercase tracking-wider mb-2">
                  {t('newsroomTelex')}
                </div>
                <div>
                  <a href="tel:+96407735720984" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">TEL: 0964 07735720984</a>
                </div>
                <div>
                  <a href="tel:+96415551235" className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors">FAX: +964 1 555 1235</a>
                </div>
                <div>
                  <a 
                    href={`mailto:${contactEmail}`} 
                    className="inline-flex items-center gap-2 group/email text-brand-800 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-all duration-300"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-800 opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-800/40"></span>
                    </span>
                    <span className="lowercase font-bold border-b border-brand-800/20 group-hover/email:border-brand-800 transition-colors">
                      {contactEmail}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        
        {/* Newsletter Signup */}
        <div className="w-full border-t border-gray-100 pt-10 pb-4">
          <NewsletterSignup lang={lang} />
        </div>
        
        {/* Global Social Media Syndicate Channels */}

        <SocialFooterShowcase lang={lang} />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 font-bold tracking-wider uppercase">
          <div>
            IRAQI-CHINESE AGENCY SINO-IRAQI NEWS & STRATEGIC STUDY NETWORK
          </div>
          <div className="mt-2 sm:mt-0">
            {t('sovereignAnalyticsPortal')}
          </div>
        </div>
        </div>
      </footer>

      {/* Floating Speed-Dial Social Media Hub */}
      <FloatingSocialDock lang={lang} />

      {/* Comprehensive Legal & Privacy Policy Modal Hub */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
        lang={lang}
      />

      {/* Volunteer & Intern Registration Sovereign Modal with Synchronized PDF Download */}
      <TalentRegistrationModal
        isOpen={talentModalOpen}
        onClose={() => setTalentModalOpen(false)}
        initialType={talentType}
        lang={lang}
      />
    </div>
  );
}
