import { jsPDF } from 'jspdf';

export interface ReportPdfOptions {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  category?: string;
  summary?: string;
  content?: string[];
  provenance?: string;
  fileName?: string;
}

export function generateInstitutionalPdf({
  title,
  subtitle = 'Chinese Institute for Strategic and Economic Studies (CISE)',
  author = 'CISE Strategic Research Directorate',
  date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  category = 'White Paper / Policy Brief',
  summary = 'An authoritative institutional research briefing by the Iraqi-Chinese Agency.',
  content = [],
  provenance = 'Sources: General Administration of Customs PRC, Observatory of Economic Complexity, Ministry of Oil Iraq.',
  fileName = 'cise-research-brief.pdf'
}: ReportPdfOptions) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxTextWidth = pageWidth - margin * 2;

    // Header Branding Bar
    doc.setFillColor(15, 23, 42); // #0F172A Dark Navy
    doc.rect(0, 0, pageWidth, 28, 'F');

    // CISE Gold Accent Line
    doc.setFillColor(217, 119, 6); // #D97706 Amber
    doc.rect(0, 28, pageWidth, 2, 'F');

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('CHINESE INSTITUTE FOR STRATEGIC AND ECONOMIC STUDIES', margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(217, 119, 6);
    doc.text('IRAQI-CHINESE AGENCY (ICA) · SOVEREIGN POLICY RESEARCH', margin, 21);

    let yPosition = 45;

    // Category Badge
    doc.setFillColor(2, 132, 199); // #0284C7
    doc.roundedRect(margin, yPosition, 45, 6, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(category.toUpperCase(), margin + 3, yPosition + 4.2);

    yPosition += 14;

    // Title
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    const splitTitle = doc.splitTextToSize(title, maxTextWidth);
    doc.text(splitTitle, margin, yPosition);
    yPosition += splitTitle.length * 7 + 4;

    // Subtitle / Meta
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Lead Authors: ${author}  |  Published: ${date}`, margin, yPosition);
    yPosition += 8;

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Executive Summary Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, yPosition, maxTextWidth, 26, 2, 2, 'FD');

    doc.setTextColor(217, 119, 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('EXECUTIVE BRIEFING', margin + 4, yPosition + 6);

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const splitSummary = doc.splitTextToSize(summary, maxTextWidth - 8);
    doc.text(splitSummary, margin + 4, yPosition + 12);

    yPosition += 36;

    // Body Sections
    const defaultParagraphs = content.length > 0 ? content : [
      '1. Sovereign Alignment: The convergence between Iraq’s Development Road framework and the Belt and Road Initiative (BRI) provides structural fiscal resilience and multi-modal logistics acceleration.',
      '2. Currency & Settlement: Direct IQD/CNY clearing mechanisms mitigate third-party currency volatility while ensuring uninterrupted energy trade settlement.',
      '3. Infrastructure Milestones: Primary logistics hubs at Grand Faw Port and the northern Sulaymaniyah terminal establish high-throughput transit connectivity between the Gulf and Mediterranean markets.'
    ];

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('STRATEGIC FINDINGS & POLICY DIRECTIVES', margin, yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);

    for (const paragraph of defaultParagraphs) {
      if (yPosition > pageHeight - 35) {
        doc.addPage();
        yPosition = 25;
      }
      const splitP = doc.splitTextToSize(paragraph, maxTextWidth);
      doc.text(splitP, margin, yPosition);
      yPosition += splitP.length * 5 + 4;
    }

    // Provenance & Footer
    yPosition = Math.max(yPosition + 6, pageHeight - 28);
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, yPosition, maxTextWidth, 12, 'F');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(provenance, margin + 3, yPosition + 5);
    doc.text('© 2026 Iraqi-Chinese Agency. All rights reserved. Sovereign Research Integrity Certified.', margin + 3, yPosition + 9);

    // Save and download
    doc.save(fileName);
    return true;
  } catch (err) {
    console.error('Failed to generate institutional PDF:', err);
    return false;
  }
}
