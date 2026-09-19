const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldNav = `        <nav className="h-11 border-t border-neutral-200 dark:border-neutral-800 flex items-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md relative z-30">
          <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 z-10 flex items-center px-6 bg-ink-900 dark:bg-neutral-800 text-white text-xs font-black uppercase tracking-[0.2em]">
            {lang === 'ar' ? 'عاجل' : lang === 'zh' ? '突发新闻' : lang === 'ckb' ? 'هەواڵی بەپەلە' : 'DISPATCH'}
          </div>

          <div className="flex-1 overflow-hidden ml-32 rtl:ml-0 rtl:mr-32">
            <div className="flex whitespace-nowrap animate-marquee rtl:animate-marquee-rtl items-center h-full">
              {breakingNews.length > 0 ? breakingNews.map((article, i) => {
                const translation = getTranslation(article);
                return (
                  <span key={article.id} className="inline-flex items-center mx-6 text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
                    <span className="w-1.5 h-1.5 bg-brand-800 rounded-full mx-4"></span>
                    <Link to={\`/\${lang}\`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors cursor-pointer">
                      {translation?.title || 'NEWS UPDATE'}
                    </Link>
                  </span>
                );
              }) : (
                <span className="inline-flex items-center mx-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
                  LOADING LATEST INTELLIGENCE DISPATCHES...
                </span>
              )}
            </div>
          </div>

          <div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4">
             <Link to={\`/\${lang}/about\`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'حول الوكالة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارە' : 'About'}
             </Link>
             <Link to={\`/\${lang}/join\`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'انضم للتحرير' : lang === 'zh' ? '加入编辑部' : lang === 'ckb' ? 'بەشداری بکە' : 'Join Editorial'}
             </Link>
             <PaymentSettlementButton lang={lang} />
             <PortalDropdown lang={lang} />
          </div>
        </nav>`;

const newNav = `        <nav className="h-11 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-stretch bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md relative z-30">
          <Link to={\`/\${lang}/live\`} className="flex-shrink-0 z-10 flex items-center px-4 sm:px-6 bg-ink-900 dark:bg-neutral-800 hover:bg-brand-800 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors cursor-pointer gap-2 sm:gap-3 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500 group-hover:bg-brand-400"></span>
            </span>
            <span>{t('liveDispatch')}</span>
          </Link>

          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 flex whitespace-nowrap animate-marquee rtl:animate-marquee-rtl items-center">
              {breakingNews.length > 0 ? breakingNews.map((article, i) => {
                const translation = getTranslation(article);
                return (
                  <span key={article.id} className="inline-flex items-center mx-6 text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
                    <span className="w-1.5 h-1.5 bg-brand-800 rounded-full mx-4"></span>
                    <Link to={\`/\${lang}/articles/\${article.slug || article.id}\`} className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors cursor-pointer">
                      {translation?.title || 'NEWS UPDATE'}
                    </Link>
                  </span>
                );
              }) : (
                <span className="inline-flex items-center mx-6 text-xs font-bold uppercase tracking-widest text-neutral-500">
                  LOADING LATEST INTELLIGENCE DISPATCHES...
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4">
             <Link to={\`/\${lang}/about\`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'حول الوكالة' : lang === 'zh' ? '关于我们' : lang === 'ckb' ? 'دەربارە' : 'About'}
             </Link>
             <Link to={\`/\${lang}/join\`} className="hidden lg:flex items-center text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 hover:text-brand-800 transition-colors">
               {lang === 'ar' ? 'انضم للتحرير' : lang === 'zh' ? '加入编辑部' : lang === 'ckb' ? 'بەشداری بکە' : 'Join Editorial'}
             </Link>
             <PaymentSettlementButton lang={lang} />
             <PortalDropdown lang={lang} />
          </div>
        </nav>`;

if (code.includes(oldNav)) {
  code = code.replace(oldNav, newNav);
  fs.writeFileSync('src/components/Header.tsx', code);
  console.log('Successfully replaced old nav block.');
} else {
  console.log('Old nav block not found. Checking if something slightly differs...');
  console.log('Length of oldNav:', oldNav.length);
}
