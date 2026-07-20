with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add Menu to icons
content = content.replace("Globe, FileText,", "Globe, FileText, Menu,")

topics_button = """
                <button 
                  onClick={() => { setActiveTab('topics'); setActiveBrief(null); }}
                  className={cn(
                    "flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors flex flex-col items-center gap-1",
                    activeTab === 'topics' ? "border-[#990000] text-[#990000]" : "border-transparent text-gray-500 hover:text-[#111111]"
                  )}
                >
                  <Menu className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'الأقسام' : lang === 'zh' ? '分类' : lang === 'ckb' ? 'بەشەکان' : 'Topics'}</span>
                </button>"""

content = content.replace(
    "<div className=\"flex border-b border-[#111111]/10 text-[10px] font-bold uppercase tracking-wider bg-white shrink-0\">",
    "<div className=\"flex border-b border-[#111111]/10 text-[10px] font-bold uppercase tracking-wider bg-white shrink-0\">" + topics_button
)

topics_content = """
                {/* 0. TOPICS (NEW) */}
                {activeTab === 'topics' && (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[11px] text-gray-600">
                      Select a news category to filter dispatches.
                    </p>
                    <div className="flex flex-col space-y-2">
                      {[
                        { label: lang === 'ar' ? 'سياسة' : lang === 'zh' ? '政治' : lang === 'ckb' ? 'سیاسەت' : 'Politics', slug: 'politics' },
                        { label: lang === 'ar' ? 'اقتصاد' : lang === 'zh' ? '经济' : lang === 'ckb' ? 'ئابووری' : 'Economy', slug: 'economy' },
                        { label: lang === 'ar' ? 'طاقة' : lang === 'zh' ? '能源' : lang === 'ckb' ? 'وزە' : 'Energy', slug: 'energy' },
                        { label: lang === 'ar' ? 'مبادرة الحزام والطريق' : lang === 'zh' ? '一带一路' : lang === 'ckb' ? 'پشتوێن و ڕێگا' : 'Belt & Road', slug: 'belt-road' },
                        { label: lang === 'ar' ? 'تكنولوجيا' : lang === 'zh' ? '科技' : lang === 'ckb' ? 'تەکنەلۆژیا' : 'Technology', slug: 'technology' },
                        { label: lang === 'ar' ? 'ثقافة' : lang === 'zh' ? '文化' : lang === 'ckb' ? 'کالچەر' : 'Culture', slug: 'culture' },
                        { label: lang === 'ar' ? 'آراء' : lang === 'zh' ? '观点' : lang === 'ckb' ? 'بۆچوون' : 'Opinion', slug: 'opinion' }
                      ].map((c, i) => (
                        <a 
                          key={i} 
                          href={`/${lang}/category/${c.slug}`} 
                          className="flex items-center justify-between p-3 border border-[#111111]/10 rounded-xs hover:border-[#990000] hover:bg-neutral-50 transition-colors group cursor-pointer"
                        >
                          <span className="font-serif font-black text-sm text-[#111111] group-hover:text-[#990000] uppercase tracking-widest">{c.label}</span>
                          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#990000]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
"""

content = content.replace(
    "{/* 1. MARKET DATA INDICES */}",
    topics_content + "\n                {/* 1. MARKET DATA INDICES */}"
)

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)

