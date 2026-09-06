import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  'if (study.isPremium) {',
  'if (study.isPrivate) {'
);

code = code.replace(
  'const user = await prisma.user.findUnique({ where: { id: decoded.id } });',
  'const user = await prisma.user.findUnique({ where: { id: (decoded as any).id } });'
);

code = code.replace(
  'study.content = study.content ? study.content.substring(0, 300) + "..." : "";',
  `study.contentEn = study.contentEn ? study.contentEn.substring(0, 300) + "..." : "";
          study.contentAr = study.contentAr ? study.contentAr.substring(0, 300) + "..." : "";
          study.contentZh = study.contentZh ? study.contentZh.substring(0, 300) + "..." : "";
          study.contentCkb = study.contentCkb ? study.contentCkb.substring(0, 300) + "..." : "";`
);

fs.writeFileSync('server.ts', code);
