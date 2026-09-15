import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { getTradingViewTimezone } from '../lib/tradingViewSymbols';
import { AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';
import type { TradingViewWidgetInstance, TradingViewWidgetOptions } from '../types/tradingview';

export interface TradingViewChartProps {
  symbol: string;
  theme?: 'light' | 'dark';
  locale?: string;
  autosize?: boolean;
  interval?: string;
  className?: string;
}

// Module-level script loader cache to guarantee script is loaded only once per app session
let tvScriptPromise: Promise<void> | null = null;

function loadTradingViewScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.TradingView?.widget) {
    return Promise.resolve();
  }

  if (tvScriptPromise) {
    return tvScriptPromise;
  }

  tvScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById('tradingview-widget-script');
    if (existing) {
      if (window.TradingView?.widget) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', (e) => reject(e), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = 'tradingview-widget-script';
    script.src = 'https://s3.tradingview.com/tv.js';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      tvScriptPromise = null; // Reset so user can retry
      reject(new Error('Failed to load TradingView script. Check network or ad-blocker.'));
    };

    document.head.appendChild(script);
  });

  return tvScriptPromise;
}

export const TradingViewChart: React.FC<TradingViewChartProps> = React.memo(function TradingViewChart({
  symbol,
  theme = 'dark',
  locale = 'en',
  autosize = true,
  interval = 'D',
  className,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<TradingViewWidgetInstance | null>(null);

  // Generate safe unique container id without colons
  const rawId = useId();
  const containerId = useMemo(
    () => `tv_chart_${rawId.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    [rawId]
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<number>(0);

  const timezone = useMemo(() => getTradingViewTimezone(symbol), [symbol]);

  useEffect(() => {
    let isCancelled = false;
    let fallbackTimeout: NodeJS.Timeout | null = null;
    setIsLoading(true);
    setError(null);

    // Clean up previous widget instance & container DOM
    if (widgetInstanceRef.current?.remove) {
      try {
        widgetInstanceRef.current.remove();
      } catch {
        // Ignore cleanup error
      }
      widgetInstanceRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    loadTradingViewScript()
      .then(() => {
        if (isCancelled || !containerRef.current || !window.TradingView?.widget) {
          return;
        }

        const widgetOptions: TradingViewWidgetOptions = {
          symbol,
          interval,
          theme,
          locale,
          timezone,
          style: '1', // Candle style
          toolbar_bg: theme === 'dark' ? '#0f172a' : '#f8f8f8',
          hide_side_toolbar: false,
          allow_symbol_change: false, // Curated list only
          save_image: false,
          studies: [],
          width: '100%',
          height: '100%',
          autosize,
          container_id: containerId,
          enable_publishing: false,
          overrides: {
            'paneProperties.background': theme === 'dark' ? '#0f172a' : '#ffffff',
            'paneProperties.vertGridProperties.color': theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
            'paneProperties.horzGridProperties.color': theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
            'scalesProperties.textColor': theme === 'dark' ? '#9ca3af' : '#525252',
            'mainSeriesProperties.candleStyle.upColor': '#10b981',
            'mainSeriesProperties.candleStyle.downColor': '#cc0000',
            'mainSeriesProperties.candleStyle.drawWick': true,
            'mainSeriesProperties.candleStyle.drawBorder': true,
            'mainSeriesProperties.candleStyle.borderColor': '#cc0000',
            'mainSeriesProperties.candleStyle.borderUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.borderDownColor': '#cc0000',
            'mainSeriesProperties.candleStyle.wickUpColor': '#10b981',
            'mainSeriesProperties.candleStyle.wickDownColor': '#cc0000',
          },
          onChartReady: () => {
            if (!isCancelled) {
              setIsLoading(false);
              if (fallbackTimeout) clearTimeout(fallbackTimeout);
            }
          },
        };

        try {
          const widget = new window.TradingView.widget(widgetOptions);
          widgetInstanceRef.current = widget;

          // Fallback timer in case onChartReady does not fire on certain embed frames
          fallbackTimeout = setTimeout(() => {
            if (!isCancelled) {
              setIsLoading(false);
            }
          }, 2400);
        } catch (err: any) {
          if (!isCancelled) {
            setError(err?.message || 'Failed to initialize TradingView widget.');
            setIsLoading(false);
          }
        }
      })
      .catch((err: any) => {
        if (!isCancelled) {
          setError(err?.message || 'TradingView script could not be loaded.');
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (widgetInstanceRef.current?.remove) {
        try {
          widgetInstanceRef.current.remove();
        } catch {
          // Ignore
        }
        widgetInstanceRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, theme, locale, interval, autosize, containerId, timezone, retryKey]);

  return (
    <div className={cn('relative w-full h-full min-h-[360px]', className)}>
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-neutral-950/90 text-center rounded border border-white/10">
          <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
          <h4 className="text-sm font-bold text-white mb-1">TradingView Chart Unavailable</h4>
          <p className="text-xs text-gray-400 max-w-sm mb-4">{error}</p>
          <button
            onClick={() => setRetryKey((prev) => prev + 1)}
            className="px-3 py-1.5 bg-brand-800 hover:bg-brand-700 active:scale-95 text-white text-xs font-bold rounded flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Retry Connection</span>
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-xs rounded transition-opacity duration-300">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
              <BarChart2 className="w-5 h-5 text-brand-300 animate-bounce" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-mono font-bold text-gray-200">
                Connecting TradingView Stream...
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                {symbol} ({timezone})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Target Container for TradingView Widget iframe */}
      <div
        id={containerId}
        ref={containerRef}
        className="w-full h-full min-h-[360px]"
      />
    </div>
  );
});
