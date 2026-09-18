import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('IcaPlusPage')) {
  // Imports
  code = code.replace(
    "const PodcastsPage = lazyWithRetry(() => import('./pages/PodcastsPage'));",
    "const PodcastsPage = lazyWithRetry(() => import('./pages/PodcastsPage'));\nconst IcaPlusPage = lazyWithRetry(() => import('./pages/IcaPlusPage').then(m => ({ default: m.IcaPlusPage })));\nconst AdminIcaPlus = lazyWithRetry(() => import('./pages/AdminIcaPlus'));"
  );
  
  // Public route
  code = code.replace(
    '{ path: "podcasts", element: <PodcastsPage /> },',
    '{ path: "podcasts", element: <PodcastsPage /> },\n      { path: "ica-plus", element: <IcaPlusPage /> },'
  );
  
  // Admin route
  code = code.replace(
    '{ path: "podcasts", element: <AdminPodcasts /> },',
    '{ path: "podcasts", element: <AdminIcaPlus /> },\n      { path: "icaplus", element: <AdminIcaPlus /> },'
  );
  
  fs.writeFileSync('src/App.tsx', code);
  console.log('App patched');
}
