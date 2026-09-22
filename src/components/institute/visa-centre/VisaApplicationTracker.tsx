import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, Calendar, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Locale } from '../../../types';
import { useVisaCentreStore } from '../../../store/useVisaCentreStore';
import { useVisaCentreI18n } from '../../../locales/visaCentreTranslations';

interface VisaApplicationTrackerProps {
  lang: Locale;
  initialReferenceId?: string;
  id?: string;
}

export const VisaApplicationTracker: React.FC<VisaApplicationTrackerProps> = ({
  lang,
  initialReferenceId = '',
  id = 'visa-application-tracker'
}) => {
  const { vt } = useVisaCentreI18n(lang);
  const trackApplication = useVisaCentreStore((s) => s.trackApplication);

  const [referenceId, setReferenceId] = useState(initialReferenceId);
  const [lastNameOrEmail, setLastNameOrEmail] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceId.trim() || !lastNameOrEmail.trim()) {
      setErrorMessage(
        lang === 'zh'
          ? '请输入受理编号及注册邮箱或姓氏。'
          : lang === 'ar'
          ? 'يرجى إدخال الرقم المرجعي والبريد الإلكتروني أو اللقب المسجل.'
          : lang === 'ckb'
          ? 'تکایە ژمارەی مامەڵە و ئیمەیڵ یان پاشناو بنووسە.'
          : 'Please provide both Reference ID and registered email or last name.'
      );
      return;
    }

    setErrorMessage('');
    const res = trackApplication(referenceId, lastNameOrEmail);
    setHasSearched(true);

    if (res.found && res.application) {
      setSearchResult(res.application);
    } else {
      setSearchResult(null);
      setErrorMessage(
        res.error ||
          (lang === 'zh'
            ? '未检索到匹配的案卷。请仔细核对受理编号与身份信息。'
            : lang === 'ar'
            ? 'لم يتم العثور على معاملة مطابقة. يرجى التأكد من صحة الرقم المرجعي وبيانات التعريف.'
            : lang === 'ckb'
            ? 'هیچ مامەڵەیەک نەدۆزرایەوە. دڵنیابەرەوە لە ژمارەی مامەڵە و زانیارییەکان.'
            : 'No matching application found. Please verify your reference ID and credentials.')
      );
    }
  };

  const setSampleRecord = (ref: string, key: string) => {
    setReferenceId(ref);
    setLastNameOrEmail(key);
    setErrorMessage('');
    const res = trackApplication(ref, key);
    setHasSearched(true);
    if (res.found && res.application) {
      setSearchResult(res.application);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return { label: vt('statusReceived'), color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' };
      case 'in-review':
        return { label: vt('statusInReview'), color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' };
      case 'awaiting-documents':
        return { label: vt('statusAwaitingDocs'), color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' };
      case 'submitted':
        return { label: vt('statusSubmitted'), color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' };
      case 'appointment-booked':
        return { label: vt('statusAptBooked'), color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' };
      case 'approved':
        return { label: vt('statusApproved'), color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' };
      case 'refused':
        return { label: vt('statusRefused'), color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' };
      default:
        return { label: status, color: 'bg-muted text-muted-foreground border-border' };
    }
  };

  return (
    <div id={id} className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-royal/10 text-royal text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          {vt('trackerTitle')}
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {vt('trackerSubtitle')}
        </h2>
        <p className="text-xs text-muted-foreground">
          {lang === 'zh'
            ? '为确保申请人隐私，查询系统执行双重校验（受理编号 + 注册邮箱或姓氏）。'
            : lang === 'ar'
            ? 'لضمان خصوصية المتقدمين، يعتمد نظام التتبع تحققاً ثنائياً (الرقم المرجعي + البريد أو اللقب).'
            : lang === 'ckb'
            ? 'بۆ پاراستنی زانیارییە کەسییەکانت، پشکنین بە دوو هەنگاو ئەنجام دەدرێت.'
            : 'Protected 2-factor lookup ensures only authorized applicants can view their consular review status.'}
        </p>
      </div>

      {/* Query Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              {vt('referenceId')} *
            </label>
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder={vt('enterReferenceId')}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              {lang === 'zh' ? '注册邮箱或姓氏拼音' : lang === 'ar' ? 'البريد الإلكتروني أو اللقب' : lang === 'ckb' ? 'ئیمەیڵ یان پاشناو' : 'Registered Email or Last Name'} *
            </label>
            <input
              type="text"
              value={lastNameOrEmail}
              onChange={(e) => setLastNameOrEmail(e.target.value)}
              placeholder="e.g. ahmed.bayati@cises-demo.iq or Bayati"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-royal/40"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Quick Demo Pre-fill Links */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto">
            <span className="font-semibold">{lang === 'zh' ? '测试样例:' : lang === 'ar' ? 'أمثلة تجريبية:' : 'Quick Test:'}</span>
            <button
              type="button"
              onClick={() => setSampleRecord('VC-2026-481920', 'ahmed.bayati@cises-demo.iq')}
              className="text-royal hover:underline underline-offset-2 shrink-0"
            >
              VC-2026-481920 (Bayati)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setSampleRecord('VC-2026-729410', 'zhang.wei@sinoroads-erbil.cn')}
              className="text-royal hover:underline underline-offset-2 shrink-0"
            >
              VC-2026-729410 (Zhang)
            </button>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-royal hover:bg-royal/90 text-white text-xs font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Search className="w-4 h-4" />
            {vt('trackStatusBtn')}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Results Box */}
      {hasSearched && searchResult && (
        <div className="p-6 rounded-xl border border-border bg-card/80 space-y-5 animate-in fade-in-50 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <span className="text-[11px] font-mono text-muted-foreground uppercase">
                {vt('referenceId')}
              </span>
              <div className="text-lg font-bold font-mono text-royal">
                {searchResult.referenceId}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(searchResult.status).color}`}>
                {getStatusBadge(searchResult.status).label}
              </span>
            </div>
          </div>

          {/* Key Parameters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">{lang === 'zh' ? '方向' : lang === 'ar' ? 'الاتجاه' : 'Direction'}</span>
              <span className="font-semibold text-foreground">
                {searchResult.direction === 'iraq-to-china' ? vt('dirIraqToChina') : vt('dirChinaToIraq')}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">{lang === 'zh' ? '类别' : lang === 'ar' ? 'الفئة' : 'Category'}</span>
              <span className="font-semibold text-foreground font-mono">
                {searchResult.visaCategory}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">{lang === 'zh' ? '登记日期' : lang === 'ar' ? 'تاريخ التقديم' : 'Submission Date'}</span>
              <span className="font-semibold text-foreground">
                {new Date(searchResult.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">{lang === 'zh' ? '最新更新' : lang === 'ar' ? 'آخر تحديث' : 'Last Updated'}</span>
              <span className="font-semibold text-foreground">
                {new Date(searchResult.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Consular Note */}
          {searchResult.publicNotes && (
            <div className="p-4 rounded-xl border border-royal/20 bg-royal/5 space-y-1">
              <span className="text-[11px] font-bold text-royal uppercase tracking-wider block">
                {lang === 'zh' ? '领事顾问指引说明' : lang === 'ar' ? 'إشعار المستشار القنصلي' : lang === 'ckb' ? 'ڕێنمایی تیمی ڕاوێژکاری' : 'Consular Advisory Notification'}
              </span>
              <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                {searchResult.publicNotes}
              </p>
            </div>
          )}

          {/* Appointment Card (if scheduled) */}
          {searchResult.appointment && (
            <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                <Calendar className="w-4 h-4" />
                <span>{lang === 'zh' ? '已确认的领事面签与生物识别席位' : lang === 'ar' ? 'موعد المقابلة والبصمة القنصلية المؤكد' : 'Confirmed Consular Biometrics Slot'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">{lang === 'zh' ? '日期' : 'Date'}:</span>
                  <span className="font-semibold text-foreground">{searchResult.appointment.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">{lang === 'zh' ? '时间' : 'Time'}:</span>
                  <span className="font-semibold text-foreground">{searchResult.appointment.time}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">{lang === 'zh' ? '确认码' : 'Code'}:</span>
                  <span className="font-semibold text-royal font-mono">{searchResult.appointment.confirmationNumber}</span>
                </div>
              </div>
            </div>
          )}

          {/* Chronological History Steps */}
          {searchResult.statusHistory && searchResult.statusHistory.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-foreground block">
                {lang === 'zh' ? '审理流转时间轴 (公开记录)' : lang === 'ar' ? 'التسلسل الزمني لمراحل المعاملة' : 'Dossier Review Timeline'}
              </span>
              <div className="space-y-2.5 border-l-2 border-border ps-4 ms-2">
                {searchResult.statusHistory.map((h: any, idx: number) => (
                  <div key={idx} className="space-y-0.5 relative">
                    <div className="absolute -start-[23px] top-1 w-3 h-3 rounded-full bg-royal border-2 border-background" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">
                        {getStatusBadge(h.status).label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(h.timestamp).toLocaleDateString()} {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {h.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
