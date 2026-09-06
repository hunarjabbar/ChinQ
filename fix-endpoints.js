import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  'app.get("/api/admin/newsletter", adminMiddleware,',
  'app.get("/api/admin/subscribers", adminMiddleware,'
);

code = code.replace(
  'app.delete("/api/admin/newsletter/:id", adminMiddleware,',
  'app.delete("/api/admin/subscribers/:id", adminMiddleware,'
);

fs.writeFileSync('server.ts', code);

let adminCode = fs.readFileSync('src/pages/AdminDashboard.tsx', 'utf8');
adminCode = adminCode.replace(
  'fetch(`/api/admin/newsletter/${sub.id}`',
  'apiFetch(`/api/admin/subscribers/${sub.id}`'
);
// replace method: DELETE with method: DELETE inside apiFetch? Wait, apiFetch automatically adds token if not passed, but I passed fetch with headers. If I use apiFetch, I don't need headers.
adminCode = adminCode.replace(
  "const res = await fetch(`/api/admin/newsletter/${sub.id}`, {\n                                  method: 'DELETE',\n                                  headers: {\n                                    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`\n                                  }\n                                });",
  "const res = await apiFetch(`/api/admin/subscribers/${sub.id}`, {\n                                  method: 'DELETE'\n                                });"
);
fs.writeFileSync('src/pages/AdminDashboard.tsx', adminCode);
