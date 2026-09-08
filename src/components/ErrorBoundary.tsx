import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, Home, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  lang?: string;
  inline?: boolean;
  title?: string;
  onReset?: () => void;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ERROR_STRINGS: Record<string, {
  title: string;
  subtitle: string;
  reload: string;
  retry: string;
  home: string;
  resetCache: string;
  details: string;
}> = {
  en: {
    title: 'System Interface Notice',
    subtitle: 'An unexpected runtime state occurred while processing this financial or editorial view. The module can be safely restored:',
    reload: 'Reload Portal',
    retry: 'Retry Component',
    home: 'Return Home',
    resetCache: 'Clear Local Cache',
    details: 'Diagnostic Trace'
  },
  ar: {
    title: 'إشعار فني بالنظام المالي والتحريري',
    subtitle: 'حدث خطأ غير متوقع أثناء معالجة هذه الواجهة. يمكنك استعادة عمل الوحدة فوراً:',
    reload: 'إعادة تحميل البوابة',
    retry: 'إعادة محاولة الوحدة',
    home: 'العودة للرئيسية',
    resetCache: 'مسح التخزين المؤقت',
    details: 'تفاصيل الخطأ الفني'
  },
  zh: {
    title: '系统金融与编辑界面提示',
    subtitle: '处理此金融服务或编辑视图时发生异常运行时事件。该模块可安全立即恢复：',
    reload: '重新加载门户',
    retry: '重试组件',
    home: '返回主页',
    resetCache: '清除本地缓存',
    details: '诊断信息'
  },
  ckb: {
    title: 'ئاگاداری سیستەمی دارایی و دەستەی نووسین',
    subtitle: 'ڕووداوێکی چاوەڕواننەکراو لە کاتی بارکردنی ئەم بەشەدا ڕوویدا. دەتوانیت ڕاستەوخۆ کارەکە نوێ بکەیتەوە:',
    reload: 'نوێکردنەوەی پۆڕتاڵ',
    retry: 'دووبارەکردنەوەی بەش',
    home: 'گەڕانەوە بۆ سەرەکی',
    resetCache: 'پاککردنەوەی کاش',
    details: 'زانیاری هەڵەکە'
  }
};

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.lang !== prevProps.lang) {
      this.setState({ hasError: false, error: null });
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Iraqi-Chinese Agency Application Error Boundary Caught:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  private handleClearStorage = () => {
    try {
      localStorage.removeItem('site-config-storage');
      localStorage.removeItem('auth-storage');
      localStorage.removeItem('payment-draft');
    } catch {}
    window.location.href = `/${this.props.lang || 'en'}`;
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const langKey = this.props.lang && ['en', 'ar', 'zh', 'ckb'].includes(this.props.lang)
        ? this.props.lang
        : 'en';
      const strings = ERROR_STRINGS[langKey] || ERROR_STRINGS.en;
      const isRtl = langKey === 'ar' || langKey === 'ckb';

      if (this.props.inline) {
        return (
          <div 
            dir={isRtl ? 'rtl' : 'ltr'}
            className="my-6 p-6 bg-amber-50/70 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800 rounded-xl text-brand-900 font-sans shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-700 dark:text-amber-400 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1 space-y-2 text-start">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  {this.props.title || strings.title}
                </h4>
                <p className="text-xs text-amber-800/90 dark:text-amber-300 leading-relaxed">
                  {strings.subtitle}
                </p>
                {this.state.error?.message && (
                  <div className="p-2.5 bg-white/80 dark:bg-black/40 border border-amber-200 dark:border-amber-900 text-[11px] text-neutral-600 dark:text-neutral-400 rounded">
                    {strings.details}: {this.state.error.message}
                  </div>
                )}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={this.handleRetry}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-800 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-brand-900 transition-colors cursor-pointer"
                  >
                    <RefreshCcw size={13} />
                    <span>{strings.retry}</span>
                  </button>
                  <button
                    onClick={this.handleReload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <span>{strings.reload}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div 
          dir={isRtl ? 'rtl' : 'ltr'} 
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-paper-50 text-brand-900 w-full font-sans"
        >
          <div className="max-w-xl w-full bg-white dark:bg-neutral-900 p-8 sm:p-12 border-2 border-ink-900 dark:border-neutral-700 shadow-xl text-center space-y-6 rounded-2xl">
            <div className="flex justify-center text-brand-800 dark:text-brand-400">
              <div className="p-4 bg-brand-50 dark:bg-brand-950/40 rounded-full border border-brand-200 dark:border-brand-800">
                <AlertTriangle size={48} strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tight text-brand-900 dark:text-white">
                {this.props.title || strings.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-md mx-auto">
                {strings.subtitle}
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-3.5 text-xs text-neutral-600 dark:text-neutral-400 text-start overflow-x-auto rounded-lg">
                <span className="font-bold text-brand-800 dark:text-brand-400">{strings.details}: </span>
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleRetry}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-brand-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-900 transition-colors rounded-lg cursor-pointer shadow-sm"
              >
                <RefreshCcw size={14} />
                <span>{strings.retry}</span>
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-white dark:bg-neutral-800 border border-ink-900 dark:border-neutral-600 text-brand-900 dark:text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer"
              >
                <RefreshCcw size={14} />
                <span>{strings.reload}</span>
              </button>

              <a
                href={`/${langKey}`}
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors rounded-lg cursor-pointer"
              >
                <Home size={14} />
                <span>{strings.home}</span>
              </a>

              <button
                onClick={this.handleClearStorage}
                title="Reset local cache"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-medium text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors rounded-lg cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>{strings.resetCache}</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
