import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';
import { MarketTicker } from './MarketTicker';
import { Locale } from '../types';
import { EnterpriseSidebar } from './EnterpriseSidebar';

export function Layout({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans flex flex-col items-center">
      <Header lang={lang} />
      <MarketTicker lang={lang} />
      {children}
      <EnterpriseSidebar lang={lang} />
      <footer className="bg-white border-t-4 border-double border-[#111111] max-w-[1024px] w-full mt-16 px-6 py-12 text-xs text-[#111111] flex flex-col gap-10">
        {/* Top Section: Grid layout for columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#111111]/10">
          
          {/* Column 1: Identity, Copyright, and detailed Legal Brief */}
          <div className="md:col-span-6 space-y-4">
            <div className="font-serif text-lg font-black tracking-tighter uppercase text-[#990000]">
              {lang === 'ar' ? 'مجموعة تشينك الإعلامية' : lang === 'zh' ? '中伊传媒集团' : lang === 'ckb' ? 'گرووپی میدیایی چینک' : 'ChinQ Media Group'}
            </div>
            <div className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">
              &copy; {new Date().getFullYear()} {lang === 'ar' ? 'مجموعة تشينك الإعلامية. جميع الحقوق محفوظة.' : lang === 'zh' ? '中伊传媒集团。保留所有权利。' : lang === 'ckb' ? 'گرووپی میدیایی چینک. هەموو مافەکان پارێزراون.' : 'ChinQ Media Group. All rights reserved.'}
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-normal text-justify max-w-xl">
              {lang === 'ar' ? (
                'تعمل مجموعة تشينك الإعلامية كمنبر إعلامي ومجمع معلوماتي مستقل ومسجل في العراق والصين. جميع الأبحاث الخاصة والتحليلات التجارية الثنائية ومؤشرات الأسواق محمية بموجب معاهدات الملكية الفكرية الدولية وقوانين الملكية الفكرية في جمهورية العراق وجمهورية الصين الشعبية. يُحظر تماماً إعادة الإنتاج أو التوزيع أو الترجمة دون إذن كتابي صريح من إدارة النشر. لا تشكل بيانات ودراسات السوق المقدمة مشورة مالية أو استثمارية أو قانونية رسمية.'
              ) : lang === 'zh' ? (
                '中伊传媒集团（ChinQ Media Group）是在伊拉克与中国依法注册设立的独立主权情报与商业新闻联合财团。本网站所刊载之所有专有研究、双边贸易分析以及市场行情指标均受国际知识产权条约保护。未经明确书面许可，严禁以任何形式进行复制、分发、编译或二次传播。此处提供的所有数据、信息及专题报告均仅供学术与行业参考，不构成任何正式的财务、投资、运营或法律建议。'
              ) : lang === 'ckb' ? (
                'گرووپی میدیایی چینک (ChinQ Media Group) وەک دەزگایەکی سەربەخۆی زانیاری و هاوبەشی هەواڵی بازرگانی تۆمارکراو لە عێراق و چین کار دەکات. هەموو توێژینەوە تایبەتەکان، شیکردنەوەکانی بازرگانی دوولایەنە، و پیشاندەرانی بازاڕ پارێزراون بەپێی پەیماننامە نێودەوڵەتییەکانی مافی پاراستنی فیکری و یاساکانی پاراستنی مافی بڵاوکردنەوە لە عێراق و چین. دووبارە بەرهەمهێنانەوە، دابەشکردن، یان وەرگێڕان بەبێ مۆڵەتی نووسراوی ڕوون بە توندی قەدەغەیە. داتا و توێژینەوەکانی بازاڕ بە هیچ شێوازێک نابنە ڕاوێژکاری فەرمی دارایی یان یاسایی.'
              ) : (
                'ChinQ Media Group operates as an independent sovereign intelligence and commercial news syndicate registered in Iraq and China. All proprietary research, bilateral trade analyses, and real-time market tickers published herein are protected under international intellectual property treaties. Reproduction, redistribution, translation, or transmission of any study or article without explicit written authorization is strictly prohibited. Market data, statistics, and professional research papers do not constitute formal financial, investment, or legal advice.'
              )}
            </p>
          </div>

          {/* Column 2: Bureaus */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-black uppercase tracking-widest text-[#990000]">
              {lang === 'ar' ? 'المكاتب الإقليمية' : lang === 'zh' ? '分社机构' : lang === 'ckb' ? 'نووسینگەکان' : 'Regional Bureaus'}
            </h4>
            <ul className="space-y-2 text-[11px] text-gray-600 font-mono">
              <li className="flex flex-col">
                <span className="font-bold text-gray-900">{lang === 'ar' ? 'مكتب بغداد الرئيسي' : lang === 'zh' ? '巴格达总部' : lang === 'ckb' ? 'ئۆفیسی سەرەکی بەغداد' : 'Baghdad HQ'}</span>
                <span>Karada District, Baghdad, Iraq</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-gray-900">{lang === 'ar' ? 'مكتب بكين' : lang === 'zh' ? '北京办事处' : lang === 'ckb' ? 'ئۆفیسی پەکین' : 'Beijing Bureau'}</span>
                <span>Chaoyang District, Beijing, PRC</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-gray-900">{lang === 'ar' ? 'مركز البصرة اللوجستي' : lang === 'zh' ? '巴士拉枢纽' : lang === 'ckb' ? 'سەنتەری لۆجستی بەسرە' : 'Basra Logistics Hub'}</span>
                <span>Al-Ashar, Basra, Iraq</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Links & Compliance */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-black uppercase tracking-widest text-[#990000]">
              {lang === 'ar' ? 'القوانين والروابط' : lang === 'zh' ? '法律与链接' : lang === 'ckb' ? 'بەستەر و یاساییەکان' : 'Legal & Links'}
            </h4>
            <div className="flex flex-col gap-2">
              <Link to={`/${lang}/women`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'ar' ? 'بوابة المرأة والسياسات والتمكين' : lang === 'zh' ? '女性与双边政策专区' : lang === 'ckb' ? 'دەروازەی ماف و بەهێزکردنی ئافرەتان' : 'Women Leadership & Policy Portal'}
              </Link>
              <Link to={`/${lang}/tourism`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'ar' ? 'بوابة السياحة والتبادل الثقافي' : lang === 'zh' ? '文旅与双向遗产门户' : lang === 'ckb' ? 'دەروازەی گەشتوگوزار و کەلەپوور' : 'Bilateral Tourism & Heritage Portal'}
              </Link>
              <Link to={`/${lang}/books`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'ar' ? 'المكتبة السيادية والكتب (50 مجلداً)' : lang === 'zh' ? '主权书库与学术图书 (50册)' : lang === 'ckb' ? 'کتێبخانەی شینک (٥٠ بەرگ)' : 'Sovereign Books Library (50 Vols)'}
              </Link>
              <Link to={`/${lang}/about`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'ar' ? 'حول المجموعة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارەی ئێمە' : 'About ChinQ'}
              </Link>
              <Link to={`/${lang}/join`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'ar' ? 'انضم لشبكة المحررين' : lang === 'zh' ? '加入编辑团队' : lang === 'ckb' ? 'پەیوەندی بە تیمی نووسەرانەوە بکە' : 'Join Editorial Team'}
              </Link>
              <div className="text-gray-500 font-mono text-[10px] pt-1">
                <div className="font-bold text-gray-900 mb-0.5">
                  {lang === 'ar' ? 'غرفة الأخبار والاتصالات' : lang === 'zh' ? '新闻室与通联' : lang === 'ckb' ? 'پەیوەندی ژووری هەواڵ' : 'Newsroom & Telex'}
                </div>
                <div>TEL: +964 1 555 1234</div>
                <div>FAX: +964 1 555 1235</div>
                <div>telex@chinq.media</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-400 font-bold tracking-wider uppercase">
          <div>
            CHINQ SINO-IRAQI NEWS & STRATEGIC STUDY NETWORK
          </div>
          <div className="mt-2 sm:mt-0">
            {lang === 'ar' ? 'بوابة التحليل السيادي' : lang === 'zh' ? '主权分析门户' : lang === 'ckb' ? 'دەروازەی شیکردنەوەی سەروەری' : 'Sovereign Analytics Portal'}
          </div>
        </div>
      </footer>
    </div>
  );
}
