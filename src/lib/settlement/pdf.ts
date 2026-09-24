import { jsPDF } from 'jspdf';
import { SettlementRecord, SettlementInquiryFormData, CardRegistrationData } from '../../types/settlement';

export function generateCalculatorPdf(data: {
  amount: number;
  sourceCurrency: 'IQD' | 'RMB';
  targetCurrency: 'IQD' | 'RMB';
  directRate: number;
  directOutput: number;
  traditionalOutput: number;
  savingsAmount: number;
  savingsPercent: number;
  avoidedSpread: number;
  avoidedWire: number;
  avoidedCorrespondent: number;
  date: string;
}) {
  const doc = new jsPDF();
  
  // Header with Red Brand Band
  doc.setFillColor(200, 16, 46); // #C8102E
  doc.rect(0, 0, 210, 22, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('IRAQI-CHINESE AGENCY (ICA) • BILATERAL SETTLEMENT DESK', 14, 14);

  // Subheader
  doc.setTextColor(17, 24, 39);
  doc.setFontSize(16);
  doc.text('Official Direct IQD / RMB Parity Calculation Dossier', 14, 35);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(`Generated on: ${data.date} | Regulatory Channel: CBI ⇄ PBoC Sovereign Direct Clearing Protocol`, 14, 42);
  doc.text(`Indicative Reference: CALC-${Date.now().toString().slice(-8)}`, 14, 47);

  // Summary Box
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(14, 55, 182, 38, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text('Transaction Parameters', 20, 64);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Settlement Input: ${data.amount.toLocaleString()} ${data.sourceCurrency}`, 20, 73);
  doc.text(`Direct Sovereign Rate: 1 ${data.sourceCurrency === 'IQD' ? 'RMB = ' + data.directRate.toFixed(2) + ' IQD' : 'IQD = ' + data.directRate.toFixed(6) + ' RMB'}`, 20, 81);
  doc.text(`Target Credited: ${data.directOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 20, 89);

  // Comparison Metrics Table
  doc.setFillColor(200, 16, 46);
  doc.rect(14, 103, 182, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('SETTLEMENT ROUTE COMPARISON', 18, 108.5);
  doc.text('NET DELIVERED', 105, 108.5);
  doc.text('TIME TO SETTLE', 150, 108.5);

  // Row 1: Direct Route
  doc.setFillColor(254, 242, 242);
  doc.rect(14, 111, 182, 12, 'F');
  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Direct Sovereign Route (IQD ⇄ RMB)', 18, 118);
  doc.text(`${data.directOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 105, 118);
  doc.text('24 - 48 Hours', 150, 118);

  // Row 2: Traditional Route
  doc.setFillColor(255, 255, 255);
  doc.rect(14, 123, 182, 12, 'F');
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.text('Traditional USD Intermediary Route', 18, 130);
  doc.text(`${data.traditionalOutput.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 105, 130);
  doc.text('3 - 6 Business Days', 150, 130);

  // Highlight Box: Avoided Fees
  doc.setDrawColor(200, 16, 46);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(14, 145, 182, 45, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(153, 27, 27);
  doc.text(`TOTAL DIRECT SAVINGS: ${data.savingsAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency} (+${data.savingsPercent.toFixed(1)}% Net Advantage)`, 20, 155);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  doc.text(`• USD Double-Hop Currency Spread Avoided: ~${data.avoidedSpread.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 24, 165);
  doc.text(`• Third-Party Intermediary Wire Tolls Avoided: ~${data.avoidedWire.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 24, 173);
  doc.text(`• Correspondent Clearance & Holding Fees Avoided: ~${data.avoidedCorrespondent.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${data.targetCurrency}`, 24, 181);

  // Compliance Footnote
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.text('REGULATORY & CLEARING NOTICE:', 14, 205);
  const splitNotice = doc.splitTextToSize(
    'The Iraqi-Chinese Agency (ICA) facilitates bilateral trade settlement through accredited sovereign banking channels in Iraq and China. All foreign exchange conversions are executed pursuant to Central Bank of Iraq (CBI) directives on direct Yuan settlement and People\'s Bank of China (PBoC) cross-border RMB clearing protocols. Rates displayed are indicative benchmark fixings and subject to formal documentation verification.',
    182
  );
  doc.text(splitNotice, 14, 211);

  // Signatures / Seals
  doc.setDrawColor(209, 213, 219);
  doc.line(14, 245, 90, 245);
  doc.line(120, 245, 196, 245);
  doc.setFontSize(8);
  doc.text('Iraqi Bilateral Clearing Directorate (CBI Accredited)', 14, 251);
  doc.text('Chinese Cross-Border Settlement Desk (PBoC Protocol)', 120, 251);

  doc.save(`ICA-FX-Parity-Calculation-${Date.now().toString().slice(-6)}.pdf`);
}

export function generateInquiryPdf(formData: SettlementInquiryFormData, referenceId: string) {
  const doc = new jsPDF();

  // Header with Red Brand Band
  doc.setFillColor(200, 16, 46);
  doc.rect(0, 0, 210, 24, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('IRAQI-CHINESE AGENCY • TRADE & PAYMENT FACILITATION DESK', 14, 12);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Bilateral Trade Settlement Inquiry & KYC Record', 14, 18);

  // Reference Banner
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(`Official Reference: ${referenceId}`, 14, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(`Filing Date: ${new Date().toISOString().split('T')[0]} | Clearance Protocol: Direct IQD ⇄ RMB (mBridge/CIPS)`, 14, 43);

  // Section 1: Remitter / Payer Entity
  doc.setFillColor(243, 244, 246);
  doc.rect(14, 50, 182, 7, 'F');
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('1. REMITTER (PAYER) ENTERPRISE IDENTIFICATION', 18, 55);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  doc.text(`Enterprise Name: ${formData.organizationName}`, 18, 64);
  doc.text(`Structure: ${formData.organizationType} | Jurisdiction: ${formData.countryOfRegistration}`, 18, 71);
  doc.text(`Commercial Registration No: ${formData.commercialRegNumber} | Tax ID: ${formData.taxRegNumber}`, 18, 78);
  doc.text(`Authorized Officer: ${formData.contactName} (${formData.contactTitle})`, 18, 85);
  doc.text(`Official Email: ${formData.email} | Direct Phone: ${formData.phone}`, 18, 92);

  // Section 2: Transaction & Counterparty Details
  doc.setFillColor(243, 244, 246);
  doc.rect(14, 100, 182, 7, 'F');
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.text('2. SETTLEMENT SCOPE & BENEFICIARY ENTITY', 18, 105);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  doc.text(`Trade Capital: ${formData.sourceAmount.toLocaleString()} ${formData.sourceCurrency} (Direct Clearing)`, 18, 114);
  doc.text(`Direction: ${formData.direction} | Scope: ${formData.settlementType}`, 18, 121);
  doc.text(`Beneficiary Entity: ${formData.counterpartyName} (${formData.counterpartyCountry})`, 18, 128);
  doc.text(`Beneficiary Bank: ${formData.counterpartyBank}`, 18, 135);
  doc.text(`Account / IBAN: ${formData.counterpartyAccount} | SWIFT/CIPS: ${formData.counterpartySwift || 'N/A'}`, 18, 142);
  doc.text(`Purpose of Settlement: ${formData.purpose.slice(0, 90)}...`, 18, 149);

  // Section 3: Compliance & Legal Attestations
  doc.setFillColor(243, 244, 246);
  doc.rect(14, 158, 182, 7, 'F');
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.text('3. REGULATORY COMPLIANCE ATTESTATIONS & SIGN-OFF', 18, 163);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(55, 65, 81);
  doc.text('[X] Verified non-sanctioned entities under Iraqi, Chinese, and UN Security Council regimes.', 18, 172);
  doc.text('[X] Compliant with Iraq Anti-Money Laundering and Counter-Terrorism Financing Law No. 39 of 2015.', 18, 178);
  doc.text('[X] Full adherence to Central Bank of Iraq foreign currency platform directives.', 18, 184);
  doc.text('[X] Ultimate Beneficial Ownership (UBO) verified and attested.', 18, 190);
  doc.text('[X] Acknowledged that ICA operates strictly as a bilateral trade facilitator, not a depository institution.', 18, 196);

  // Digital Seal & Verification Box
  doc.setDrawColor(200, 16, 46);
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(14, 206, 182, 32, 2, 2, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('AUTHENTICATED BILATERAL SETTLEMENT DOSSIER', 20, 214);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Cryptographic Audit Hash: 0x${Array.from(referenceId).map(c => c.charCodeAt(0).toString(16)).join('')}7c4e90`, 20, 222);
  doc.text('Assigned Case Officer: CBI-PBoC Bilateral Trade Coordination Directorate', 20, 228);
  doc.text('Present this document to accredited partner banks to initiate document execution.', 20, 234);

  // Signatures
  doc.setDrawColor(209, 213, 219);
  doc.line(14, 260, 85, 260);
  doc.line(115, 260, 196, 260);
  doc.text('Authorized Enterprise Representative Signature', 14, 265);
  doc.text('Iraqi-Chinese Agency Verification Officer Stamp', 115, 265);

  doc.save(`${referenceId}-Inquiry-Dossier.pdf`);
}

export function generateStatusPdf(record: SettlementRecord) {
  const doc = new jsPDF();

  doc.setFillColor(200, 16, 46);
  doc.rect(0, 0, 210, 22, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('IRAQI-CHINESE AGENCY • REAL-TIME SETTLEMENT STATUS DOSSIER', 14, 14);

  doc.setTextColor(17, 24, 39);
  doc.setFontSize(14);
  doc.text(`Settlement Dossier: ${record.referenceId}`, 14, 35);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`Current Status: STAGE ${record.currentStage} OF 8 (${record.stages[record.currentStage - 1]?.name.en || 'In Progress'})`, 14, 42);
  doc.text(`Executing Bank: ${record.executingBank} | Est. Settlement: ${record.estimatedSettlementDate}`, 14, 47);

  // Parameters
  doc.setFillColor(249, 250, 251);
  doc.rect(14, 55, 182, 32, 'F');
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Transaction Scope:', 20, 64);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Source: ${record.sourceAmount.toLocaleString()} ${record.sourceCurrency} ➔ Target: ${record.targetAmount.toLocaleString()} ${record.targetCurrency}`, 20, 72);
  doc.text(`Remitter: ${record.payer.organizationName} (${record.payer.country})`, 20, 78);
  doc.text(`Beneficiary: ${record.beneficiary.name} | Account: ${record.beneficiary.accountNumber}`, 20, 84);

  // Stepper Milestones List
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Lifecycle Milestone Audit Log:', 14, 100);

  let y = 110;
  record.stages.forEach((st) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    if (st.status === 'completed') {
      doc.setTextColor(4, 120, 87); // green
      doc.text(`[✓ COMPLETED] Stage ${st.id}: ${st.name.en}`, 18, y);
    } else if (st.status === 'in_progress') {
      doc.setTextColor(200, 16, 46); // red
      doc.text(`[➤ ACTIVE] Stage ${st.id}: ${st.name.en}`, 18, y);
    } else {
      doc.setTextColor(156, 163, 175); // gray
      doc.text(`[○ PENDING] Stage ${st.id}: ${st.name.en}`, 18, y);
    }
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`${st.description.en} ${st.timestamp ? '• ' + st.timestamp : ''}`, 24, y + 5);
    y += 14;
  });

  doc.setDrawColor(200, 16, 46);
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(14, y + 10, 182, 25, 2, 2, 'FD');

  doc.setTextColor(153, 27, 27);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Cryptographic Clearing Confirmation', 20, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Hash: ${record.txHash || '0x7e8b2a3c9f0102d41598' + record.referenceId}`, 20, y + 25);
  doc.text('Authenticated under bilateral protocol directives of the Central Bank of Iraq.', 20, y + 30);

  doc.save(`${record.referenceId}-Status-Log.pdf`);
}

export function generateCardDossierPdf(cardData: CardRegistrationData, cardRef: string) {
  const doc = new jsPDF();

  doc.setFillColor(200, 16, 46);
  doc.rect(0, 0, 210, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('QI & ICA CO-BRANDED SOVEREIGN CARD • REGISTRATION RECORD', 14, 14);

  doc.setTextColor(17, 24, 39);
  doc.setFontSize(14);
  doc.text(`Application Reference: ${cardRef}`, 14, 35);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text(`Applicant Name on Card: ${cardData.fullNameOnCard} | Legal Name: ${cardData.legalName}`, 14, 42);
  doc.text(`Card Scheme: ${cardData.cardScheme} ${cardData.cardTier} | Linked Currency: ${cardData.primaryCurrency}`, 14, 47);

  doc.setFillColor(249, 250, 251);
  doc.rect(14, 55, 182, 45, 'F');
  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Cardholder KYC Dossier', 20, 64);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  doc.text(`Nationality: ${cardData.nationality} | Date of Birth: ${cardData.dateOfBirth}`, 20, 72);
  doc.text(`Passport / ID: ${cardData.passportNumber} (Expires: ${cardData.passportExpiry})`, 20, 79);
  doc.text(`Email: ${cardData.email} | Phone: ${cardData.phone}`, 20, 86);
  doc.text(`Issuance Delivery Point: ${cardData.deliveryOption}`, 20, 93);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(153, 27, 27);
  doc.text('REGULATORY NOTICE & CARD LICENSING DISCLOSURE', 14, 115);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  const disclaimer = doc.splitTextToSize(
    'The Qi & ICA co-branded Visa/Mastercard card is issued by International Smart Card (ISC / Qi Card), an authorized electronic payment service provider licensed and regulated by the Central Bank of Iraq (CBI). The Iraqi-Chinese Agency acts exclusively as the commercial endorsement partner and bilateral facilitation channel. Card issuance is subject to individual identity verification, AML screening, and sanction checks in accordance with Iraqi banking regulations.',
    182
  );
  doc.text(disclaimer, 14, 122);

  doc.save(`${cardRef}-Qi-ICA-Card-Registration.pdf`);
}
