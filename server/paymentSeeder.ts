import { prisma } from './db.js';

export async function seedPaymentData() {
  try {
    console.log('💳 Seeding/Verifying IQD & E-CNY Payment Service Provider data...');

    // 1. Ensure exchange rate record exists safely without race conditions
    try {
      const existingRate = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });

      if (!existingRate) {
        await prisma.paymentExchangeRate.create({
          data: {
            pair: 'IQD_ECNY',
            baseRate: 188.50, // 1 E-CNY = 188.50 IQD
            bidRate: 187.80,
            askRate: 189.20,
            retailFeePercent: 0.75, // 0.75%
            businessFeePercent: 0.35, // 0.35% for wholesale/corporate
            minimumRetailIqd: 25000.0,
            minimumBusinessIqd: 1000000.0,
            change24h: 0.45,
            high24h: 189.80,
            low24h: 187.20,
            volume24h: '¥ 54.2M / د.ع 10.21B',
            ecnyReservePool: 150000000.0, // 150 Million e-CNY
            iqdReservePool: 28275000000.0, // 28.275 Billion IQD
            mbridgeStatus: 'ACTIVE',
            cipsGatewayStatus: 'ONLINE',
            cbiClearingStatus: 'SYNCHRONIZED',
            lastUpdatedBy: 'PBOC / CBI Clearing Interbank Feed'
          }
        });
        console.log('✅ Created default IQD_ECNY exchange rate & liquidity parameters.');
      }
    } catch (rateInitErr: any) {
      // Safely ignore unique constraint violation if created concurrently
      console.log('ℹ️ Default IQD_ECNY rate already initialized or concurrently handled.');
    }

    // 2. Ensure initial realistic orders exist for demonstration & audit
    const count = await prisma.paymentOrder.count();
    if (count === 0) {
      const sampleOrders = [
        {
          reference: 'PAY-CNY-2026-88019',
          orderType: 'BUSINESS',
          direction: 'IQD_TO_ECNY',
          sourceCurrency: 'IQD',
          targetCurrency: 'E_CNY',
          sourceAmount: 188500000.0, // 188.5M IQD
          targetAmount: 996500.0, // ~ 1M e-CNY
          exchangeRate: 188.50,
          feeAmount: 659750.0,
          feePercent: 0.35,
          status: 'COMPLETED',
          senderName: 'Al-Mansour Heavy Logistics Ltd',
          senderEmail: 'procurement@almansour-logistics.iq',
          senderPhone: '+964 790 123 4567',
          senderIdNumber: 'IQ-CORP-992144',
          senderEntity: 'ENTERPRISE',
          senderCompany: 'Al-Mansour Heavy Logistics Group (Baghdad)',
          recipientName: 'Shanghai Zhenhua Heavy Industries Co., Ltd (ZPMC)',
          recipientIdentifier: 'CNY-MBRIDGE-CORP-99812401',
          recipientEntity: 'ENTERPRISE',
          recipientBankOrBureau: 'PBOC mBridge Digital Clearing Hub / Bank of China Shanghai',
          purpose: 'COMMERCIAL_TRADE',
          settlementMethod: 'MBRIDGE_CBDC',
          commercialInvoiceRef: 'INV-ZPMC-2026-0914',
          billOfLading: 'BL-COSCO-BGD-SH-44910',
          customsDeclarationNo: 'IQ-CUSTOMS-BASRA-77812',
          contractValueUsd: 145000.0,
          taxRegistrationNumber: 'TIN-90881240-IQ',
          settlementTxHash: '0x7c9b31d8e12a0487dfb6a38210928a5cf40e90c128549f8724128091abff921a',
          verificationCode: 'ZPMC-88019-VERIFIED',
          qrPayload: 'ecny://pay?dest=CNY-MBRIDGE-CORP-99812401&amt=996500.0&ref=PAY-CNY-2026-88019&sig=0x7c9b31d8',
          complianceNotes: 'Sanctions and OFAC/CBI screened. Dual-clearing verified via mBridge protocol.',
          adminNotes: 'Settled against PBOC wholesale reserve. Al Faw Port gantry parts consignment.',
          settledAt: new Date(Date.now() - 3600 * 1000 * 4)
        },
        {
          reference: 'PAY-CNY-2026-88020',
          orderType: 'RETAIL',
          direction: 'IQD_TO_ECNY',
          sourceCurrency: 'IQD',
          targetCurrency: 'E_CNY',
          sourceAmount: 3770000.0, // 3.77M IQD
          targetAmount: 19850.0, // ~ 20,000 e-CNY
          exchangeRate: 188.50,
          feeAmount: 28275.0,
          feePercent: 0.75,
          status: 'COMPLETED',
          senderName: 'Dr. Sarmad Al-Qaisi',
          senderEmail: 'sarmad.qaisi@univ-baghdad.edu.iq',
          senderPhone: '+964 780 987 6543',
          senderIdNumber: 'IQ-ID-2026-778901',
          senderEntity: 'INDIVIDUAL',
          senderCompany: '',
          recipientName: 'Tsinghua University International Office',
          recipientIdentifier: 'ECNY-TSINGHUA-EDU-44102',
          recipientEntity: 'ENTERPRISE',
          recipientBankOrBureau: 'Industrial and Commercial Bank of China (ICBC Beijing)',
          purpose: 'TUITION',
          settlementMethod: 'E_CNY_WALLET',
          commercialInvoiceRef: 'TSINGHUA-TUITION-SEM2-2026',
          billOfLading: '',
          customsDeclarationNo: '',
          contractValueUsd: 2850.0,
          taxRegistrationNumber: '',
          settlementTxHash: '0x43fa89b01c3809d3e8760201948baef701c94837261904bca99281740019283f',
          verificationCode: 'EDU-88020-VERIFIED',
          qrPayload: 'ecny://pay?dest=ECNY-TSINGHUA-EDU-44102&amt=19850.0&ref=PAY-CNY-2026-88020',
          complianceNotes: 'Academic fellowship documentation validated by Iraqi Ministry of Higher Education.',
          adminNotes: 'Direct remittance to University digital wallet via PBOC e-CNY app.',
          settledAt: new Date(Date.now() - 3600 * 1000 * 12)
        },
        {
          reference: 'PAY-CNY-2026-88021',
          orderType: 'BUSINESS',
          direction: 'IQD_TO_ECNY',
          sourceCurrency: 'IQD',
          targetCurrency: 'E_CNY',
          sourceAmount: 942500000.0, // 942.5M IQD (~ $725k)
          targetAmount: 4982500.0, // ~ 5M e-CNY
          exchangeRate: 188.50,
          feeAmount: 3298750.0,
          feePercent: 0.35,
          status: 'PROCESSING',
          senderName: 'Mesopotamia Solar & Green Energy Corp',
          senderEmail: 'finance@mesopotamia-solar.iq',
          senderPhone: '+964 770 555 8899',
          senderIdNumber: 'IQ-CORP-443210',
          senderEntity: 'ENTERPRISE',
          senderCompany: 'Mesopotamia Green Power Solutions (Basra)',
          recipientName: 'LONGi Green Energy Technology Co., Ltd (Xi’an)',
          recipientIdentifier: 'CNY-CIPS-CORP-00918234',
          recipientEntity: 'ENTERPRISE',
          recipientBankOrBureau: 'CIPS Cross-Border Interbank Payment System / Agricultural Bank of China',
          purpose: 'COMMERCIAL_TRADE',
          settlementMethod: 'CIPS_INTERBANK',
          commercialInvoiceRef: 'INV-LONGI-SOLAR-2026-88',
          billOfLading: 'BL-COSCO-BASRA-90812',
          customsDeclarationNo: 'IQ-CUSTOMS-BASRA-44910',
          contractValueUsd: 725000.0,
          taxRegistrationNumber: 'TIN-443210-BASRA',
          settlementTxHash: '0x9920184bced87019284712019483726190284719283746190283746192837461',
          verificationCode: 'LONGI-88021-PROCESSING',
          qrPayload: 'ecny://pay?dest=CNY-CIPS-CORP-00918234&amt=4982500.0&ref=PAY-CNY-2026-88021',
          complianceNotes: 'Awaiting final multi-signature from Central Bank of Iraq foreign reserve desk.',
          adminNotes: 'Large commercial transaction. Dual-signatory check passed by compliance.',
          settledAt: null
        },
        {
          reference: 'PAY-CNY-2026-88022',
          orderType: 'RETAIL',
          direction: 'IQD_TO_ECNY',
          sourceCurrency: 'IQD',
          targetCurrency: 'E_CNY',
          sourceAmount: 942500.0, // 942,500 IQD
          targetAmount: 4962.0, // ~ 5,000 e-CNY
          exchangeRate: 188.50,
          feeAmount: 7068.75,
          feePercent: 0.75,
          status: 'PENDING_SETTLEMENT',
          senderName: 'Zainab Hussein Ali',
          senderEmail: 'zainab.ali@gmail.com',
          senderPhone: '+964 782 334 1122',
          senderIdNumber: 'IQ-NAT-1992-0944',
          senderEntity: 'INDIVIDUAL',
          senderCompany: '',
          recipientName: 'Zainab Hussein Ali (PBOC Tourist Wallet)',
          recipientIdentifier: '138-0019-8822 (e-CNY App ID)',
          recipientEntity: 'INDIVIDUAL',
          recipientBankOrBureau: 'PBOC Digital Currency Institute / Bank of China Travel Wallet',
          purpose: 'TRAVEL',
          settlementMethod: 'E_CNY_WALLET',
          commercialInvoiceRef: '',
          billOfLading: '',
          customsDeclarationNo: '',
          contractValueUsd: 720.0,
          taxRegistrationNumber: '',
          settlementTxHash: '',
          verificationCode: 'TRV-88022-PENDING',
          qrPayload: 'ecny://pay?dest=138-0019-8822&amt=4962.0&ref=PAY-CNY-2026-88022',
          complianceNotes: 'Standard KYC identity scan submitted. Valid passport for China tourist entry.',
          adminNotes: 'Pending client Qi Card / Zain Cash confirmation transfer.',
          settledAt: null
        },
        {
          reference: 'PAY-CNY-2026-88023',
          orderType: 'BUSINESS',
          direction: 'ECNY_TO_IQD',
          sourceCurrency: 'E_CNY',
          targetCurrency: 'IQD',
          sourceAmount: 250000.0, // 250,000 e-CNY
          targetAmount: 46950000.0, // ~ 47M IQD
          exchangeRate: 187.80, // Bid rate
          feeAmount: 164325.0,
          feePercent: 0.35,
          status: 'COMPLIANCE_HOLD',
          senderName: 'Guangdong Construction & Infrastructure Group',
          senderEmail: 'middleeast@gd-construction.cn',
          senderPhone: '+86 20 8821 9900',
          senderIdNumber: 'CN-USCC-9144000012345678',
          senderEntity: 'ENTERPRISE',
          senderCompany: 'Guangdong Provincial Construction Ltd (Iraq Project Office)',
          recipientName: 'Basra Governorate Engineering Subcontractors Syndicate',
          recipientIdentifier: 'IQ88-FIB-0019-9948-2810-4491',
          recipientEntity: 'ENTERPRISE',
          recipientBankOrBureau: 'First Iraqi Bank (FIB) Commercial Clearing',
          purpose: 'PORT_CUSTOMS',
          settlementMethod: 'FIB_TRANSFER',
          commercialInvoiceRef: 'INV-GD-BASRA-SUB-2026-11',
          billOfLading: 'BL-ALFAW-2026-90',
          customsDeclarationNo: 'IQ-CUSTOMS-BASRA-88291',
          contractValueUsd: 36000.0,
          taxRegistrationNumber: 'IQ-TIN-882194',
          settlementTxHash: '',
          verificationCode: 'AUDIT-HOLD-88023',
          qrPayload: 'ecny://pay?dest=IQ88-FIB-0019-9948-2810-4491&amt=250000.0&ref=PAY-CNY-2026-88023',
          complianceNotes: 'Awaiting local contractor withholding tax clearance letter.',
          adminNotes: 'Compliance officer flagged for local labor union tax document.',
          settledAt: null
        }
      ];

      for (const ord of sampleOrders) {
        await prisma.paymentOrder.create({ data: ord });
      }
      console.log(`✅ Seeded ${sampleOrders.length} sample IQD/e-CNY payment orders.`);
    }
  } catch (err) {
    console.error('Error seeding payment data:', err);
  }
}
