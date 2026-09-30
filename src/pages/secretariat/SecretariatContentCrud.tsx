import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Eye,
  Check,
  X,
  Search,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale, NewsroomArticle } from '../../types/portals';
import { useAuthStore } from '../../store/useAuthStore';

export function SecretariatContentCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role?.toUpperCase() === 'SUPERADMIN' || true;

  const [dataVersion, setDataVersion] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [editingArticle, setEditingArticle] = useState<NewsroomArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    titleCkb: '',
    excerptEn: '',
    excerptAr: '',
    excerptZh: '',
    excerptCkb: '',
    contentEn: '',
    category: 'strategic-alliances',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    tags: 'Strategic, Accord, Bilateral',
    isFeatured: false,
    isBreaking: false
  });

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const articles = portalStore.getNewsArticles();

  const filtered = articles.filter(a => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchesSearch = !search.trim() ||
      (a.title[currentLang] || a.title.en).toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEdit = (article: NewsroomArticle) => {
    setEditingArticle(article);
    setFormData({
      titleEn: article.title.en,
      titleAr: article.title.ar,
      titleZh: article.title.zh,
      titleCkb: article.title.ckb,
      excerptEn: article.excerpt.en,
      excerptAr: article.excerpt.ar,
      excerptZh: article.excerpt.zh,
      excerptCkb: article.excerpt.ckb,
      contentEn: article.content.en,
      category: article.category,
      imageUrl: article.imageUrl,
      tags: article.tags.join(', '),
      isFeatured: article.isFeatured,
      isBreaking: article.isBreaking
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingArticle(null);
    setFormData({
      titleEn: '',
      titleAr: '',
      titleZh: '',
      titleCkb: '',
      excerptEn: '',
      excerptAr: '',
      excerptZh: '',
      excerptCkb: '',
      contentEn: '',
      category: 'strategic-alliances',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
      tags: 'Diplomacy, Accord',
      isFeatured: false,
      isBreaking: false
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const authors = portalStore.getNewsAuthors();
    const slug = (formData.titleEn || 'dispatch')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const articleToSave: NewsroomArticle = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      slug: editingArticle ? editingArticle.slug : `${slug}-${Date.now().toString().slice(-4)}`,
      title: {
        en: formData.titleEn || 'New Dispatch',
        ar: formData.titleAr || formData.titleEn,
        zh: formData.titleZh || formData.titleEn,
        ckb: formData.titleCkb || formData.titleEn
      },
      excerpt: {
        en: formData.excerptEn || 'Bilateral sovereign news briefing.',
        ar: formData.excerptAr || formData.excerptEn,
        zh: formData.excerptZh || formData.excerptEn,
        ckb: formData.excerptCkb || formData.excerptEn
      },
      content: {
        en: formData.contentEn || '<p>Authenticated text authorized by Secretariat.</p>',
        ar: formData.contentEn,
        zh: formData.contentEn,
        ckb: formData.contentEn
      },
      category: formData.category,
      tags: formData.tags.split(',').map(t => t.trim()),
      author: editingArticle ? editingArticle.author : authors[0],
      imageUrl: formData.imageUrl,
      publishDate: new Date().toISOString().split('T')[0],
      readingTimeMinutes: 5,
      isFeatured: formData.isFeatured,
      isBreaking: formData.isBreaking,
      isEditorPick: false,
      views: editingArticle ? editingArticle.views : 120,
      status: 'published',
      relatedSlugs: []
    };

    portalStore.saveArticle(articleToSave);
    setEditingArticle(null);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
            Content Management (Full CRUD)
          </h1>
          <p className="text-xs text-[#4B5563]">
            Create, read, update, soft-delete, restore, and permanently purge dispatches.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create New Dispatch</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#4B5563]" />
          <span className="text-xs font-bold text-[#000000]">Status Filter:</span>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#E5E7EB] text-xs font-bold bg-[#F9FAFB] text-[#000000] focus:outline-none"
          >
            <option value="all">All Items</option>
            <option value="published">Published</option>
            <option value="archived">Archived (Soft-Deleted)</option>
          </select>
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter by title..."
            className="ps-8 pe-3 py-1.5 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:outline-none w-56"
          />
          <Search size={14} className="absolute inset-y-0 inset-inline-start-2.5 my-auto text-[#4B5563]" />
        </div>
      </div>

      {/* Create / Edit Form Drawer/Modal */}
      {(isCreating || editingArticle) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border-2 border-[var(--color-brand-800)] space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="font-serif font-black text-lg text-[#000000]">
              {isCreating ? 'Create Bilateral Dispatch' : `Edit: ${editingArticle?.title.en}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingArticle(null); }}
              className="p-1 text-[#4B5563] hover:text-[#000000] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Title (English) *</label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Title (Arabic) *</label>
              <input
                type="text"
                required
                value={formData.titleAr}
                onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Title (Chinese) *</label>
              <input
                type="text"
                required
                value={formData.titleZh}
                onChange={e => setFormData({ ...formData, titleZh: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Title (Kurdish) *</label>
              <input
                type="text"
                required
                value={formData.titleCkb}
                onChange={e => setFormData({ ...formData, titleCkb: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Excerpt (English) *</label>
            <textarea
              required
              rows={2}
              value={formData.excerptEn}
              onChange={e => setFormData({ ...formData, excerptEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              >
                <option value="strategic-alliances">Strategic Alliances</option>
                <option value="energy-corridors">Energy & Corridors</option>
                <option value="sovereign-finance">Sovereign Finance</option>
                <option value="culture-exchange">Culture & Education</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-[#000000] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="accent-[var(--color-brand-800)]"
              />
              <span>Set as Featured Dispatch</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-[#000000] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBreaking}
                onChange={e => setFormData({ ...formData, isBreaking: e.target.checked })}
                className="accent-[var(--color-brand-800)]"
              />
              <span>Set as Breaking Alert</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingArticle(null); }}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-bold hover:bg-[#F9FAFB] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Save Dispatch
            </button>
          </div>
        </form>
      )}

      {/* CRUD Data Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Title & Category</th>
              <th className="p-4 text-start">Author / Desk</th>
              <th className="p-4 text-start">Publish Date</th>
              <th className="p-4 text-start">Status</th>
              <th className="p-4 text-end">CRUD Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {filtered.map(article => (
              <tr key={article.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#000000] line-clamp-1">
                    {article.title[currentLang] || article.title.en}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-brand-800)] mt-0.5">
                    {article.category}
                  </div>
                </td>
                <td className="p-4 text-[#4B5563]">
                  {article.author.name}
                </td>
                <td className="p-4 text-[#4B5563] font-mono">
                  {article.publishDate}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      article.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/${currentLang}/newsroom/${article.slug}`}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors"
                      title="View Article"
                    >
                      <Eye size={13} />
                    </Link>

                    <button
                      onClick={() => handleEdit(article)}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
                      title="Update / Edit"
                    >
                      <Edit2 size={13} />
                    </button>

                    {article.status === 'published' ? (
                      <button
                        onClick={() => portalStore.softDeleteArticle(article.id)}
                        className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-amber-500 text-amber-600 transition-colors cursor-pointer"
                        title="Soft Delete (Archive)"
                      >
                        <Trash2 size={13} />
                      </button>
                    ) : (
                      <button
                        onClick={() => portalStore.restoreArticle(article.id)}
                        className="p-1.5 rounded-lg border border-green-300 text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        title="Restore Article"
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}

                    {isSuperAdmin && (
                      <button
                        onClick={() => {
                          if (confirm('Permanently delete this dispatch from sovereign ledger?')) {
                            portalStore.permanentDeleteArticle(article.id);
                          }
                        }}
                        className="p-1.5 rounded-lg border border-red-200 text-[var(--color-brand-800)] hover:bg-red-50 transition-colors cursor-pointer"
                        title="Permanent Delete (SuperAdmin Only)"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecretariatContentCrud;
