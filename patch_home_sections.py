with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

sections_tsx = """      {/* ADDITIONAL SECTIONS */}
      <section className="w-full max-w-[1024px] mx-auto bg-[#FAFAFA] border-t border-[#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse divide-[#111111]/10">
        {['ai', 'food-beverage', 'expo', 'business-statistics'].map((catSlug) => {
          const sectionArticles = articles.filter(a => a.category?.slug === catSlug).slice(0, 3);
          if (sectionArticles.length === 0) return null;
          
          let title = '';
          if (catSlug === 'ai') title = t('ai');
          if (catSlug === 'food-beverage') title = t('foodBeverage');
          if (catSlug === 'expo') title = t('expo');
          if (catSlug === 'business-statistics') title = t('businessStats');
          
          return (
            <div key={catSlug} className="p-6 flex flex-col space-y-4">
              <h3 className="text-[10px] uppercase font-black tracking-widest text-[#111111] border-b-2 border-[#990000] pb-1 w-fit">
                {title}
              </h3>
              {sectionArticles.map((article, i) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer group hover:bg-black/[0.02] p-2 -mx-2 rounded transition-all duration-200"
                >
                  <h4 className="font-serif text-sm font-bold leading-tight group-hover:text-[#990000] text-[#111111] transition-colors line-clamp-3">
                    {getTranslation(article)?.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold opacity-70">
                    {new Date(article.createdAt).toLocaleDateString(dateLocale.code)}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </section>

      {/* GORGEOUS IMMERSIVE NEWSPAPER DETAIL OVERLAY MODAL */}"""

content = content.replace("      {/* GORGEOUS IMMERSIVE NEWSPAPER DETAIL OVERLAY MODAL */}", sections_tsx)

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
