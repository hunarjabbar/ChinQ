const { ALL_HISTORICAL_FIGURES } = require('./dist/server.cjs');
// wait, server.cjs doesn't export ALL_HISTORICAL_FIGURES
// let's just grep "slug: 'history-" server/data/figures/*.ts
