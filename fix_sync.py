import os
import glob
import re

files_to_check = glob.glob('src/pages/Admin*.tsx') + glob.glob('src/components/admin/Admin*.tsx') + ['src/components/TrilingualEditor.tsx']

sync_map = {
    'admin-articles': ['articles'],
    'admin-studies': ['studies'],
    'admin-books': ['books', 'trending-books-home', 'recommended-books-home'],
    'admin-podcasts': ['podcasts'],
    'admin-tourism-spots': ['tourism-spots-home', 'tourism-spots-all'],
    'admin-women-profiles': ['women-profiles-home', 'women-profiles-page'],
    'admin-events': ['events'],
    'admin-market': ['marketData'],
    'admin-announcements': ['announcement']
}

for filepath in files_to_check:
    if not os.path.isfile(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original_content = content
    
    for admin_key, public_keys in sync_map.items():
        if f"'{admin_key}'" in content or f'"{admin_key}"' in content:
            for pk in public_keys:
                if f"'{pk}'" not in content and f'"{pk}"' not in content:
                    pattern = r"(queryClient\.invalidateQueries\(\{\s*queryKey:\s*\['" + admin_key + r"'\]\s*\}\);)"
                    replacement = r"\1\n      queryClient.invalidateQueries({ queryKey: ['" + pk + r"'] });"
                    content = re.sub(pattern, replacement, content)
                    
    if 'AdminPartners.tsx' in filepath:
        if 'queryClient.invalidateQueries' not in content:
            if 'import { useQueryClient }' not in content:
                content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useQueryClient } from '@tanstack/react-query';")
            if 'const queryClient = useQueryClient();' not in content:
                content = content.replace("export function AdminPartners() {", "export function AdminPartners() {\n  const queryClient = useQueryClient();")
            
            content = content.replace("fetchPartners();", "fetchPartners();\n        queryClient.invalidateQueries({ queryKey: ['partners-home'] });")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Patched {filepath}")

