import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { format } from 'date-fns';
import { Shield, Clock, User, Activity, Database, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AuditLog {
  id: string;
  createdAt: string;
  userEmail: string;
  action: string;
  resource: string;
  itemId: string | null;
  details: string | null;
}

export function AdminAuditLogs() {
  const { token } = useAuthStore();
  
  const { data: logs = [], isLoading } = useQuery<AuditLog[]>({
    queryKey: ['adminAuditLogs'],
    queryFn: async () => {
      const res = await fetch('/api/admin/audit-logs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-neutral-100 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 rounded-lg text-brand-800">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-ink-900">Global Audit Logs</h2>
            <p className="text-sm text-gray-500">History of all administrative CRUD operations</p>
          </div>
        </div>
        <div className="text-xs font-mono bg-neutral-100 px-3 py-1 rounded border border-neutral-200 text-neutral-600">
          Total Logs: {logs.length}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Timestamp
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    User
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <Activity size={14} />
                    Action
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <Database size={14} />
                    Resource
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-500">
                  <div className="flex items-center gap-2">
                    <Info size={14} />
                    Details
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    No logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {format(new Date(log.createdAt), 'MMM dd, HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-ink-900">{log.userEmail}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "text-[10px] font-black uppercase px-2 py-1 rounded-sm border",
                        log.action === 'POST' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        log.action === 'PUT' ? "bg-amber-50 text-amber-700 border-amber-200" :
                        "bg-rose-50 text-rose-700 border-rose-200"
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-black uppercase tracking-tight text-ink-900">{log.resource}</span>
                        {log.itemId && <span className="text-[10px] font-mono text-gray-400">ID: {log.itemId}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs overflow-hidden">
                        <p className="text-xs text-gray-500 line-clamp-2 font-mono bg-neutral-50 p-1.5 rounded border border-neutral-100 group-hover:bg-white transition-colors">
                          {log.details || 'No payload'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
