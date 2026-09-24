import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Share2, Mail, Check, Link as LinkIcon } from 'lucide-react';
import { Locale } from '../../types';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface ShareButtonsProps {
  title: string;
  url: string;
  lang: Locale;
}

export function ShareButtons({ title, url, lang }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLabel = getNewsroomTranslation(lang, 'newsroom.article.share');
  const copyLinkLabel = getNewsroomTranslation(lang, 'newsroom.article.copyLink');
  const copiedLabel = getNewsroomTranslation(lang, 'newsroom.article.copyLinkConfirmation');

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center flex-wrap gap-2 py-4 border-y border-neutral-200 dark:border-neutral-800 my-6">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 me-2">
        <Share2 size={14} className="text-brand-800 dark:text-brand-400" />
        <span>{shareLabel}:</span>
      </div>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Share on X (Twitter)"
      >
        <Twitter size={15} />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook size={15} />
      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <span className="text-xs font-bold leading-none">WA</span>
      </a>

      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Share by Email"
      >
        <Mail size={15} />
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-brand-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 transition-colors"
        aria-label="Copy article link"
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">{copiedLabel}</span>
          </>
        ) : (
          <>
            <LinkIcon size={14} />
            <span>{copyLinkLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default ShareButtons;
