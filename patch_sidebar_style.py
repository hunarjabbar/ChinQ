with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make the sidebar background pure white, like WSJ
content = content.replace(
    'bg-[#FAFAFA] shadow-[0_0_40px_rgba(0,0,0,0.2)]',
    'bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)]'
)

# Refine header
content = content.replace(
    '<div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#111111]">',
    '<div className="flex items-center justify-between px-6 py-5 border-b-4 border-[#111111]">'
)

content = content.replace(
    '<h2 className="font-serif font-black text-lg tracking-widest text-[#111111] uppercase">CHINQ Enterprise</h2>',
    '<h2 className="font-serif font-black text-xl tracking-tight text-[#111111] uppercase">CHINQ Enterprise</h2>'
)

# Tabs
content = content.replace(
    '<div className="flex w-full shrink-0 border-b border-[#111111]/10 bg-[#FAFAFA] font-bold uppercase tracking-wider text-[9px]">',
    '<div className="flex w-full shrink-0 border-b border-[#111111] bg-white font-bold uppercase tracking-wider text-[9px] overflow-x-auto no-scrollbar">'
)

# Footer
content = content.replace(
    '<div className="p-4 bg-white border-t border-[#111111]/10 text-center text-[9px] text-gray-500 font-mono tracking-widest shrink-0 uppercase">',
    '<div className="p-4 bg-neutral-50 border-t border-[#111111] text-center text-[9px] text-black font-bold tracking-widest shrink-0 uppercase">'
)

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
