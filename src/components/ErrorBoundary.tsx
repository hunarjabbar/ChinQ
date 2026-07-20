import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  lang?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ChinQ Application Error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      const lang = this.props.lang || 'en';
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-[#FAFAFA] text-[#111111] w-full">
          <div className="max-w-lg w-full bg-white p-8 sm:p-12 border border-gray-200 shadow-sm rounded-lg text-center space-y-6">
            
            <div className="flex justify-center text-[#990000]">
              <AlertTriangle size={48} strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-black tracking-tight">
                System Alert
              </h2>
              <p className="text-gray-600 text-sm">
                We encountered an unexpected issue while loading this content. Our editorial engineering team has been notified.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="bg-gray-50 border border-gray-100 p-3 rounded text-xs font-mono text-gray-500 text-left overflow-x-auto">
                Error Details: {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-[#990000] text-white font-medium rounded hover:bg-[#7a0000] transition-colors focus:ring-4 focus:ring-red-100 outline-none cursor-pointer"
              >
                <RefreshCcw size={16} />
                <span>Try Again</span>
              </button>
              
              <Link
                to={`/${lang}`}
                onClick={() => this.setState({ hasError: false, error: null })}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
              >
                <Home size={16} />
                <span>Go Home</span>
              </Link>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
