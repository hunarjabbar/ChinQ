import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Replace the nav opening up to the marquee wrapper
old_nav_start = r'<nav className="h-11 border-t border-neutral-200 dark:border-neutral-800 flex items-center bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md relative z-30">\s*<div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 bottom-0 z-10 flex items-center px-6 bg-ink-900 dark:bg-neutral-800 text-white text-xs font-black uppercase tracking-\[0\.2em\]">\s*\{lang === \'ar\' \? \'عاجل\' : lang === \'zh\' \? \'突发新闻\' : lang === \'ckb\' \? \'هەواڵی بەپەلە\' : \'DISPATCH\'\}\s*</div>\s*<div className="flex-1 overflow-hidden ml-32 rtl:ml-0 rtl:mr-32">'
new_nav_start = '''<nav className="h-11 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-stretch bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md relative z-30">
          <Link to={`/${lang}/live`} className="flex-shrink-0 z-10 flex items-center px-4 sm:px-6 bg-ink-900 dark:bg-neutral-800 hover:bg-brand-800 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-colors cursor-pointer gap-2 sm:gap-3 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500 group-hover:bg-brand-400 transition-colors"></span>
            </span>
            <span>{t('liveDispatch')}</span>
          </Link>
          <div className="flex-1 overflow-hidden relative">'''

content = re.sub(old_nav_start, new_nav_start, content)

# Replace the absolute right-0 with flex-shrink-0
old_right = r'<div className="absolute right-0 rtl:right-auto rtl:left-0 top-0 bottom-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4">'
new_right = r'<div className="flex-shrink-0 z-40 flex items-center px-4 bg-white dark:bg-neutral-900 border-l rtl:border-l-0 rtl:border-r border-neutral-100 dark:border-neutral-800 gap-3 sm:gap-4">'

content = re.sub(old_right, new_right, content)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)

print("Replacement successful.")
