const fs = require('fs');
let content = fs.readFileSync('src/store/useSiteStore.ts', 'utf8');

content = content.replace(
  'systemMaintenance: boolean;',
  'systemMaintenance: boolean;\n  brandColor: string;\n  inkColor: string;\n  paperColor: string;'
);

content = content.replace(
  'systemMaintenance: false,',
  "systemMaintenance: false,\n      brandColor: '#990000',\n      inkColor: '#1A1A1A',\n      paperColor: '#FAFAFA',"
);

fs.writeFileSync('src/store/useSiteStore.ts', content);
