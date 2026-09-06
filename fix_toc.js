import fs from 'fs';
let code = fs.readFileSync('src/components/ArticleDetail.tsx', 'utf8');

code = code.replace(
  "import React, { useState, useCallback, useMemo } from 'react';",
  "import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';"
);

code = code.replace(
  "import { ArticleSocialBar } from './SocialLinks';",
  "import { ArticleSocialBar } from './SocialLinks';\nimport { ListCollapse, ChevronRight } from 'lucide-react';"
);

const stateAndEffect = `
  const contentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    if (contentRef.current) {
      const elements = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      const parsedHeadings = elements.map((el, index) => {
        let id = el.id;
        if (!id) {
          id = 'heading-' + index + '-' + el.textContent?.trim().replace(/\\W+/g, '-').toLowerCase();
          el.id = id;
        }
        return {
          id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() === 'h2' ? 2 : 3
        };
      });
      setHeadings(parsedHeadings);
    }
  }, [tr?.content, lang]);
`;

code = code.replace(
  "const tr = getTranslation(article);",
  "const tr = getTranslation(article);\n" + stateAndEffect
);

const tocRender = `
        {headings.length > 0 && (
          <div className="mb-10 bg-paper-50 border border-gray-200 rounded-lg p-6 max-w-2xl mx-auto shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-bold font-serif mb-4 text-ink-900 border-b border-gray-200 pb-2">
              <ListCollapse className="w-5 h-5 text-brand-800" />
              {lang === 'ar' ? 'محتويات المقال' : lang === 'zh' ? '目录' : lang === 'ckb' ? 'پێڕست' : 'Table of Contents'}
            </h3>
            <ul className="space-y-2 font-sans text-sm">
              {headings.map((heading) => (
                <li 
                  key={heading.id} 
                  className={\`flex items-start gap-2 transition-colors hover:text-brand-800 \${heading.level === 3 ? (lang === 'ar' || lang === 'ckb' ? 'mr-4' : 'ml-4') : 'font-medium'}\`}
                >
                  <ChevronRight className={\`w-4 h-4 shrink-0 mt-0.5 text-gray-400 \${lang === 'ar' || lang === 'ckb' ? 'rotate-180' : ''}\`} />
                  <a href={\`#\${heading.id}\`} onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  }} className="text-gray-600 hover:text-brand-800 leading-snug">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
`;

code = code.replace(
  "{/* Editorial typography body */}",
  tocRender + "\n        {/* Editorial typography body */}"
);

code = code.replace(
  "<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr.content) }} />",
  "<div ref={contentRef} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(tr.content) }} />"
);

fs.writeFileSync('src/components/ArticleDetail.tsx', code);
