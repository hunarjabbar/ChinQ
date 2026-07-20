with open("src/pages/CategoryPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

import_old = "import { ar, zhCN, enUS } from 'date-fns/locale';"
import_new = "import { ar, zhCN, enUS } from 'date-fns/locale';\nimport { useState } from 'react';"
content = content.replace(import_old, import_new)

state_old = "const { data: articles = [], isLoading } = useQuery<Article[]>({"
state_new = "const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);\n  const { data: articles = [], isLoading } = useQuery<Article[]>({"
content = content.replace(state_old, state_new)

onClick_old = 'className="group cursor-pointer"'
onClick_new = 'className="group cursor-pointer"\n                onClick={() => setSelectedArticle(article)}'
content = content.replace(onClick_old, onClick_new)

overlay = """
      {/* GORGEOUS IMMERSIVE NEWSPAPER DETAIL OVERLAY MODAL */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-[#FAFAFA] border-x border-[#111111] max-w-3xl w-full h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative text-start transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="px-6 py-4 bg-white border-b border-[#111111]/10 flex justify-between items-center shrink-0">
              <span className="text-[10px] font-black uppercase text-[#990000] tracking-widest">
                {getCategoryName(selectedArticle.category)}
              </span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-[#111111] hover:text-[#990000] font-black text-xs uppercase tracking-widest border border-[#111111]/20 px-3 py-1 hover:border-[#990000] transition-colors cursor-pointer"
              >
                {lang === 'ar' ? '✕ إغلاق' : lang === 'ckb' ? '✕ داخستن' : lang === 'zh' ? '✕ 关闭' : '✕ Close'}
              </button>
            </div>

            {/* Print style article layout */}
            <div className="p-6 md:p-12 flex-grow overflow-y-auto">
              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-center text-[#111111] tracking-tight mb-6">
                {getTranslation(selectedArticle)?.title}
              </h1>
              
              <div className="flex justify-center items-center gap-3 text-[10px] font-bold uppercase mb-8 opacity-60 text-[#111111] border-y border-double border-[#111111]/20 py-2.5">
                <span>By {(selectedArticle as any).author?.name || 'Staff Writer'}</span>
                <span>•</span>
                <span>
                  {new Date(selectedArticle.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : lang === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              {selectedArticle.imageUrl && (
                <div className="w-full mb-8 overflow-hidden rounded-xs border border-[#111111]/10">
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={getTranslation(selectedArticle)?.title || 'Article Image'} 
                    className="w-full object-cover max-h-[360px]"
                  />
                </div>
              )}

              {/* Editorial typography body */}
              <div 
                className="prose prose-neutral max-w-none font-serif text-lg leading-relaxed text-gray-800 space-y-6 whitespace-pre-wrap md:px-4"
                dir={lang === 'ar' || lang === 'ckb' ? 'rtl' : 'ltr'}
              >
                {getTranslation(selectedArticle)?.content ? (
                  <div dangerouslySetInnerHTML={{ __html: getTranslation(selectedArticle).content }} />
                ) : (
                  <p>{getTranslation(selectedArticle)?.excerpt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
"""

content = content.replace("    </main>", overlay)

with open("src/pages/CategoryPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

