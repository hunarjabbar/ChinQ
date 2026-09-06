const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

// 1. Add 'subscribers' to the activeTab type
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'article' | 'live' | 'search' | 'applications' | 'telexes' | 'studies'>(",
  "const [activeTab, setActiveTab] = useState<'article' | 'live' | 'search' | 'applications' | 'telexes' | 'studies' | 'subscribers'>("
);

// 2. Add 'subscribers' to URL validation
content = content.replace(
  "['article', 'live', 'search', 'applications', 'telexes', 'studies'].includes(tabParam)",
  "['article', 'live', 'search', 'applications', 'telexes', 'studies', 'subscribers'].includes(tabParam)"
);

// 3. Fetch subscribers
const fetchSubscribersCode = `
  const { data: subscribers = [] } = useQuery<any[]>({
    queryKey: ['admin-subscribers'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/subscribers');
      if (!res.ok) return [];
      return res.json();
    }
  });
`;
content = content.replace("const { data: applications = [] }", fetchSubscribersCode + "\n  const { data: applications = [] }");

// 4. Add Tab Button
const tabButtonCode = `
          <button 
            onClick={() => setActiveTab('subscribers')}
            className={\`pb-3 px-5 font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer uppercase \${activeTab === 'subscribers' ? 'text-[#990000] border-b-4 border-[#990000]' : 'text-neutral-400 hover:text-neutral-800'}\`}
          >
            <Mail size={16} className={activeTab === 'subscribers' ? "text-[#990000]" : "text-neutral-400"} />
            Subscribers ({subscribers.length})
          </button>
`;
content = content.replace("          </button>\n        </div>", "          </button>\n" + tabButtonCode + "\n        </div>");

// 5. Add Tab Content
const tabContentCode = `
        {/* Tab 7: Newsletter Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-neutral-200">
            <h2 className="text-xl font-bold font-serif text-[#1A1A1A] uppercase tracking-wide mb-6 border-b border-gray-100 pb-4">
              Newsletter Subscribers
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 font-bold text-gray-700 uppercase">Email</th>
                    <th className="px-6 py-3 font-bold text-gray-700 uppercase">Subscribed On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscribers.map((sub: any) => (
                    <tr key={sub.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-mono font-bold text-gray-900">{sub.email}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(sub.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-6 py-8 text-center text-gray-500 font-mono text-sm uppercase">No subscribers found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
`;
content = content.replace("      </div>\n    </div>", tabContentCode + "\n      </div>\n    </div>");

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
