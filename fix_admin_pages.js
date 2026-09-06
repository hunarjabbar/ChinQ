import fs from 'fs';

const pages = [
  'src/pages/AdminBooks.tsx',
  'src/pages/AdminTourism.tsx',
  'src/pages/AdminLiveEvents.tsx',
  'src/pages/AdminPodcasts.tsx'
];

for (const page of pages) {
  if (fs.existsSync(page)) {
    let code = fs.readFileSync(page, 'utf8');
    
    if (!code.includes("import { useAuthStore }")) {
       code = code.replace("import React,", "import { useAuthStore } from '../store/useAuthStore';\nimport React,");
       code = code.replace("import { useState", "import { useAuthStore } from '../store/useAuthStore';\nimport { useState");
    }

    code = code.replace(/localStorage\.getItem\(['"]iraq_china_daily_token['"]\)/g, "useAuthStore.getState().token");
    code = code.replace(/localStorage\.getItem\(['"]token['"]\)/g, "useAuthStore.getState().token");
    
    fs.writeFileSync(page, code);
  }
}
