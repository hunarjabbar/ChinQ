import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Zap, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { publishLiveUpdate } from '../lib/api';

interface LiveEventSelectOption {
  id: string;
  titleEn: string;
  slug: string;
}

export function LivePublishForm({ events }: { events: LiveEventSelectOption[] }) {
  const { lang } = useParams<{ lang: string }>();
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || '');
  const [contentEn, setContentEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [contentZh, setContentZh] = useState('');
  const [contentCk, setContentCk] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [authorName, setAuthorName] = useState('ChinQ Live Desk');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Keyboard shortcut execution (Ctrl + Enter or Cmd + Enter to instantly broadcast)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isSubmitting) {
          handleSubmit();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEventId, contentEn, contentAr, contentZh, contentCk, isImportant, authorName, isSubmitting]);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!selectedEventId || !contentEn || !contentAr || !contentZh || !contentCk) {
      setStatusMessage({ type: 'error', text: 'All translation variants must be populated before broadcasting.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const result = await publishLiveUpdate({
        eventId: selectedEventId,
        contentEn,
        contentAr,
        contentZh,
        contentCk,
        isImportant,
        authorName,
      });

      if (result.success) {
        setStatusMessage({ type: 'success', text: 'Update successfully broadcasted live to all variants.' });
        // Clear input buffers for immediate subsequent dispatch
        setContentEn('');
        setContentAr('');
        setContentZh('');
        setContentCk('');
        setIsImportant(false);
      } else {
        setStatusMessage({ type: 'error', text: result.error || 'Transmission failure.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'A fatal submission runtime error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-start">
      
      {/* Sub-header Controls */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="flex-1 max-w-md">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Target Live Stream</label>
          <div className="flex gap-2 items-center">
            <select 
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full text-sm font-medium p-2 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#990000] outline-none"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.titleEn} (/{ev.slug})</option>
              ))}
            </select>
            {selectedEventId && (
              <a 
                href={`/${lang || 'en'}/live/${events.find(e => e.id === selectedEventId)?.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#990000] hover:underline whitespace-nowrap"
              >
                Preview Stream ↗
              </a>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Bylines Assignment</label>
            <input 
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="p-2 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#990000] outline-none font-mono"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsImportant(!isImportant)}
            className={`self-end flex items-center gap-2 px-4 py-2 rounded text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isImportant 
                ? 'bg-red-100 text-[#990000] border border-[#990000] shadow-xs' 
                : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ShieldAlert size={14} />
            Key Event
          </button>
        </div>
      </div>

      {/* Quadrilingual High-Speed Form Entry Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* English Column */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">English Component (LTR)</span>
            <span className="text-xs font-mono text-gray-400">{contentEn.length} chars</span>
          </div>
          <textarea
            value={contentEn}
            onChange={(e) => setContentEn(e.target.value)}
            className="w-full h-64 p-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-serif text-base leading-relaxed"
            placeholder="Type breaking English micro-update update block here..."
          />
        </div>

        {/* Arabic Column */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Arabic Component (RTL)</span>
            <span className="text-xs font-mono text-gray-400">{contentAr.length} chars</span>
          </div>
          <textarea
            value={contentAr}
            onChange={(e) => setContentAr(e.target.value)}
            dir="rtl"
            className="w-full h-64 p-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 font-serif text-lg leading-relaxed"
            placeholder="اكتب التحديث المباشر باللغة العربية هنا..."
          />
        </div>

        {/* Kurdish Column */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600">Kurdish (RTL)</span>
            <span className="text-xs font-mono text-gray-400">{contentCk.length} chars</span>
          </div>
          <textarea
            value={contentCk}
            onChange={(e) => setContentCk(e.target.value)}
            dir="rtl"
            className="w-full h-64 p-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 font-serif text-lg leading-relaxed"
            placeholder="نوێکردنەوەکە لێرە بنووسە..."
          />
        </div>

        {/* Chinese Column */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-purple-600">Chinese Component (LTR)</span>
            <span className="text-xs font-mono text-gray-400">{contentZh.length} chars</span>
          </div>
          <textarea
            value={contentZh}
            onChange={(e) => setContentZh(e.target.value)}
            className="w-full h-64 p-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 font-sans text-base leading-relaxed"
            placeholder="在此处输入中文实时动态更新模块..."
          />
        </div>

      </div>

      {/* Dynamic Status Notifications */}
      {statusMessage && (
        <div className={`mx-6 mb-4 p-3 rounded-lg border flex items-center gap-3 text-sm font-medium ${
          statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} className="text-green-600" /> : <AlertCircle size={18} className="text-red-600" />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Persistent Bottom Action Drawer */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-between items-center">
        <span className="text-xs font-mono text-gray-400 hidden sm:inline-block">
          💡 Hotkey Shortcut Trigger: <kbd className="bg-white border border-gray-300 px-1.5 py-0.5 rounded shadow-2xs font-sans text-xs font-bold text-gray-600">Ctrl</kbd> + <kbd className="bg-white border border-gray-300 px-1.5 py-0.5 rounded shadow-2xs font-sans text-xs font-bold text-gray-600">Enter</kbd>
        </span>
        
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full sm:w-auto ms-auto flex justify-center items-center gap-2 px-6 py-3 bg-[#990000] text-white font-black uppercase tracking-wider text-sm rounded shadow-xs hover:bg-[#7a0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Zap size={16} className={isSubmitting ? 'animate-bounce' : ''} />
          {isSubmitting ? 'Broadcasting Stream...' : 'Publish Update Live'}
        </button>
      </div>

    </div>
  );
}
