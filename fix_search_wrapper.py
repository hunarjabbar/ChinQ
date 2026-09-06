import re

with open("src/App.tsx", "r") as f:
    content = f.read()

wrapper = """
function SearchWrapper() {
  const { lang } = useParams<{ lang: string }>();
  return <SearchPage lang={(lang as any) || 'en'} />;
}
"""

if "function SearchWrapper" not in content:
    content = content.replace("function LangWrapper()", wrapper + "\nfunction LangWrapper()")

with open("src/App.tsx", "w") as f:
    f.write(content)
print("Fixed SearchWrapper")
