import { Link } from 'react-router-dom';
import { Twitter, Linkedin } from 'lucide-react';
import { Locale } from '../../types';
import { NewsroomAuthor } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface AuthorBylineProps {
  author: NewsroomAuthor;
  lang: Locale;
  showBio?: boolean;
}

export function AuthorByline({ author, lang, showBio = true }: AuthorBylineProps) {
  const authorName = author.name[lang] || author.name.en;
  const authorTitle = author.title[lang] || author.title.en;
  const authorBio = author.bio[lang] || author.bio.en;
  const aboutAuthorLabel = getNewsroomTranslation(lang, 'newsroom.article.authorBio');

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row gap-5 items-start">
      <Link
        to={`/${lang}/newsroom/author/${author.slug}`}
        className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-neutral-100 dark:border-neutral-800 block shadow-sm"
      >
        <img
          src={author.photo}
          alt={authorName}
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="space-y-2 flex-grow">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            {showBio && (
              <div className="text-[10px] font-black uppercase tracking-widest text-brand-800 dark:text-brand-400">
                {aboutAuthorLabel}
              </div>
            )}
            <h4 className="font-serif text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
              <Link
                to={`/${lang}/newsroom/author/${author.slug}`}
                className="hover:text-brand-800 dark:hover:text-brand-400 transition-colors"
              >
                {authorName}
              </Link>
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              {authorTitle}
            </p>
          </div>

          {author.publicLinks && (
            <div className="flex items-center gap-2 text-neutral-400">
              {author.publicLinks.twitter && (
                <a
                  href={author.publicLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-sky-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={15} />
                </a>
              )}
              {author.publicLinks.linkedin && (
                <a
                  href={author.publicLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
              )}
            </div>
          )}
        </div>

        {showBio && authorBio && (
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {authorBio}
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthorByline;
