import React, { useState, useEffect } from 'react';
import { getRendererModeForRoute } from '../../lib/public-sections/renderer-mode';
import { CompositionPage } from './composition-page';
import { LegacyPage } from './legacy-page';

interface PublicPageRendererProps {
  routeKey: string;
  slug: string;
  children?: React.ReactNode;
}

export function PublicPageRenderer({
  routeKey,
  slug,
  children,
}: PublicPageRendererProps) {
  const mode = getRendererModeForRoute(routeKey);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(mode === 'composition');

  useEffect(() => {
    if (mode === 'composition') {
      fetch(`/api/hub/composition/pages/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setPageData(data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch composition page:", err);
          setLoading(false);
        });
    }
  }, [mode, slug]);

  if (mode === 'composition') {
    if (loading) {
      return (
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-ink-600 font-medium">Loading Composition Engine...</p>
        </div>
      );
    }
    if (!pageData || !pageData.sections) {
      return <LegacyPage>{children}</LegacyPage>;
    }
    return <CompositionPage page={pageData} sections={pageData.sections} />;
  }

  return <LegacyPage>{children}</LegacyPage>;
}
