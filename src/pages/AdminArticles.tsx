import { apiFetch } from '../lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Plus, Search, MoreVertical, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { useAuthStore } from '../store/useAuthStore';

export function AdminArticles() {
  const { lang } = useParams<{ lang: string }>();
  const { user } = useAuthStore();
  
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/articles/${id}/approve`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to approve article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      alert('Article approved and published successfully.');
    }
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const { data: articles = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch(`/api/admin/articles?t=${new Date().getTime()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch articles');
      return res.json();
    }
  });

  return (
    <AdminLayout>
      <div className="space-y-6 text-start">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Article Registry</h1>
            <p className="text-sm text-gray-500">Manage trilingual editorial content, drafts, and publications.</p>
          </div>
          <Link
            to={`/${lang}/admin/articles/new`}
            className="inline-flex items-center gap-2 bg-brand-800 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-brand-800 transition-colors shadow-sm"
          >
            <Plus size={16} /> Create Article
          </Link>
        </div>

        {/* Toolbar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-between items-center shadow-sm text-start">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search headlines, authors, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-800 focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-2 focus:ring-brand-800 outline-none bg-white">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Drafts</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden text-start">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-neutral-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 border-b border-neutral-200">
                <tr>
                  <th className="px-8 py-5">Headline & Dispatch</th>
                  <th className="px-8 py-5">Bilateral Category</th>
                  <th className="px-8 py-5">Sovereign Author</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Last Synchronized</th>
                  <th className="px-8 py-5 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-neutral-400 italic font-serif">
                      Synchronizing article ledger...
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-neutral-400 italic font-serif">
                      No active dispatches found in registry.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => {
                    const title = article.translations?.[0]?.title || 'Untitled Draft';
                    return (
                      <tr key={article.id} className="hover:bg-neutral-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-ink-900 line-clamp-1">{title}</span>
                            <span className="text-[10px] text-neutral-400 font-mono mt-0.5">UID: {article.id.substring(0, 8)}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded text-[9px] font-black uppercase tracking-widest">{article.category?.name || 'Uncategorized'}</span>
                        </td>
                        <td className="px-8 py-5 text-neutral-600 font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-black text-neutral-400">
                              {article.author?.name?.[0] || '?'}
                            </div>
                            {article.author?.name || 'Unknown'}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            article.status === 'PUBLISHED' 
                              ? 'bg-green-50 text-green-700 border border-green-100' 
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            <div className={`w-1 h-1 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-600' : 'bg-amber-600'}`} />
                            {article.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-neutral-500 font-mono text-[10px] font-bold">
                          {new Date(article.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            {user?.role === 'ADMIN' && article.status === 'PENDING' && (
                              <button 
                                onClick={() => approveMutation.mutate(article.id)} 
                                title="Approve & Publish Article"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                              >
                                <CheckCircle2 size={14} /> Approve
                              </button>
                            )}
                            <Link to={`/${lang}/admin/articles/${article.id}`} className="p-2 text-neutral-400 hover:text-brand-800 bg-white border border-neutral-100 rounded-lg hover:shadow-sm transition-all" title="Edit Article">
                              <Edit size={14} />
                            </Link>
                            <button onClick={() => handleDelete(article.id, title)} className="p-2 text-neutral-400 hover:text-brand-800 bg-white border border-neutral-100 rounded-lg hover:shadow-sm transition-all" title="Delete Article">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
