import fs from 'fs';
let code = fs.readFileSync('src/components/ArticleDetail.tsx', 'utf8');

if (!code.includes("import DOMPurify")) {
  code = "import DOMPurify from 'dompurify';\n" + code;
  code = code.replace(/<div dangerouslySetInnerHTML=\{\{ __html: (.*?) \}\} \/>/g, '<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize($1) }} />');
  fs.writeFileSync('src/components/ArticleDetail.tsx', code);
}

let code2 = fs.readFileSync('src/pages/Home.tsx', 'utf8');
if (!code2.includes("import DOMPurify")) {
  code2 = "import DOMPurify from 'dompurify';\n" + code2;
  code2 = code2.replace(/<div dangerouslySetInnerHTML=\{\{ __html: (.*?) \}\} \/>/g, '<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize($1) }} />');
  fs.writeFileSync('src/pages/Home.tsx', code2);
}
