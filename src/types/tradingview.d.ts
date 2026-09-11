export interface TradingViewWidgetOptions {
  symbol: string;
  interval?: string;
  theme?: 'light' | 'dark';
  locale?: string;
  timezone?: string;
  style?: string;
  toolbar_bg?: string;
  hide_side_toolbar?: boolean;
  allow_symbol_change?: boolean;
  save_image?: boolean;
  studies?: string[];
  width?: string | number;
  height?: string | number;
  autosize?: boolean;
  container_id?: string;
  fullscreen?: boolean;
  disabled_features?: string[];
  enabled_features?: string[];
  enable_publishing?: boolean;
  onChartReady?: () => void;
  [key: string]: unknown;
}

export interface TradingViewWidgetInstance {
  remove?: () => void;
  onChartReady?: (callback: () => void) => void;
  [key: string]: unknown;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: TradingViewWidgetOptions) => TradingViewWidgetInstance;
    };
  }
}
