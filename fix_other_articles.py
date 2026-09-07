for filepath in ['src/components/admin/AdminArticleEditor.tsx', 'src/components/TrilingualEditor.tsx', 'src/components/admin/AdminAIImport.tsx']:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace("queryClient.invalidateQueries({ queryKey: ['articles'] });",
                                  "queryClient.invalidateQueries({ queryKey: ['articles'] });\n      queryClient.invalidateQueries({ queryKey: ['article'] });")

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched", filepath)
    except Exception as e:
        print("Skipped", filepath, e)
