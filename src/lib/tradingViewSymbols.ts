/**
 * TradingView Ticker & Exchange Mapping for China, Hong Kong & Global Markets.
 * Symbols mapped to null fall back to our internal Recharts estimate.
 */
export const TRADINGVIEW_SYMBOL_MAP: Record<string, string | null> = {
  // China Indices
  'SSE': 'SSE:000001',       // Shanghai Composite
  'SZSE': 'SZSE:399001',     // Shenzhen Component
  'CSI300': 'SSE:000300',     // CSI 300 Index
  'STAR50': 'SSE:000688',     // SSE STAR Market 50

  // Hong Kong Indices
  'HSI': 'HSI:HSI',          // Hang Seng Index
  'HSTECH': 'HSI:HSTECH',    // Hang Seng Tech Index
  'HSCEI': 'HSI:HSCEI',      // Hang Seng China Enterprises Index

  // Hong Kong Equities (HKEX)
  '0700.HK': 'HKEX:700',      // Tencent Holdings
  '9988.HK': 'HKEX:9988',     // Alibaba Group
  '0857.HK': 'HKEX:857',      // PetroChina (H-Share)
  '0883.HK': 'HKEX:883',      // CNOOC Limited
  '1211.HK': 'HKEX:1211',     // BYD Company
  '3690.HK': 'HKEX:3690',     // Meituan
  '1810.HK': 'HKEX:1810',     // Xiaomi Corp
  '1398.HK': 'HKEX:1398',     // ICBC Bank
  '0941.HK': 'HKEX:941',      // China Mobile

  // China A-Shares (SSE)
  '600519.SH': 'SSE:600519',  // Kweichow Moutai
  '601857.SH': 'SSE:601857',  // PetroChina A-Share

  // Commodities & Global Macro
  'BRENT': 'TVC:UKOIL',       // Brent Crude Oil
  'GOLD': 'TVC:GOLD',         // Gold Spot (XAU/USD)
  'SHANGHAI_OIL': 'INE:SC1!', // Shanghai International Energy Exchange Crude Oil
  'CNY_USD': 'FX_IDC:USDCNY', // USD / CNY Spot Rate

  // Iraq Stock Exchange & Bilateral Clearing Rates (No TV coverage -> simulated fallback)
  'ISX60': null,              // Iraq Stock Exchange ISX60
  'IQD_USD': null,            // USD / IQD Official Rate
  'IQD_ECNY': null,           // IQD / e-CNY Exchange Rate
};

/**
 * Resolves an internal market symbol to its corresponding TradingView ticker,
 * or null if no direct TradingView feed exists.
 */
export function getTradingViewSymbol(symbol: string): string | null {
  return TRADINGVIEW_SYMBOL_MAP[symbol] ?? null;
}

/**
 * Returns true if a live TradingView chart is supported for this symbol.
 */
export function isTradingViewSupported(symbol: string): boolean {
  return getTradingViewSymbol(symbol) !== null;
}

/**
 * Returns appropriate market timezone for the TradingView widget:
 * "Asia/Shanghai" for Mainland China (SSE, SZSE, INE)
 * "Asia/Hong_Kong" for HKEX / Hang Seng
 * "Etc/UTC" for global macro/commodities
 */
export function getTradingViewTimezone(tvSymbol: string): string {
  if (
    tvSymbol.startsWith('SSE:') ||
    tvSymbol.startsWith('SZSE:') ||
    tvSymbol.startsWith('INE:')
  ) {
    return 'Asia/Shanghai';
  }
  if (tvSymbol.startsWith('HKEX:') || tvSymbol.startsWith('HSI:')) {
    return 'Asia/Hong_Kong';
  }
  return 'Etc/UTC';
}
