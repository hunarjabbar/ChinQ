import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Target regex to remove the Link from PortalDropdown
pattern = r'<Link \s*to=\{`/\$\{lang\}/live`\}\s*className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group border-b border-neutral-100 dark:border-neutral-800"\s*onClick=\{\(\) => setIsOpen\(false\)\}\s*>\s*<span className="relative flex h-2 w-2">\s*<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>\s*<span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>\s*</span>\s*<span className="text-xs font-black uppercase tracking-widest text-neutral-800 dark:text-neutral-200 group-hover:text-brand-800 transition-colors">\s*\{t\(\'liveDispatch\'\)\}\s*</span>\s*</Link>'

content = re.sub(pattern, '', content)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)

print("Replacement successful.")
