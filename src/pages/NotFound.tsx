import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 font-sans text-[#111111] w-full">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Editorial 404 Graphic */}
        <div className="relative inline-block">
          <h1 className="text-9xl font-serif font-black tracking-tighter text-gray-200 select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#990000]">
            <FileQuestion size={64} strokeWidth={1.5} />
          </div>
        </div>

        {/* Trilingual Messaging */}
        <div className="space-y-4 border-y border-gray-200 py-8">
          <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">
            Page Not Found
          </h2>
          <h2 className="text-2xl font-serif font-bold" dir="rtl">
            الصفحة غير موجودة
          </h2>
          <h2 className="text-2xl font-serif font-bold">
            页面未找到
          </h2>
        </div>

        <p className="text-gray-500 max-w-md mx-auto">
          The article or section you are looking for has been moved, deleted, or never existed.
        </p>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            to="/en" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white font-medium rounded hover:bg-[#990000] transition-colors focus:ring-4 focus:ring-red-100 outline-none"
          >
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
