with open("src/pages/CategoryPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Change h4
old_h4 = 'className="font-serif text-xl leading-tight font-bold group-hover:underline mt-1 text-[#111111] mb-2"'
new_h4 = 'className="font-serif text-2xl leading-tight font-black group-hover:text-[#990000] mt-2 text-[#111111] mb-3 transition-colors"'
content = content.replace(old_h4, new_h4)

# Change h2
old_h2 = 'className="text-4xl font-serif font-black tracking-tight text-[#111111] uppercase"'
new_h2 = 'className="text-5xl font-serif font-black tracking-tighter text-[#111111] uppercase"'
content = content.replace(old_h2, new_h2)

# Change main
old_main = 'className="flex-grow w-full max-w-[1024px] mx-auto bg-[#FAFAFA] p-6"'
new_main = 'className="flex-grow w-full max-w-[1024px] mx-auto bg-white shadow-sm border-x border-[#111111]/10 px-8 py-10 md:px-12 md:py-16"'
content = content.replace(old_main, new_main)

# Adjust border for h2 container
old_h2_div = 'className="border-b-4 border-[#111111] pb-4 mb-8"'
new_h2_div = 'className="border-b-4 border-[#990000] pb-6 mb-12"'
content = content.replace(old_h2_div, new_h2_div)

with open("src/pages/CategoryPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

