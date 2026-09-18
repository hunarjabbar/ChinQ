import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  MessageCircle, 
  QrCode, 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  X as CloseIcon,
  Share2,
  PhoneCall,
  Radio,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Locale } from '../types';
import { useSiteStore } from '../store/useSiteStore';

export type SocialPlatformKey = 'whatsapp' | 'facebook' | 'facebookAr' | 'facebookZh' | 'facebookCkb' | 'telegram' | 'telegramAr' | 'telegramZh' | 'telegramCkb' | 'instagram' | 'linkedin' | 'weibo' | 'wechat' | 'youtube' | 'youtubeAr' | 'youtubeZh' | 'youtubeCkb' | 'x' | 'xAr' | 'xZh' | 'xCkb';

export interface SocialItemData {
  key: SocialPlatformKey;
  name: string;
  nameZh: string;
  nameAr: string;
  nameCkb: string;
  handle: string;
  badge: string;
  badgeZh: string;
  badgeAr: string;
  badgeCkb: string;
  colorHex: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hoverBgClass: string;
  isModal?: boolean;
}

export const SOCIAL_PLATFORMS: SocialItemData[] = [
  {
    key: 'whatsapp',
    name: 'WhatsApp',
    nameZh: 'WhatsApp 专线社群',
    nameAr: 'واتساب - القناة الإخبارية',
    nameCkb: 'واتسئاپ - کەناڵی هەواڵ',
    handle: '+964 780 555 0100',
    badge: 'Direct Dispatches',
    badgeZh: '即时快讯专线',
    badgeAr: 'تنبيهات فورية',
    badgeCkb: 'پەیامی خێرا',
    colorHex: '#25D366',
    bgClass: 'bg-emerald-50 text-emerald-700',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-200',
    hoverBgClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
  },
  {
    key: 'facebook',
    name: 'Facebook (EN)',
    nameZh: '英文脸书官方主页',
    nameAr: 'فيسبوك - القسم الإنجليزي',
    nameCkb: 'فەیسبووک - بەشی ئینگلیزی',
    handle: '@IraqiChineseAgency.EN',
    badge: 'English Broadcast',
    badgeZh: '英文官方主页',
    badgeAr: 'بث القسم الإنجليزي',
    badgeCkb: 'پەخشی ئینگلیزی',
    colorHex: '#1877F2',
    bgClass: 'bg-blue-50 text-blue-700',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    hoverBgClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    key: 'facebookAr',
    name: 'Facebook (AR)',
    nameZh: '阿拉伯语脸书官方频道',
    nameAr: 'فيسبوك - القسم العربي',
    nameCkb: 'فەیسبووک - بەشی عەرەبی',
    handle: '@IraqiChineseAgency.AR',
    badge: 'Arabic Broadcast',
    badgeZh: '阿拉伯语资讯网',
    badgeAr: 'بث القسم العربي',
    badgeCkb: 'پەخشی عەرەبی',
    colorHex: '#1877F2',
    bgClass: 'bg-blue-50 text-blue-700',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    hoverBgClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    key: 'facebookZh',
    name: 'Facebook (ZH)',
    nameZh: '中文脸书官方主页',
    nameAr: 'فيسبوك - القسم الصيني',
    nameCkb: 'فەیسبووک - بەشی چینی',
    handle: '@IraqiChineseAgency.ZH',
    badge: 'Chinese Broadcast',
    badgeZh: '中文官方播报',
    badgeAr: 'بث القسم الصيني',
    badgeCkb: 'پەخشی چینی',
    colorHex: '#1877F2',
    bgClass: 'bg-blue-50 text-blue-700',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    hoverBgClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    key: 'facebookCkb',
    name: 'Facebook (CKB)',
    nameZh: '库尔德语脸书官方主页',
    nameAr: 'فيسبوك - القسم الكردي',
    nameCkb: 'فەیسبووک - بەشی کوردی',
    handle: '@IraqiChineseAgency.CKB',
    badge: 'Kurdish Broadcast',
    badgeZh: '库尔德语专线',
    badgeAr: 'بث القسم الكردي',
    badgeCkb: 'پەخشی کوردی',
    colorHex: '#1877F2',
    bgClass: 'bg-blue-50 text-blue-700',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    hoverBgClass: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
  },
  {
    key: 'telegram',
    name: 'Telegram',
    nameZh: 'Telegram 官方电报',
    nameAr: 'تيليجرام - القناة الإخبارية',
    nameCkb: 'تێلیگرام - کەناڵی فەرمی',
    handle: '@IraqiChineseAgency',
    badge: 'Instant Telex',
    badgeZh: '实时电讯终端',
    badgeAr: 'بث تيليجرام السريع',
    badgeCkb: 'تێلیگرامی خێرا',
    colorHex: '#229ED9',
    bgClass: 'bg-sky-50 text-sky-700',
    textClass: 'text-sky-600',
    borderClass: 'border-sky-200',
    hoverBgClass: 'hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    nameZh: 'Instagram 纪实影集',
    nameAr: 'إنستغرام - التوثيق المصور',
    nameCkb: 'ئینستاگرام - وێنە و ڤیدیۆ',
    handle: '@iraqi-chineseagency',
    badge: 'Visual Dispatches',
    badgeZh: '光影现场图录',
    badgeAr: 'معارض ميدانية',
    badgeCkb: 'وێنەی مەیدانی',
    colorHex: '#E4405F',
    bgClass: 'bg-brand-50 text-brand-700',
    textClass: 'text-brand-600',
    borderClass: 'border-brand-200',
    hoverBgClass: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    nameZh: '领英双边企业网络',
    nameAr: 'لينكد إن - شبكة الأعمال',
    nameCkb: 'لینکدئین - تۆڕی بازرگانی',
    handle: 'Iraqi-Chinese Agency',
    badge: 'B2B & Trade Network',
    badgeZh: '双边经贸企业智库',
    badgeAr: 'منظومة الشراكات',
    badgeCkb: 'تۆڕی بازرگانی و دارایی',
    colorHex: '#0A66C2',
    bgClass: 'bg-sky-50 text-sky-800',
    textClass: 'text-sky-700',
    borderClass: 'border-sky-200',
    hoverBgClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]',
  },
  {
    key: 'weibo',
    name: 'Weibo',
    nameZh: '新浪微博官方认证',
    nameAr: 'ويبو الصيني - الحساب الموثق',
    nameCkb: 'وێیبۆ - هەژماری فەرمی چین',
    handle: '@伊拉克中国日报',
    badge: 'Sina Verified V',
    badgeZh: '新浪官方蓝V认证',
    badgeAr: 'توثيق مستقل',
    badgeCkb: 'هەژماری باوەڕپێکراو',
    colorHex: '#cc0000',
    bgClass: 'bg-brand-50 text-brand-700',
    textClass: 'text-brand-600',
    borderClass: 'border-brand-200',
    hoverBgClass: 'hover:bg-brand-800 hover:text-white hover:border-brand-800',
  },
  {
    key: 'wechat',
    name: 'WeChat',
    nameZh: '微信官方公众号',
    nameAr: 'ويتشات - الحساب المؤسسي',
    nameCkb: 'ویچات - ئەژماری فەرمی',
    handle: 'IraqiChineseAgency_Official',
    badge: 'Scan QR / Direct ID',
    badgeZh: '扫码订阅 / 公众号',
    badgeAr: 'رمز الاستجابة السريعة',
    badgeCkb: 'کۆدی QR فەرمی',
    colorHex: '#07C160',
    bgClass: 'bg-emerald-50 text-emerald-800',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-200',
    hoverBgClass: 'hover:bg-[#07C160] hover:text-white hover:border-[#07C160]',
    isModal: true,
  },
  {
    key: 'youtube',
    name: 'YouTube',
    nameZh: 'YouTube 纪录片与直播',
    nameAr: 'يوتيوب - التحقيقات الوثائقية',
    nameCkb: 'یوتیوب - دۆکیۆمێنتاری و ڤیدیۆ',
    handle: '@IraqiChineseAgency',
    badge: '4K Broadcasts',
    badgeZh: '高清专题纪录片',
    badgeAr: 'بث وثائقي فائق الدقة',
    badgeCkb: 'پەخشی کوالێتی بەرز',
    colorHex: '#cc0000',
    bgClass: 'bg-brand-50 text-brand-800',
    textClass: 'text-brand-600',
    borderClass: 'border-brand-200',
    hoverBgClass: 'hover:bg-brand-800 hover:text-white hover:border-brand-800',
  },
  {
    key: 'x',
    name: 'X (Twitter)',
    nameZh: 'X 实时快讯社群',
    nameAr: 'منصة إكس (تويتر سابقاً)',
    nameCkb: 'ئێکس (تویتەری پێشوو)',
    handle: '@IraqiChineseAgency',
    badge: 'Live Wire Telex',
    badgeZh: '即时双语电报',
    badgeAr: 'تغطيات حية 24/7',
    badgeCkb: 'هەواڵی کاتی ڕاستەقینە',
    colorHex: '#000000',
    bgClass: 'bg-neutral-100 text-neutral-900',
    textClass: 'text-neutral-900',
    borderClass: 'border-neutral-300',
    hoverBgClass: 'hover:bg-neutral-900 hover:text-white hover:border-neutral-900',
  },
];

