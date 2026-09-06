import re

with open("src/main.tsx", "r") as f:
    content = f.read()

if "import SearchPage" not in content:
    content = content.replace("import { LivePortal }", "import { LivePortal } from './pages/LivePortal';\nimport SearchPage from './pages/SearchPage';")
    content = content.replace('{ path: "category/:slug", element: <CategoryPage /> },', '{ path: "category/:slug", element: <CategoryPage /> },\n      { path: "search", element: <SearchPage lang={lang} /> },')
    
    with open("src/main.tsx", "w") as f:
        f.write(content)
print("Router patched")
