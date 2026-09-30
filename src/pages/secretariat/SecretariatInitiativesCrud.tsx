import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, Plus, Edit2, Trash2, Eye, X, Check } from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale, PublicInitiative } from '../../types/portals';

export function SecretariatInitiativesCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [dataVersion, setDataVersion] = useState(0);
  const [editingInit, setEditingInit] = useState<PublicInitiative | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    titleEn: '',
    shortDescEn: '',
    fullDescEn: '',
    status: 'strategic' as 'active' | 'expanding' | 'strategic',
    pillar: 'ENERGY_INFRA',
    iconName: 'Zap'
  });

  useEffect(() => {
    return portalStore.subscribe(() => setDataVersion(v => v + 1));
  }, []);

  const initiatives = portalStore.getInitiatives();

  const handleEdit = (init: PublicInitiative) => {
    setEditingInit(init);
    setFormData({
      titleEn: init.title.en,
      shortDescEn: init.shortDesc.en,
      fullDescEn: init.fullDesc.en,
      status: init.status,
      pillar: init.pillar,
      iconName: init.iconName
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingInit(null);
    setFormData({
      titleEn: '',
      shortDescEn: '',
      fullDescEn: '',
      status: 'active',
      pillar: 'NEW_INITIATIVE',
      iconName: 'Layers'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (formData.titleEn || 'initiative')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const initToSave: PublicInitiative = {
      id: editingInit ? editingInit.id : `init-${Date.now()}`,
      slug: editingInit ? editingInit.slug : `${slug}-${Date.now().toString().slice(-4)}`,
      title: {
        en: formData.titleEn,
        ar: formData.titleEn,
        zh: formData.titleEn,
        ckb: formData.titleEn
      },
      shortDesc: {
        en: formData.shortDescEn,
        ar: formData.shortDescEn,
        zh: formData.shortDescEn,
        ckb: formData.shortDescEn
      },
      fullDesc: {
        en: formData.fullDescEn,
        ar: formData.fullDescEn,
        zh: formData.fullDescEn,
        ckb: formData.fullDescEn
      },
      pillar: formData.pillar,
      iconName: formData.iconName,
      imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      kpis: [
        { metric: '$5B', label: { en: 'Allocation', ar: 'تخصيص', zh: '规划投资', ckb: 'تەرخانکراو' } },
        { metric: '100%', label: { en: 'Sovereign', ar: 'سيادي', zh: '主权互信', ckb: 'سەروەری' } },
        { metric: '2026', label: { en: 'Inauguration', ar: 'تدشين', zh: '落地启用', ckb: 'دەستپێک' } }
      ],
      status: formData.status,
      targetAudience: {
        en: 'Bilateral delegations and ministries',
        ar: 'الوفود الثنائية والوزارات',
        zh: '双边经贸考察团与部委机关',
        ckb: 'شاندە دوولایەنییەکان و وەزارەتەکان'
      }
    };

    portalStore.saveInitiative(initToSave);
    setIsCreating(false);
    setEditingInit(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
            Initiatives Management (CRUD)
          </h1>
          <p className="text-xs text-[#4B5563]">
            Govern the 7 core strategic programs linking China and Iraq.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Initiative</span>
        </button>
      </div>

      {(isCreating || editingInit) && (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border-2 border-[var(--color-brand-800)] space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
            <h3 className="font-serif font-black text-lg text-[#000000]">
              {isCreating ? 'Create Strategic Initiative' : `Edit: ${editingInit?.title.en}`}
            </h3>
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingInit(null); }}
              className="p-1 text-[#4B5563] hover:text-[#000000] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Initiative Title (English) *</label>
            <input
              type="text"
              required
              value={formData.titleEn}
              onChange={e => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Short Description *</label>
            <textarea
              required
              rows={2}
              value={formData.shortDescEn}
              onChange={e => setFormData({ ...formData, shortDescEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase mb-1">Full Mandate Dossier *</label>
            <textarea
              required
              rows={4}
              value={formData.fullDescEn}
              onChange={e => setFormData({ ...formData, fullDescEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#000000] focus:border-[var(--color-brand-800)] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => { setIsCreating(false); setEditingInit(null); }}
              className="px-4 py-2 rounded-xl border border-[#E5E7EB] text-xs font-bold hover:bg-[#F9FAFB] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#A00D26] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Save Initiative
            </button>
          </div>
        </form>
      )}

      {/* Initiatives List */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Initiative Title</th>
              <th className="p-4 text-start">Pillar Key</th>
              <th className="p-4 text-start">Status</th>
              <th className="p-4 text-end">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {initiatives.map(init => (
              <tr key={init.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#000000]">
                    {init.title[currentLang] || init.title.en}
                  </div>
                  <div className="text-[11px] text-[#4B5563] line-clamp-1 mt-0.5">
                    {init.shortDesc[currentLang] || init.shortDesc.en}
                  </div>
                </td>
                <td className="p-4 font-mono text-[var(--color-brand-800)] text-[11px]">
                  {init.pillar}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#FEE2E2] text-[#991B1B]">
                    {init.status}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/${currentLang}/initiatives/${init.slug}`}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors"
                      title="View"
                    >
                      <Eye size={13} />
                    </Link>

                    <button
                      onClick={() => handleEdit(init)}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-[#000000] hover:text-[var(--color-brand-800)] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={13} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Delete initiative "${init.title.en}"?`)) {
                          portalStore.deleteInitiative(init.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-red-200 text-[var(--color-brand-800)] hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={13} />
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

export default SecretariatInitiativesCrud;
