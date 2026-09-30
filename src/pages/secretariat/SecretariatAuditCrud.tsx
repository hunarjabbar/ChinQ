import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { PortalLocale } from '../../types/portals';

interface AuditRecord {
  id: string;
  actor: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTORE' | 'AUTHORIZE';
  portalTarget: 'PUBLIC' | 'SECRETARIAT' | 'NEWSROOM' | 'LIVE';
  entity: string;
  timestamp: string;
  ip: string;
}

export function SecretariatAuditCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();

  const [auditLogs] = useState<AuditRecord[]>([
    {
      id: 'aud_9041',
      actor: 'Director General Tariq',
      action: 'AUTHORIZE',
      portalTarget: 'SECRETARIAT',
      entity: 'Bilateral Strategic Accord 2026',
      timestamp: '2026-09-28T07:15:00Z',
      ip: '10.0.4.12'
    },
    {
      id: 'aud_9040',
      actor: 'Haidar Al-Zubaidi',
      action: 'UPDATE',
      portalTarget: 'NEWSROOM',
      entity: 'Digital Currency Settlement Gateway',
      timestamp: '2026-09-27T16:22:10Z',
      ip: '192.168.1.55'
    },
    {
      id: 'aud_9039',
      actor: 'Chen Wei',
      action: 'CREATE',
      portalTarget: 'LIVE',
      entity: 'Silk Road: From Basra to Beijing',
      timestamp: '2026-09-27T12:04:30Z',
      ip: '172.16.0.8'
    },
    {
      id: 'aud_9038',
      actor: 'Dunya Barzani',
      action: 'UPDATE',
      portalTarget: 'PUBLIC',
      entity: 'Energy & Infrastructure Corridor',
      timestamp: '2026-09-26T09:40:00Z',
      ip: '10.0.2.91'
    }
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
          Sovereign Security Audit Ledger
        </h1>
        <p className="text-xs text-[#4B5563]">
          Immutable cryptographic transaction log tracking every content mutation, credential verification, and portal scope authorization.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">Audit ID</th>
              <th className="p-4 text-start">Officer / Actor</th>
              <th className="p-4 text-start">Action</th>
              <th className="p-4 text-start">Portal Target</th>
              <th className="p-4 text-start">Entity Affected</th>
              <th className="p-4 text-end">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {auditLogs.map(log => (
              <tr key={log.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4 font-mono font-bold text-[var(--color-brand-800)]">
                  #{log.id}
                </td>
                <td className="p-4 font-bold text-[#000000]">
                  {log.actor}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-100 text-neutral-800">
                    {log.action}
                  </span>
                </td>
                <td className="p-4 font-mono text-[11px] text-[#4B5563]">
                  {log.portalTarget}
                </td>
                <td className="p-4 text-[#000000] font-medium">
                  {log.entity}
                </td>
                <td className="p-4 text-end font-mono text-[11px] text-[#4B5563]">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecretariatAuditCrud;
