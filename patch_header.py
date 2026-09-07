import re

with open("src/components/AdminLayout.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_header_title = """<h1 className="text-xs font-black text-ink-900 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  Authorized Environment
                </h1>"""

new_header_title = """<IcaLogo size={24} variant="mark" className="hidden sm:block opacity-80" />
                <h1 className="text-xs font-black text-ink-900 uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                  Authorized Environment
                </h1>"""

content = content.replace(old_header_title, new_header_title)

with open("src/components/AdminLayout.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Patched header")
