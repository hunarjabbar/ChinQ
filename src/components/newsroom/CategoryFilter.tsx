import { Link } from 'react-router-dom';
import { Locale } from '../../types';
import { NewsroomCategory } from '../../types/newsroom';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface CategoryFilterProps {
  categories: NewsroomCategory[];
  activeCategorySlug?: string;
  lang: Locale;
  onSelectCategory?: (slug: string) => void;
  isLinkMode?: boolean;
}

export function CategoryFilter({
  categories,
  activeCategorySlug = 'all',
  lang,
  onSelectCategory,
  isLinkMode = false,
}: CategoryFilterProps) {
  const allLabel = getNewsroomTranslation(lang, 'newsroom.landing.categories.all');

  const basePillClasses =
    'min-h-[36px] min-w-[64px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-180 flex items-center justify-center shrink-0 cursor-pointer snap-start focus-visible:outline-2 focus-visible:outline-brand-800 focus-visible:outline-offset-2';

  const activePillClasses =
    'bg-[#0F172A] dark:bg-white text-white dark:text-[#0F172A] shadow-md border border-[#0F172A] dark:border-white font-black';

  const inactivePillClasses =
    'bg-transparent text-[#0F172A] dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-brand-800 dark:hover:border-brand-400 hover:text-brand-800 dark:hover:text-brand-400';

  return (
    <nav
      aria-label="Category Navigation"
      className="w-full flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth snap-x py-2 my-8 border-y border-neutral-100 dark:border-neutral-800"
    >
      {/* "All" Pill */}
      {isLinkMode ? (
        <Link
          to={`/${lang}/newsroom`}
          className={`${basePillClasses} ${activeCategorySlug === 'all' ? activePillClasses : inactivePillClasses}`}
          aria-current={activeCategorySlug === 'all' ? 'page' : undefined}
        >
          {allLabel}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => onSelectCategory?.('all')}
          className={`${basePillClasses} ${activeCategorySlug === 'all' ? activePillClasses : inactivePillClasses}`}
          aria-pressed={activeCategorySlug === 'all'}
        >
          {allLabel}
        </button>
      )}

      {/* Category Pills */}
      {categories.map((cat) => {
        const isActive = activeCategorySlug === cat.slug;
        const catName = cat.name[lang] || cat.name.en;
        const pillHref = `/${lang}/newsroom/category/${cat.slug}`;

        if (isLinkMode) {
          return (
            <Link
              key={cat.id}
              to={pillHref}
              className={`${basePillClasses} ${isActive ? activePillClasses : inactivePillClasses}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {catName}
            </Link>
          );
        }

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory?.(cat.slug)}
            className={`${basePillClasses} ${isActive ? activePillClasses : inactivePillClasses}`}
            aria-pressed={isActive}
          >
            {catName}
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryFilter;
