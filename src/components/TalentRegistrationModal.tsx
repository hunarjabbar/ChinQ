import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  GraduationCap, 
  X, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  Award, 
  QrCode, 
  ArrowRight,
  RefreshCw,
  Hash,
  MapPin,
  Clock,
  BookOpen
} from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { IcaLogo } from './IcaLogo';
import { Locale } from '../types';

export type TalentRegistrationType = 'volunteer' | 'intern';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialType?: TalentRegistrationType;
  lang: Locale;
}

interface VolunteerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  passportOrIdNumber: string;
  asaishCode: string;
  city: string;
  addressDistrict: string;
  volunteerDomain: string;
  hoursPerWeek: string;
  dateOfBirth: string;
  emergencyContact: string;
  bio: string;
}

interface InternFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationality: string;
  passportOrIdNumber: string;
  asaishCode: string;
  city: string;
  addressDistrict?: string;
  university: string;
  academicMajor: string;
  internshipTrack: string;
  internshipDuration: string;
  dateOfBirth: string;
  emergencyContact: string;
  bio: string;
}

export function TalentRegistrationModal({ isOpen, onClose, initialType = 'volunteer', lang }: Props) {
  const [type, setType] = useState<TalentRegistrationType>(initialType);
  const [uniqueCode, setUniqueCode] = useState<string>('');
  const [centralHash, setCentralHash] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const isAr = lang === 'ar';
  const isZh = lang === 'zh';
  const isCkb = lang === 'ckb';
  const isRtl = isAr || isCkb;

  // Generate unique synchronized codes whenever type changes or modal opens
  const generateNewCodes = (selectedType: TalentRegistrationType) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const prefix = selectedType === 'volunteer' ? 'ICA-VOL-2026' : 'ICA-INT-2026';
    const code = `${prefix}-${randomNum}`;
    const hashHex = Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    const hash = `CQ-${selectedType.toUpperCase().substring(0, 3)}-${randomNum.toString().substring(0, 4)}-${hashHex}`;
    
    setUniqueCode(code);
    setCentralHash(hash);
  };

  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      generateNewCodes(initialType);
      setIsSuccess(false);
      setSubmittedData(null);
    }
  }, [isOpen, initialType]);

  const handleTypeSwitch = (newType: TalentRegistrationType) => {
    setType(newType);
    generateNewCodes(newType);
    setIsSuccess(false);
  };

  // Volunteer state
  const [volunteerForm, setVolunteerForm] = useState<VolunteerFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationality: 'Iraqi',
    passportOrIdNumber: '',
    asaishCode: '',
    city: 'Baghdad',
    addressDistrict: '',
    volunteerDomain: 'Cultural & Youth Exchange',
    hoursPerWeek: 'Part-time (5-10 hrs/week)',
    dateOfBirth: '',
    emergencyContact: '',
    bio: ''
  });

  // Intern state
  const [internForm, setInternForm] = useState<InternFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    nationality: 'Iraqi',
    passportOrIdNumber: '',
    asaishCode: '',
    city: 'Baghdad',
    university: 'University of Baghdad',
    academicMajor: 'International Relations & Diplomacy',
    internshipTrack: 'Diplomatic Journalism & Newsroom Desk',
    internshipDuration: '3 Months Semester Residency',
    dateOfBirth: '',
    emergencyContact: '',
    bio: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const activeForm = type === 'volunteer' ? volunteerForm : internForm;

    if (!activeForm.fullName.trim()) errs.fullName = isAr ? 'الاسم مطلوب' : isZh ? '请填写姓名' : 'Full legal name is required';
    if (!activeForm.email.trim()) {
      errs.email = isAr ? 'البريد الإلكتروني مطلوب' : isZh ? '请填写邮箱' : 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(activeForm.email)) {
      errs.email = isAr ? 'صيغة البريد غير صحيحة' : isZh ? '邮箱格式无效' : 'Valid email is required';
    }
    if (!activeForm.phoneNumber.trim()) errs.phoneNumber = isAr ? 'رقم الهاتف مطلوب' : isZh ? '请填写电话' : 'Phone number is required';
    if (!activeForm.passportOrIdNumber.trim()) errs.passportOrIdNumber = isAr ? 'رقم الهوية أو الجواز مطلوب' : isZh ? '请填写证件号码' : 'National ID or Passport number is required';
    if (!activeForm.bio.trim()) errs.bio = isAr ? 'يرجى كتابة نبذة مختصرة' : isZh ? '请填写自述说明' : 'Brief statement of purpose is required';

    if (type === 'intern') {
      if (!internForm.university.trim()) errs.university = isAr ? 'اسم الجامعة مطلوب' : isZh ? '请填写院校' : 'University is required';
      if (!internForm.academicMajor.trim()) errs.academicMajor = isAr ? 'التخصص مطلوب' : isZh ? '请填写专业' : 'Academic major is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const activeForm = type === 'volunteer' ? volunteerForm : internForm;
      const bureauName = type === 'volunteer' 
        ? `Volunteer Corps • ${volunteerForm.volunteerDomain}`
        : `Academic Residency • ${internForm.internshipTrack}`;

      const companyName = type === 'volunteer' 
        ? `Accredited Volunteer (${volunteerForm.hoursPerWeek})` 
        : `${internForm.university} • ${internForm.academicMajor}`;

      const payload = {
        fullName: activeForm.fullName,
        email: activeForm.email,
        company: companyName,
        role: type, // 'volunteer' or 'intern'
        bio: activeForm.bio,
        hash: uniqueCode,
        bureau: bureauName,
        nationality: activeForm.nationality,
        passportOrIdNumber: activeForm.passportOrIdNumber,
        asaishCode: activeForm.asaishCode.trim() ? activeForm.asaishCode.trim() : null,
        addressDistrictName: `${activeForm.city}${activeForm.addressDistrict ? ` - ${activeForm.addressDistrict}` : ''}`,
        phoneNumber: activeForm.phoneNumber,
        dateOfBirth: activeForm.dateOfBirth,
        emergencyContact: activeForm.emergencyContact,
        fileUrl: null
      };

      const res = await fetch('/api/public/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to synchronize registration with central database');
      }

      const resultData = await res.json();
      setSubmittedData({
        ...payload,
        type,
        uniqueCode,
        centralHash,
        registeredAt: new Date().toISOString(),
        id: resultData?.id || uniqueCode,
        volunteerDomain: type === 'volunteer' ? volunteerForm.volunteerDomain : undefined,
        hoursPerWeek: type === 'volunteer' ? volunteerForm.hoursPerWeek : undefined,
        university: type === 'intern' ? internForm.university : undefined,
        academicMajor: type === 'intern' ? internForm.academicMajor : undefined,
        internshipTrack: type === 'intern' ? internForm.internshipTrack : undefined,
        internshipDuration: type === 'intern' ? internForm.internshipDuration : undefined
      });

      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error occurred while submitting registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!pdfTemplateRef.current) return;
    setIsDownloading(true);
    try {
      const element = pdfTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024,
        onclone: (clonedDoc: Document) => {
          const clonedTarget = clonedDoc.querySelector('[data-pdf-template="true"]') as HTMLElement;
          if (clonedTarget) {
            clonedTarget.style.backgroundColor = '#ffffff';
            clonedTarget.style.color = '#111827';
          }
        }
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, Math.min(imgHeight, pageHeight));
      pdf.save(`${uniqueCode}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF document:', error);
      // Fallback to print dialog if canvas generation faces environment restrictions
      if (window.confirm('PDF direct generation encountered an issue. Would you like to open the Print Dialog to save as PDF?')) {
        window.print();
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadBadgePng = async () => {
    if (!pdfTemplateRef.current) return;
    try {
      const element = pdfTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 1024,
        onclone: (clonedDoc: Document) => {
          const clonedTarget = clonedDoc.querySelector('[data-pdf-template="true"]') as HTMLElement;
          if (clonedTarget) {
            clonedTarget.style.backgroundColor = '#ffffff';
            clonedTarget.style.color = '#111827';
          }
        }
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${uniqueCode}-BADGE.png`;
      a.click();
    } catch (err) {
      console.error('PNG export failed', err);
      alert('Could not export PNG image.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className="relative bg-white dark:bg-neutral-900 border-2 border-brand-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
      >
        {/* Top Sovereign Control Bar */}
        <div className="bg-brand-800 text-white px-5 sm:px-8 py-3.5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center font-bold">
              {type === 'volunteer' ? <HeartHandshake size={18} /> : <GraduationCap size={18} />}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-serif font-black uppercase tracking-wider text-white">
                {type === 'volunteer' 
                  ? (isAr ? 'استمارة تسجيل المتطوعين المعتمدة' : isZh ? '伊中通讯社官方志愿服务注册中心' : isCkb ? 'فۆڕمی فەرمی تۆماری خۆبەخشان' : 'Official Volunteer Registration Portal')
                  : (isAr ? 'استمارة تعيين وتوثيق التدريب المهني والبحثي' : isZh ? '伊中通讯社学术实习与智库调研录用通道' : isCkb ? 'فۆڕمی فەرمی تۆماری ڕاهێنانی ئەکادیمی' : 'Accredited Internship & Research Residency')
                }
              </div>
              <div className="text-[10px] font-mono text-white/80 uppercase tracking-widest flex items-center gap-2">
                <span>REF: {uniqueCode}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-white/90 font-bold">SYNCHRONIZED WITH CENTRAL ADMINISTRATION PORTAL</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSuccess && (
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                title="Print Document"
              >
                <Printer size={14} />
                <span>{isAr ? 'طباعة' : isZh ? '打印' : 'Print'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic Mode Switcher (Pulsing Tabs) */}
        {!isSuccess && (
          <div className="bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-700 p-2 sm:p-3 flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleTypeSwitch('volunteer')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-serif text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer relative ${
                type === 'volunteer'
                  ? 'bg-brand-800 text-white shadow-md shadow-brand-800/20'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <HeartHandshake size={16} />
              <span>{isAr ? 'كن متطوعاً' : isZh ? '成为志愿者 (Volunteer)' : isCkb ? 'ببە بە خۆبەخش' : 'Become A Volunteer'}</span>
              {type === 'volunteer' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTypeSwitch('intern')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-serif text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer relative ${
                type === 'intern'
                  ? 'bg-brand-800 text-white shadow-md shadow-brand-800/20'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700'
              }`}
            >
              <GraduationCap size={16} />
              <span>{isAr ? 'التحق كمتدرب' : isZh ? '成为实习生 (Intern)' : isCkb ? 'ببە بە کارمەندی ڕاهێنان' : 'Become an Intern'}</span>
              {type === 'intern' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 bg-white dark:bg-neutral-900 text-ink-900 dark:text-neutral-100">
          {!isSuccess ? (
            /* Registration Form View */
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
              {/* Informational Banner */}
              <div className="bg-neutral-50 dark:bg-neutral-800/60 border-l-4 rtl:border-l-0 rtl:border-r-4 border-brand-800 p-4 rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-800 dark:text-brand-400" />
                  <span className="font-bold text-xs uppercase tracking-wider text-brand-800 dark:text-brand-400">
                    {type === 'volunteer'
                      ? (isAr ? 'مبادرة التطوع الثقافي والمجتمعي العراقي الصيني' : isZh ? '中伊文化交流与社会服务志愿者注册通道' : 'Sino-Iraqi Sovereign Volunteer Program')
                      : (isAr ? 'برنامج التدريب الأكاديمي والبحثي في غرف الأخبار' : isZh ? '双边经贸政策与涉外智库学术实习计划' : 'Sino-Iraqi Diplomatic & Research Internship')
                    }
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                  {type === 'volunteer'
                    ? (isAr ? 'تتيح لك العضوية كمتطوع المساهمة في الفعاليات المشتركة والترجمة الفورية والمعارض الثقافية والإعلامية بين بغداد وبكين والبصرة. يتم إصدار وثيقة رسمية مشفرة فور التسجيل.' : isZh ? '完成登记后，您将获得官方核发的带主权防伪水印的志愿人员备案表（PDF），并可在中伊双边文化周、外事经贸会议及青年公益项目中履职。' : 'Submit your volunteer dossier to join accredited cultural, translation, and media initiatives between Iraq and China. A verified registration PDF with a unique code is issued immediately.')
                    : (isAr ? 'برنامج تدريب متخصص لطلبة الجامعات والباحثين في مجالات الصحافة الدولية والتحليل الاقتصادي وترجمة السياسات، يمنحك شهادة تدريب معتمدة ورقم ملف سيادي موحد.' : isZh ? '面向高校本科及硕博研究生设立的学术研习通道，涵盖涉外新闻采编、一带一路海港经贸、多语种本地化及能源地缘研判，注册即可获取正规聘录凭证。' : 'Designed for university scholars and analysts in diplomatic reporting, macroeconomic research, and multilingual translation. Generates an accredited appointment certificate with a unique reference code.')
                  }
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-[10px] font-mono text-neutral-500">
                  <span className="bg-white dark:bg-neutral-700 px-2 py-0.5 rounded border border-neutral-200 dark:border-neutral-600 font-bold text-brand-800 dark:text-brand-400">
                    CODE: {uniqueCode}
                  </span>
                  <span>HASH: {centralHash}</span>
                </div>
              </div>

              {/* Personal Details Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-neutral-200 pb-1 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <User size={14} className="text-brand-800" />
                  <span>{isAr ? 'المعلومات الشخصية والقانونية' : isZh ? '个人与身份备案信息' : 'Personal & Identification Details'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'الاسم القانوني الكامل *' : isZh ? '法定全名 *' : 'Full Legal Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? 'الاسم كما هو مدون في الوثائق الرسمية' : isZh ? '与证件完全一致的姓名' : 'e.g. Ali Haider Al-Karradi'}
                      value={type === 'volunteer' ? volunteerForm.fullName : internForm.fullName}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, fullName: val }));
                        else setInternForm(p => ({ ...p, fullName: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                    />
                    {errors.fullName && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'البريد الإلكتروني المعتمد *' : isZh ? '正式联络电子邮箱 *' : 'Official Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. applicant@domain.org"
                      value={type === 'volunteer' ? volunteerForm.email : internForm.email}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, email: val }));
                        else setInternForm(p => ({ ...p, email: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                    />
                    {errors.email && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'رقم الهاتف المباشر / واتساب *' : isZh ? '直联电话 / WhatsApp *' : 'Direct Mobile / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+964 780 000 0000 / +86 138 0000 0000"
                      value={type === 'volunteer' ? volunteerForm.phoneNumber : internForm.phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, phoneNumber: val }));
                        else setInternForm(p => ({ ...p, phoneNumber: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                    />
                    {errors.phoneNumber && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'الجنسية *' : isZh ? '国籍 *' : 'Nationality *'}
                    </label>
                    <select
                      value={type === 'volunteer' ? volunteerForm.nationality : internForm.nationality}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, nationality: val }));
                        else setInternForm(p => ({ ...p, nationality: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                    >
                      <option value="Iraqi">Iraqi (جمهورية العراق)</option>
                      <option value="Chinese">Chinese (中华人民共和国)</option>
                      <option value="Kurdish / Iraqi">Iraqi / Kurdistan Region</option>
                      <option value="International">International Diplomatic Resident</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'رقم جواز السفر أو البطاقة الوطنية *' : isZh ? '护照号或国民身份证号码 *' : 'Passport or National ID No. *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IQ-98218721 or G58912384"
                      value={type === 'volunteer' ? volunteerForm.passportOrIdNumber : internForm.passportOrIdNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, passportOrIdNumber: val }));
                        else setInternForm(p => ({ ...p, passportOrIdNumber: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                    />
                    {errors.passportOrIdNumber && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.passportOrIdNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                      {isAr ? 'كود أسايش للتحقق (اختياري للإقليم)' : isZh ? '安全核验码（选填）' : 'Asaish Verification Code (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AS-ERB-9982"
                      value={type === 'volunteer' ? volunteerForm.asaishCode : internForm.asaishCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (type === 'volunteer') setVolunteerForm(p => ({ ...p, asaishCode: val }));
                        else setInternForm(p => ({ ...p, asaishCode: val }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                    />
                  </div>
                </div>
              </div>

              {/* Role-Specific Focus Section */}
              {type === 'volunteer' ? (
                /* Volunteer-Specific Fields */
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-neutral-200 pb-1 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                    <HeartHandshake size={14} className="text-brand-800" />
                    <span>{isAr ? 'مسار التطوع والالتزام الزمني' : isZh ? '志愿服务领域与时间承诺' : 'Volunteer Domain & Time Commitment'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'مسار التطوع المفضل *' : isZh ? '意向志愿服务方向 *' : 'Preferred Volunteer Domain *'}
                      </label>
                      <select
                        value={volunteerForm.volunteerDomain}
                        onChange={(e) => setVolunteerForm(p => ({ ...p, volunteerDomain: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      >
                        <option value="Cultural & Youth Exchange">Cultural & Youth Exchange (التبادل الثقافي والشبابي)</option>
                        <option value="Translation & Bilateral Guides">Translation & Bilateral Liaison Guides (الترجمة ومرافقة الوفود)</option>
                        <option value="Media, Photography & Audio">Media, Photography & Visual Storytelling (التصوير والإنتاج الإعلامي)</option>
                        <option value="Exhibition & Trade Forums">Exhibition, Summit & Trade Forum Logistics (تنظيم المؤتمرات والمعارض)</option>
                        <option value="Community Outreach & Social Welfare">Community Outreach & Humanitarian Initiatives (المبادرات المجتمعية)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'ساعات التطوع الأسبوعية المتاحة *' : isZh ? '每周可参与志愿服务时长 *' : 'Weekly Availability Commitment *'}
                      </label>
                      <select
                        value={volunteerForm.hoursPerWeek}
                        onChange={(e) => setVolunteerForm(p => ({ ...p, hoursPerWeek: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      >
                        <option value="Flexible (2-5 hrs/week)">Flexible (2-5 hrs/week - مرن)</option>
                        <option value="Part-time (5-10 hrs/week)">Part-time (5-10 hrs/week - جزئي)</option>
                        <option value="Dedicated (10-20 hrs/week)">Dedicated (10-20 hrs/week - مكثف)</option>
                        <option value="Summits & Seasonal Events Only">Summits & Major Bilateral Events Only (خلال القمم والفعاليات)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'مدينة الإقامة الرئيسية *' : isZh ? '主要常住城市 *' : 'Primary Residence City *'}
                      </label>
                      <select
                        value={volunteerForm.city}
                        onChange={(e) => setVolunteerForm(p => ({ ...p, city: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      >
                        <option value="Baghdad">Baghdad (بغداد)</option>
                        <option value="Beijing">Beijing (北京)</option>
                        <option value="Erbil">Erbil (أربيل / هەولێر)</option>
                        <option value="Basra">Basra (البصرة)</option>
                        <option value="Shanghai">Shanghai (上海)</option>
                        <option value="Guangzhou">Guangzhou (广州)</option>
                        <option value="Najaf">Najaf (النجف)</option>
                        <option value="Other">Other Sino-Iraqi Hub</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'الحي أو المنطقة السكنية' : isZh ? '所在街区 / 区域' : 'District or Neighborhood'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Al-Karrada or Chaoyang"
                        value={volunteerForm.addressDistrict}
                        onChange={(e) => setVolunteerForm(p => ({ ...p, addressDistrict: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Intern-Specific Fields */
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-900 dark:text-neutral-200 pb-1 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                    <GraduationCap size={14} className="text-brand-800" />
                    <span>{isAr ? 'الخلفية الأكاديمية ومسار التدريب المهني' : isZh ? '学术背景与实习研发方向' : 'Academic Credentials & Internship Track'}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'الجامعة أو المعهد الأكاديمي *' : isZh ? '就读院校 / 科研机构 *' : 'University / Academic Institution *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. University of Baghdad or Peking University"
                        value={internForm.university}
                        onChange={(e) => setInternForm(p => ({ ...p, university: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                      />
                      {errors.university && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.university}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'التخصص الأكاديمي / الدرجة العلمية *' : isZh ? '所学专业与主攻方向 *' : 'Academic Major & Degree *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. International Relations, Economics, Journalism"
                        value={internForm.academicMajor}
                        onChange={(e) => setInternForm(p => ({ ...p, academicMajor: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                      />
                      {errors.academicMajor && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.academicMajor}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'مسار التدريب المهني في الوكالة *' : isZh ? '实习采编与智库方向 *' : 'Agency Residency Track *'}
                      </label>
                      <select
                        value={internForm.internshipTrack}
                        onChange={(e) => setInternForm(p => ({ ...p, internshipTrack: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      >
                        <option value="Diplomatic Journalism & Newsroom Desk">Diplomatic Journalism & Newsroom Desk (الصحافة الدبلوماسية وغرفة الأخبار)</option>
                        <option value="Macroeconomics & Energy Research">Macroeconomics & Energy Research (أبحاث الاقتصاد الكلي والطاقة)</option>
                        <option value="Maritime Ports & Belt-Road Logistics">Maritime Ports & Belt-Road Logistics Desk (الموانئ ولوجستيات الحزام والطريق)</option>
                        <option value="Trilingual Localization (AR/ZH/CKB)">Trilingual Localization (AR / ZH / CKB - الترجمة والتعريب السياقي)</option>
                        <option value="Digital Media, AI & Data Analytics">Digital Media, AI & Data Analytics (الإعلام الرقمي والبيانات والذكاء الاصطناعي)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                        {isAr ? 'مدة الدورة التدريبية المطلوبة *' : isZh ? '意向研学周期 *' : 'Desired Residency Duration *'}
                      </label>
                      <select
                        value={internForm.internshipDuration}
                        onChange={(e) => setInternForm(p => ({ ...p, internshipDuration: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800"
                      >
                        <option value="3 Months Semester Residency">3 Months Semester Residency (فصل دراسي 3 أشهر)</option>
                        <option value="6 Months Diplomatic Cycle">6 Months Diplomatic Cycle (دورة دبلوماسية 6 أشهر)</option>
                        <option value="Summer Intensive Fellowship">Summer Intensive Fellowship (برنامج صيفي مكثف)</option>
                        <option value="Academic Year Capstone">Full Academic Year Capstone (مشروع التخرج السنوي)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Statement of Purpose */}
              <div>
                <label className="block text-xs font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                  {type === 'volunteer'
                    ? (isAr ? 'بيان الدافع والمساهمة المجتمعية *' : isZh ? '志愿服务动机与个人专长简述 *' : 'Statement of Motivation & Skills *')
                    : (isAr ? 'بيان الأهداف البحثية والدافع المهني *' : isZh ? '科研目标与职业规划述要 *' : 'Research Statement & Career Objectives *')
                  }
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={type === 'volunteer' 
                    ? (isAr ? 'اذكر خبراتك السابقة وكيف تود المساهمة في تعزيز الروابط العراقية الصينية...' : isZh ? '请简述您在中伊文化沟通、外事协助等方面的优势与参与诉求...' : 'Describe your relevant experience and how you wish to contribute to the Sino-Iraqi cultural and community corridor...')
                    : (isAr ? 'اذكر أهدافك البحثية ومجالات اهتمامك في دراسات الحزام والطريق والإعلام الدولي...' : isZh ? '请概述您在双边政策、国际传播或地缘经贸方面的研究兴趣与学术成果...' : 'Outline your academic research interests in Belt and Road, international media, and bilateral economic policy...')
                  }
                  value={type === 'volunteer' ? volunteerForm.bio : internForm.bio}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (type === 'volunteer') setVolunteerForm(p => ({ ...p, bio: val }));
                    else setInternForm(p => ({ ...p, bio: val }));
                  }}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800"
                />
                {errors.bio && <p className="text-[10px] text-brand-700 mt-1 font-bold">{errors.bio}</p>}
              </div>

              {/* Submit Button & Synchronization Assurance */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                  <ShieldCheck size={16} className="text-brand-800 dark:text-brand-400 shrink-0" />
                  <span>
                    {isAr ? 'تتم مزامنة الطلب فورياً مع لوحة تحكم الإدارة وتوليد وثيقة PDF' : isZh ? '提交后数据实时载入管理控制台，即时签发具名PDF凭据' : 'Real-time synchronization with Administration Portal & instantaneous PDF generation'}
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : isZh ? '取消' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none relative group px-6 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-serif font-black text-xs uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-brand-800/20 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {/* Pulsing indicator */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span>
                      {isSubmitting 
                        ? (isAr ? 'جارِ المزامنة والتسجيل...' : isZh ? '正在载入与签发...' : 'Synchronizing & Registering...')
                        : (type === 'volunteer' 
                            ? (isAr ? 'تأكيد التسجيل وتوليد وثيقة PDF' : isZh ? '确认登记并生成官方PDF' : 'Complete Registration & Generate PDF')
                            : (isAr ? 'تأكيد التقديم وتوليد وثيقة PDF' : isZh ? '确认报名并生成官方PDF' : 'Complete Appointment & Generate PDF')
                          )
                      }
                    </span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Official Synchronized PDF Dossier & Certificate View */
            <div className="space-y-6">
              {/* Success Notification Bar */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/40 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-black text-sm sm:text-base text-emerald-900 dark:text-emerald-300">
                      {type === 'volunteer'
                        ? (isAr ? 'تم تسجيل وتوثيق المتطوع بنجاح ومزامنته في الإدارة' : isZh ? '志愿者档案登记成功并已实时同步至后台' : 'Volunteer Registration Logged & Synchronized with Admin')
                        : (isAr ? 'تم تسجيل التدريب المهني والبحثي بنجاح ومزامنته في الإدارة' : isZh ? '实习与研学人事档案登记成功并已实时同步至后台' : 'Internship Dossier Logged & Synchronized with Admin')
                      }
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                      UNIQUE CREDENTIAL CODE: <strong className="font-bold underline">{uniqueCode}</strong> • CENTRAL HASH: {centralHash}
                    </p>
                  </div>
                </div>

                {/* Download Actions */}
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-serif font-black text-xs uppercase tracking-wider rounded-lg shadow-md shadow-brand-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    <Download size={15} />
                    <span>{isDownloading ? (isAr ? 'جارِ التحميل...' : isZh ? '正在下载...' : 'Generating PDF...') : (isAr ? 'تحميل ملف PDF الرسمي' : isZh ? '下载官方PDF凭证' : 'Download Official PDF')}</span>
                  </button>

                  <button
                    onClick={handleDownloadBadgePng}
                    className="px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Download PNG Certificate"
                  >
                    <Award size={14} />
                    <span>PNG</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs uppercase rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Print Document"
                  >
                    <Printer size={14} />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* THE OFFICIAL PRINTABLE / DOWNLOADABLE PDF TEMPLATE (Strict White & Red Palette) */}
              <div 
                ref={pdfTemplateRef}
                data-pdf-template="true"
                className="bg-white rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden print:p-4 print:border-2"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#111827', 
                  border: '4px solid #800000', 
                  fontFamily: 'Georgia, serif' 
                }}
              >
                {/* Security Background Watermark */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none rotate-[-25deg]"
                  style={{ opacity: 0.04 }}
                >
                  <div 
                    className="text-7xl sm:text-9xl font-black font-serif uppercase tracking-widest whitespace-nowrap"
                    style={{ color: '#800000' }}
                  >
                    IRAQI CHINESE AGENCY
                  </div>
                </div>

                {/* Top Border Accent Line */}
                <div 
                  className="h-1.5 rounded-full"
                  style={{ background: 'linear-gradient(to right, #800000, #dc2626, #800000)' }}
                ></div>

                {/* Official Header with existing ICA Logo & Bilateral Crests */}
                <div 
                  className="pb-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start"
                  style={{ borderBottom: '2px solid #800000' }}
                >
                  <div className="flex items-center gap-4">
                    <IcaLogo size={64} variant="mark" lang={lang} />
                    <div>
                      <div 
                        className="text-xs font-mono font-black uppercase tracking-[0.25em]"
                        style={{ color: '#800000' }}
                      >
                        {isAr ? 'الجمهورية العراقية • جمهورية الصين الشعبية' : isZh ? '伊拉克共和国 • 中华人民共和国 双边合作网络' : 'Republic of Iraq • People\'s Republic of China'}
                      </div>
                      <h2 
                        className="text-xl sm:text-2xl font-serif font-black tracking-tight"
                        style={{ color: '#111827' }}
                      >
                        {isAr ? 'الوكالة العراقية الصينية • مجمع الكفاءات والشباب' : isZh ? '伊拉克-中国通讯社 • 青年英才与志愿服务注册公署' : 'Iraqi-Chinese Agency • Talent & Youth Registry'}
                      </h2>
                      <div 
                        className="text-[10px] font-mono uppercase tracking-widest"
                        style={{ color: '#6b7280' }}
                      >
                        Central Command & Sovereign Administration Portal Accredited
                      </div>
                    </div>
                  </div>

                  <div className="text-center sm:text-end font-mono">
                    <div 
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: '#9ca3af' }}
                    >
                      Official Registration ID
                    </div>
                    <div 
                      className="text-base sm:text-lg font-black tracking-wider font-mono px-3 py-1 rounded inline-block mt-1"
                      style={{ 
                        color: '#800000', 
                        backgroundColor: '#fff5f5', 
                        border: '1px solid #fecaca' 
                      }}
                    >
                      {uniqueCode}
                    </div>
                    <div 
                      className="text-[9px] uppercase tracking-widest mt-1"
                      style={{ color: '#9ca3af' }}
                    >
                      Hash: {centralHash}
                    </div>
                  </div>
                </div>

                {/* Red Banner Certificate Title */}
                <div 
                  className="py-3 px-6 rounded-xl text-center shadow-md"
                  style={{ backgroundColor: '#800000', color: '#ffffff' }}
                >
                  <div 
                    className="text-[10px] font-mono uppercase tracking-[0.3em]"
                    style={{ color: '#fecaca' }}
                  >
                    SOVEREIGN CREDENTIAL & BILATERAL APPOINTMENT DOSSIER
                  </div>
                  <h3 
                    className="text-base sm:text-xl font-serif font-black uppercase tracking-wider mt-0.5"
                    style={{ color: '#ffffff' }}
                  >
                    {type === 'volunteer'
                      ? (isAr ? 'شهادة تسجيل وتوثيق المتطوعين المعتمدة' : isZh ? '伊中通讯社官方志愿服务注册档案' : 'Official Volunteer Registration Certificate')
                      : (isAr ? 'وثيقة تعيين واعتماد التدريب المهني والبحثي' : isZh ? '伊中通讯社学术实习与智库调研研学聘录书' : 'Official Internship & Research Appointment Dossier')
                    }
                  </h3>
                  <div 
                    className="text-[10px] font-sans opacity-90 mt-0.5"
                    style={{ color: '#fee2e2' }}
                  >
                    {isAr ? 'موثقة ومسجلة في السجل العام لشبكة التحرير والائتلاف الاستراتيجي' : isZh ? '已载入双边主权联合信息总账与企业中央管理中枢数据库' : 'Registered in the Sovereign Ledger & Central Administration Portal'}
                  </div>
                </div>

                {/* Candidate Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-sans text-xs">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Candidate Legal Name
                    </span>
                    <span 
                      className="text-sm font-black mt-0.5 block"
                      style={{ color: '#111827' }}
                    >
                      {submittedData?.fullName}
                    </span>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Accredited Category
                    </span>
                    <span 
                      className="text-sm font-black uppercase mt-0.5 block flex items-center gap-1.5"
                      style={{ color: '#800000' }}
                    >
                      {type === 'volunteer' ? <HeartHandshake size={14} /> : <GraduationCap size={14} />}
                      {type === 'volunteer' ? 'Accredited Volunteer' : 'Diplomatic Intern'}
                    </span>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Assigned Bureau / Directorate
                    </span>
                    <span 
                      className="text-xs font-bold mt-0.5 block line-clamp-1"
                      style={{ color: '#111827' }}
                    >
                      {submittedData?.bureau}
                    </span>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Nationality & Identity ID
                    </span>
                    <span 
                      className="text-xs font-bold mt-0.5 block"
                      style={{ color: '#111827' }}
                    >
                      {submittedData?.nationality} • {submittedData?.passportOrIdNumber}
                    </span>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Contact & Direct Mobile
                    </span>
                    <span 
                      className="text-xs font-bold mt-0.5 block"
                      style={{ color: '#111827' }}
                    >
                      {submittedData?.phoneNumber} • {submittedData?.email}
                    </span>
                  </div>

                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                  >
                    <span 
                      className="text-[9px] font-mono font-bold uppercase block"
                      style={{ color: '#9ca3af' }}
                    >
                      Issuance Date & Registry Cycle
                    </span>
                    <span 
                      className="text-xs font-bold mt-0.5 block font-mono"
                      style={{ color: '#111827' }}
                    >
                      {new Date().toLocaleDateString()} (CYCLE 2026-2027)
                    </span>
                  </div>
                </div>

                {/* Additional Role Specific Detail Card */}
                <div 
                  className="p-4 rounded-xl font-sans space-y-2"
                  style={{ 
                    backgroundColor: '#fff5f5', 
                    border: '1px solid #fecaca' 
                  }}
                >
                  <div 
                    className="flex items-center justify-between pb-2"
                    style={{ borderBottom: '1px solid #fecaca' }}
                  >
                    <span 
                      className="text-xs font-bold font-serif uppercase tracking-wider"
                      style={{ color: '#800000' }}
                    >
                      {type === 'volunteer' ? 'Volunteer Service Track & Availability' : 'Academic Institution & Research Track'}
                    </span>
                    <span 
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold"
                      style={{ backgroundColor: '#800000', color: '#ffffff' }}
                    >
                      VERIFIED ACCREDITATION
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {type === 'volunteer' ? (
                      <>
                        <div>
                          <strong 
                            className="font-mono text-[10px] uppercase block"
                            style={{ color: '#6b7280' }}
                          >
                            Specialization:
                          </strong>
                          <span 
                            className="font-bold"
                            style={{ color: '#111827' }}
                          >
                            {submittedData?.volunteerDomain}
                          </span>
                        </div>
                        <div>
                          <strong 
                            className="font-mono text-[10px] uppercase block"
                            style={{ color: '#6b7280' }}
                          >
                            Weekly Hours:
                          </strong>
                          <span 
                            className="font-bold"
                            style={{ color: '#111827' }}
                          >
                            {submittedData?.hoursPerWeek}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <strong 
                            className="font-mono text-[10px] uppercase block"
                            style={{ color: '#6b7280' }}
                          >
                            Institution & Major:
                          </strong>
                          <span 
                            className="font-bold"
                            style={{ color: '#111827' }}
                          >
                            {submittedData?.university} • {submittedData?.academicMajor}
                          </span>
                        </div>
                        <div>
                          <strong 
                            className="font-mono text-[10px] uppercase block"
                            style={{ color: '#6b7280' }}
                          >
                            Residency Track & Period:
                          </strong>
                          <span 
                            className="font-bold"
                            style={{ color: '#111827' }}
                          >
                            {submittedData?.internshipTrack} ({submittedData?.internshipDuration})
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Statement of Purpose Excerpt */}
                <div 
                  className="p-4 rounded-xl text-xs italic font-serif leading-relaxed"
                  style={{ 
                    backgroundColor: '#f9fafb', 
                    border: '1px solid #e5e7eb', 
                    color: '#374151' 
                  }}
                >
                  <span 
                    className="not-italic font-bold font-mono text-[10px] uppercase block mb-1"
                    style={{ color: '#9ca3af' }}
                  >
                    Statement of Intent & Purpose Logged in Ledger:
                  </span>
                  "{submittedData?.bio}"
                </div>

                {/* Bottom Signature & Sovereign Seal Area */}
                <div 
                  className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center font-sans"
                  style={{ borderTop: '2px solid #800000' }}
                >
                  {/* Left: Bureau Officer */}
                  <div className="space-y-1 text-xs">
                    <div 
                      className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: '#9ca3af' }}
                    >
                      Authorized By
                    </div>
                    <div 
                      className="font-serif font-black text-sm"
                      style={{ color: '#111827' }}
                    >
                      Baghdad Diplomatic Secretariat
                    </div>
                    <div 
                      className="text-[10px]"
                      style={{ color: '#6b7280' }}
                    >
                      Directorate of Talent & Bilateral Exchange
                    </div>
                  </div>

                  {/* Center: Red Circular Sovereign Stamp */}
                  <div className="flex flex-col items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full border-4 border-dashed p-1 flex items-center justify-center text-center font-serif font-black text-[8px] uppercase tracking-tighter shadow-sm transform rotate-[-6deg]"
                      style={{ borderColor: '#800000', color: '#800000' }}
                    >
                      <div 
                        className="w-full h-full rounded-full border flex flex-col items-center justify-center p-1"
                        style={{ borderColor: '#800000', backgroundColor: '#ffffff' }}
                      >
                        <span>IRAQI-CHINESE</span>
                        <span 
                          className="text-[10px] font-black"
                          style={{ color: '#800000' }}
                        >
                          ★ 2026 ★
                        </span>
                        <span>SOVEREIGN AUDIT</span>
                      </div>
                    </div>
                    <span 
                      className="text-[9px] font-mono uppercase tracking-widest font-bold mt-1"
                      style={{ color: '#800000' }}
                    >
                      DIGITALLY ACCREDITED
                    </span>
                  </div>

                  {/* Right: Beijing Bureau Liaison */}
                  <div className="space-y-1 text-xs">
                    <div 
                      className="text-[10px] font-mono uppercase tracking-widest"
                      style={{ color: '#9ca3af' }}
                    >
                      Validated In
                    </div>
                    <div 
                      className="font-serif font-black text-sm"
                      style={{ color: '#111827' }}
                    >
                      Beijing Coordination Bureau
                    </div>
                    <div 
                      className="text-[10px]"
                      style={{ color: '#6b7280' }}
                    >
                      Sovereign Publishing & Intelligence Hub
                    </div>
                  </div>
                </div>

                {/* Footer Security Microprint */}
                <div 
                  className="pt-3 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono uppercase tracking-wider"
                  style={{ borderTop: '1px solid #e5e7eb', color: '#9ca3af' }}
                >
                  <div>ICA CRYPTOGRAPHIC SECURITY VERIFIED • CERTIFICATE {uniqueCode}</div>
                  <div className="mt-1 sm:mt-0">OFFICIAL ARCHIVE COPY • VALID ACROSS BILATERAL BUREAUS</div>
                </div>
              </div>

              {/* Reset / Register Another Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    generateNewCodes(type);
                  }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>{isAr ? 'تقديم طلب جديد' : isZh ? '登记另一份申请' : 'Submit Another Registration'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
