import { apiFetch } from '../lib/api';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Globe, Eye, ChevronDown, CheckCircle2, AlertCircle, Link2, Sparkles, Layout } from 'lucide-react';
import TiptapEditor from './TiptapEditor';

interface Category {
  id: string;
  slug: string;
  nameEn: string;
}

export function TrilingualEditor() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'en' | 'ar' | 'zh' | 'ckb'>('en');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // High-fidelity quadrilingual form state
  const [formData, setFormData] = useState({
    en: { title: '', excerpt: '', content: '' },
    ar: { title: '', excerpt: '', content: '' },
    zh: { title: '', excerpt: '', content: '' },
    ckb: { title: '', excerpt: '', content: '' },
  });

  // Fetch real database categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await apiFetch('/api/categories');
      if (!res.ok) throw new Error('Failed to load categories');
      return res.json();
    }
  });

  const handleInputChange = (field: 'title' | 'excerpt' | 'content', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [field]: value },
    }));
  };

  // Kurdish (ckb) and Arabic (ar) are RTL
  const isRtl = activeTab === 'ar' || activeTab === 'ckb';

  // Article creation mutation
  const publishMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiFetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to publish article');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setStatusMessage({ type: 'success', text: 'Article published successfully across all 4 languages!' });
      setTimeout(() => {
        navigate(`/${lang || 'en'}/admin/articles`);
      }, 1500);
    },
    onError: (err: any) => {
      setStatusMessage({ type: 'error', text: err.message || 'Transmission failed.' });
    }
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim()) {
      setStatusMessage({ type: 'error', text: 'Slug is strictly required.' });
      return;
    }
    if (!categoryId) {
      setStatusMessage({ type: 'error', text: 'Please select an editorial category.' });
      return;
    }

    // Verify at least one language has a title to publish
    const hasAnyTitle = Object.values(formData).some(t => t.title.trim().length > 0);
    if (!hasAnyTitle) {
      setStatusMessage({ type: 'error', text: 'Please provide at least one headline translation variant.' });
      return;
    }

    // Prepare payload
    const translationsArray = Object.entries(formData).map(([langKey, data]) => ({
      lang: langKey,
      title: data.title.trim() || `Draft Title [${langKey.toUpperCase()}]`,
      excerpt: data.excerpt.trim() || `Draft excerpt [${langKey.toUpperCase()}]`,
      content: data.content.trim() || `Draft body [${langKey.toUpperCase()}]`
    }));

    publishMutation.mutate({
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      categoryId,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      translations: translationsArray
    });
  };

  // Pre-populate slugs based on the English title when it gets modified
  const handleEnTitleChange = (val: string) => {
    handleInputChange('title', val);
    if (activeTab === 'en' && !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start text-start w-full">
      {/* Main Editing Canvas */}
      <div className="flex-1 w-full flex flex-col gap-6">
        {/* Language Tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl w-fit border border-gray-200 shadow-xs">
          {[
            { id: 'en', label: 'English (LTR)' },
            { id: 'ar', label: 'العربية (RTL)' },
            { id: 'ckb', label: 'کوردی (RTL)' },
            { id: 'zh', label: '中文 (LTR)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#990000] shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Language Canvas */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Headline</label>
            <input
              type="text"
              dir={isRtl ? 'rtl' : 'ltr'}
              value={formData[activeTab].title}
              onChange={(e) => {
                if (activeTab === 'en') {
                  handleEnTitleChange(e.target.value);
                } else {
                  handleInputChange('title', e.target.value);
                }
              }}
              placeholder={
                activeTab === 'ar' 
                  ? 'أدخل العنوان هنا...' 
                  : activeTab === 'ckb' 
                  ? 'ناونیشانەکە لێرە بنووسە...' 
                  : activeTab === 'zh' 
                  ? '在此输入标题...' 
                  : 'Enter headline here...'
              }
              className="w-full text-3xl font-serif font-extrabold p-3 border-b border-gray-100 focus:border-[#990000] outline-none bg-transparent transition-colors placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Excerpt (SEO Description)</label>
            <textarea
              dir={isRtl ? 'rtl' : 'ltr'}
              value={formData[activeTab].excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              rows={2}
              placeholder={
                isRtl 
                  ? 'کورتەیەک یاخود وەسفێکی خێرا بۆ بزوێنەری گەڕان...' 
                  : 'Write a brief, punchy excerpt for social previews and search engines...'
              }
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#990000] focus:border-transparent text-sm resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400">Body Content</label>
              <span className="text-xs font-semibold text-[#990000] flex items-center gap-1.5 bg-red-50 px-2 py-1 rounded">
                <Sparkles size={12} /> Rich Editor Enabled
              </span>
            </div>
            
            <TiptapEditor 
              value={formData[activeTab].content}
              onChange={(val) => handleInputChange('content', val)}
              dir={isRtl ? 'rtl' : 'ltr'}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar: Publishing Controls & Metadata */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        {/* Publish Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Globe size={18} className="text-[#990000]" /> Publish Settings
          </h3>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">Status:</span>
            <span className="font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded text-xs uppercase tracking-wide border border-yellow-100">Draft</span>
          </div>
          
          {statusMessage && (
            <div className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs font-semibold ${
              statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
            }`}>
              {statusMessage.type === 'success' ? <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" /> : <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-3">
            <button 
              type="button"
              onClick={handlePublish}
              disabled={publishMutation.isPending}
              className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-[#990000] text-white font-bold text-sm rounded-lg hover:bg-[#7a0000] transition-colors shadow-xs outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50 cursor-pointer"
            >
              <Save size={16} /> 
              {publishMutation.isPending ? 'Publishing...' : 'Publish Article'}
            </button>
            <button 
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="w-full flex justify-center items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors outline-none focus:ring-2 focus:ring-gray-100 cursor-pointer"
            >
              <Eye size={16} /> Preview All Variants
            </button>
          </div>
        </div>

        {/* Metadata Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4 text-sm">
          <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3">Metadata Registry</h3>
          
          <div className="space-y-1">
            <label className="font-bold text-gray-600 block text-xs uppercase">Custom Slug</label>
            <div className="relative">
              <input 
                type="text" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="e.g. trade-relations-growing" 
                className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#990000] focus:border-transparent text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-600 block text-xs uppercase">Category</label>
            <div className="relative">
              <select 
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className="w-full p-2.5 border border-gray-300 rounded-lg appearance-none bg-white outline-none focus:ring-2 focus:ring-[#990000] text-xs font-medium cursor-pointer"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nameEn}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-600 block text-xs uppercase">Hero Image URL</label>
            <input 
              type="url" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..." 
              className="w-full p-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#990000] focus:border-transparent text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Previews Modal overlay */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-[85vh] flex flex-col overflow-hidden text-start">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Layout size={18} className="text-[#990000]" />
                <h3 className="font-black text-gray-950 uppercase tracking-wider text-sm">
                  Simultaneous Quadrilingual Output Preview
                </h3>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-gray-800 font-extrabold text-sm p-1 hover:bg-gray-100 rounded cursor-pointer"
              >
                ✕ Close Preview
              </button>
            </div>

            {/* Grid Layout of all 4 languages */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50">
              {/* English */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-blue-600 tracking-widest">English</span>
                  <span className="text-[10px] font-mono text-gray-400">LTR</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900">{formData.en.title || 'Untitled Article'}</h4>
                <p className="text-xs text-gray-500 italic">{formData.en.excerpt || 'No excerpt configured.'}</p>
                <div className="text-sm font-serif text-gray-800 leading-relaxed whitespace-pre-wrap border-t border-gray-50 pt-2 flex-1">
                  {formData.en.content || 'Body content is empty...'}
                </div>
              </div>

              {/* Arabic */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col gap-3" dir="rtl">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-emerald-600 tracking-widest">العربية</span>
                  <span className="text-[10px] font-mono text-gray-400">RTL</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900">{formData.ar.title || 'العنوان غير محدد'}</h4>
                <p className="text-xs text-gray-500 italic">{formData.ar.excerpt || 'لا يوجد مقتطف.'}</p>
                <div className="text-sm font-serif text-gray-800 leading-relaxed whitespace-pre-wrap border-t border-gray-50 pt-2 flex-1">
                  {formData.ar.content || 'المحتوى فارغ...'}
                </div>
              </div>

              {/* Kurdish */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col gap-3" dir="rtl">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-amber-600 tracking-widest">کوردی (Sorani)</span>
                  <span className="text-[10px] font-mono text-gray-400">RTL</span>
                </div>
                <h4 className="text-xl font-serif font-bold text-gray-900">{formData.ckb.title || 'بێ ناونیشان'}</h4>
                <p className="text-xs text-gray-500 italic">{formData.ckb.excerpt || 'هیچ کورتەیەک نییە.'}</p>
                <div className="text-sm font-serif text-gray-800 leading-relaxed whitespace-pre-wrap border-t border-gray-50 pt-2 flex-1">
                  {formData.ckb.content || 'ناوەرۆکەکە بەتاڵە...'}
                </div>
              </div>

              {/* Chinese */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-black uppercase text-purple-600 tracking-widest">中文 (Chinese)</span>
                  <span className="text-[10px] font-mono text-gray-400">LTR</span>
                </div>
                <h4 className="text-xl font-sans font-bold text-gray-900">{formData.zh.title || '未命名文章'}</h4>
                <p className="text-xs text-gray-500 italic">{formData.zh.excerpt || '没有摘要信息。'}</p>
                <div className="text-sm font-sans text-gray-800 leading-relaxed whitespace-pre-wrap border-t border-gray-50 pt-2 flex-1">
                  {formData.zh.content || '文章正文为空...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
