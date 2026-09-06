import re

with open("src/components/Layout.tsx", "r") as f:
    content = f.read()

new_links = """
              <a href={`/${lang}#projects`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'zh' ? '基建管道跟踪' : 'Infrastructure Pipeline'}
              </a>
              <a href={`/${lang}#legal`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'zh' ? '法规与合规' : 'Legal & Regulatory Desk'}
              </a>
              <a href={`/${lang}#directory`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">
                <span className="text-[#990000]">▪</span> {lang === 'zh' ? '企业供应商名录' : 'Enterprise Supplier Directory'}
              </a>
"""

content = content.replace("""<Link to={`/${lang}/about`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">""", new_links + """              <Link to={`/${lang}/about`} className="text-gray-600 hover:text-[#990000] font-mono text-[10px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1">""")

with open("src/components/Layout.tsx", "w") as f:
    f.write(content)
print("Footer patched")
