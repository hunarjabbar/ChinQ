import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# We need to replace the return statement specifically in AdminLangWrapper.
pattern = r'(function AdminLangWrapper\(\) \{.*?)(return \(\s*<ErrorBoundary key=\{location\.key\} lang=\{safeLang\}>\s*<Outlet />\s*</ErrorBoundary>\s*\);)(\s*\})'

def replacer(match):
    prefix = match.group(1)
    old_return = match.group(2)
    suffix = match.group(3)
    
    new_return = '''return (
    <ErrorBoundary key={location.key} lang={safeLang}>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ErrorBoundary>
  );'''
    return prefix + new_return + suffix

content = re.sub(pattern, replacer, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Fixed App.tsx successfully.")
