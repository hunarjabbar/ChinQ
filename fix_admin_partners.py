with open('src/pages/AdminPartners.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
    
# Remove any broken queryClient instances that are not bound
content = content.replace("        queryClient.invalidateQueries({ queryKey: ['partners-home'] });\n", "")
content = content.replace("import { useState, useEffect } from 'react';\nimport { useQueryClient } from '@tanstack/react-query';", "import React, { useState, useEffect } from 'react';")

# Add correct imports and initializations
content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useQueryClient } from '@tanstack/react-query';")
content = content.replace("export default function AdminPartners() {", "export default function AdminPartners() {\n  const queryClient = useQueryClient();")

# Add the invalidation properly inside fetchPartners where it succeeds, and inside handleSave and handleDelete where successful
# Wait, fetchPartners is where we want to just fetch. We invalidate when we CREATE, UPDATE, or DELETE.

content = content.replace("fetchPartners();\n      }", "fetchPartners();\n        queryClient.invalidateQueries({ queryKey: ['partners-home'] });\n      }")

with open('src/pages/AdminPartners.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed AdminPartners.tsx")
