const fs = require('fs');
let code = fs.readFileSync('src/components/TrilingualEditor.tsx', 'utf-8');

const idUse = `  const { lang, id } = useParams<{ lang: string, id: string }>();`;
code = code.replace(`  const { lang } = useParams<{ lang: string }>();`, idUse);

const fetchCode = `
  const { data: existingArticle, isLoading: isLoadingArticle } = useQuery({
    queryKey: ['admin-article', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await apiFetch('/api/articles/' + id);
      if (!res.ok) throw new Error('Failed to load article');
      return res.json();
    },
    enabled: !!id
  });

  import { useEffect } from 'react';
  // Use React.useEffect because import might be at the top
`;

code = code.replace(`export function TrilingualEditor() {`, `import { useEffect } from 'react';\nexport function TrilingualEditor() {`);

const populateCode = `
  useEffect(() => {
    if (existingArticle) {
      setSlug(existingArticle.slug || '');
      setCategoryId(existingArticle.categoryId || '');
      setImageUrl(existingArticle.imageUrl || '');
      
      const newFormData = { ...formData };
      if (existingArticle.translations) {
        existingArticle.translations.forEach((t: any) => {
          if (newFormData[t.languageCode as keyof typeof newFormData]) {
            newFormData[t.languageCode as keyof typeof newFormData] = {
              title: t.title || '',
              excerpt: t.excerpt || '',
              content: t.content || '',
            };
          }
        });
      }
      setFormData(newFormData);
    }
  }, [existingArticle]);
`;

code = code.replace(`  const isRtl = activeTab === 'ar' || activeTab === 'ckb';`, `  const isRtl = activeTab === 'ar' || activeTab === 'ckb';\n${fetchCode}\n${populateCode}`);

const mutateCode = `
  const publishMutation = useMutation({
    mutationFn: async (payload: any) => {
      const endpoint = id ? \`/api/admin/articles/\${id}\` : '/api/admin/articles';
      const method = id ? 'PUT' : 'POST';
      const res = await apiFetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save article');
      return res.json();
    },
`;

code = code.replace(/const publishMutation = useMutation\({[\s\S]*?mutationFn: async \(payload: any\) => {[\s\S]*?body: JSON.stringify\(payload\)[\s\S]*?}\),[\s\S]*?},/g, mutateCode.trim() + ',');

fs.writeFileSync('src/components/TrilingualEditor.tsx', code);
console.log("Patched TrilingualEditor.tsx");
