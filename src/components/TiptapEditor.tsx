import { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, 
  List, Heading1, Heading2, Code, Quote, Eye, EyeOff, Sparkles, HelpCircle 
} from 'lucide-react';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  dir: 'rtl' | 'ltr';
}

export default function TiptapEditor({ value, onChange, dir }: TiptapEditorProps) {
  const [showHtml, setShowHtml] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isRtl = dir === 'rtl';

  // Helper to insert markdown or HTML helper tags around selected text
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(start, end);
    
    const replacement = before + (selectedText || '') + after;
    const newText = currentText.substring(0, start) + replacement + currentText.substring(end);
    
    onChange(newText);
    
    // Restore selection focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selectedText || '').length);
    }, 50);
  };

  const wrapInHtmlOrMd = (tag: string) => {
    if (tag.startsWith('<')) {
      insertFormatting(tag, `</${tag.substring(1)}`);
    } else {
      insertFormatting(tag, tag);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      {/* Editor Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2.5 flex flex-wrap gap-1.5 items-center justify-between">
        <div className="flex flex-wrap gap-1 items-center">
          {/* Text Style */}
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<strong>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<em>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>

          <span className="w-px h-5 bg-gray-300 mx-1"></span>

          {/* Headings */}
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<h2>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer text-xs font-black flex items-center gap-0.5"
            title="Heading 2"
          >
            <Heading1 size={15} />
          </button>
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<h3>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer text-xs font-black flex items-center gap-0.5"
            title="Heading 3"
          >
            <Heading2 size={15} />
          </button>

          <span className="w-px h-5 bg-gray-300 mx-1"></span>

          {/* List and Blockquote */}
          <button
            type="button"
            onClick={() => insertFormatting('\n- ', '')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer"
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<blockquote>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer"
            title="Quote"
          >
            <Quote size={16} />
          </button>
          <button
            type="button"
            onClick={() => wrapInHtmlOrMd('<code>')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/65 rounded transition-all cursor-pointer"
            title="Inline Code"
          >
            <Code size={16} />
          </button>
        </div>

        {/* Action Toggle controls */}
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => setShowHtml(!showHtml)}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded transition-all ${
              showHtml 
                ? 'bg-red-50 text-[#990000] border border-red-200' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {showHtml ? <EyeOff size={14} /> : <Eye size={14} />}
            {showHtml ? 'Show Visual' : 'View Code Source'}
          </button>
        </div>
      </div>

      {/* Editor Main Text Area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dir}
          className={`w-full min-h-[420px] p-5 font-serif text-lg leading-relaxed outline-none resize-y transition-all bg-white ${
            isRtl ? 'text-right' : 'text-left'
          }`}
          placeholder={
            isRtl 
              ? 'دەست بکە بە نووسینی بابەتەکەت لێرە...' 
              : 'Write beautiful trilingual content here...'
          }
        />

        {/* Real-time word count details */}
        <div className="absolute bottom-2 right-4 text-[10px] font-mono text-gray-400 bg-white/80 px-2 py-0.5 rounded pointer-events-none">
          {value.trim() ? value.trim().split(/\s+/).length : 0} words | {value.length} chars
        </div>
      </div>
    </div>
  );
}
