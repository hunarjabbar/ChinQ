import re

with open("src/App.tsx", "r") as f:
    content = f.read()

if "import SearchPage" not in content:
    content = content.replace("import { LivePortal }", "import { LivePortal } from './pages/LivePortal';\nimport SearchPage from './pages/SearchPage';")
    content = content.replace('{ path: "category/:slug", element: <CategoryPage /> },', '{ path: "category/:slug", element: <CategoryPage /> },\n      { path: "search", element: <SearchWrapper /> },')
    
wrapper = """
import { useParams } from 'react-router-dom';
function SearchWrapper() {
  const { lang } = useParams<{ lang: string }>();
  return <SearchPage lang={(lang as any) || 'en'} />;
}
"""

if "SearchWrapper" not in content:
    content = content.replace("function LangWrapper()", wrapper + "\nfunction LangWrapper()")

with open("src/App.tsx", "w") as f:
    f.write(content)
print("App.tsx patched")
