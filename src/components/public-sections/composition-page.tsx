import React from 'react';
import { SectionRenderer } from '../composition/SectionRenderer';

export function CompositionPage({
  page,
  sections,
}: {
  page: any;
  sections: any[];
}) {
  const visibleSections = sections
    .filter((s: any) => s.status === 'published')
    .filter((s: any) => s.visibility === 'visible')
    .sort((a: any, b: any) => a.displayOrder - b.displayOrder);

  return (
    <main>
      {visibleSections.map((section: any) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
