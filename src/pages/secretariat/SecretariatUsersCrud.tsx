import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Shield, Check, Lock, ShieldAlert } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { PortalLocale, PortalScope } from '../../types/portals';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'translator' | 'editor' | 'reviewer' | 'admin' | 'superadmin';
  scopes: PortalScope[];
}

export function SecretariatUsersCrud() {
  const { lang = 'en' } = useParams<{ lang: string }>();

  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'usr_01',
      name: 'Director General Tariq',
      email: 'director@iraqi-chineseagency.com',
      role: 'superadmin',
      scopes: ['public', 'secretariat', 'newsroom', 'live']
    },
    {
      id: 'usr_02',
      name: 'Haidar Al-Zubaidi (Chief Editor)',
      email: 'editor@iraqi-chineseagency.com',
      role: 'editor',
      scopes: ['newsroom', 'public']
    },
    {
      id: 'usr_03',
      name: 'Chen Wei (Secretariat Fellow)',
      email: 'chen.wei@iraqi-chineseagency.com',
      role: 'admin',
      scopes: ['secretariat', 'public']
    },
    {
      id: 'usr_04',
      name: 'Broadcast Telemetry Operator',
      email: 'broadcast@iraqi-chineseagency.com',
      role: 'editor',
      scopes: ['live']
    }
  ]);

  const toggleScope = (userId: string, scope: PortalScope) => {
    setUsers(users.map(u => {
      if (u.id !== userId) return u;
      const hasScope = u.scopes.includes(scope);
      const newScopes = hasScope
        ? u.scopes.filter(s => s !== scope)
        : [...u.scopes, scope];
      return { ...u, scopes: newScopes };
    }));
  };

  const updateRole = (userId: string, newRole: ManagedUser['role']) => {
    setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="pb-4 border-b border-[#E5E7EB]">
        <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#000000]">
          RBAC & Portal Scope Management
        </h1>
        <p className="text-xs text-[#4B5563]">
          Configure user roles and granular portal scopes (Public Portal, Secretariat, Newsroom, Live Portal).
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
        <table className="w-full text-xs text-start">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[10px] font-mono uppercase text-[#4B5563]">
            <tr>
              <th className="p-4 text-start">User / Officer</th>
              <th className="p-4 text-start">System Role</th>
              <th className="p-4 text-start">Authorized Portal Scopes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-[#F9FAFB] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#000000]">{u.name}</div>
                  <div className="text-[11px] font-mono text-[#4B5563]">{u.email}</div>
                </td>
                <td className="p-4">
                  <select
                    value={u.role}
                    onChange={e => updateRole(u.id, e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] font-mono text-xs font-bold text-[#000000] focus:outline-none"
                  >
                    <option value="viewer">VIEWER</option>
                    <option value="translator">TRANSLATOR</option>
                    <option value="editor">EDITOR</option>
                    <option value="reviewer">REVIEWER</option>
                    <option value="admin">ADMIN</option>
                    <option value="superadmin">SUPERADMIN</option>
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {(['public', 'secretariat', 'newsroom', 'live'] as PortalScope[]).map(sc => {
                      const enabled = u.scopes.includes(sc);
                      return (
                        <button
                          key={sc}
                          onClick={() => toggleScope(u.id, sc)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                            enabled
                              ? 'bg-[var(--color-brand-800)] text-white shadow-xs'
                              : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                          }`}
                        >
                          {sc}: {enabled ? 'YES' : 'NO'}
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[var(--color-brand-800)]/20 text-[#991B1B] text-xs space-y-1">
        <div className="font-bold flex items-center gap-1.5">
          <ShieldAlert size={14} />
          <span>Sovereign Access Isolation Notice</span>
        </div>
        <p className="text-[11px] text-[#991B1B]/80 leading-relaxed">
          Users without the "secretariat" scope cannot view or modify the Secretariat dashboard or initiate financial clearing dispatches. Superadmins retain global oversight across all four portals.
        </p>
      </div>
    </div>
  );
}

export default SecretariatUsersCrud;
