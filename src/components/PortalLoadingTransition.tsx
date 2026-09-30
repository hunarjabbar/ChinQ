import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Sparkles, Cpu, Radio, Globe } from 'lucide-react';

interface PortalLoadingTransitionProps {
  message?: string;
  subtitle?: string;
}

export function PortalLoadingTransition({ message, subtitle }: PortalLoadingTransitionProps) {
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => (prev >= 92 ? 95 : prev + Math.floor(Math.random() * 15) + 5));
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 text-white flex flex-col items-center justify-center p-6 select-none transition-all duration-700 ease-out animate-fadeIn">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-800/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-md w-full space-y-8 text-center">
        {/* Emblem & Spinner Core */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Outer Ring */}
          <div className="w-24 h-24 rounded-full border-2 border-brand-800/30 border-t-brand-800 border-r-amber-500/80 animate-spin transition-all duration-1000"></div>
          
          {/* Pulsing Inner Shield Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-brand-800/60 flex items-center justify-center shadow-2xl shadow-brand-900/50 backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-brand-800 text-white flex items-center justify-center font-black text-sm shadow-md animate-pulse">
                CISE
              </div>
            </div>
          </div>
        </div>

        {/* Message & Status */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest text-amber-400 shadow-sm backdrop-blur-md">
            <Lock size={12} className="text-amber-400" />
            <span>Sovereign Intelligence Portal</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white transition-opacity duration-300">
            {message || `Loading Secure Intelligence Portal${dots}`}
          </h2>

          <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-sm">
            {subtitle || 'Establishing encrypted TLS 1.3 handshake & verifying bilateral policy data streams...'}
          </p>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-1.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-brand-800 via-amber-500 to-brand-800 rounded-full transition-all duration-300 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500 uppercase px-1">
            <span>Handshake OK</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Verification Footnote Badges */}
        <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-mono text-neutral-500 border-t border-neutral-900 w-full">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-400" /> AES-256
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Cpu size={12} className="text-amber-400" /> CBI Accredited
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Radio size={12} className="text-sky-400" /> Direct Rail
          </span>
        </div>
      </div>
    </div>
  );
}
