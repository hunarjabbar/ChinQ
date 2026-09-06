import re

with open("src/main.tsx", "r") as f:
    content = f.read()

# I need to use useParams inside SearchPage or write a wrapper
content = content.replace("<SearchPage lang={lang} />", "<SearchWrapper />")

wrapper = """
import { useParams } from 'react-router-dom';
function SearchWrapper() {
  const { lang } = useParams<{ lang: string }>();
  return <SearchPage lang={(lang as any) || 'en'} />;
}
"""
if "SearchWrapper" not in content:
    content = content.replace("function LangWrapper()", wrapper + "\nfunction LangWrapper()")

with open("src/main.tsx", "w") as f:
    f.write(content)

