import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Locale } from '../types';

export default function SearchPage({ lang }: { lang: Locale }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  const projects = [
    {
      id: 1,
      name: lang === 'zh' ? '法奥大港' : 'Al Faw Grand Port',
      status: lang === 'zh' ? '建设中' : 'Under Construction',
      value: '$2.6B',
      desc: lang === 'zh' ? '连接波斯湾的超级港口项目。' : 'Mega-port project connecting the Persian Gulf.',
      type: 'project',
      category: 'infrastructure'
    },
    {
      id: 2,
      name: lang === 'zh' ? '发展路项目' : 'Development Road',
      status: lang === 'zh' ? '规划中' : 'Planning',
      value: '$17B',
      desc: lang === 'zh' ? '通过土耳其连接伊拉克和欧洲的铁路网络。' : 'Rail network linking Iraq to Europe via Turkey.',
      type: 'project',
      category: 'infrastructure'
    },
    {
      id: 3,
      name: lang === 'zh' ? '纳西里耶国际机场' : 'Nasiriyah International Airport',
      status: lang === 'zh' ? '建设中' : 'Under Construction',
      value: '$367M',
      desc: lang === 'zh' ? '中国建筑集团承建的现代化机场。' : 'Modern airport constructed by CSCEC.',
      type: 'project',
      category: 'infrastructure'
    }
  ];

  const enterprises = [
    {
      id: 1,
      name: 'PowerChina',
      sector: 'Energy & Infrastructure',
      verified: true,
      type: 'enterprise',
      category: 'energy'
    },
    {
      id: 2,
      name: 'Huawei Technologies Iraq',
      sector: 'Telecommunications',
      verified: true,
      type: 'enterprise',
      category: 'infrastructure'
    },
    {
      id: 3,
      name: 'ZPEC (Zhongman Petroleum)',
      sector: 'Oil & Gas Services',
      verified: true,
      type: 'enterprise',
      category: 'energy'
    },
    {
      id: 4,
      name: 'CSCEC Middle East',
      sector: 'Construction',
      verified: true,
      type: 'enterprise',
      category: 'infrastructure'
    }
  ];

  const allItems = [...projects, ...enterprises];

  const filteredItems = useMemo(() => {
    let results = allItems;
    
    if (category) {
      const lowerCat = category.toLowerCase();
      results = results.filter(item => item.category === lowerCat || (('sector' in item) && item.sector.toLowerCase().includes(lowerCat)));
    }
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(item => {
        const matchName = item.name.toLowerCase().includes(lowerQuery);
        const matchSector = ('sector' in item) && item.sector.toLowerCase().includes(lowerQuery);
        const matchDesc = ('desc' in item) && item.desc.toLowerCase().includes(lowerQuery);
        return matchName || matchSector || matchDesc;
      });
    }
    
    return results;
  }, [query, category, allItems]);

  const pageTitle = lang === 'zh' ? '全局搜索' : 'Global Search';
  const resultsLabel = lang === 'zh' ? '结果' : 'Results for';
  const filterLabel = category ? (lang === 'zh' ? `分类: ${category}` : `Category: ${category}`) : `"${query}"`;

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border-x border-brand-800/10 dark:border-neutral-800 shadow-xs p-4 sm:p-6 md:p-8 min-h-[60vh]">
      <h1 className="text-2xl sm:text-3xl font-black text-brand-800 dark:text-neutral-100 mb-2">{pageTitle}</h1>
      <p className="text-gray-600 dark:text-neutral-400 text-sm mb-6">{resultsLabel}: <span className="font-bold text-brand-800 dark:text-brand-400 capitalize">{filterLabel}</span></p>

      {filteredItems.length === 0 ? (
        <p className="text-gray-500 dark:text-neutral-400 text-sm italic py-8">{lang === 'zh' ? '没有找到相关结果。' : 'No results found.'}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map(item => (
            <div key={`${item.type}-${item.id}`} className="border border-[#E5E5E5] dark:border-neutral-700 p-5 bg-white dark:bg-neutral-800 hover:border-brand-800 transition-colors rounded-xs shadow-xs">
              <div className="text-xs font-bold uppercase tracking-widest text-brand-800 dark:text-brand-400 mb-2">
                {item.type === 'project' ? (lang === 'zh' ? '基建项目' : 'Infrastructure Project') : (lang === 'zh' ? '认证企业' : 'Verified Enterprise')}
              </div>
              <h3 className="text-lg font-bold text-ink-900 dark:text-neutral-100 mb-2">{item.name}</h3>
              {item.type === 'project' && (
                <>
                  <div className="text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">{('value' in item) ? item.value : ''} • {('status' in item) ? item.status : ''}</div>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">{('desc' in item) ? item.desc : ''}</p>
                </>
              )}
              {item.type === 'enterprise' && (
                <div className="text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">Sector: {('sector' in item) ? item.sector : ''}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
