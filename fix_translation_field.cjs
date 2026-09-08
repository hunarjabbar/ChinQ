const fs = require('fs');
let code = fs.readFileSync('server.app.ts', 'utf-8');

code = code.replace(/languageCode: t.languageCode/g, "lang: t.languageCode");

fs.writeFileSync('server.app.ts', code);
console.log("Fixed translation language field");
