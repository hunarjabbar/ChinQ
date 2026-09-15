import re
import os
import glob

# 1. Update App.tsx
with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import AdminLayout if missing
if 'import { AdminLayout }' not in content:
    content = content.replace("import { LangWrapper } from './components/LangWrapper';", 
                              "import { LangWrapper } from './components/LangWrapper';\nimport { AdminLayout } from './components/AdminLayout';")

# Update AdminLangWrapper
old_wrapper = '''  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <Outlet />
    </ErrorBoundary>
  );'''

new_wrapper = '''  return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ErrorBoundary>
  );'''
content = content.replace(old_wrapper, new_wrapper)

# Remove AdminLayout wrappers in router
content = re.sub(r'<AdminLayout>\s*<([A-Za-z0-9_]+)\s*/>\s*</AdminLayout>', r'<\1 />', content)

with open('src/App.tsx', 'w') as f:
    f.write(content)

# 2. Update all Admin*.tsx components to strip inner AdminLayout
admin_files = glob.glob('src/pages/Admin*.tsx')
for file in admin_files:
    with open(file, 'r') as f:
        file_content = f.read()
    
    # Remove import
    file_content = re.sub(r"import\s*\{\s*AdminLayout\s*\}\s*from\s*['\"](\.\./)?components/AdminLayout['\"];?\n?", "", file_content)
    
    # We have different ways AdminLayout is returned
    # <AdminLayout> ... </AdminLayout>
    # <AdminLayout><div ...> ... </div></AdminLayout>
    # Sometimes it's the root return.
    
    # Simplest way is to remove <AdminLayout> and </AdminLayout> completely.
    # It might leave a fragment or single child.
    # If the file returns <AdminLayout> ... </AdminLayout>, replacing it with just the contents
    # might cause JSX single root element errors if there are multiple siblings inside.
    # So we replace <AdminLayout> with <> and </AdminLayout> with </>.
    
    file_content = re.sub(r'<AdminLayout(?:\s[^>]*)?>', '<>', file_content)
    file_content = re.sub(r'</AdminLayout>', '</>', file_content)
    
    with open(file, 'w') as f:
        f.write(file_content)

print("Unified AdminLayout successfully.")
