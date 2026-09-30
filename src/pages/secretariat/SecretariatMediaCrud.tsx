import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Video, Plus, Edit2, Trash2, RotateCcw, Eye, X, Film, Tv, Clapperboard, Users } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale, MediaItem } from '../../types/portals';

export function SecretariatMediaCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: '',
    descEn: '',
    category: 'movies' as 'movies' | 'drama' | 'documentary' | 'exchange',
    director: '',
    year: 2026,
    duration: '1h 30m',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  });

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const media = portalStore.getMediaItems();

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
    setFormData({
      titleEn: item.title.en,
      descEn: item.description.en,
      category: item.category,
      director: item.director,
      year: item.year,
      duration: item.duration,
      posterUrl: item.posterUrl,
      videoUrl: item.videoUrl
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem(null);
    setFormData({
      titleEn: '',
      descEn: '',
      category: 'movies',
      director: 'Bilateral Director',
      year: 2026,
      duration: '1h 45m',
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (formData.titleEn || 'media-item')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const itemToSave: MediaItem = {
      id: editingItem ? editingItem.id : `media-${Date.now()}`,
      slug: editingItem ? editingItem.slug : `${slug}-${Date.now().toString().slice(-4)}`,
      title: {
        en: formData.titleEn,
        ar: formData.titleEn,
        zh: formData.titleEn,
        ckb: formData.titleEn
      },
      description: {
        en: formData.descEn,
        ar: formData.descEn,
        zh: formData.descEn,
        ckb: formData.descEn
      },
      posterUrl: formData.posterUrl,
      duration: formData.duration,
      durationMinutes: 90,
      category: formData.category,
      tags: ['Bilateral Production', formData.category.toUpperCase()],
      director: formData.director,
      year: Number(formData.year),
      originLanguage: 'Arabic & Mandarin',
      subtitles: ['English', 'Arabic', 'Chinese', 'Kurdish'],
      videoUrl: formData.videoUrl,
      publishDate: new Date().toISOString().split('T')[0],
      rating: 4.9,
      status: 'published'
    };

    portalStore.saveMediaItem(itemToSave);
    setIsCreating(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
            Media Hub Library CRUD
          </h1>
          <p className="text-xs text-[#4B5563]">
            Manage movies, serialized drama, documentaries, and cultural exchange video assets.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Upload Media Item</span>
        </button>
      </div>

      {(isCreating || editingItem) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border-2 border-[var(--color-brand-800)] space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="font-serif font-black text-lg text-[#000000]">
              {isCreating ? 'Add Media to Library' : `Edit: ${editingItem?.title.en}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingItem(null); }}
              className="p-1 text-[#4B5563] hover:text-[#000000] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              >
                <option value="movies">Movies</option>
                <option value="drama">Drama Series</option>
                <option value="documentary">Documentary</option>
                <option value="exchange">Exchange Promoting Videos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.descEn}
              onChange={e => setFormData({ ...formData, descEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Director</label>
              <input
                type="text"
                value={formData.director}
                onChange={e => setFormData({ ...formData, director: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase mb-1">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingItem(null); }}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-bold hover:bg-[#F9FAFB] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Save Media
            </button>
          </div>
        </form>
      )}

      {/* Media Data Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Title & Category</th>
              <th className="p-4 text-start">Director</th>
              <th className="p-4 text-start">Duration</th>
              <th className="p-4 text-start">Status</th>
              <th className="p-4 text-end">CRUD Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {media.map(item => (
              <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#000000]">
                    {item.title[currentLang] || item.title.en}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--color-brand-800)] uppercase mt-0.5">
                    {item.category}
                  </div>
                </td>
                <td className="p-4 text-[#4B5563]">
                  {item.director}
                </td>
                <td className="p-4 font-mono text-[#4B5563]">
                  {item.duration}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      item.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/${currentLang}/live/${item.slug}`}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors"
                      title="Preview"
                    >
                      <Eye size={13} />
                    </Link>

                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={13} />
                    </button>

                    {item.status === 'published' ? (
                      <button
                        onClick={() => portalStore.softDeleteMediaItem(item.id)}
                        className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-amber-500 text-amber-600 transition-colors cursor-pointer"
                        title="Soft Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    ) : (
                      <button
                        onClick={() => portalStore.restoreMediaItem(item.id)}
                        className="p-1.5 rounded-lg border border-green-300 text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                        title="Restore"
                      >
                        <RotateCcw size={13} />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm(`Permanently delete "${item.title.en}"?`)) {
                          portalStore.permanentDeleteMediaItem(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-red-200 text-[var(--color-brand-800)] hover:bg-red-50 transition-colors cursor-pointer"
                      title="Permanent Purge"
                    >
                      <X size={13} />
                    </button>
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

export default SecretariatMediaCrud;
