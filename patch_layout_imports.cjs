const fs = require('fs');
let content = fs.readFileSync('src/components/Layout.tsx', 'utf8');

content = content.replace("import { ReactNode } from 'react';", "import { ReactNode, useEffect } from 'react';");
content = content.replace("import { useEffect } from 'react';\n", "");

fs.writeFileSync('src/components/Layout.tsx', content);
