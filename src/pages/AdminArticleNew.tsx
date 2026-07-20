import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { AdminLayout } from '../components/AdminLayout';
import { TrilingualEditor } from '../components/TrilingualEditor';

export function AdminArticleNew() {
  const { lang } = useParams<{ lang: string }>();

  return (
    <AdminLayout>
      <div className="space-y-6 text-start">
        {/* Global Navigation Linkages */}
        <div className="flex items-center gap-2">
          <Link 
            to={`/${lang}/admin/articles`} 
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#990000] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Article Registry
          </Link>
        </div>

        {/* Dashboard Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-black tracking-tight flex items-center gap-2">
              <FileText className="text-[#990000]" size={28} />
              Create Article
            </h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Draft and publish a new trilingual article for the ChinQ platform.
            </p>
          </div>
        </div>

        {/* Editor component */}
        <TrilingualEditor />
      </div>
    </AdminLayout>
  );
}
