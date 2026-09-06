import re

with open("src/components/EnterpriseSidebar.tsx", "r") as f:
    content = f.read()

# 1. Remove the Navigation Tabs block
start_nav = content.find("{/* Navigation Tabs */}")
end_nav = content.find("{/* Dynamic Scrolling Body Content */}")
if start_nav != -1 and end_nav != -1:
    content = content[:start_nav] + content[end_nav:]

# 2. Add an AccordionItem component helper at the top or inside the file
# Or we can just use the existing state `activeTab` and when you click a section header, it opens.
# Let's replace the `activeTab === 'topics' && (` with a section header that opens it.

def replace_section(section_name, tab_id, icon_name, title_ar, title_zh, title_ckb, title_en):
    global content
    
    # Find the block start
    target = f"{{/* {section_name} */}}"
    if target not in content:
        print(f"Could not find {target}")
        return
        
    start_idx = content.find(target)
    
    # We want to replace `{activeTab === 'tab_id' && (`
    # with our accordion header
    
    header_html = f"""{target}
                <div className="border border-[#1A1A1A]/10 bg-white rounded-xs overflow-hidden mb-3 shadow-sm">
                  <button 
                    onClick={{() => setActiveTab(activeTab === '{tab_id}' ? '' : '{tab_id}')}}
                    className="w-full flex items-center justify-between p-4 bg-[#FAFAFA] hover:bg-neutral-100 transition-colors border-b border-[#1A1A1A]/5"
                  >
                    <div className="flex items-center gap-3">
                      <{icon_name} className="w-4 h-4 text-[#990000]" />
                      <span className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                        {{lang === 'ar' ? '{title_ar}' : lang === 'zh' ? '{title_zh}' : lang === 'ckb' ? '{title_ckb}' : '{title_en}'}}
                      </span>
                    </div>
                    <ArrowDownRight className={{cn("w-4 h-4 text-gray-400 transition-transform duration-300", activeTab === '{tab_id}' ? "rotate-180" : "rotate-0")}} />
                  </button>
                  <AnimatePresence initial={{false}}>
                    {{activeTab === '{tab_id}' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
"""
    
    # replace the exact target and the activeTab condition
    # e.g. {/* 0. TOPICS (NEW) */}\n                {activeTab === 'topics' && (
    
    # We need to find the `)` corresponding to this active tab and close the accordion divs.
    # Actually, we can just replace the opening, and then replace the closing.
    
    # The existing code is:
    # {activeTab === 'topics' && (
    #   <div className="animate-fadeIn">
    
    search_str = f"{{activeTab === '{tab_id}' && ("
    
    content = content.replace(f"{target}\n                {search_str}\n                  <div className=\"animate-fadeIn\">\n", header_html)
    content = content.replace(f"{target}\n                {search_str}\n                  <div className=\"space-y-4 animate-fadeIn\">\n", header_html)
    
    # Now we need to close it. This is harder to regex safely.
    # What if we just do a more targeted replace for the closing tags?
    
    print(f"Patched {section_name}")

replace_section("0. TOPICS (NEW)", "topics", "Menu", "الأقسام", "分类", "بەشەکان", "Topics & Sections")
replace_section("1. MARKET DATA INDICES", "market", "TrendingUp", "المؤشرات", "指数", "مۆدێلەکان", "Market Data Indices")
replace_section("2. BELT & ROAD PROJECTS TRACKER", "projects", "Compass", "المشاريع", "项目", "پڕۆژەکان", "Belt & Road Projects")
replace_section("3. TRILINGUAL B2B LETTER GENERATOR", "b2b", "FileText", "الخطابات", "公文", "نامەکان", "B2B Letter Generator")
replace_section("4. STRATEGIC INTELLIGENCE BRIEFS", "briefs", "Lock", "التقارير", "简报", "ڕاپۆرتەکان", "Strategic Intelligence Briefs")

with open("src/components/EnterpriseSidebar.tsx", "w") as f:
    f.write(content)
