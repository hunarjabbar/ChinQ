import re

with open("src/components/Header.tsx", "r") as f:
    content = f.read()

new_links = """
           <Link to={`/${lang}/books`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors flex items-center gap-1">
             <span className="text-[#990000]">📚</span> {lang === 'ar' ? 'الكتب' : lang === 'zh' ? '图书' : lang === 'ckb' ? 'کتێبەکان' : 'BOOKS'}
           </Link>
           <a href={`/${lang}#projects`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors hidden xl:flex items-center gap-1">
             <span className="text-[#990000]">🏗️</span> {lang === 'zh' ? '基建' : 'PROJECTS'}
           </a>
           <a href={`/${lang}#legal`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors hidden xl:flex items-center gap-1">
             <span className="text-[#990000]">⚖️</span> {lang === 'zh' ? '法规' : 'LEGAL'}
           </a>
           <a href={`/${lang}#directory`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors hidden xl:flex items-center gap-1">
             <span className="text-[#990000]">🏢</span> {lang === 'zh' ? '企业' : 'DIRECTORY'}
           </a>
"""

content = content.replace("""           <Link to={`/${lang}/books`} className="text-[14px] font-mono font-black uppercase tracking-widest hover:text-[#990000] text-[#111111] transition-colors flex items-center gap-1">
             <span className="text-[#990000]">📚</span> {lang === 'ar' ? 'الكتب' : lang === 'zh' ? '图书' : lang === 'ckb' ? 'کتێبەکان' : 'BOOKS'}
           </Link>""", new_links)

with open("src/components/Header.tsx", "w") as f:
    f.write(content)
print("Header patched")
