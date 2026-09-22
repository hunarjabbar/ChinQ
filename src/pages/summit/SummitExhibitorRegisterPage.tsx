import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Locale } from '../../types';
import { SummitLayout } from '../../components/summit/SummitLayout';
import { SECTOR_PAVILIONS } from '../../data/summitData';
import { 
  Building2, CheckCircle2, ShieldCheck, 
  ArrowRight, FileText, Globe, CreditCard, Sparkles 
} from 'lucide-react';

export function SummitExhibitorRegisterPage() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const isRtl = lang === 'ar' || lang === 'ckb';
  const [searchParams] = useSearchParams();

  const initialBooth = searchParams.get('booth') || 'A-108';
  const initialSector = searchParams.get('sector') || 'industrial-machinery';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: 'China',
    sector: initialSector,
    boothId: initialBooth,
    boothSize: '18 m²',
    needClearingSupport: true,
    needSinosureUnderwriting: true,
    needVisaAssistance: true,
    needBilingualTranslator: false,
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <SummitLayout lang={lang} activeNav="floorplan">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-12 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 text-center">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-100 dark:bg-brand-950 text-brand-900 dark:text-brand-300 inline-block">
            Official Exhibitor Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {lang === 'ar' ? 'طلب حجز جناح في المعرض الثنائي' : lang === 'zh' ? '中伊双边博览会参展申请表' : lang === 'ckb' ? 'فۆرمی داواکاری حجزکردنی شوێن' : 'Exhibitor Booth Application & Contract'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'يرجى تعبئة بيانات الشركة والجناح المطلوب. سيقوم فريق الأمانة العامة بمراجعة الطلب وإرسال العقد الرسمي وفاتورة التأكيد خلال ٢٤ ساعة.'
              : 'Complete your enterprise details to reserve your pavilion space. The Summit Secretariat and ICA Trade Services Desk will verify and issue your provisional confirmation within 24 hours.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-800 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
                {lang === 'ar' ? 'تم استلام طلب الحجز بنجاح!' : lang === 'zh' ? '参展申请已成功提交！' : lang === 'ckb' ? 'داواکارییەکەت بە سەرکەوتوویی نێردرا!' : 'Booth Application Submitted Successfully!'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
                Reference ID: <strong className="text-brand-800">EXPO-2026-{Math.floor(10000 + Math.random() * 90000)}</strong>. Our team in Sulaymaniyah & Beijing will contact <strong>{formData.email}</strong> shortly.
              </p>
            </div>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to={`/${lang}/summit`}
                className="px-6 py-2.5 rounded-xl bg-brand-800 text-white text-xs font-bold hover:bg-brand-900 transition-colors"
              >
                Return to Summit Overview
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 rounded-3xl p-8 sm:p-10 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">
            
            {/* Enterprise Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                1. Enterprise & Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Company Name (Bilingual / English)</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Zhejiang Heavy Industries Co., Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Country / Region of Origin</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  >
                    <option value="China">People's Republic of China</option>
                    <option value="Iraq">Republic of Iraq</option>
                    <option value="KRI">Kurdistan Region of Iraq</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Primary Contact Person</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Full Name & Job Title"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Official Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="director@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">WhatsApp / WeChat / Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+86 138 0000 0000 / +964 770 000 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>
            </div>

            {/* Sector and Booth Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                2. Sector & Space Requirements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Industry Sector Pavilion</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  >
                    {SECTOR_PAVILIONS.map(s => (
                      <option key={s.id} value={s.slug}>{s.name[lang]}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300">Requested Booth ID</label>
                  <input
                    type="text"
                    value={formData.boothId}
                    onChange={(e) => setFormData({ ...formData, boothId: e.target.value })}
                    placeholder="e.g. A-108"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-brand-800"
                  />
                </div>
              </div>
            </div>

            {/* ICA Value-Added Services */}
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                3. Integrated ICA Services & Logistics Facilitation
              </h3>
              <div className="space-y-2.5 text-xs">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needClearingSupport}
                    onChange={(e) => setFormData({ ...formData, needClearingSupport: e.target.checked })}
                    className="rounded text-brand-800 focus:ring-brand-800"
                  />
                  <span><strong>IQD/CNY Direct Settlement:</strong> Assist with dual-currency invoicing and trade bank clearing.</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needSinosureUnderwriting}
                    onChange={(e) => setFormData({ ...formData, needSinosureUnderwriting: e.target.checked })}
                    className="rounded text-brand-800 focus:ring-brand-800"
                  />
                  <span><strong>Sinosure Export Credit Insurance:</strong> Facilitate policy underwriting for deals signed at summit.</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needVisaAssistance}
                    onChange={(e) => setFormData({ ...formData, needVisaAssistance: e.target.checked })}
                    className="rounded text-brand-800 focus:ring-brand-800"
                  />
                  <span><strong>Official Visa & Delegation Letter:</strong> Issue expedited VIP invitation letter for Iraqi/Chinese entry.</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-800 hover:bg-brand-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Application & Hold Booth</span>
              <ArrowRight size={15} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </form>
        )}

      </div>
    </SummitLayout>
  );
}
