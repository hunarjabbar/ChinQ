import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { Category } from '../../types';
import { 
  Sparkles, 
  Globe, 
  Search, 
  Check, 
  AlertCircle, 
  Loader2, 
  Save, 
  Eye, 
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export function AdminAIImport({ categories }: { categories: Category[] }) {
  const queryClient = useQueryClient();
  const [searchCountry, setSearchCountry] = useState('China and Iraq');
  const [searchTopic, setSearchTopic] = useState('trade and economic cooperation');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState('');
  const [savingSlugs, setSavingSlugs] = useState<Record<string, boolean>>({});
  const [savedSlugs, setSavedSlugs] = useState<Record<string, boolean>>({});
  const [previewLanguages, setPreviewLanguages] = useState<Record<string, 'en' | 'ar' | 'zh' | 'ckb'>>({});

  const handleSearchAndGenerate = async () => {
    setIsSearching(true);
    setSearchError('');
    setSearchResults([]);
    setSavedSlugs({});
    try {
      const res = await apiFetch('/api/admin/news-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: searchCountry, topic: searchTopic })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch grounded news updates');
      }
      setSearchResults(data.articles || []);
      const langMap: Record<string, 'en' | 'ar' | 'zh' | 'ckb'> = {};
      (data.articles || []).forEach((art: any) => {
        langMap[art.slug] = 'en';
      });
      setPreviewLanguages(langMap);
    } catch (err: any) {
      console.error(err);
      setSearchError(err.message || 'An unexpected error occurred during search grounding.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveArticle = async (article: any) => {
    const slug = article.slug;
    setSavingSlugs(prev => ({ ...prev, [slug]: true }));
    try {
      const dbCategory = categories.find(c => c.slug === article.categorySlug) || categories[0];
      const categoryId = dbCategory ? dbCategory.id : '';

      const payload = {
        slug: article.slug,
        categoryId,
        imageUrl: article.imageUrl,
        translations: article.translations,
        status: 'PUBLISHED'
      };

      const res = await apiFetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Database write operation failed.');
      }
      
      setSavedSlugs(prev => ({ ...prev, [slug]: true }));
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
    } catch (err: any) {
      alert(`Force Save error: ${err.message}`);
    } finally {
      setSavingSlugs(prev => ({ ...prev, [slug]: false }));
    }
  };

  const handleSaveAll = async () => {
    for (const art of searchResults) {
      if (!savedSlugs[art.slug]) {
        await handleSaveArticle(art);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-start">
      <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu size={120} className="text-brand-500" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-brand-500" size={24} />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-500">Grounded Information Desk</h3>
          </div>
          <h2 className="text-3xl font-bold font-black text-white leading-tight">Authorize trilingual information scavenging.</h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-medium">
            Deploy the sovereign AI to scan global news lattices, curate factual developments, and formulate trilingual dispatches directly into the article registry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Global Lattice Nodes</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 text-neutral-500" size={14} />
                <input 
                  type="text"
                  value={searchCountry}
                  onChange={e => setSearchCountry(e.target.value)}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white py-2.5 pl-9 pr-4 text-xs font-bold rounded focus:outline-none focus:border-brand-500 transition-all"
                  placeholder="e.g. Iraq-China Corridor"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-500 uppercase tracking-widest">Intel Theme</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-neutral-500" size={14} />
                <input 
                  type="text"
                  value={searchTopic}
                  onChange={e => setSearchTopic(e.target.value)}
                  className="w-full bg-neutral-800/50 border border-neutral-700 text-white py-2.5 pl-9 pr-4 text-xs font-bold rounded focus:outline-none focus:border-brand-500 transition-all"
                  placeholder="e.g. Belt and Road Initiative"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSearchAndGenerate}
            disabled={isSearching}
            className="w-full bg-brand-800 hover:bg-brand-700 text-white font-black py-4 rounded-lg uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 shadow-lg shadow-brand-900/20"
          >
            {isSearching ? (
              <>
                <Loader2 size={16} className="animate-spin text-brand-500" />
                Synchronizing grounded data...
              </>
            ) : (
              <>
                <TrendingUp size={16} />
                Initiate Sovereign Scavenge
              </>
            )}
          </button>
        </div>
      </div>

      {isSearching && (
        <div className="bg-white border border-neutral-200 rounded-xl p-16 text-center shadow-sm space-y-6">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-brand-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-brand-800 flex items-center justify-center">
               <Cpu size={24} className="text-brand-800 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-black uppercase tracking-widest text-brand-900">Formulating Trilingual Dispatch</h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
              Verifying facts across 4 language matrices (EN, AR, ZH, CKB). 
              Grounded search grounding ensures sub-42ms data accuracy.
            </p>
          </div>
        </div>
      )}

      {searchError && (
        <div className="bg-brand-50 border border-brand-200 p-6 rounded-xl flex items-start gap-4">
          <div className="p-2 bg-brand-100 rounded-lg">
            <AlertCircle className="text-brand-800" size={20} />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-black uppercase tracking-widest text-brand-950">System Interrupt</h5>
            <p className="text-xs text-brand-900 font-medium">{searchError}</p>
          </div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-8">
          <div className="flex justify-between items-center bg-neutral-900 text-white p-6 rounded-xl shadow-xl">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-brand-800 rounded-lg">
                <Check className="text-white" size={16} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90">Scavenge Result Ledger</h3>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">{searchResults.length} Authority Dispatches Authenticated</p>
              </div>
            </div>
            <button
              onClick={handleSaveAll}
              className="bg-white hover:bg-neutral-100 text-black font-black text-xs py-2.5 px-6 rounded uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <Save size={14} />
              Authorize Bulk Publish
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {searchResults.map((art, idx) => {
              const currentLang = previewLanguages[art.slug] || 'en';
              const translation = art.translations.find((t: any) => t.lang === currentLang) || art.translations[0];
              const isSaved = savedSlugs[art.slug];
              const isSaving = savingSlugs[art.slug];

              return (
                <div key={art.slug} className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row">
                  <div className="w-full md:w-80 h-64 md:h-auto bg-neutral-100 relative overflow-hidden">
                    <img 
                      src={art.imageUrl} 
                      alt={translation?.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-brand-800 text-white text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded shadow-lg">
                        {art.categorySlug}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="flex bg-neutral-100 p-1 rounded-lg">
                          {(['en', 'ar', 'zh', 'ckb'] as const).map(langCode => (
                            <button
                              key={langCode}
                              onClick={() => setPreviewLanguages(prev => ({ ...prev, [art.slug]: langCode }))}
                              className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-md transition-all cursor-pointer ${currentLang === langCode ? 'bg-white text-brand-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                              {langCode}
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-medium font-black text-neutral-300 uppercase">Dispatch #{idx + 1}</span>
                      </div>

                      <div className="space-y-3" dir={currentLang === 'ar' || currentLang === 'ckb' ? 'rtl' : 'ltr'}>
                        <h4 className="font-bold font-black text-2xl text-brand-900 leading-tight">
                          {translation?.title}
                        </h4>
                        <p className="text-xs text-neutral-500 font-bold italic leading-relaxed">
                          {translation?.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-brand-800 flex items-center gap-1.5 transition-colors cursor-pointer">
                          <Eye size={14} />
                          Review Full Dispatch
                        </button>
                      </div>

                      <button
                        disabled={isSaved || isSaving}
                        onClick={() => handleSaveArticle(art)}
                        className={`text-xs font-black uppercase tracking-widest py-2.5 px-6 rounded-lg transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                          isSaved 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-neutral-900 hover:bg-brand-800 text-white'
                        }`}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Broadcasting...
                          </>
                        ) : isSaved ? (
                          <>
                            <Check size={14} />
                            Authorized
                          </>
                        ) : (
                          <>
                            <Save size={14} />
                            Authorize Dispatch
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
