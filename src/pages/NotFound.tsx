
import { Link, useParams } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export function NotFound() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const messages: any = {
    en: { title: "Page Not Found", desc: "The requested information brief or regional directory does not exist.", btn: "Return to Homepage" },
    ar: { title: "الصفحة غير موجودة", desc: "الموجز المعلوماتي أو الدليل الإقليمي المطلوب غير موجود.", btn: "العودة للصفحة الرئيسية" },
    zh: { title: "页面未找到", desc: "所请求的信息简报或区域目录不存在。", btn: "返回首页" },
    ckb: { title: "پەڕەکە نەدۆزرایەوە", desc: "ئەو کورتە زانیارییە یان پێڕستە ناوچەییەی داوات کردووە بوونی نییە.", btn: "گەڕانەوە بۆ پەڕەی سەرەکی" }
  };
  const t = messages[lang] || messages.en;

  return (
    <div className="min-h-screen bg-paper-50 flex flex-col items-center justify-center p-4 font-sans text-ink-900 w-full">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative inline-block">
          <h1 className="text-9xl font-black tracking-tighter text-gray-200 select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-800">
            <FileQuestion size={64} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4 border-y border-gray-200 py-8">
          <h2 className="text-2xl font-bold uppercase tracking-widest">{t.title}</h2>
        </div>

        <p className="text-gray-500 max-w-md mx-auto">{t.desc}</p>
        
        <div className="pt-4">
          <Link to={`/${lang}`} className="inline-flex items-center gap-2 bg-brand-800 text-white px-8 py-3 rounded-xs font-bold uppercase tracking-widest hover:bg-brand-800 transition-colors">
            <Home className="w-5 h-5" />
            {t.btn}
          </Link>
        </div>
      </div>
    </div>
  );
}
