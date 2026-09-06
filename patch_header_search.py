import re

with open("src/components/Header.tsx", "r") as f:
    content = f.read()

imports = """
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
"""

content = content.replace("import { Link } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';\nimport React, { useState } from 'react';\nimport { Search } from 'lucide-react';")


search_form = """
          <div className="w-full max-w-md mt-4 relative">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/${lang}/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'zh' ? "搜索企业和基建项目..." : "Search enterprise directory and infrastructure projects..."}
                className="w-full pl-10 pr-4 py-2 border border-[#111111]/30 bg-white/50 focus:bg-white focus:outline-none focus:border-[#990000] text-sm text-[#111111]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </form>
          </div>
"""

# Insert inside the header, right after the date/price ticker row
# Let's add state first
content = content.replace("export function Header({ lang }: { lang: Locale }) {", "export function Header({ lang }: { lang: Locale }) {\n  const [searchQuery, setSearchQuery] = useState('');\n  const navigate = useNavigate();")

# Then add the form
content = content.replace("          <div className=\"w-full flex flex-wrap justify-between items-center px-2 text-[10px] uppercase font-black tracking-widest mt-2 text-[#111111] border-t border-[#111111]/15 pt-2 gap-2\">", search_form + "\n          <div className=\"w-full flex flex-wrap justify-between items-center px-2 text-[10px] uppercase font-black tracking-widest mt-2 text-[#111111] border-t border-[#111111]/15 pt-2 gap-2\">")

with open("src/components/Header.tsx", "w") as f:
    f.write(content)
print("Header search patched")
