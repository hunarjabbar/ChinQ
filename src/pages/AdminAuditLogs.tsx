import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Shield, Clock, Database, Search, User as UserIcon, Activity } from 'lucide-react';
import { Locale } from '../types';

export function AdminAuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: logs = [], isLoading } = useQuery<any[]>({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
      });
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      return res.json();
    }
  });

  const filteredLogs = logs.filter(log => 
    log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.itemId && log.itemId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'POST': return 'text-green-600 bg-green-50 border-green-200';
      case 'PUT': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'DELETE': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-black text-brand-800 uppercase tracking-widest flex items-center gap-3">
            <Shield className="w-6 h-6 text-brand-800" />
            System Audit Logs
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-2 uppercase tracking-wider">
            Immutable tracking of CRUD operations
          </p>
        </div>
      </div>

      <div className="bg-white border-2 border-brand-800 rounded-xs shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-paper-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs by user, resource, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xs text-sm focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500 font-medium">
              <tr>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">Timestamp</th>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">User</th>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">Action</th>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">Resource</th>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">Item ID</th>
                <th className="px-6 py-4 font-bold border-b border-neutral-200">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium text-xs">
                    Scanning secure logs...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium text-xs">
                    No matching logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs font-bold text-ink-900">
                        <UserIcon className="w-3.5 h-3.5 text-brand-800" />
                        {log.userEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 border text-xs font-black uppercase tracking-widest rounded-sm font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                        <Database className="w-3.5 h-3.5" />
                        {log.resource}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-gray-500 truncate max-w-[150px] inline-block" title={log.itemId}>
                        {log.itemId || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {log.details ? (
                        <div className="text-xs font-medium text-gray-500 max-h-12 overflow-hidden truncate max-w-xs p-1.5 bg-gray-50 border border-gray-100 rounded" title={log.details}>
                          {log.details}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
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
