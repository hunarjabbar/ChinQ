const fs = require('fs');
let code = fs.readFileSync('src/components/TrilingualEditor.tsx', 'utf-8');

const mutateCode = `
  const publishMutation = useMutation({
    mutationFn: async (payload: any) => {
      const endpoint = id ? '/api/admin/articles/' + id : '/api/admin/articles';
      const method = id ? 'PUT' : 'POST';
      const res = await apiFetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to publish article');
      }
      return res.json();
    },
`;

code = code.replace(/const publishMutation = useMutation\({[\s\S]*?mutationFn: async \(payload: any\) => {[\s\S]*?return res.json\(\);\n    },/, mutateCode.trim());

fs.writeFileSync('src/components/TrilingualEditor.tsx', code);
console.log("Patched TrilingualEditor.tsx mutation");
