with open("src/components/Layout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

new_footer = """      <footer className="h-16 bg-[#FAFAFA] border-t border-[#111111] flex items-center justify-between px-6 text-[9px] font-bold uppercase tracking-widest max-w-[1024px] w-full mt-12">
        <div>&copy; {new Date().getFullYear()} {lang === 'ar' ? 'مجموعة تشينك الإعلامية' : lang === 'zh' ? '中伊传媒集团' : lang === 'ckb' ? 'گرووپی میدیایی چینک' : 'ChinQ Media Group'}</div>
        <div className="flex space-x-6 rtl:space-x-reverse items-center">
          <span>{lang === 'ar' ? 'مكتب بغداد' : lang === 'zh' ? '巴格达办事处' : lang === 'ckb' ? 'ئۆفیسی بەغداد' : 'Baghdad Office'}</span>
          <span>{lang === 'ar' ? 'مكتب بكين' : lang === 'zh' ? '北京办事处' : lang === 'ckb' ? 'ئۆفیسی پەکین' : 'Beijing Office'}</span>
          <span>{lang === 'ar' ? 'مركز البصرة' : lang === 'zh' ? '巴士拉中心' : lang === 'ckb' ? 'سەنتەری بەسرە' : 'Basra Hub'}</span>
          <Link to={`/${lang}/about`} className="hover:text-[#990000] transition-colors">
            {lang === 'ar' ? 'حول' : lang === 'zh' ? '关于' : lang === 'ckb' ? 'دەربارە' : 'About'}
          </Link>
        </div>
        <div>{lang === 'ar' ? 'غرفة الأخبار' : lang === 'zh' ? '新闻室' : lang === 'ckb' ? 'ژووری هەواڵ' : 'Newsroom'}: +964 1 555 1234</div>
      </footer>"""

old_footer = """      <footer className="h-16 bg-[#FAFAFA] border-t border-[#111111] flex items-center justify-between px-6 text-[9px] font-bold uppercase tracking-widest max-w-[1024px] w-full mt-12">
        <div>&copy; {new Date().getFullYear()} ChinQ Media Group</div>
        <div className="flex space-x-6 rtl:space-x-reverse items-center">
          <span>Baghdad Office</span>
          <span>Beijing Office</span>
          <span>Basra Hub</span>
          <Link to={`/${lang}/about`} className="hover:text-[#990000] transition-colors">
            {lang === 'ar' ? 'حول' : lang === 'zh' ? '关于' : lang === 'ckb' ? 'دەربارە' : 'About'}
          </Link>
        </div>
        <div>Newsroom: +964 1 555 1234</div>
      </footer>"""

content = content.replace(old_footer, new_footer)

with open("src/components/Layout.tsx", "w", encoding="utf-8") as f:
    f.write(content)
