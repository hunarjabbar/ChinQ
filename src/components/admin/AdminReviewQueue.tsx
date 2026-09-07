import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../lib/api';
import { CheckCircle2, Clock, Trash2, ShieldAlert } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function AdminReviewQueue() {
  const { lang } = useParams<{ lang: string }>();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/articles');
      if (!res.ok) throw new Error('Failed to fetch articles');
      return res.json();
    }
  });

  const pendingArticles = articles.filter((a: any) => a.status === 'PENDING');

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/articles/${id}/approve`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to approve article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      alert('Article approved and published successfully.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete article');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
    }
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-neutral-400 uppercase tracking-widest animate-pulse">
        Synchronizing review queue...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-6">
        <div>
          <h2 className="text-2xl font-serif font-black text-ink-900 tracking-tight">Editorial Review Queue</h2>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Articles submitted by contributors waiting for executive approval and public publication.
          </p>
        </div>
        <div className="bg-brand-50 border border-brand-200 px-4 py-2 rounded-xl text-brand-900 text-xs font-mono font-bold flex items-center gap-2">
          <Clock size={14} className="text-brand-700 animate-spin" />
          {pendingArticles.length} Pending Submission{pendingArticles.length === 1 ? '' : 's'}
        </div>
      </div>

      {pendingArticles.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-2xl p-16 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-ink-900">Queue is Clear</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto font-serif">
            All submitted articles have been reviewed and processed. New submissions from editorial contributors will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pendingArticles.map((article: any) => {
            const titleEn = article.translations?.find((t: any) => t.lang === 'en')?.title || article.slug;
            const excerptEn = article.translations?.find((t: any) => t.lang === 'en')?.excerpt || 'No excerpt provided.';
            
            return (
              <div 
                key={article.id} 
                className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:border-brand-300 transition-all"
              >
                <div className="flex items-start gap-4 flex-1">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt="" 
                      className="w-20 h-20 rounded-lg object-cover border border-neutral-100 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-400 shrink-0 font-mono text-[10px]">
                      NO IMAGE
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-900 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Pending Review
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        Category: {article.category?.name || 'General'}
                      </span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-ink-900 leading-snug">
                      {titleEn}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 font-serif">
                      {excerptEn}
                    </p>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Author: {article.author?.email || 'Editorial Staff'} • Submitted: {new Date(article.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reject and delete this submission?')) {
                        deleteMutation.mutate(article.id);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} /> Reject
                  </button>
                  <button
                    onClick={() => approveMutation.mutate(article.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <CheckCircle2 size={14} /> Approve & Publish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
