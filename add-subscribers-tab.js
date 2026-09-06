import fs from 'fs';
let code = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

const subscribersTab = `
        {/* Tab: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-4">
              <div>
                <h2 className="text-xl font-serif font-black text-ink-900">Newsletter Subscribers</h2>
                <p className="text-sm text-neutral-500 font-mono mt-1">Manage global subscriber index.</p>
              </div>
              <div className="bg-neutral-100 px-3 py-1.5 rounded text-xs font-bold font-mono text-neutral-700">
                Total: {subscribers.length}
              </div>
            </div>
            
            {subscribers.length === 0 ? (
              <div className="text-center py-12 text-sm text-neutral-500 font-mono border-2 border-dashed border-neutral-200 rounded">
                No active newsletter subscribers found.
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden rounded-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="p-3 font-bold text-neutral-600 uppercase text-xs">Email</th>
                      <th className="p-3 font-bold text-neutral-600 uppercase text-xs">Status</th>
                      <th className="p-3 font-bold text-neutral-600 uppercase text-xs">Date</th>
                      <th className="p-3 font-bold text-neutral-600 uppercase text-xs text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {subscribers.map((sub: any) => (
                      <tr key={sub.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-3 font-medium text-neutral-900">{sub.email}</td>
                        <td className="p-3">
                          {sub.isActive ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-green-50 text-green-700 px-2 py-0.5 rounded">
                              <Check size={10} /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded">
                              <AlertCircle size={10} /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-neutral-500 font-mono text-xs">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={async () => {
                              if (confirm('Are you sure you want to remove this subscriber?')) {
                                const res = await fetch(\`/api/admin/newsletter/\${sub.id}\`, {
                                  method: 'DELETE',
                                  headers: {
                                    'Authorization': \`Bearer \${localStorage.getItem('admin_token')}\`
                                  }
                                });
                                if (res.ok) {
                                  queryClient.invalidateQueries({ queryKey: ['admin-subscribers'] });
                                } else {
                                  alert('Failed to delete subscriber');
                                }
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 transition-colors cursor-pointer"
                            title="Remove Subscriber"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
`;

code = code.replace(
  '      </div>\n    </AdminLayout>',
  subscribersTab + '\n      </div>\n    </AdminLayout>'
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', code);
