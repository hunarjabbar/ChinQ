import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

hook = '''
function useLanguageSetup(lang?: string) {
  React.useEffect(() => {
    try {
      document.documentElement.lang = lang || 'en';
      if (lang === 'ar' || lang === 'ckb') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    } catch {}
  }, [lang]);

  const isValidLang = ['en', 'ar', 'zh', 'ckb'].includes(lang || '');
  const safeLang = (isValidLang ? lang : 'en') as 'en' | 'ar' | 'zh' | 'ckb';
  
  return { isValidLang, safeLang };
}
'''

# Find the ThemeApplier component or whatever is before LangWrapper
# Actually, just put it right before LangWrapper.
content = content.replace("function LangWrapper() {", hook + "\nfunction LangWrapper() {")

# Now update LangWrapper body
old_lang_body = r'function LangWrapper\(\) \{.*?return \(\s*<ErrorBoundary'
new_lang_body = '''function LangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang } = useLanguageSetup(lang);

  if (!isValidLang) {
    return <Navigate to="/en" replace />;
  }

  return (
    <ErrorBoundary'''

content = re.sub(old_lang_body, new_lang_body, content, flags=re.DOTALL)

# Now update AdminLangWrapper body
old_admin_body = r'function AdminLangWrapper\(\) \{.*?return \(\s*<ErrorBoundary'
new_admin_body = '''function AdminLangWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const { isValidLang, safeLang } = useLanguageSetup(lang);

  if (!isValidLang) {
    return <Navigate to="/en/admin" replace />;
  }

  return (
    <ErrorBoundary'''

content = re.sub(old_admin_body, new_admin_body, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

print("Wrappers updated.")
