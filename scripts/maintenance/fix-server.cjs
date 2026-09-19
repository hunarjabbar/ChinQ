const fs = require('fs');
let content = fs.readFileSync('server.app.ts', 'utf-8');

content = content.replace(
  'const { exec } = await import("child_process");',
  'const { exec } = await import("child_process");\n        const util = await import("util");\n        const execPromise = util.promisify(exec);'
);

content = content.replace(
  'exec("npx prisma db push --skip-generate --accept-data-loss", { stdio: "inherit" });',
  'await execPromise("npx prisma db push --skip-generate --accept-data-loss");'
);

fs.writeFileSync('server.app.ts', content);
