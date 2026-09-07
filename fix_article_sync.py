import re

filepath = 'src/pages/AdminArticles.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()
    
# We want to add invalidation for 'article' and 'articles'
# Our previous fix_sync.py already added 'articles', so let's find 'articles' and add 'article'
content = content.replace("queryClient.invalidateQueries({ queryKey: ['articles'] });",
                          "queryClient.invalidateQueries({ queryKey: ['articles'] });\n      queryClient.invalidateQueries({ queryKey: ['article'] });")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched AdminArticles.tsx for 'article' key")