// Helper to render platform icon strictly using Lucide icons
export function PlatformIcon({ 
  platform, 
  size = 18, 
  className = '' 
}: { 
  platform: SocialPlatformKey; 
  size?: number; 
  className?: string; 
}) {
  switch (platform) {
    case 'whatsapp':
      return <MessageCircle size={size} className={className} />;
    case 'facebook':
    case 'facebookAr':
    case 'facebookZh':
    case 'facebookCkb':
      return <Facebook size={size} className={className} />;
    case 'telegram':
      return <Send size={size} className={className} />;
    case 'instagram':
      return <Instagram size={size} className={className} />;
    case 'linkedin':
      return <Linkedin size={size} className={className} />;
    case 'weibo':
      return <Globe size={size} className={className} />;
    case 'wechat':
      return <QrCode size={size} className={className} />;
    case 'youtube':
      return <Youtube size={size} className={className} />;
    case 'x':
      return <Twitter size={size} className={className} />;
    default:
      return <Share2 size={size} className={className} />;
  }
}

// Interactive WeChat Modal with QR code and 1-click ID copy
export function WeChatModal({ 
  isOpen, 
  onClose, 
  lang 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  lang: Locale; 
}) {
  const [copied, setCopied] = useState(false);
  const wechatId = 'IraqiChineseAgency_Official';

  const handleCopy = () => {
    navigator.clipboard.writeText(wechatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="wechat-modal-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          id="wechat-modal-content"
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 relative overflow-hidden text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top header accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#07C160]" />

          <button
            id="close-wechat-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            title="Close"
          >
            <CloseIcon size={18} />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#07C160] flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-inner">
            <QrCode size={26} />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {lang === 'zh' ? '关注微信官方公众号' : 
             lang === 'ar' ? 'تابعنا على ويتشات الرسمي' : 
             lang === 'ckb' ? 'لە ویچات هاوڕێمان بە' : 
             'Follow Us on WeChat'}
          </h3>
          <p className="text-xs text-gray-500 mb-5">
            {lang === 'zh' ? '微信扫一扫下方二维码，或复制微信ID在微信中搜索关注。' : 
             lang === 'ar' ? 'امسح رمز الاستجابة السريعة ضوئياً أو انسخ معرف الحساب للبحث في تطبيق ويتشات.' : 
             lang === 'ckb' ? 'کۆدی QR سکان بکە یان ناسنامەکە کۆپی بکە لەناو ویچات.' : 
             'Scan the QR code or copy the official WeChat ID to follow our verified channel.'}
          </p>

          {/* Styled QR Code Box */}
          <div className="bg-gradient-to-b from-gray-50 to-emerald-50/40 p-5 rounded-xl border border-emerald-100 inline-block mb-5 shadow-xs">
            {/* High visual QR Code simulation */}
            <div className="w-48 h-48 bg-white p-3 rounded-lg border border-gray-200 dark:border-neutral-800 shadow-inner flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
                {/* Visual stylised QR matrix */}
                <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="9" y="9" width="18" height="18" fill="white" />
                <rect x="13" y="13" width="10" height="10" fill="#07C160" />

                <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="73" y="9" width="18" height="18" fill="white" />
                <rect x="77" y="13" width="10" height="10" fill="#07C160" />

                <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="2" />
                <rect x="9" y="73" width="18" height="18" fill="white" />
                <rect x="13" y="77" width="10" height="10" fill="#07C160" />

                {/* Pattern dots */}
                <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                <rect x="48" y="12" width="6" height="6" fill="currentColor" />
                <rect x="40" y="24" width="6" height="6" fill="currentColor" />
                <rect x="54" y="24" width="6" height="6" fill="currentColor" />
                <rect x="12" y="38" width="6" height="6" fill="currentColor" />
                <rect x="24" y="42" width="6" height="6" fill="currentColor" />
                <rect x="38" y="38" width="8" height="8" fill="#07C160" rx="1" />
                <rect x="52" y="42" width="8" height="8" fill="currentColor" />
                <rect x="66" y="38" width="6" height="6" fill="currentColor" />
                <rect x="80" y="42" width="6" height="6" fill="currentColor" />
                <rect x="36" y="54" width="6" height="6" fill="currentColor" />
                <rect x="48" y="60" width="8" height="8" fill="#07C160" />
                <rect x="62" y="54" width="6" height="6" fill="currentColor" />
                <rect x="76" y="60" width="6" height="6" fill="currentColor" />
                <rect x="38" y="74" width="6" height="6" fill="currentColor" />
                <rect x="52" y="78" width="6" height="6" fill="currentColor" />
                <rect x="66" y="72" width="8" height="8" fill="currentColor" />
                <rect x="80" y="80" width="6" height="6" fill="#07C160" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-white/95 px-2 py-0.5 rounded text-xs font-bold text-[#07C160] border border-emerald-200 shadow-xs">
                  ICD WECHAT
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2 font-medium">
              ID: <span className="font-bold text-gray-800">{wechatId}</span>
            </div>
          </div>

          {/* Copy ID Button */}
          <div className="flex gap-2 justify-center">
            <button
              id="copy-wechat-id-btn"
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#07C160] hover:bg-[#06ad56] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 
                (lang === 'zh' ? '已复制微信ID' : lang === 'ar' ? 'تم نسخ المعرف' : 'ID Copied!') : 
                (lang === 'zh' ? '复制微信公众号 ID' : lang === 'ar' ? 'نسخ معرف ويتشات' : 'Copy WeChat ID')
              }
            </button>
            <a
              id="open-wechat-deep-link"
              href="weixin://"
              className="py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
              title="Open WeChat"
            >
              <ExternalLink size={14} />
              {lang === 'zh' ? '打开' : 'Open'}
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// 1. Compact Header Bar Variant
export function SocialHeaderBar({ lang }: { lang: Locale }) {
  const [activeWechat, setActiveWechat] = useState(false);
  const socialLinks = useSiteStore(state => state.socialLinks || {
    whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
    facebook: 'https://facebook.com/IraqiChineseAgency.EN',
    facebookAr: 'https://facebook.com/IraqiChineseAgency.AR',
    facebookZh: 'https://facebook.com/IraqiChineseAgency.ZH',
    facebookCkb: 'https://facebook.com/IraqiChineseAgency.CKB',
    telegram: 'https://t.me/IraqiChineseAgency',
    instagram: 'https://instagram.com/iraqi-chineseagency',
    linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
    weibo: 'https://weibo.com/iraqi-chineseagency',
    wechat: 'IraqiChineseAgency_Official',
    youtube: 'https://youtube.com/@IraqiChineseAgency',
    x: 'https://x.com/IraqiChineseAgency',
  });

  const getUrl = (key: SocialPlatformKey) => {
    if (key === 'facebook') {
      if (lang === 'ar') return socialLinks.facebookAr || socialLinks.facebook;
      if (lang === 'zh') return socialLinks.facebookZh || socialLinks.facebook;
      if (lang === 'ckb') return socialLinks.facebookCkb || socialLinks.facebook;
    }
    return (socialLinks as any)?.[key] || '#';
  };

  return (
    <>
      <div id="header-social-channels" className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-white/95 dark:bg-neutral-900/95 border border-white/80 dark:border-neutral-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        
        <div className="flex items-center gap-1 sm:gap-1.5">
          {SOCIAL_PLATFORMS.map((item) => {
            const iconButtonClasses = "relative w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center bg-white/95 dark:bg-neutral-900/95 border border-white/80 dark:border-neutral-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(204,0,0,0.3)] text-gray-700 dark:text-neutral-200 transition-all duration-300 group hover:-translate-y-0.5 group/icon";
            const smallRedGlassGlow = <div className="absolute -inset-1 bg-brand-600/20 dark:bg-brand-500/20 rounded-full blur-md opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"></div>;

            if (item.isModal) {
              return (
                <button
                  key={item.key}
                  id={`header-social-${item.key}`}
                  onClick={() => setActiveWechat(true)}
                  className={iconButtonClasses}
                  title={`${item.name} (${item.handle})`}
                  aria-label={item.name}
                >
                  {smallRedGlassGlow}
                  <PlatformIcon platform={item.key} size={13} className="relative z-10" />
                </button>
              );
            }

            return (
              <a
                key={item.key}
                id={`header-social-${item.key}`}
                href={getUrl(item.key)}
                target="_blank"
                rel="noopener noreferrer"
                className={iconButtonClasses}
                title={`${item.name} (${item.handle})`}
                aria-label={item.name}
              >
                {smallRedGlassGlow}
                <PlatformIcon platform={item.key} size={13} className="relative z-10" />
              </a>
            );
          })}
        </div>
      </div>

      <WeChatModal 
        isOpen={activeWechat} 
        onClose={() => setActiveWechat(false)} 
        lang={lang} 
      />
    </>
  );
}

// 2. Comprehensive Footer Grid Variant (Rich 8-network showcase)
export function SocialFooterShowcase({ lang }: { lang: Locale }) {
  const [activeWechat, setActiveWechat] = useState(false);
  const [liveIndex, setLiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveIndex(prev => (prev + 1) % SOCIAL_PLATFORMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const socialLinks = useSiteStore(state => state.socialLinks || {
    whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
    facebook: 'https://facebook.com/IraqiChineseAgency.EN',
    facebookAr: 'https://facebook.com/IraqiChineseAgency.AR',
    facebookZh: 'https://facebook.com/IraqiChineseAgency.ZH',
    facebookCkb: 'https://facebook.com/IraqiChineseAgency.CKB',
    telegram: 'https://t.me/IraqiChineseAgency',
    instagram: 'https://instagram.com/iraqi-chineseagency',
    linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
    weibo: 'https://weibo.com/iraqi-chineseagency',
    wechat: 'IraqiChineseAgency_Official',
    youtube: 'https://youtube.com/@IraqiChineseAgency',
    x: 'https://x.com/IraqiChineseAgency',
  });

  const getUrl = (key: SocialPlatformKey) => {
    if (key === 'facebook') {
      if (lang === 'ar') return socialLinks.facebookAr || socialLinks.facebook;
      if (lang === 'zh') return socialLinks.facebookZh || socialLinks.facebook;
      if (lang === 'ckb') return socialLinks.facebookCkb || socialLinks.facebook;
    }
    return (socialLinks as any)?.[key] || '#';
  };

  const getTitle = (item: SocialItemData) => {
    if (lang === 'zh') return item.nameZh;
    if (lang === 'ar') return item.nameAr;
    if (lang === 'ckb') return item.nameCkb;
    return item.name;
  };

  const getBadge = (item: SocialItemData) => {
    if (lang === 'zh') return item.badgeZh;
    if (lang === 'ar') return item.badgeAr;
    if (lang === 'ckb') return item.badgeCkb;
    return item.badge;
  };

  return (
    <div id="footer-social-showcase" className="w-full space-y-4 pt-6 border-t border-brand-800/10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-brand-800 flex items-center gap-2">
            <Radio size={16} className="text-brand-800 animate-pulse" />
            {lang === 'zh' ? '官方全媒体发布与社群渠道 (8大平台)' : 
             lang === 'ar' ? 'الشبكات والمنصات الرقمية الرسمية (٨ قنوات)' : 
             lang === 'ckb' ? 'کەناڵ و تۆڕە کۆمەڵایەتییە فەرمییەکان (٨ کەناڵ)' : 
             'Official Global Social & Broadcast Networks (8 Platforms)'}
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            {lang === 'zh' ? '通过官方认证社媒第一时间获取中伊双边经贸、基建与主权研究快讯' : 
             lang === 'ar' ? 'تغطيات حية وشبكات تواصل ثنائية مباشرة لقطاع الأعمال والاستثمار' : 
             lang === 'ckb' ? 'هەواڵ و زانیاری ڕاستەوخۆی پڕۆژە هاوبەشەکان لە ڕێگەی تۆڕە فەرمییەکانەوە' : 
             'Connect with verified correspondents, B2B networks, and live dispatch feeds across all major platforms.'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-3 py-1 rounded-full text-xs font-bold uppercase text-brand-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>8 Live Nodes</span>
        </div>
      </div>

      {/* 8-Grid responsive layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {SOCIAL_PLATFORMS.map((item, index) => {
          const isModal = item.isModal;
          const isLive = index === liveIndex;

          const getLangAbbr = (k: SocialPlatformKey) => {
            if (k === 'facebookAr' || k === 'telegramAr' || k === 'youtubeAr' || k === 'xAr') return 'AR';
            if (k === 'facebookZh' || k === 'telegramZh' || k === 'youtubeZh' || k === 'xZh') return 'ZH';
            if (k === 'facebookCkb' || k === 'telegramCkb' || k === 'youtubeCkb' || k === 'xCkb') return 'CKB';
            if (k === 'facebook' || k === 'telegram' || k === 'youtube' || k === 'x') return 'EN';
            if (k === 'whatsapp') return 'INT';
            if (k === 'instagram') return 'INT';
            if (k === 'linkedin') return 'B2B';
            if (k === 'weibo') return 'CN';
            if (k === 'wechat') return 'CN';
            return '';
          };

          const CardContent = (
            <div className="relative group/card h-full">
              {/* Red blurry glass effect under the white background */}
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand-600/30 via-brand-500/15 to-transparent rounded-2xl blur-md opacity-80 group-hover/card:opacity-100 transition-all duration-300 pointer-events-none"></div>

              <div className="relative flex flex-col items-center text-center p-2 rounded-2xl bg-white/95 dark:bg-neutral-900/95 border border-white/80 dark:border-neutral-700/60 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_rgba(204,0,0,0.12)] transition-all duration-300 group hover:-translate-y-0.5 h-full justify-between">
                <div className="flex flex-col items-center w-full">
                  <div className="relative mb-1">
                    <div 
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs backdrop-blur-md ${item.bgClass}`}
                      style={{ border: `1px solid ${item.colorHex}40` }}
                    >
                      <PlatformIcon platform={item.key} size={16} className={item.textClass} />
                    </div>
                    {isLive ? (
                      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-600 text-[6px] text-white font-black items-center justify-center">LIVE</span>
                      </span>
                    ) : (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-pulse"></span>
                      </span>
                    )}
                  </div>
                  <div className="font-sans font-bold text-[11px] text-brand-900 dark:text-neutral-100 line-clamp-1 group-hover:text-brand-800 transition-colors tracking-tight">
                    {item.name.replace(/ \([A-Z]+\)/, '')}
                  </div>
                  <div className="mt-0.5">
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-brand-50 dark:bg-brand-950/50 text-brand-700 dark:text-brand-300 border border-brand-200/50">
                      {getLangAbbr(item.key)}
                    </span>
                  </div>
                </div>
                <div className="mt-1.5 w-full">
                  <span className={`inline-block w-full py-0.5 px-1 rounded-md text-[8px] font-bold font-sans tracking-wider uppercase transition-all duration-300 border shadow-2xs ${
                    isLive 
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border-brand-200 dark:border-brand-800 animate-pulse' 
                      : 'bg-brand-50/70 dark:bg-brand-950/50 text-brand-800 dark:text-brand-300 group-hover:bg-brand-800 group-hover:text-white border-brand-200/50 dark:border-brand-800/50'
                  }`}>
                    {isLive ? (lang === 'zh' ? '直播' : lang === 'ar' ? 'بث' : lang === 'ckb' ? 'پەخش' : 'Live') : getLangAbbr(item.key)}
                  </span>
                </div>
              </div>
            </div>
          );

          if (isModal) {
            return (
              <button
                key={item.key}
                id={`footer-social-btn-${item.key}`}
                onClick={() => setActiveWechat(true)}
                className="text-start block h-full cursor-pointer focus:outline-none"
              >
                {CardContent}
              </button>
            );
          }

          return (
            <a
              key={item.key}
              id={`footer-social-link-${item.key}`}
              href={getUrl(item.key)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-start block h-full focus:outline-none"
            >
              {CardContent}
            </a>
          );
        })}
      </div>

      <WeChatModal 
        isOpen={activeWechat} 
        onClose={() => setActiveWechat(false)} 
        lang={lang} 
      />
    </div>
  );
}

// 3. Floating Speed Dial / Quick Dock (Pinned to the edge with expand/collapse)
export function FloatingSocialDock({ lang }: { lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWechat, setActiveWechat] = useState(false);
  const socialLinks = useSiteStore(state => state.socialLinks || {
    whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
    facebook: 'https://facebook.com/IraqiChineseAgency.EN',
    facebookAr: 'https://facebook.com/IraqiChineseAgency.AR',
    facebookZh: 'https://facebook.com/IraqiChineseAgency.ZH',
    facebookCkb: 'https://facebook.com/IraqiChineseAgency.CKB',
    telegram: 'https://t.me/IraqiChineseAgency',
    instagram: 'https://instagram.com/iraqi-chineseagency',
    linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
    weibo: 'https://weibo.com/iraqi-chineseagency',
    wechat: 'IraqiChineseAgency_Official',
    youtube: 'https://youtube.com/@IraqiChineseAgency',
    x: 'https://x.com/IraqiChineseAgency',
  });

  const getUrl = (key: SocialPlatformKey) => {
    if (key === 'facebook') {
      if (lang === 'ar') return socialLinks.facebookAr || socialLinks.facebook;
      if (lang === 'zh') return socialLinks.facebookZh || socialLinks.facebook;
      if (lang === 'ckb') return socialLinks.facebookCkb || socialLinks.facebook;
    }
    return (socialLinks as any)?.[key] || '#';
  };

  return (
    <>
      <div 
        id="floating-social-dock" 
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 print:hidden"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-800 flex flex-col gap-2 max-w-xs text-start mb-1"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-brand-800 border-b border-gray-100 dark:border-neutral-800 pb-1.5 px-1 flex items-center justify-between">
                <span>{lang === 'zh' ? '官方社交平台 (8)' : lang === 'ar' ? 'القنوات الرسمية (٨)' : 'Official Social Hub'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {SOCIAL_PLATFORMS.map((item) => {
                  if (item.isModal) {
                    return (
                      <button
                        key={item.key}
                        id={`floating-social-${item.key}`}
                        onClick={() => {
                          setActiveWechat(true);
                          setIsOpen(false);
                        }}
                        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center p-1 border border-gray-200 dark:border-neutral-800 transition-all ${item.hoverBgClass} shadow-2xs`}
                        title={`${item.name} - ${item.badge}`}
                      >
                        <PlatformIcon platform={item.key} size={17} />
                        <span className="text-[8px] font-bold mt-0.5 truncate w-full text-center">{item.name.split(' ')[0]}</span>
                      </button>
                    );
                  }

                  return (
                    <a
                      key={item.key}
                      id={`floating-social-${item.key}`}
                      href={getUrl(item.key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center p-1 border border-gray-200 dark:border-neutral-800 transition-all ${item.hoverBgClass} shadow-2xs`}
                      title={`${item.name} - ${item.badge}`}
                    >
                      <PlatformIcon platform={item.key} size={17} />
                      <span className="text-[8px] font-bold mt-0.5 truncate w-full text-center">{item.name.split(' ')[0]}</span>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Floating Action Button */}
        <button
          id="toggle-floating-social-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border-2 cursor-pointer ${
            isOpen 
              ? 'bg-brand-800 text-white border-white rotate-90' 
              : 'bg-brand-800 hover:bg-brand-700 text-white border-white/20 hover:scale-105 animate-bounce-subtle'
          }`}
          title="Connect with our Social Media Channels"
          aria-label="Toggle Social Media Hub"
        >
          {isOpen ? <CloseIcon size={20} /> : <Share2 size={22} />}
        </button>
      </div>

      <WeChatModal 
        isOpen={activeWechat} 
        onClose={() => setActiveWechat(false)} 
        lang={lang} 
      />
    </>
  );
}

// 4. Interactive Article Sharing & Social Connect Bar (for Article Detail pages)
export function ArticleSocialBar({ 
  articleTitle, 
  articleUrl, 
  lang 
}: { 
  articleTitle: string; 
  articleUrl: string; 
  lang: Locale; 
}) {
  const [copied, setCopied] = useState(false);
  const [activeWechat, setActiveWechat] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTargets = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={16} />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(articleTitle + ' ' + articleUrl)}`,
      color: 'hover:bg-[#25D366] hover:text-white',
      border: 'border-emerald-200'
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter size={16} />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`,
      color: 'hover:bg-black hover:text-white',
      border: 'border-neutral-300'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={16} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      color: 'hover:bg-[#0A66C2] hover:text-white',
      border: 'border-sky-200'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
      border: 'border-blue-200'
    },
    {
      name: 'Weibo',
      icon: <Globe size={16} />,
      href: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`,
      color: 'hover:bg-brand-800 hover:text-white',
      border: 'border-brand-200'
    },
    {
      name: 'WeChat',
      icon: <QrCode size={16} />,
      onClick: () => setActiveWechat(true),
      color: 'hover:bg-[#07C160] hover:text-white',
      border: 'border-emerald-200'
    }
  ];

  return (
    <div id="article-social-share-hub" className="flex flex-wrap items-center gap-2 py-3 px-4 bg-gray-50/80 rounded-xl border border-gray-200 dark:border-neutral-800">
      <span className="text-[11px] font-bold uppercase text-gray-500 flex items-center gap-1.5 me-1">
        <Share2 size={14} className="text-brand-800" />
        {lang === 'zh' ? '分享与传播:' : lang === 'ar' ? 'مشاركة الخبر:' : lang === 'ckb' ? 'بەشکردن:' : 'Share:'}
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        {shareTargets.map((item) => {
          if (item.onClick) {
            return (
              <button
                key={item.name}
                id={`article-share-${item.name.toLowerCase()}`}
                onClick={item.onClick}
                className={`h-8 px-2.5 rounded-lg border bg-white text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${item.color} ${item.border}`}
                title={`Share via ${item.name}`}
              >
                {item.icon}
                <span className="text-xs hidden sm:inline">{item.name}</span>
              </button>
            );
          }

          return (
            <a
              key={item.name}
              id={`article-share-${item.name.toLowerCase()}`}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`h-8 px-2.5 rounded-lg border bg-white text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${item.color} ${item.border}`}
              title={`Share via ${item.name}`}
            >
              {item.icon}
              <span className="text-xs hidden sm:inline">{item.name}</span>
            </a>
          );
        })}

        {/* Copy Direct Link button */}
        <button
          id="article-copy-direct-link"
          onClick={handleCopyLink}
          className="h-8 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          title="Copy direct article URL"
        >
          {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
          <span className="text-xs">
            {copied ? (lang === 'zh' ? '已复制' : lang === 'ar' ? 'تم النسخ' : 'Copied!') : (lang === 'zh' ? '复制链接' : lang === 'ar' ? 'نسخ الرابط' : 'Copy Link')}
          </span>
        </button>
      </div>

      <WeChatModal 
        isOpen={activeWechat} 
        onClose={() => setActiveWechat(false)} 
        lang={lang} 
      />
    </div>
  );
}
