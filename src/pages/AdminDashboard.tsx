import { apiFetch } from '../lib/api';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useLocation } from 'react-router-dom';
import { Locale, Category } from '../types';
import { useI18n } from '../hooks/useI18n';
import { LivePublishForm } from '../components/LivePublishForm';
import { AdminLayout } from '../components/AdminLayout';
import { Radio, Sparkles, Globe, Search, Check, AlertCircle, Loader2, Save, FileText, Users, Terminal, Trash2, Inbox, Briefcase, Lock, Unlock, ExternalLink, FileSpreadsheet, BookOpen } from 'lucide-react';

export function AdminDashboard() {
  const { lang } = useParams<{ lang: Locale }>();
  const { t } = useI18n(lang!);
  const queryClient = useQueryClient();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'article' | 'live' | 'search' | 'applications' | 'telexes' | 'studies'>(
    location.pathname.includes('live-publish') ? 'live' : 'article'
  );

  // Synchronize activeTab with URL tab parameters (for notification routing)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam && ['article', 'live', 'search', 'applications', 'telexes', 'studies'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [location.search]);

  // Manual article state, updated to support all 4 seeded languages (en, ar, zh, ckb)
  const [formData, setFormData] = useState({
    slug: '',
    categoryId: '',
    imageUrl: '',
    enTitle: '', enExcerpt: '', enContent: '',
    arTitle: '', arExcerpt: '', arContent: '',
    zhTitle: '', zhExcerpt: '', zhContent: '',
    ckbTitle: '', ckbExcerpt: '', ckbContent: '',
  });

  // Smart AI Search & Import State
  const [searchCountry, setSearchCountry] = useState('China and Iraq');
  const [searchTopic, setSearchTopic] = useState('trade and economic cooperation');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState('');
  const [savingSlugs, setSavingSlugs] = useState<Record<string, boolean>>({});
  const [savedSlugs, setSavedSlugs] = useState<Record<string, boolean>>({});
  const [previewLanguages, setPreviewLanguages] = useState<Record<string, 'en' | 'ar' | 'zh' | 'ckb'>>({});

  // Fetch partnership applications
  const { data: applications = [], refetch: refetchApps } = useQuery<any[]>({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/applications');
      if (!res.ok) return [];
      return res.json();
    }
  });

  // Fetch telex dispatches
  const { data: telexes = [], refetch: refetchTelexes } = useQuery<any[]>({
    queryKey: ['admin-telexes'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/telexes');
      if (!res.ok) return [];
      return res.json();
    }
  });

  // Fetch studies
  const { data: studies = [], refetch: refetchStudies } = useQuery<any[]>({
    queryKey: ['admin-studies'],
    queryFn: async () => {
      const res = await apiFetch('/api/studies');
      if (!res.ok) return [];
      return res.json();
    }
  });

  // App / Telex / Study actions
  const handleAppStatus = async (id: string, status: string) => {
    try {
      const res = await apiFetch(`/api/admin/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        refetchApps();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to purge this application from the registry?")) return;
    try {
      const res = await apiFetch(`/api/admin/applications/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        refetchApps();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleTelexStatus = async (id: string, status: string) => {
    try {
      const res = await apiFetch(`/api/admin/telexes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        refetchTelexes();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleDeleteTelex = async (id: string) => {
    if (!confirm("Are you sure you want to erase this telex dispatch?")) return;
    try {
      const res = await apiFetch(`/api/admin/telexes/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        refetchTelexes();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const [studyForm, setStudyForm] = useState({
    slug: '',
    titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
    excerptEn: '', excerptAr: '', excerptZh: '', excerptCkb: '',
    contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
    imageUrl: '',
    isPrivate: false
  });

  const handleStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch('/api/admin/studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studyForm)
      });
      if (res.ok) {
        alert('Sovereign Research Study successfully updated/created!');
        setStudyForm({
          slug: '',
          titleEn: '', titleAr: '', titleZh: '', titleCkb: '',
          excerptEn: '', excerptAr: '', excerptZh: '', excerptCkb: '',
          contentEn: '', contentAr: '', contentZh: '', contentCkb: '',
          imageUrl: '',
          isPrivate: false
        });
        refetchStudies();
      } else {
        const data = await res.json();
        alert('Error saving study: ' + data.error);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleDeleteStudy = async (id: string) => {
    if (!confirm("Are you sure you want to purge this Research Study?")) return;
    try {
      const res = await apiFetch(`/api/admin/studies/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        refetchStudies();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/categories');
      return res.json();
    }
  });

  const { data: events = [] } = useQuery<any[]>({
    queryKey: ['live-events'],
    queryFn: async () => {
      const res = await apiFetch('/api/events');
      if (!res.ok) return [];
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (newArticle: any) => {
      const res = await apiFetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      if (!res.ok) throw new Error('Failed to create article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      alert('Article saved successfully');
      // Reset form on success
      setFormData({
        slug: '',
        categoryId: '',
        imageUrl: '',
        enTitle: '', enExcerpt: '', enContent: '',
        arTitle: '', arExcerpt: '', arContent: '',
        zhTitle: '', zhExcerpt: '', zhContent: '',
        ckbTitle: '', ckbExcerpt: '', ckbContent: '',
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      slug: formData.slug,
      categoryId: formData.categoryId,
      imageUrl: formData.imageUrl,
      translations: [
        { lang: 'en', title: formData.enTitle, excerpt: formData.enExcerpt, content: formData.enContent },
        { lang: 'ar', title: formData.arTitle, excerpt: formData.arExcerpt, content: formData.arContent },
        { lang: 'zh', title: formData.zhTitle, excerpt: formData.zhExcerpt, content: formData.zhContent },
        { lang: 'ckb', title: formData.ckbTitle, excerpt: formData.ckbExcerpt, content: formData.ckbContent },
      ].filter(t => t.title && t.content) // Skip if empty
    };

    mutation.mutate(payload);
  };

  // AI search grounding and generation triggers
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

  // Force Save / Overwrite an individual article
  const handleSaveArticle = async (article: any) => {
    const slug = article.slug;
    setSavingSlugs(prev => ({ ...prev, [slug]: true }));
    try {
      // Find matching db category based on slug or fallback to first
      const dbCategory = categories.find(c => c.slug === article.categorySlug) || categories[0];
      const categoryId = dbCategory ? dbCategory.id : '';

      const payload = {
        slug: article.slug,
        categoryId,
        imageUrl: article.imageUrl,
        translations: article.translations
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
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
    } catch (err: any) {
      alert(`Force Save error: ${err.message}`);
    } finally {
      setSavingSlugs(prev => ({ ...prev, [slug]: false }));
    }
  };

  // Force save all results in one click
  const handleSaveAll = async () => {
    for (const art of searchResults) {
      if (!savedSlugs[art.slug]) {
        await handleSaveArticle(art);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto bg-white p-6 md:p-10 border border-neutral-200 shadow-sm rounded-xl">
        <div className="mb-8 border-b-4 border-[#111111] pb-4 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-black text-[#111111] uppercase tracking-tight mb-1">Command Center</h2>
            <p className="text-sm text-gray-500 font-mono">Manage publications, intel studies, and enterprise signals.</p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono">
            System Online
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-200 mb-8 pb-0">
          <button 
            onClick={() => setActiveTab('article')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all cursor-pointer uppercase ${activeTab === 'article' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            Create Article
          </button>
          <button 
            onClick={() => setActiveTab('live')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all cursor-pointer uppercase ${activeTab === 'live' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            Live Update
          </button>
          <button 
            onClick={() => setActiveTab('search')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase ${activeTab === 'search' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            <Sparkles size={16} className={activeTab === 'search' ? "text-[#990000]" : "text-neutral-400"} />
            AI Import
          </button>
          <button 
            onClick={() => setActiveTab('applications')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase ${activeTab === 'applications' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            <Users size={16} className={activeTab === 'applications' ? "text-[#990000]" : "text-neutral-400"} />
            Partnerships ({applications.length})
          </button>
          <button 
            onClick={() => setActiveTab('telexes')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase ${activeTab === 'telexes' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            <Terminal size={16} className={activeTab === 'telexes' ? "text-[#990000]" : "text-neutral-400"} />
            Telex ({telexes.length})
          </button>
          <button 
            onClick={() => setActiveTab('studies')}
            className={`pb-3 px-5 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase ${activeTab === 'studies' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}`}
          >
            <BookOpen size={16} className={activeTab === 'studies' ? "text-[#990000]" : "text-neutral-400"} />
            Studies ({studies.length})
          </button>
        </div>
      
        {/* Tab 1: Manual Article Creation */}
        {activeTab === 'article' && (
          <form onSubmit={handleSubmit} className="space-y-6 text-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-1">Slug</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. basra-water-project-deal"
                  className="w-full border-2 border-neutral-200 bg-neutral-50 p-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#111111] transition-colors rounded-none" 
                  value={formData.slug} 
                  onChange={e => setFormData({...formData, slug: e.target.value})} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-1">Category</label>
                <select 
                  required 
                  className="w-full border-2 border-neutral-200 bg-neutral-50 p-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#111111] transition-colors rounded-none" 
                  value={formData.categoryId} 
                  onChange={e => setFormData({...formData, categoryId: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.nameEn}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-1">Hero Image URL</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full border-2 border-neutral-200 bg-neutral-50 p-2.5 text-sm focus:outline-none focus:bg-white focus:border-[#111111] transition-colors rounded-none" 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
              />
            </div>

            <div className="space-y-8 mt-8">
              {/* English */}
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <h3 className="font-bold text-[#990000] mb-4 flex items-center gap-2">
                  <span className="text-xs bg-[#990000] text-white px-1.5 py-0.5 font-sans">EN</span>
                  English Translation
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="Title" required className="w-full border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.enTitle} onChange={e => setFormData({...formData, enTitle: e.target.value})} />
                  <textarea placeholder="Excerpt" required className="w-full border border-neutral-300 p-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.enExcerpt} onChange={e => setFormData({...formData, enExcerpt: e.target.value})} />
                  <textarea placeholder="Full Content" required className="w-full border border-neutral-300 p-2 text-sm h-40 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.enContent} onChange={e => setFormData({...formData, enContent: e.target.value})} />
                </div>
              </div>

              {/* Arabic */}
              <div className="p-4 bg-neutral-50 border border-neutral-200" dir="rtl">
                <h3 className="font-bold text-[#990000] mb-4 flex items-center gap-2 justify-start">
                  <span className="text-xs bg-[#990000] text-white px-1.5 py-0.5 font-sans">AR</span>
                  الترجمة العربية (Arabic)
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="العنوان" required className="w-full border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.arTitle} onChange={e => setFormData({...formData, arTitle: e.target.value})} />
                  <textarea placeholder="مقتطف" required className="w-full border border-neutral-300 p-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.arExcerpt} onChange={e => setFormData({...formData, arExcerpt: e.target.value})} />
                  <textarea placeholder="المحتوى الكامل" required className="w-full border border-neutral-300 p-2 text-sm h-40 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.arContent} onChange={e => setFormData({...formData, arContent: e.target.value})} />
                </div>
              </div>

              {/* Chinese */}
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <h3 className="font-bold text-[#990000] mb-4 flex items-center gap-2">
                  <span className="text-xs bg-[#990000] text-white px-1.5 py-0.5 font-sans">ZH</span>
                  中文翻译 (Chinese)
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="标题" required className="w-full border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.zhTitle} onChange={e => setFormData({...formData, zhTitle: e.target.value})} />
                  <textarea placeholder="摘要" required className="w-full border border-neutral-300 p-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.zhExcerpt} onChange={e => setFormData({...formData, zhExcerpt: e.target.value})} />
                  <textarea placeholder="正文" required className="w-full border border-neutral-300 p-2 text-sm h-40 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.zhContent} onChange={e => setFormData({...formData, zhContent: e.target.value})} />
                </div>
              </div>

              {/* Kurdish / Sorani */}
              <div className="p-4 bg-neutral-50 border border-neutral-200" dir="rtl">
                <h3 className="font-bold text-[#990000] mb-4 flex items-center gap-2 justify-start">
                  <span className="text-xs bg-[#990000] text-white px-1.5 py-0.5 font-sans">CKB</span>
                  وەرگێڕانی کوردی (Kurdish)
                </h3>
                <div className="space-y-3">
                  <input type="text" placeholder="ناونیشان" className="w-full border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.ckbTitle} onChange={e => setFormData({...formData, ckbTitle: e.target.value})} />
                  <textarea placeholder="کورتە" className="w-full border border-neutral-300 p-2 text-sm h-20 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.ckbExcerpt} onChange={e => setFormData({...formData, ckbExcerpt: e.target.value})} />
                  <textarea placeholder="تەواوی بابەتەکە" className="w-full border border-neutral-300 p-2 text-sm h-40 focus:outline-none focus:ring-1 focus:ring-[#990000]" value={formData.ckbContent} onChange={e => setFormData({...formData, ckbContent: e.target.value})} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={mutation.isPending}
              className="w-full bg-[#111111] hover:bg-[#990000] text-white font-bold py-3 px-4 uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
            >
              {mutation.isPending ? 'Publishing...' : 'Force Save / Publish Article'}
            </button>
          </form>
        )}

        {/* Tab 2: Publish Live Update */}
        {activeTab === 'live' && (
          <div className="space-y-6 text-start">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div className="space-y-1">
                <h1 className="text-3xl font-serif font-black tracking-tight flex items-center gap-2">
                  <Radio className="text-[#990000] animate-pulse" size={28} />
                  ChinQ Live Command Desk
                </h1>
                <p className="text-sm text-gray-500 max-w-xl">
                  Simultaneous trilingual broadcasting infrastructure optimized for high-speed micro-updates mapping out live events in Baghdad, Beijing, and regional centers.
                </p>
              </div>
            </div>

            {events.length > 0 ? (
              <LivePublishForm events={events} />
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md mx-auto space-y-4">
                <div className="inline-flex p-3 bg-red-50 text-[#990000] rounded-full">
                  <Radio size={24} />
                </div>
                <h3 className="text-lg font-bold">No Active Streams Detected</h3>
                <p className="text-sm text-gray-500">
                  You must establish an active parent event instance via Prisma Studio or the main editorial dashboard before initializing quick-publish live updates.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Smart Search & Import */}
        {activeTab === 'search' && (
          <div className="space-y-6 text-start">
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2 text-neutral-950">
                <Sparkles className="text-[#990000]" size={26} />
                Grounded News Intelligence Desk
              </h1>
              <p className="text-sm text-gray-500">
                Uses real-time search grounding to fetch authentic developments regarding China-Iraq relations, trade pacts, or cultural events, and creates quadrilingual articles on demand.
              </p>
            </div>

            {/* Config Search Form */}
            <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Target Country / Keyword</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3.5 text-neutral-400" size={16} />
                  <input 
                    type="text"
                    value={searchCountry}
                    onChange={e => setSearchCountry(e.target.value)}
                    placeholder="e.g. China and Iraq, Russia and Iraq"
                    className="w-full border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm rounded focus:outline-none focus:ring-1 focus:ring-[#990000]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">Cooperation Theme / Project</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 text-neutral-400" size={16} />
                  <input 
                    type="text"
                    value={searchTopic}
                    onChange={e => setSearchTopic(e.target.value)}
                    placeholder="e.g. oil field investments, school construction"
                    className="w-full border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm rounded focus:outline-none focus:ring-1 focus:ring-[#990000]"
                  />
                </div>
              </div>
              <div className="md:col-span-2 mt-2">
                <button
                  type="button"
                  onClick={handleSearchAndGenerate}
                  disabled={isSearching}
                  className="w-full bg-[#111111] hover:bg-[#990000] text-white font-bold py-3 px-4 rounded transition-all tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Grounded search analysis & translation in progress...
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Scan Global News & Force Translate Trilingually
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Loading / Error States */}
            {isSearching && (
              <div className="border border-neutral-200 rounded-lg p-10 text-center bg-neutral-50/50 space-y-4">
                <Loader2 size={36} className="animate-spin text-[#990000] mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-neutral-800">Scaffolding grounded intelligence...</p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Executing live queries, curating real-world news metrics, and formulating professional English, Arabic, Chinese, and Kurdish news logs. This process can take up to 20 seconds.
                  </p>
                </div>
              </div>
            )}

            {searchError && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-700" />
                <div className="space-y-1">
                  <p className="font-bold">Execution Stopped</p>
                  <p className="text-sm">{searchError}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {searchResults.length > 0 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-neutral-900 text-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-bold">Curated News Logs Detected</h3>
                    <p className="text-xs text-neutral-400">Successfully created 3 news logs containing 4 language variants.</p>
                  </div>
                  <button
                    onClick={handleSaveAll}
                    className="bg-[#990000] hover:bg-red-700 font-bold text-xs py-2 px-3 tracking-wide rounded text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save size={14} />
                    Force Publish All 3
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {searchResults.map((art, idx) => {
                    const currentLang = previewLanguages[art.slug] || 'en';
                    const translation = art.translations.find((t: any) => t.lang === currentLang) || art.translations[0];
                    const isSaved = savedSlugs[art.slug];
                    const isSaving = savingSlugs[art.slug];

                    return (
                      <div key={art.slug} className="border border-neutral-200 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col md:flex-row">
                        {/* News Image Preview */}
                        <div className="w-full md:w-1/3 bg-neutral-100 relative min-h-[200px]">
                          <img 
                            src={art.imageUrl} 
                            alt={translation?.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover absolute inset-0"
                          />
                          <span className="absolute top-2 left-2 bg-[#990000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {art.categorySlug}
                          </span>
                        </div>

                        {/* News Content Preview */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            {/* Lang Switichers */}
                            <div className="flex gap-1.5 border-b border-neutral-100 pb-2">
                              {(['en', 'ar', 'zh', 'ckb'] as const).map(langCode => (
                                <button
                                  key={langCode}
                                  onClick={() => setPreviewLanguages(prev => ({ ...prev, [art.slug]: langCode }))}
                                  className={`text-xs px-2 py-1 font-bold rounded cursor-pointer ${currentLang === langCode ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
                                >
                                  {langCode.toUpperCase()}
                                </button>
                              ))}
                            </div>

                            {/* Factual Content */}
                            <div className="space-y-1.5">
                              <h4 className="font-serif font-black text-lg text-neutral-900 tracking-tight">
                                {translation?.title}
                              </h4>
                              <p className="text-xs text-neutral-500 font-mono">
                                Slug: <span className="text-neutral-700">{art.slug}</span>
                              </p>
                              <p className="text-sm text-neutral-600 italic">
                                {translation?.excerpt}
                              </p>
                              <p className="text-xs text-neutral-500 line-clamp-3">
                                {translation?.content}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                              Article {idx + 1} of 3
                            </span>

                            <button
                              disabled={isSaved || isSaving}
                              onClick={() => handleSaveArticle(art)}
                              className={`text-xs py-2 px-4 rounded font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                                isSaved 
                                  ? 'bg-green-50 text-green-700 border border-green-200' 
                                  : 'bg-neutral-950 hover:bg-[#990000] text-white'
                              }`}
                            >
                              {isSaving ? (
                                <>
                                  <Loader2 size={12} className="animate-spin" />
                                  Overwriting...
                                </>
                              ) : isSaved ? (
                                <>
                                  <Check size={12} />
                                  Force Saved Successfully
                                </>
                              ) : (
                                <>
                                  <Save size={12} />
                                  Force Save / Publish
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
        )}

        {/* Tab 4: Partnership Applications Vetting Registry */}
        {activeTab === 'applications' && (
          <div className="space-y-6 text-start">
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2 text-neutral-950">
                <Users className="text-[#990000]" size={26} />
                Sovereign Vetting & Partnerships Registry
              </h1>
              <p className="text-sm text-gray-500">
                Authorized queue of incoming collaboration dossiers, talent registries, and trade partnerships undergoing sovereign vetting.
              </p>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 font-mono text-sm border border-dashed border-neutral-300 rounded-lg">
                No partnership applications received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app: any) => (
                  <div key={app.id} className="border border-neutral-200 p-6 rounded-lg bg-white shadow-sm space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 font-sans">{app.fullName}</h3>
                        <p className="text-sm font-mono text-neutral-500">{app.email} • {app.company}</p>
                        <p className="text-xs text-neutral-400 font-mono mt-1">Dossier: <span className="text-neutral-700 font-bold">{app.hash}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded ${
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800 animate-pulse'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>

                    <div className="bg-neutral-50 p-4 border border-neutral-100 rounded text-sm text-neutral-700 space-y-2">
                      <p className="font-bold text-xs uppercase tracking-wider text-[#990000] font-mono">Preferred Bureau / Target Role</p>
                      <p className="font-medium text-neutral-800 text-sm flex items-center gap-1.5">
                        <Briefcase size={14} className="text-neutral-400" />
                        {app.bureau} • <span className="capitalize text-neutral-500 text-xs">{app.role} Division</span>
                      </p>
                      <p className="font-mono text-xs uppercase tracking-wider text-[#990000] mt-3">Sovereign Statement & Experience Overview</p>
                      <p className="text-xs md:text-sm text-neutral-600 whitespace-pre-wrap italic leading-relaxed">
                        "{app.bio}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-neutral-100">
                      <span className="text-xs font-mono text-neutral-400">
                        Received: {new Date(app.createdAt).toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAppStatus(app.id, 'APPROVED')}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-3 py-1.5 rounded transition-all cursor-pointer uppercase font-mono"
                        >
                          Approve Dossier
                        </button>
                        <button
                          onClick={() => handleAppStatus(app.id, 'REJECTED')}
                          className="bg-neutral-800 hover:bg-[#990000] text-white font-bold text-xs px-3 py-1.5 rounded transition-all cursor-pointer uppercase font-mono"
                        >
                          Reject / Archive
                        </button>
                        <button
                          onClick={() => handleDeleteApp(app.id)}
                          className="text-neutral-400 hover:text-red-600 transition-all p-1.5 cursor-pointer"
                          title="Purge Application"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Encrypted Telex Intelligence Ledger */}
        {activeTab === 'telexes' && (
          <div className="space-y-6 text-start">
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2 text-neutral-950">
                <Terminal className="text-[#990000]" size={26} />
                Encrypted Telex Intelligence Ledger
              </h1>
              <p className="text-sm text-gray-500">
                Securely routed trilingual dispatches and inquiries dispatched via our public telex nodes.
              </p>
            </div>

            {telexes.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 font-mono text-sm border border-dashed border-neutral-300 rounded-lg">
                No active telexes in the queue.
              </div>
            ) : (
              <div className="space-y-4">
                {telexes.map((tlx: any) => (
                  <div key={tlx.id} className="border border-neutral-900 bg-neutral-950 text-[#00FF00] p-6 rounded-lg shadow-md space-y-4 font-mono text-xs">
                    <div className="flex flex-wrap justify-between items-start gap-4 border-[#00FF00]/20 pb-3 border-b">
                      <div>
                        <p className="text-sm font-black text-[#00FF00] flex items-center gap-2 uppercase">
                          <Terminal size={14} className="animate-pulse" />
                          TELEX REF: {tlx.telexRef}
                        </p>
                        <p className="text-neutral-400 mt-1">SENDER: {tlx.name} ({tlx.company}) • {tlx.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                          tlx.status === 'UNREAD' ? 'bg-[#990000]/20 text-[#FF3333] border-[#FF3333]' :
                          tlx.status === 'ARCHIVED' ? 'bg-neutral-800 text-neutral-400 border-neutral-600' :
                          'bg-[#00FF00]/10 text-[#00FF00] border-[#00FF00]'
                        }`}>
                          {tlx.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[#00FF00]/90">
                      <p className="text-neutral-400 uppercase tracking-wider text-[10px]">ROUTE PATH:</p>
                      <p className="font-bold flex items-center gap-1 text-[#00FF00] uppercase">
                        <Globe size={12} />
                        BUREAU NODE // {tlx.bureau}
                      </p>
                      <p className="text-neutral-400 uppercase tracking-wider text-[10px] mt-2">ENCRYPTED MESSAGE DISPATCH:</p>
                      <p className="bg-black/40 p-4 border border-[#00FF00]/10 rounded whitespace-pre-wrap text-[#00FF00] font-mono leading-relaxed text-start">
                        {tlx.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-[#00FF00]/20">
                      <span className="text-[10px] text-neutral-400">
                        TRANSMITTED: {new Date(tlx.createdAt).toLocaleString()}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTelexStatus(tlx.id, 'REPLIED')}
                          className="bg-[#00FF00]/10 hover:bg-[#00FF00]/20 text-[#00FF00] border border-[#00FF00] font-bold text-[10px] px-3 py-1 rounded transition-all cursor-pointer uppercase"
                        >
                          Mark Replied
                        </button>
                        <button
                          onClick={() => handleTelexStatus(tlx.id, 'ARCHIVED')}
                          className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-[10px] px-3 py-1 rounded transition-all cursor-pointer uppercase"
                        >
                          Archive
                        </button>
                        <button
                          onClick={() => handleDeleteTelex(tlx.id)}
                          className="text-red-500 hover:text-red-400 transition-all p-1 cursor-pointer"
                          title="Erase Dispatch"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Research Studies Management */}
        {activeTab === 'studies' && (
          <div className="space-y-6 text-start">
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-serif font-black tracking-tight flex items-center gap-2 text-neutral-950">
                <BookOpen className="text-[#990000]" size={26} />
                Sovereign Research Studies Manager
              </h1>
              <p className="text-sm text-gray-500">
                Create, audit, and update trilingual sovereign research studies in the SQLite database ledger.
              </p>
            </div>

            {/* Study Form */}
            <form onSubmit={handleStudySubmit} className="bg-neutral-50 p-6 border border-neutral-200 rounded-lg space-y-4">
              <h3 className="font-serif font-black text-lg text-[#990000] border-b border-neutral-200 pb-2">Publish / Edit Study</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Study Slug (Unique URL path)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. china-iraq-infrastructure-cooperation"
                    className="w-full border border-neutral-300 bg-white p-2 text-xs focus:ring-1 focus:ring-[#990000]"
                    value={studyForm.slug}
                    onChange={e => setStudyForm({ ...studyForm, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">Illustration / Unsplash Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full border border-neutral-300 bg-white p-2 text-xs focus:ring-1 focus:ring-[#990000]"
                    value={studyForm.imageUrl}
                    onChange={e => setStudyForm({ ...studyForm, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              {/* Multilingual inputs for Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Title (English)</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 bg-white p-2 text-xs"
                    value={studyForm.titleEn}
                    onChange={e => setStudyForm({ ...studyForm, titleEn: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">العنوان (العربية)</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 bg-white p-2 text-xs"
                    value={studyForm.titleAr}
                    onChange={e => setStudyForm({ ...studyForm, titleAr: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">标题 (中文)</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 bg-white p-2 text-xs"
                    value={studyForm.titleZh}
                    onChange={e => setStudyForm({ ...studyForm, titleZh: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">ناونیشان (Kurdish)</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-neutral-300 bg-white p-2 text-xs"
                    value={studyForm.titleCkb}
                    onChange={e => setStudyForm({ ...studyForm, titleCkb: e.target.value })}
                  />
                </div>
              </div>

              {/* Multilingual inputs for Excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Excerpt (English)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-16"
                    value={studyForm.excerptEn}
                    onChange={e => setStudyForm({ ...studyForm, excerptEn: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">الملخص (العربية)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-16"
                    value={studyForm.excerptAr}
                    onChange={e => setStudyForm({ ...studyForm, excerptAr: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">摘要 (中文)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-16"
                    value={studyForm.excerptZh}
                    onChange={e => setStudyForm({ ...studyForm, excerptZh: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">کورتە (Kurdish)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-16"
                    value={studyForm.excerptCkb}
                    onChange={e => setStudyForm({ ...studyForm, excerptCkb: e.target.value })}
                  />
                </div>
              </div>

              {/* Content Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-neutral-200 pt-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Content (English)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-28"
                    value={studyForm.contentEn}
                    onChange={e => setStudyForm({ ...studyForm, contentEn: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">المحتوى (العربية)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-28"
                    value={studyForm.contentAr}
                    onChange={e => setStudyForm({ ...studyForm, contentAr: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">正文 (中文)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-28"
                    value={studyForm.contentZh}
                    onChange={e => setStudyForm({ ...studyForm, contentZh: e.target.value })}
                  />
                </div>
                <div dir="rtl">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">تەواوی بابەتەکە (Kurdish)</label>
                  <textarea
                    className="w-full border border-neutral-300 bg-white p-2 text-xs h-28"
                    value={studyForm.contentCkb}
                    onChange={e => setStudyForm({ ...studyForm, contentCkb: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
                <label className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-[#990000]"
                    checked={studyForm.isPrivate}
                    onChange={e => setStudyForm({ ...studyForm, isPrivate: e.target.checked })}
                  />
                  Lock study under Private Premium subscription vetting
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#111111] hover:bg-[#990000] text-white font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Save and Publish Research Study
              </button>
            </form>

            {/* List of existing studies */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif font-black text-lg text-neutral-800 border-b border-neutral-200 pb-2">Active Studies Index</h3>
              {studies.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-500 font-mono">
                  No active studies found in the sovereign index.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {studies.map((study: any) => (
                    <div key={study.id} className="border border-neutral-200 p-4 rounded-lg bg-white flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm font-sans flex items-center gap-1.5">
                          {study.isPrivate ? <Lock size={14} className="text-amber-600" /> : <Unlock size={14} className="text-green-600" />}
                          {study.titleEn}
                        </h4>
                        <p className="text-xs text-neutral-500 font-mono">Slug: {study.slug}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setStudyForm({
                            slug: study.slug,
                            titleEn: study.titleEn, titleAr: study.titleAr, titleZh: study.titleZh, titleCkb: study.titleCkb,
                            excerptEn: study.excerptEn, excerptAr: study.excerptAr, excerptZh: study.excerptZh, excerptCkb: study.excerptCkb,
                            contentEn: study.contentEn, contentAr: study.contentAr, contentZh: study.contentZh, contentCkb: study.contentCkb,
                            imageUrl: study.imageUrl || '',
                            isPrivate: !!study.isPrivate
                          })}
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-[10px] px-2.5 py-1.5 rounded transition-all cursor-pointer uppercase"
                        >
                          Load/Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStudy(study.id)}
                          className="text-neutral-400 hover:text-red-600 p-1.5 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
