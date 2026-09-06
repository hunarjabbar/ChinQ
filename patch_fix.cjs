const fs = require('fs');
let content = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');

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

content = content.replace(
  "  const { data: telexes = [], refetch: refetchTelexes }",
  fetchSubscribersCode + "\n  const { data: telexes = [], refetch: refetchTelexes }"
);

fs.writeFileSync('src/pages/AdminDashboard.tsx', content);
