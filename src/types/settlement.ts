export type SettlementDirection = 'IQD_TO_RMB' | 'RMB_TO_IQD';

export type SettlementType = 
  | 'TRADE_GOODS'
  | 'SERVICES'
  | 'INFRASTRUCTURE'
  | 'INTERCOMPANY'
  | 'CARD_TOPUP';

export type TrackerStageId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TrackerStageStatus = 'completed' | 'in_progress' | 'pending' | 'failed';

export interface TrackerStage {
  id: TrackerStageId;
  name: Record<string, string>;
  description: Record<string, string>;
  timestamp?: string;
  status: TrackerStageStatus;
  estimatedHoursRemaining?: number;
}

export interface SettlementRecord {
  referenceId: string;
  createdAt: string;
  updatedAt: string;
  direction: SettlementDirection;
  settlementType: SettlementType;
  sourceAmount: number;
  sourceCurrency: 'IQD' | 'RMB';
  targetAmount: number;
  targetCurrency: 'IQD' | 'RMB';
  exchangeRate: number;
  avoidedFees: {
    usdSpreadAmount: number;
    intermediaryFee: number;
    correspondentFee: number;
    totalSaved: number;
    savingsPercent: number;
  };
  payer: {
    organizationName: string;
    contactPerson: string;
    email: string;
    phone: string;
    country: string;
    taxRegNumber?: string;
  };
  beneficiary: {
    name: string;
    country: string;
    bankName: string;
    swiftBic?: string;
    accountNumber: string;
  };
  compliance: {
    kycStatus: 'verified' | 'in_review' | 'pending';
    cbiApproved: boolean;
    pbocApproved: boolean;
    cipsTracked: boolean;
    sanctionsScreened: boolean;
  };
  currentStage: TrackerStageId;
  stages: TrackerStage[];
  estimatedSettlementDate: string;
  executingBank: string;
  txHash?: string;
}

export interface SettlementInquiryFormData {
  organizationName: string;
  organizationType: 'CORPORATION' | 'SME' | 'GOVERNMENT_TIED' | 'INDIVIDUAL_TRADER';
  countryOfRegistration: string;
  commercialRegNumber: string;
  taxRegNumber: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  locale: string;
  direction: SettlementDirection;
  settlementType: SettlementType;
  sourceAmount: number;
  sourceCurrency: 'IQD' | 'RMB';
  counterpartyName: string;
  counterpartyCountry: string;
  counterpartyBank: string;
  counterpartySwift?: string;
  counterpartyAccount: string;
  purpose: string;
  hsCodes?: string;
  invoiceReference?: string;
  sanctionsAttested: boolean;
  antiMoneyLaunderingAttested: boolean;
  cbiComplianceAttested: boolean;
  beneficialOwnerAttested: boolean;
  facilitationRoleUnderstood: boolean;
}

export interface CardRegistrationData {
  fullNameOnCard: string; // Latin, max 26 chars
  legalName: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationalId: string;
  email: string;
  phone: string;
  residentialAddress: string;
  employmentStatus: string;
  incomeRange: string;
  cardScheme: 'VISA' | 'MASTERCARD';
  cardTier: 'CLASSIC' | 'GOLD' | 'PLATINUM' | 'WORLD';
  primaryCurrency: 'IQD' | 'RMB' | 'DUAL';
  billingCurrency: 'IQD' | 'RMB';
  deliveryOption: 'DIGITAL' | 'PHYSICAL_BAGHDAD' | 'PHYSICAL_ERBIL' | 'PHYSICAL_SULAIMANIYAH';
  termsAccepted: boolean;
  cbiKycAccepted: boolean;
}

export interface LiveFxData {
  iqdPerRmb: number;
  rmbPerIqd: number;
  traditionalIqdPerRmb: number;
  traditionalRmbPerIqd: number;
  lastUpdated: string;
  directSpreadPercent: number;
  thirdCurrencySpreadPercent: number;
  cbiReferenceCode: string;
  pbocProtocolCode: string;
}
