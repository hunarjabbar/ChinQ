import React from 'react';
import { Locale } from '../types';
import { Link } from 'react-router-dom';

interface ExecutiveOverviewProps {
  lang: Locale;
}

export function ExecutiveOverview({ lang }: ExecutiveOverviewProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 text-neutral-900 dark:text-neutral-100 font-serif leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-navy">Executive Overview of the Iraqi-Chinese Agency (ICA)</h1>
      
      <p className="mb-6">
        With deep appreciation, and following our letter (Ref. No. 09, dated 20/9/2026), we are honored to present this Executive Overview of the Iraqi-Chinese Agency (ICA) — a specialized institutional body operating as a trusted, two-way bridge between the People's Republic of China, the Kurdistan Region, and the broader Republic of Iraq.
      </p>

      <h2 className="text-2xl font-semibold mb-4">ICA operates through three integrated wings:</h2>
      <ol className="list-decimal list-inside mb-6 space-y-4">
        <li>
          <Link to={`/${lang}/institute`} className="text-royal hover:underline">The Chinese Institute for Strategic and Economic Studies</Link> — the agency's research and knowledge partner, publishing quad-lingual policy analysis, trade data, and sector studies on China–Iraq relations, and convening experts, fellows, and academic institutions including the <Link to={`/${lang}/institute/about`} className="text-royal hover:underline">China Studies Centre at the University of Sulaimani</Link> (the first of its kind in Iraq and the Middle East).
        </li>
        <li>
          <Link to={`/${lang}/newsroom`} className="text-royal hover:underline">ICA Newsroom</Link> — the agency's quad-lingual media wing (English, Arabic, Mandarin Chinese, Central Kurdish), delivering sourced briefs, daily commentary, and syndicated analysis to regional and international partners.
        </li>
        <li>
          <Link to={`/${lang}/summit`} className="text-royal hover:underline">The Iraq-China Economic Summit & Bilateral Expo</Link> — the agency's annual convening platform in <Link to={`/${lang}/summit/about-sulaymaniyah`} className="text-royal hover:underline">Sulaymaniyah</Link>, hosting a high-level policy summit alongside a sector-wide bilateral expo that facilitates participation from every sector of the Iraqi and Chinese economies.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4">ICA provides structured facilitation and verification services across five core verticals:</h2>
      <ol className="list-decimal list-inside mb-6 space-y-4">
        <li><Link to={`/${lang}/summit/services/sourcing`} className="text-royal hover:underline">Sourcing Facilitation</Link> — supplier identification, vetting, factory audits, sample coordination, and specification matching across Chinese manufacturing hubs including Yiwu, Guangzhou, Shenzhen, and Ningbo.</li>
        <li><Link to={`/${lang}/summit/services/settlement`} className="text-royal hover:underline">Payment Settlement Facilitation</Link> — advisory and coordination for RMB-denominated trade, letters of credit, bank guarantees, and trade finance channels through Iraqi and Chinese banking partners, aligned with the <a href="https://cbi.iq" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">Central Bank of Iraq's</a> directives on yuan settlement.</li>
        <li><Link to={`/${lang}/summit/services/insurance`} className="text-royal hover:underline">Insurance Facilitation</Link> — coordination with <a href="https://www.sinosure.com.cn" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">Sinosure</a> (China Export & Credit Insurance Corporation) and Iraqi insurers for export credit insurance, cargo insurance, and project risk coverage across bilateral trade and infrastructure projects.</li>
        <li><Link to={`/${lang}/summit/services/visa-tourism`} className="text-royal hover:underline">Bilateral Tourism & Visa Facilitation</Link> — advisory and documentation support for Iraqi and Chinese nationals navigating visa requirements in both directions, including business, tourist, student, and group delegations, aligned with the policies of the <a href="http://erbil.china-consulate.gov.cn" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline">Chinese Consulate General in Erbil</a> and Iraqi diplomatic missions.</li>
        <li><Link to={`/${lang}/summit/services/consultancy`} className="text-royal hover:underline">Strategic Financial Consultancy</Link> — market entry strategy, investment structuring, project finance advisory, regulatory navigation, and joint venture facilitation for Chinese enterprises entering Iraq and Iraqi firms entering China.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-4">In addition, ICA operates two dedicated centers under the Chinese Institute:</h2>
      <ul className="list-disc list-inside mb-6 space-y-4">
        <li><Link to={`/${lang}/institute/chinese-center`} className="text-royal hover:underline">The Chinese Center</Link> — Sulaymaniyah's first internationally aligned Chinese language tutoring centre, delivering the standard <Link to={`/${lang}/institute/chinese-center/testing`} className="text-royal hover:underline">HSK curriculum</Link> (HSK 1 through HSK 7–9, plus HSKK and YCT tracks), testing, and verifiable certification to local Iraqis learning Chinese as a foreign and second language.</li>
        <li><Link to={`/${lang}/institute/visa-centre`} className="text-royal hover:underline">The Bilateral Visa Consultancy & Facilitation Centre</Link> — an independent advisory service providing documented, compliant, and up-to-date guidance for Iraq–China visa applications, without acting as a visa-issuing authority.</li>
      </ul>

      <p className="mb-6">
        ICA is headquartered in Sulaymaniyah, Kurdistan Region of Iraq — home to the first China Studies Centre in Iraq and the Middle East (University of Sulaimani, 2023) and the first Iraqi city to formalize a sister-city agreement with Yiwu, China (November 2025). This positioning anchors ICA within an emerging epistemic and economic corridor connecting Chinese manufacturing, Iraqi markets, and the Kurdistan Region's human and financial capital.
      </p>
      <p className="mb-8">
        By regulating cross-border exchanges, verifying suppliers, standardizing documentation, and organizing major trade initiatives — most notably the Iraq-China Economic Summit & Bilateral Expo in Sulaymaniyah — ICA mitigates financial, legal, and logistical risks for all parties. The agency's requested institutional support letter serves to formally acknowledge ICA as the designated bilateral facilitation and verification authority, establishing a transparent, secure framework that protects local businesses, strengthens Iraqi and Kurdish institutional capacity, and drives long-term economic development across the region.
      </p>

      <div className="text-right rtl:text-left mt-12 border-t pt-6">
        <p className="font-semibold">With respect,</p>
        <p className="text-lg font-bold mt-2">Hunar Jabbar Karim</p>
        <p>Founder & CEO</p>
        <p>Iraqi-Chinese Agency (ICA)</p>
      </div>
    </div>
  );
}
