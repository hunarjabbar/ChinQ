import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Locale } from '../../types';
import { ChineseCenterHero } from '../../components/institute/chinese-center/ChineseCenterHero';
import { HskLevelsGrid } from '../../components/institute/chinese-center/HskLevelsGrid';
import { SupplementaryTracks } from '../../components/institute/chinese-center/SupplementaryTracks';
import { TestingCertificationBlock } from '../../components/institute/chinese-center/TestingCertificationBlock';
import { InstructorsPreview } from '../../components/institute/chinese-center/InstructorsPreview';
import { UpcomingSessions } from '../../components/institute/chinese-center/UpcomingSessions';
import { TestimonialsSection } from '../../components/institute/chinese-center/TestimonialsSection';
import { FaqPreview } from '../../components/institute/chinese-center/FaqPreview';
import { EnrollmentCtaBand } from '../../components/institute/chinese-center/EnrollmentCtaBand';
import { ChineseCenterModalViews } from '../../components/institute/chinese-center/ChineseCenterModalViews';

interface ChineseCentreLandingProps {
  view?: 'enroll' | 'courses' | 'testing' | 'testing-register' | 'certificates' | 'instructors' | 'instructor-detail' | 'faq' | 'contact';
}

export function ChineseCentreLanding({ view: propView }: ChineseCentreLandingProps) {
  const { lang = 'en', subpage, id } = useParams<{ lang: Locale; subpage?: string; id?: string }>();
  const location = useLocation();

  // Determine active view from props or route path
  let activeView: ChineseCentreLandingProps['view'] = propView;

  if (!activeView) {
    const path = location.pathname.toLowerCase();
    if (path.includes('/chinese-center/enroll')) {
      activeView = 'enroll';
    } else if (path.includes('/chinese-center/courses')) {
      activeView = 'courses';
    } else if (path.includes('/chinese-center/testing/register')) {
      activeView = 'testing-register';
    } else if (path.includes('/chinese-center/testing')) {
      activeView = 'testing';
    } else if (path.includes('/chinese-center/certificates')) {
      activeView = 'certificates';
    } else if (path.includes('/chinese-center/instructors/') || id) {
      activeView = 'instructor-detail';
    } else if (path.includes('/chinese-center/instructors')) {
      activeView = 'instructors';
    } else if (path.includes('/chinese-center/faq')) {
      activeView = 'faq';
    } else if (path.includes('/chinese-center/contact')) {
      activeView = 'contact';
    }
  }

  // If a specific subpage view is requested, render the dedicated subview
  if (activeView) {
    return <ChineseCenterModalViews lang={lang} view={activeView} />;
  }

  // Standard full landing page with all 9 components in sequence
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-neutral-950 font-sans text-navy dark:text-white">
      {/* 2.1 Hero Section */}
      <ChineseCenterHero lang={lang} />

      {/* 2.2 HSK Levels Grid */}
      <HskLevelsGrid lang={lang} />

      {/* 2.3 Supplementary Tracks */}
      <SupplementaryTracks lang={lang} />

      {/* 2.4 Testing & Certification Block */}
      <TestingCertificationBlock lang={lang} />

      {/* 2.5 Instructors Preview */}
      <InstructorsPreview lang={lang} />

      {/* 2.6 Upcoming Sessions */}
      <UpcomingSessions lang={lang} />

      {/* 2.7 Testimonials */}
      <TestimonialsSection lang={lang} />

      {/* 2.8 FAQ Preview */}
      <FaqPreview lang={lang} />

      {/* 2.9 Enrollment CTA Band */}
      <EnrollmentCtaBand lang={lang} />
    </div>
  );
}

export default ChineseCentreLanding;
