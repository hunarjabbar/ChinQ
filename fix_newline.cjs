const fs = require('fs');
let code = fs.readFileSync('server.app.ts', 'utf-8');
code = code.replace(/\\n  app\.put\("/, '\n  app.put("');
fs.writeFileSync('server.app.ts', code);
console.log("Fixed newline");
