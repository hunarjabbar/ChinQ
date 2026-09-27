import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, X, ArrowUpRight, KeyRound, AlertTriangle } from 'lucide-react';
import { Locale } from '../types';
import { useAuthStore } from '../store/useAuthStore';

interface HubLoginFooterProps {
  lang?: Locale;
  className?: string;
  useModal?: boolean;
}

export function HubLoginFooter({ lang = 'en', className = '', useModal = true }: HubLoginFooterProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isRtl = lang === 'ar' || lang === 'ckb';

  const labels = {
    adminAccess: {
      en: 'Admin Access',
      ar: 'دخول الإدارة',
      zh: '管理员入口',
      ckb: 'دەروازەی بەڕێوەبەر'
    },
    hubPortal: {
      en: 'CISE Command Hub',
      ar: 'مركز قيادة المعهد',
      zh: 'CISE 指挥中心',
      ckb: 'سەنتەری فەرماندەیی'
    },
    modalTitle: {
      en: 'Accredited Portal Login',
      ar: 'تسجيل الدخول للمخولين',
      zh: '智库特许人员登录',
      ckb: 'چوونەژوورەوەی ڕێپێدراو'
    },
    modalDesc: {
      en: 'Enter your accredited CISE credentials to access the Command Hub.',
      ar: 'أدخل بيانات الاعتماد المعتمدة للوصول إلى مركز القيادة.',
      zh: '请输入您的 CISE 官方凭据以进入指挥控制中心。',
      ckb: 'زانیارییەکانی خۆت بنووسە بۆ چوونەژوورەوە.'
    },
    loginBtn: {
      en: 'Authenticate',
      ar: 'تسجيل الدخول',
      zh: '安全验证',
      ckb: 'چوونەژوورەوە'
    },
    fullLoginPage: {
      en: 'Open Full Login Page',
      ar: 'فتح صفحة الدخول الكاملة',
      zh: '打开完整登录页面',
      ckb: 'کردنەوەی لاپەڕەی تەواو'
    }
  };

  const currentLabel = {
    adminAccess: labels.adminAccess[lang] || labels.adminAccess.en,
    hubPortal: labels.hubPortal[lang] || labels.hubPortal.en,
    modalTitle: labels.modalTitle[lang] || labels.modalTitle.en,
    modalDesc: labels.modalDesc[lang] || labels.modalDesc.en,
    loginBtn: labels.loginBtn[lang] || labels.loginBtn.en,
    fullLoginPage: labels.fullLoginPage[lang] || labels.fullLoginPage.en,
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setAuth(
      {
        id: 'usr_admin',
        email,
        name: email.split('@')[0] || 'Admin User',
        role: 'ADMIN'
      },
      'quick_hub_token_2026'
    );
    setModalOpen(false);
    navigate('/hub');
  };

  return (
    <div className={`inline-flex items-center ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {useModal ? (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 transition-colors py-1 px-2.5 rounded-lg border border-neutral-800 hover:border-amber-500/40 bg-neutral-900/60 font-medium"
        >
          <Lock size={12} className="text-amber-400/80" />
          <span>{currentLabel.adminAccess}</span>
        </button>
      ) : (
        <Link
          to="/hub/login"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-amber-400 transition-colors py-1 px-2.5 rounded-lg border border-neutral-800 hover:border-amber-500/40 bg-neutral-900/60 font-medium"
        >
          <Lock size={12} className="text-amber-400/80" />
          <span>{currentLabel.adminAccess}</span>
          <ArrowUpRight size={12} className="rtl:rotate-270" />
        </Link>
      )}

      {/* Quick Login Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-5 text-white relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-xl bg-neutral-800"
            >
              <X size={16} />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-black uppercase text-amber-400">
                <ShieldCheck size={13} />
                <span>{currentLabel.hubPortal}</span>
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight">{currentLabel.modalTitle}</h3>
              <p className="text-xs text-neutral-400">{currentLabel.modalDesc}</p>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleQuickLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@iraqi-chineseagency.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase mb-1">Passcode</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs uppercase py-2.5 rounded-xl shadow-lg transition-all"
              >
                {currentLabel.loginBtn}
              </button>
            </form>

            <div className="border-t border-neutral-800 pt-3 text-center">
              <Link
                to="/hub/login"
                onClick={() => setModalOpen(false)}
                className="text-xs text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                <KeyRound size={12} />
                <span>{currentLabel.fullLoginPage}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
