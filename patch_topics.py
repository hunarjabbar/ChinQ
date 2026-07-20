with open("src/components/EnterpriseSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import re

# We will replace the current Topics tab content with a more WSJ-style listing.
old_topics = """{/* 0. TOPICS (NEW) */}
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
                )}"""

new_topics = """{/* 0. TOPICS (NEW) */}
                {activeTab === 'topics' && (
                  <div className="animate-fadeIn">
                    <div className="border-b-2 border-black pb-2 mb-4">
                      <h3 className="font-serif font-black text-2xl tracking-tight text-black">Sections</h3>
                    </div>
                    <div className="flex flex-col">
                      {[
                        { label: lang === 'ar' ? 'سياسة' : lang === 'zh' ? '政治' : lang === 'ckb' ? 'سیاسەت' : 'Politics', slug: 'politics', desc: 'Diplomacy & Government' },
                        { label: lang === 'ar' ? 'اقتصاد' : lang === 'zh' ? '经济' : lang === 'ckb' ? 'ئابووری' : 'Economy', slug: 'economy', desc: 'Markets & Trade' },
                        { label: lang === 'ar' ? 'طاقة' : lang === 'zh' ? '能源' : lang === 'ckb' ? 'وزە' : 'Energy', slug: 'energy', desc: 'Oil, Gas & Renewables' },
                        { label: lang === 'ar' ? 'مبادرة الحزام والطريق' : lang === 'zh' ? '一带一路' : lang === 'ckb' ? 'پشتوێن و ڕێگا' : 'Belt & Road', slug: 'belt-road', desc: 'Infrastructure & Deals' },
                        { label: lang === 'ar' ? 'تكنولوجيا' : lang === 'zh' ? '科技' : lang === 'ckb' ? 'تەکنەلۆژیا' : 'Technology', slug: 'technology', desc: 'Innovation & Tech' },
                        { label: lang === 'ar' ? 'ثقافة' : lang === 'zh' ? '文化' : lang === 'ckb' ? 'کالچەر' : 'Culture', slug: 'culture', desc: 'Arts & Society' },
                        { label: lang === 'ar' ? 'آراء' : lang === 'zh' ? '观点' : lang === 'ckb' ? 'بۆچوون' : 'Opinion', slug: 'opinion', desc: 'Editorials & Voices' }
                      ].map((c, i) => (
                        <a 
                          key={i} 
                          href={`/${lang}/category/${c.slug}`} 
                          className="flex flex-col py-3 border-b border-gray-200 hover:bg-neutral-50 transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-lg text-black group-hover:text-[#990000]">{c.label}</span>
                            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#990000]" />
                          </div>
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mt-1">{c.desc}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}"""

content = content.replace(old_topics, new_topics)

with open("src/components/EnterpriseSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
