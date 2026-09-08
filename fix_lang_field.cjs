const fs = require('fs');
let code = fs.readFileSync('server.app.ts', 'utf-8');

code = code.replace(/t\.languageCode/g, "t.lang");

fs.writeFileSync('server.app.ts', code);
console.log("Fixed t.languageCode to t.lang in server.app.ts");
