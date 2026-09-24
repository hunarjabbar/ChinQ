import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { Locale } from '../../types';
import { NewsroomArticle } from '../../types/newsroom';
import { newsroomArticles } from '../../data/newsroomData';
import { getNewsroomTranslation } from '../../locales/newsroomTranslations';

export interface SearchBarProps {
  lang: Locale;
  initialQuery?: string;
  onSearchSubmit?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  lang,
  initialQuery = '',
  onSearchSubmit,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<NewsroomArticle[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const placeholder = getNewsroomTranslation(lang, 'newsroom.search.placeholder');
  const noResultsText = getNewsroomTranslation(lang, 'newsroom.search.noResults');

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  // Execute search when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const q = debouncedQuery.toLowerCase().trim();

    // Search against newsroomArticles dataset
    const matched = newsroomArticles.filter((art) => {
      const title = (art.title[lang] || art.title.en).toLowerCase();
      const excerpt = (art.excerpt[lang] || art.excerpt.en).toLowerCase();
      const category = (art.category.name[lang] || art.category.name.en).toLowerCase();
      const author = (art.author.name[lang] || art.author.name.en).toLowerCase();

      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        category.includes(q) ||
        author.includes(q)
      );
    });

    setResults(matched.slice(0, 5));
    setIsSearching(false);
    setIsOpen(true);
  }, [debouncedQuery, lang]);

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        navigate(`/${lang}/newsroom/${results[selectedIndex].slug}`);
        setIsOpen(false);
      } else if (query.trim()) {
        if (onSearchSubmit) {
          onSearchSubmit(query.trim());
        } else {
          navigate(`/${lang}/newsroom/search?q=${encodeURIComponent(query.trim())}`);
        }
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl ${className}`}>
      <div className="relative flex items-center">
        <div className="absolute inset-inline-start-4 pointer-events-none text-neutral-400">
          {isSearching ? (
            <Loader2 size={16} className="animate-spin text-brand-800" />
          ) : (
            <Search size={16} />
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full ps-11 pe-10 py-3 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:border-brand-800 dark:focus:border-brand-500 shadow-xs focus:shadow-md transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-inline-end-3 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute z-50 top-full inset-inline-start-0 w-full mt-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800 animate-in fade-in-50 duration-150">
          {results.length > 0 ? (
            <div>
              {results.map((art, index) => {
                const title = art.title[lang] || art.title.en;
                const category = art.category.name[lang] || art.category.name.en;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={art.id}
                    type="button"
                    onClick={() => {
                      navigate(`/${lang}/newsroom/${art.slug}`);
                      setIsOpen(false);
                    }}
                    className={`w-full text-start p-3.5 flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-brand-800'
                        : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-brand-800 dark:text-brand-400">
                        {category}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {title}
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-neutral-400 shrink-0 rtl:rotate-180" />
                  </button>
                );
              })}

              <div className="p-2.5 bg-neutral-50 dark:bg-neutral-800/40 text-center">
                <button
                  type="button"
                  onClick={() => {
                    navigate(`/${lang}/newsroom/search?q=${encodeURIComponent(query.trim())}`);
                    setIsOpen(false);
                  }}
                  className="text-xs font-black text-brand-800 dark:text-brand-400 hover:underline uppercase tracking-wider"
                >
                  View all results for &quot;{query}&quot; →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
              {noResultsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
