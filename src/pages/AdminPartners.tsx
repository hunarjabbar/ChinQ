import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminPartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    descriptionEn: '',
    descriptionAr: '',
    descriptionZh: '',
    descriptionCkb: '',
    isActive: true,
    order: 0
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch('/api/admin/partners', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        setPartners(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/partners/${editingId}` : '/api/admin/partners';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchPartners();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (partner?: any) => {
    if (partner) {
      setEditingId(partner.id);
      setFormData({
        name: partner.name,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl || '',
        descriptionEn: partner.descriptionEn || '',
        descriptionAr: partner.descriptionAr || '',
        descriptionZh: partner.descriptionZh || '',
        descriptionCkb: partner.descriptionCkb || '',
        isActive: partner.isActive,
        order: partner.order || 0
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        descriptionEn: '',
        descriptionAr: '',
        descriptionZh: '',
        descriptionCkb: '',
        isActive: true,
        order: partners.length
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-ink-900 uppercase">Partners Management</h1>
          <p className="text-gray-500 font-mono text-xs mt-1">Manage global partners, logos, and localized descriptions.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-brand-800 text-white px-4 py-2 font-bold uppercase tracking-wider text-xs flex items-center gap-2 hover:bg-brand-700 transition-colors"
        >
          <Plus size={14} /> Add Partner
        </button>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase font-black text-gray-500 tracking-wider">
              <th className="p-4">Logo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Website</th>
              <th className="p-4">Status</th>
              <th className="p-4">Order</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs font-mono text-gray-700">
            {partners.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <img src={p.logoUrl} alt={p.name} className="h-10 w-20 object-contain" />
                </td>
                <td className="p-4 font-bold">{p.name}</td>
                <td className="p-4 text-brand-600">{p.websiteUrl}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-[9px] font-black tracking-widest uppercase rounded ${p.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4">{p.order}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openModal(p)} className="text-brand-800 hover:text-brand-900 mx-2"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
            {partners.length === 0 && !isLoading && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400 font-sans italic">No partners found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border-t-4 border-brand-800 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-lg font-black uppercase text-ink-900">{editingId ? 'Edit Partner' : 'Add Partner'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">Partner Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-xs border border-gray-300 p-2 focus:border-brand-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">Website URL</label>
                    <input type="url" value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} className="w-full text-xs border border-gray-300 p-2 focus:border-brand-800 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1 flex items-center gap-1"><ImageIcon size={12}/> Logo URL</label>
                  <input required type="url" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="w-full text-xs border border-gray-300 p-2 focus:border-brand-800 focus:outline-none" />
                  {formData.logoUrl && (
                    <div className="mt-2 p-2 border border-dashed border-gray-300 inline-block bg-gray-50">
                      <img src={formData.logoUrl} alt="Preview" className="h-12 object-contain" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">Order (Sorting)</label>
                    <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full text-xs border border-gray-300 p-2 focus:border-brand-800 focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-2 mt-6">
                    <input type="checkbox" id="isActive" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="accent-brand-800" />
                    <label htmlFor="isActive" className="text-xs font-bold uppercase tracking-wider text-gray-700 cursor-pointer">Active</label>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-4">
                  <h3 className="text-xs font-black uppercase text-ink-900 mb-4">Localized Descriptions</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">English</label>
                      <textarea required value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} className="w-full text-xs border border-gray-300 p-2 h-20 focus:border-brand-800 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1 text-right">Arabic (عربي)</label>
                      <textarea value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="w-full text-xs border border-gray-300 p-2 h-20 focus:border-brand-800 focus:outline-none text-right" dir="rtl" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">Chinese (中文)</label>
                      <textarea value={formData.descriptionZh} onChange={e => setFormData({...formData, descriptionZh: e.target.value})} className="w-full text-xs border border-gray-300 p-2 h-20 focus:border-brand-800 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1 text-right">Kurdish (کوردی)</label>
                      <textarea value={formData.descriptionCkb} onChange={e => setFormData({...formData, descriptionCkb: e.target.value})} className="w-full text-xs border border-gray-300 p-2 h-20 focus:border-brand-800 focus:outline-none text-right" dir="rtl" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button type="submit" className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                    <Save size={14} /> Save Partner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
