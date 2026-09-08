const fs = require('fs');
let code = fs.readFileSync('src/components/TrilingualEditor.tsx', 'utf-8');

// Remove the inline import
code = code.replace(/import { useEffect } from 'react';\n  \/\/ Use React.useEffect because import might be at the top/g, "");

fs.writeFileSync('src/components/TrilingualEditor.tsx', code);
console.log("Fixed TrilingualEditor.tsx syntax");
