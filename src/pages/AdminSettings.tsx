import { useState } from 'react';
import { 
  Settings, 
  Save, 
  Database, 
  Shield, 
  Globe, 
  Wifi, 
  Palette, 
  Share2, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube, 
  QrCode,
  Send
} from 'lucide-react';
import { useSiteStore } from '../store/useSiteStore';

export function AdminSettings() {
  const siteSettings = useSiteStore();
  const [settings, setSettings] = useState({
    siteName: siteSettings.siteName,
    contactEmail: siteSettings.contactEmail,
    cachingEnabled: siteSettings.cachingEnabled,
    autoTranslate: siteSettings.autoTranslate,
    geoLatencyRoute: siteSettings.geoLatencyRoute,
    systemMaintenance: siteSettings.systemMaintenance,
    brandColor: siteSettings.brandColor || '#cc0000',
    inkColor: siteSettings.inkColor || '#1A1A1A',
    paperColor: siteSettings.paperColor || '#FAFAFA',
    socialLinks: siteSettings.socialLinks || {
      whatsapp: 'https://chat.whatsapp.com/IraqiChineseAgencyOfficial',
      facebook: 'https://facebook.com/IraqiChineseAgency.EN',
      facebookAr: 'https://facebook.com/IraqiChineseAgency.AR',
      facebookZh: 'https://facebook.com/IraqiChineseAgency.ZH',
      facebookCkb: 'https://facebook.com/IraqiChineseAgency.CKB',
      telegram: 'https://t.me/IraqiChineseAgency.EN',
      telegramAr: 'https://t.me/IraqiChineseAgency.AR',
      telegramZh: 'https://t.me/IraqiChineseAgency.ZH',
      telegramCkb: 'https://t.me/IraqiChineseAgency.CKB',
      instagram: 'https://instagram.com/iraqi-chineseagency',
      linkedin: 'https://linkedin.com/company/iraqi-chinese-agency',
      weibo: 'https://weibo.com/iraqi-chineseagency',
      wechat: 'IraqiChineseAgency_Official',
      youtube: 'https://youtube.com/@IraqiChineseAgency.EN',
      youtubeAr: 'https://youtube.com/@IraqiChineseAgency.AR',
      youtubeZh: 'https://youtube.com/@IraqiChineseAgency.ZH',
      youtubeCkb: 'https://youtube.com/@IraqiChineseAgency.CKB',
      x: 'https://x.com/IraqiChineseAgency.EN',
      xAr: 'https://x.com/IraqiChineseAgency.AR',
      xZh: 'https://x.com/IraqiChineseAgency.ZH',
      xCkb: 'https://x.com/IraqiChineseAgency.CKB',
    }
  });

  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    siteSettings.updateSettings(settings);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <>
      <div className="space-y-6 text-start max-w-4xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">System Settings</h1>
            <p className="text-sm text-gray-500">Configure core infrastructure, caching priorities, and global latency parameters.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Metadata Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Settings size={18} className="text-brand-800" />
              General Editorial Config
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Global Station Brand Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Editorial Desk Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                />
              </div>
            </div>
          </div>

          
          {/* Brand Identity & Colors */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Palette size={18} className="text-brand-800" />
              Brand Identity & Colors
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Primary Brand (Accents)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.brandColor}
                    onChange={(e) => setSettings({ ...settings, brandColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.brandColor}
                    onChange={(e) => setSettings({ ...settings, brandColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ink Color (Text)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.inkColor}
                    onChange={(e) => setSettings({ ...settings, inkColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.inkColor}
                    onChange={(e) => setSettings({ ...settings, inkColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium uppercase"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Paper Color (Background)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.paperColor}
                    onChange={(e) => setSettings({ ...settings, paperColor: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <input
                    type="text"
                    value={settings.paperColor}
                    onChange={(e) => setSettings({ ...settings, paperColor: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium uppercase"
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Color changes will propagate instantly to all clients connected to the platform.
            </p>
          </div>

          {/* Social Media Channels Config */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Share2 size={18} className="text-brand-800" />
              Official Social Media & Broadcast Channels (8 Networks)
            </h3>
            
            <p className="text-xs text-gray-500">
              Configure the destination URLs, broadcast handles, and public endpoints for official social media integrations across the portal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WhatsApp */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <MessageCircle size={14} className="text-emerald-500" />
                  WhatsApp Community / Channel URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.whatsapp}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, whatsapp: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://chat.whatsapp.com/..."
                />
              </div>

              {/* Facebook (English / Global) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Facebook size={14} className="text-blue-600" />
                  Facebook Page URL (English / Global)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.facebook}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://facebook.com/IraqiChineseAgency.EN"
                />
              </div>

              {/* Facebook (Arabic Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Facebook size={14} className="text-blue-600" />
                  Facebook Page (Arabic Broadcast / القسم العربي)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.facebookAr}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebookAr: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://facebook.com/IraqiChineseAgency.AR"
                />
              </div>

              {/* Facebook (Chinese Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Facebook size={14} className="text-blue-600" />
                  Facebook Page (Chinese Broadcast / 中文频道)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.facebookZh}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebookZh: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://facebook.com/IraqiChineseAgency.ZH"
                />
              </div>

              {/* Facebook (Kurdish Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Facebook size={14} className="text-blue-600" />
                  Facebook Page (Kurdish Broadcast / بەشی کوردی)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.facebookCkb}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebookCkb: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://facebook.com/IraqiChineseAgency.CKB"
                />
              </div>

              {/* Telegram (English / Global) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Send size={14} className="text-sky-500" />
                  Telegram Channel URL (English / Global)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.telegram}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, telegram: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://t.me/IraqiChineseAgency.EN"
                />
              </div>

              {/* Telegram (Arabic Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Send size={14} className="text-sky-500" />
                  Telegram Channel (Arabic Broadcast / القسم العربي)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.telegramAr}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, telegramAr: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://t.me/IraqiChineseAgency.AR"
                />
              </div>

              {/* Telegram (Chinese Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Send size={14} className="text-sky-500" />
                  Telegram Channel (Chinese Broadcast / 中文频道)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.telegramZh}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, telegramZh: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://t.me/IraqiChineseAgency.ZH"
                />
              </div>

              {/* Telegram (Kurdish Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Send size={14} className="text-sky-500" />
                  Telegram Channel (Kurdish Broadcast / بەشی کوردی)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.telegramCkb}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, telegramCkb: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://t.me/IraqiChineseAgency.CKB"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Instagram size={14} className="text-pink-600" />
                  Instagram Profile URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://instagram.com/iraqi-chineseagency"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Linkedin size={14} className="text-sky-600" />
                  LinkedIn Syndicate / Company Page
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://linkedin.com/company/iraqi-chinese-agency"
                />
              </div>

              {/* Weibo */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Globe size={14} className="text-brand-600" />
                  Sina Weibo (新浪微博) Profile URL
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.weibo}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, weibo: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://weibo.com/iraqi-chineseagency"
                />
              </div>

              {/* WeChat */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <QrCode size={14} className="text-emerald-600" />
                  WeChat Official ID / Account (微信公众号)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.wechat}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, wechat: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="IraqiChineseAgency_Official"
                />
              </div>

              {/* YouTube (English / Global) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Youtube size={14} className="text-brand-600" />
                  YouTube Channel URL (English / Global)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.youtube}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtube: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://youtube.com/@IraqiChineseAgency.EN"
                />
              </div>

              {/* YouTube (Arabic Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Youtube size={14} className="text-brand-600" />
                  YouTube Channel (Arabic Broadcast / القسم العربي)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.youtubeAr}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtubeAr: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://youtube.com/@IraqiChineseAgency.AR"
                />
              </div>

              {/* YouTube (Chinese Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Youtube size={14} className="text-brand-600" />
                  YouTube Channel (Chinese Broadcast / 中文频道)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.youtubeZh}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtubeZh: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://youtube.com/@IraqiChineseAgency.ZH"
                />
              </div>

              {/* YouTube (Kurdish Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Youtube size={14} className="text-brand-600" />
                  YouTube Channel (Kurdish Broadcast / بەشی کوردی)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.youtubeCkb}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, youtubeCkb: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://youtube.com/@IraqiChineseAgency.CKB"
                />
              </div>

              {/* X (Twitter) (English / Global) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Twitter size={14} className="text-neutral-900" />
                  X (Twitter) Profile URL (English / Global)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.x}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, x: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://x.com/IraqiChineseAgency.EN"
                />
              </div>

              {/* X (Twitter) (Arabic Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Twitter size={14} className="text-neutral-900" />
                  X (Twitter) (Arabic Broadcast / القسم العربي)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.xAr}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, xAr: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://x.com/IraqiChineseAgency.AR"
                />
              </div>

              {/* X (Twitter) (Chinese Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Twitter size={14} className="text-neutral-900" />
                  X (Twitter) (Chinese Broadcast / 中文频道)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.xZh}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, xZh: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://x.com/IraqiChineseAgency.ZH"
                />
              </div>

              {/* X (Twitter) (Kurdish Broadcast) */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase text-gray-700 mb-1">
                  <Twitter size={14} className="text-neutral-900" />
                  X (Twitter) (Kurdish Broadcast / بەشی کوردی)
                </label>
                <input
                  type="text"
                  value={settings.socialLinks.xCkb}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, xCkb: e.target.value }
                  })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 outline-none text-sm font-medium"
                  placeholder="https://x.com/IraqiChineseAgency.CKB"
                />
              </div>
            </div>
          </div>

          {/* Infrastructure & Regional Routing Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Database size={18} className="text-brand-800" />
              Infrastructure & Regional Replication
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">High-Speed Edge Routing Path</label>
                <select
                  value={settings.geoLatencyRoute}
                  onChange={(e) => setSettings({ ...settings, geoLatencyRoute: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-brand-800 bg-white outline-none text-sm"
                >
                  <option value="baghdad-beijing">Baghdad Hub ⇆ Beijing Core (Direct regional transit via Silk Road fiber)</option>
                  <option value="sulaymaniyah-beijing">Sulaymaniyah Hub ⇆ Beijing Core (Optimized for North Iraq and Kurdistan regional coverage)</option>
                  <option value="baghdad-sulaymaniyah">Baghdad Hub ⇆ Sulaymaniyah Hub (Local national caching ring)</option>
                </select>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Wifi size={12} className="text-brand-800" />
                  Average latency on direct regional fiber is currently rated at 42ms.
                </p>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.cachingEnabled}
                    onChange={(e) => setSettings({ ...settings, cachingEnabled: e.target.checked })}
                    className="mt-1 accent-brand-800"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Distributed CDN Edge Caching</span>
                    <span className="block text-xs text-gray-500">Accelerates asset delivery across Middle East and China.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoTranslate}
                    onChange={(e) => setSettings({ ...settings, autoTranslate: e.target.checked })}
                    className="mt-1 accent-brand-800"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Auto-Translation Assistance</span>
                    <span className="block text-xs text-gray-500">Enable automated translation triggers for headlines.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Security & Maintenance */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3">
              <Shield size={18} className="text-brand-800" />
              System State Controls
            </h3>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.systemMaintenance}
                onChange={(e) => setSettings({ ...settings, systemMaintenance: e.target.checked })}
                className="mt-1 accent-brand-800"
              />
              <div>
                <span className="block text-sm font-bold text-gray-900 text-brand-600">Enterprise Read-Only Lockdown</span>
                <span className="block text-xs text-gray-500">Temporarily suspend publishing capabilities while system upgrades run in regional centers.</span>
              </div>
            </label>
          </div>

          {/* Saved notification message and Save Button */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-800 text-white font-bold uppercase tracking-wider text-sm rounded shadow-sm hover:bg-brand-800 transition-colors"
            >
              <Save size={16} /> Save Settings
            </button>
            {savedStatus && (
              <span className="text-sm text-green-600 font-bold bg-green-50 px-3 py-1 rounded border border-green-200 animate-pulse">
                ✓ System configurations successfully applied across nodes
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
