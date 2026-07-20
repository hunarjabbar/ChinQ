import { apiFetch } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { Plus, Search, MoreVertical, Edit } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';

export function AdminArticles() {
  const { lang } = useParams<{ lang: string }>();

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
            className="inline-flex items-center gap-2 bg-[#990000] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-[#7a0000] transition-colors shadow-sm"
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#990000] focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="border border-gray-300 rounded-md text-sm py-2 px-3 focus:ring-2 focus:ring-[#990000] outline-none bg-white">
              <option>All Statuses</option>
              <option>Published</option>
              <option>Drafts</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden text-start">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Headline (EN)</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No articles found.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => {
                    const title = article.translations?.[0]?.title || 'Untitled Draft';
                    return (
                      <tr key={article.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                          {title}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs">{article.category?.name || 'Uncategorized'}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{article.author?.name || 'Unknown'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            article.status === 'PUBLISHED' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(article.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link to={`/${lang}/admin/articles/${article.id}`} className="text-gray-400 hover:text-blue-600">
                              <Edit size={16} />
                            </Link>
                            <button className="text-gray-400 hover:text-gray-900">
                              <MoreVertical size={16} />
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
