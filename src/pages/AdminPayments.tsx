import { apiFetch } from "../lib/api";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Locale, PaymentExchangeRate, PaymentOrder } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Coins, 
  ShieldCheck, 
  Building2, 
  User, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  FileText, 
  Sliders, 
  Save, 
  ArrowRightLeft,
  DollarSign,
  TrendingUp,
  Database,
  Printer,
  Eye,
  Check
} from 'lucide-react';
import { PaymentReceiptModal } from '../components/payments/PaymentReceiptModal';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function AdminPayments() {
  const { lang = 'en' } = useParams<{ lang: Locale }>();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'ORDERS' | 'RATES' | 'TELEMETRY'>('ORDERS');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  
  // Selected order for detailed modal or receipt
  const [selectedOrder, setSelectedOrder] = useState<PaymentOrder | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Compliance action state
  const [actionNotes, setActionNotes] = useState('');
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Rate config form state
  const [rateForm, setRateForm] = useState<{
    baseRate: number;
    bidRate: number;
    askRate: number;
    retailFeePercent: number;
    businessFeePercent: number;
    minimumRetailIqd: number;
    minimumBusinessIqd: number;
    mbridgeStatus: string;
    cipsGatewayStatus: string;
    cbiClearingStatus: string;
  } | null>(null);

  // Fetch orders from admin API
  const { 
    data: ordersData, 
    isLoading: isLoadingOrders, 
    refetch: refetchOrders 
  } = useQuery<{
    success: boolean;
    orders: PaymentOrder[];
    telemetry: {
      totalOrders: number;
      totalEcnyVolume: number;
      totalIqdVolume: number;
      pendingCount: number;
      holdCount: number;
      completedCount: number;
    };
  }>({
    queryKey: ['adminPaymentOrders'],
    queryFn: async () => {
      const res = await apiFetch('/api/admin/payments/orders', {
        headers: {
        }
      });
      if (!res.ok) throw new Error('Failed to fetch payment orders');
      return res.json();
    }
  });

  // Fetch rates
  const { 
    data: ratesData, 
    refetch: refetchRates 
  } = useQuery<{ success: boolean; data: PaymentExchangeRate }>({
    queryKey: ['adminPaymentRates'],
    queryFn: async () => {
      const res = await apiFetch('/api/public/payments/rates');
      if (!res.ok) throw new Error('Failed to fetch rates');
      const json = await res.json();
      if (json.data && !rateForm) {
        setRateForm({
          baseRate: json.data.baseRate,
          bidRate: json.data.bidRate,
          askRate: json.data.askRate,
          retailFeePercent: json.data.retailFeePercent,
          businessFeePercent: json.data.businessFeePercent,
          minimumRetailIqd: json.data.minimumRetailIqd,
          minimumBusinessIqd: json.data.minimumBusinessIqd,
          mbridgeStatus: json.data.mbridgeStatus || 'ACTIVE',
          cipsGatewayStatus: json.data.cipsGatewayStatus || 'ONLINE',
          cbiClearingStatus: json.data.cbiClearingStatus || 'SYNCHRONIZED'
        });
      }
      return json;
    }
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status, adminNotes, complianceNotes, rejectionReason }: {
      orderId: string;
      status: string;
      adminNotes?: string;
      complianceNotes?: string;
      rejectionReason?: string;
    }) => {
      const res = await apiFetch(`/api/admin/payments/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, adminNotes, complianceNotes, rejectionReason })
      });
      if (!res.ok) throw new Error('Failed to update order status');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPaymentOrders'] });
      setIsDetailModalOpen(false);
      setActionNotes('');
    }
  });

  // Save rates mutation
  const saveRatesMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await apiFetch('/api/admin/payments/rates', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to save exchange rate settings');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPaymentRates'] });
      queryClient.invalidateQueries({ queryKey: ['paymentRates'] });
      alert('Exchange rate & fee settings updated successfully.');
    }
  });

  // Simulate tick mutation
  const simulateTickMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch('/api/admin/payments/rates/tick', {
        method: 'POST',
        headers: {
        }
      });
      if (!res.ok) throw new Error('Failed to tick rates');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['adminPaymentRates'] });
      queryClient.invalidateQueries({ queryKey: ['paymentRates'] });
      if (data.rate) {
        setRateForm(prev => prev ? ({
          ...prev,
          baseRate: data.rate.baseRate,
          bidRate: data.rate.bidRate,
          askRate: data.rate.askRate
        }) : null);
      }
    }
  });

  const orders = ordersData?.orders || [];
  const telemetry = ordersData?.telemetry || {
    totalOrders: orders.length,
    totalEcnyVolume: 0,
    totalIqdVolume: 0,
    pendingCount: 0,
    holdCount: 0,
    completedCount: 0
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && o.orderType !== typeFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        o.reference.toLowerCase().includes(q) ||
        o.senderName.toLowerCase().includes(q) ||
        (o.senderCompany && o.senderCompany.toLowerCase().includes(q)) ||
        o.recipientName.toLowerCase().includes(q) ||
        o.recipientIdentifier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (status: string) => {
    if (!selectedOrder) return;
    setIsProcessingAction(true);
    try {
      await updateStatusMutation.mutateAsync({
        orderId: selectedOrder.id,
        status,
        adminNotes: actionNotes,
        complianceNotes: status === 'COMPLIANCE_HOLD' ? actionNotes : undefined,
        rejectionReason: status === 'REJECTED' ? actionNotes : undefined
      });
    } finally {
      setIsProcessingAction(false);
    }
  };

  return (
    <ErrorBoundary lang={lang}>
      <div className="space-y-8 font-sans text-start">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-medium font-bold text-brand-800 dark:text-brand-400 uppercase tracking-wider">
              <Coins size={14} />
              <span>Sino-Iraqi Sovereign FinTech Clearing Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-black text-brand-800 dark:text-white">
              IQD & E-CNY Payment Service Provider Portal
            </h1>
            <p className="text-xs text-neutral-500 max-w-2xl">
              Direct oversight, settlement approval, liquidity management, and exchange rate parameters under PBOC & CBI protocols.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { refetchOrders(); refetchRates(); }}
              className="px-3.5 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-ink-900 dark:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Refresh Ledger</span>
            </button>
          </div>
        </div>

        {/* Telemetry Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-neutral-400 block mb-1">
              Total Orders
            </span>
            <span className="text-xl font-medium font-black text-ink-900 dark:text-white">
              {telemetry.totalOrders}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-neutral-400 block mb-1">
              e-CNY Cleared
            </span>
            <span className="text-xl font-medium font-black text-amber-500 truncate">
              ¥ {telemetry.totalEcnyVolume.toLocaleString()}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-neutral-400 block mb-1">
              IQD Cleared
            </span>
            <span className="text-xl font-medium font-black text-emerald-600 dark:text-emerald-400 truncate">
              د.ع {(telemetry.totalIqdVolume / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-blue-500 block mb-1">
              Pending Queue
            </span>
            <span className="text-xl font-medium font-black text-blue-600 dark:text-blue-400">
              {telemetry.pendingCount}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-purple-500 block mb-1">
              Compliance Hold
            </span>
            <span className="text-xl font-medium font-black text-purple-600 dark:text-purple-400">
              {telemetry.holdCount}
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
            <span className="text-xs font-medium uppercase text-emerald-500 block mb-1">
              Settled / Active
            </span>
            <span className="text-xl font-medium font-black text-emerald-600 dark:text-emerald-400">
              {telemetry.completedCount}
            </span>
          </div>

        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ORDERS'
                ? 'bg-brand-800 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 hover:text-brand-800'
            }`}
          >
            <Coins size={14} />
            <span>Orders Ledger ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('RATES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'RATES'
                ? 'bg-brand-800 text-white shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 hover:text-brand-800'
            }`}
          >
            <Sliders size={14} />
            <span>Exchange Rates & Fees Control</span>
          </button>
        </div>

        {/* Tab 1: Orders Ledger */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reference, company, or payer..."
                  className="w-full text-xs font-medium p-2.5 ps-8 pe-3 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:border-brand-800 focus:outline-none"
                />
                <Search size={14} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING_SETTLEMENT">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="COMPLIANCE_HOLD">Compliance Hold</option>
                  <option value="REJECTED">Rejected</option>
                </select>

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="text-xs p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                >
                  <option value="ALL">All Customer Types</option>
                  <option value="RETAIL">Retail Only</option>
                  <option value="BUSINESS">Corporate B2B Only</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-700 font-medium text-xs uppercase text-neutral-500">
                    <tr>
                      <th className="p-3.5 text-start">Reference</th>
                      <th className="p-3.5 text-start">Type & Channel</th>
                      <th className="p-3.5 text-start">Payer / Remitter</th>
                      <th className="p-3.5 text-start">Beneficiary (China/IQ)</th>
                      <th className="p-3.5 text-end">Sent</th>
                      <th className="p-3.5 text-end">Rate</th>
                      <th className="p-3.5 text-end">Net Credited</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-sans">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-neutral-400">
                          No payment transactions match current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                          <td className="p-3.5 font-medium font-bold text-brand-800 dark:text-brand-400">
                            {order.reference}
                          </td>

                          <td className="p-3.5">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium font-bold ${
                              order.orderType === 'BUSINESS'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300'
                            }`}>
                              {order.orderType}
                            </span>
                            <span className="text-xs text-neutral-400 block mt-0.5">
                              Rail: {order.settlementMethod}
                            </span>
                          </td>

                          <td className="p-3.5 font-medium">
                            <div className="font-bold text-ink-900 dark:text-white">
                              {order.senderCompany || order.senderName}
                            </div>
                            <div className="text-xs text-neutral-400">{order.senderEmail}</div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-ink-900 dark:text-white">
                              {order.recipientName}
                            </div>
                            <div className="text-xs font-medium text-neutral-400 truncate max-w-[140px]">
                              {order.recipientIdentifier}
                            </div>
                          </td>

                          <td className="p-3.5 text-end font-medium font-bold text-ink-900 dark:text-white">
                            {order.sourceAmount.toLocaleString()} {order.sourceCurrency}
                          </td>

                          <td className="p-3.5 text-end font-medium text-neutral-500">
                            {order.exchangeRate.toFixed(2)}
                          </td>

                          <td className="p-3.5 text-end font-medium font-bold text-brand-800 dark:text-brand-400">
                            {order.targetAmount.toLocaleString()} {order.targetCurrency}
                          </td>

                          <td className="p-3.5 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium font-bold ${
                              order.status === 'COMPLETED'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : order.status === 'PROCESSING'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : order.status === 'COMPLIANCE_HOLD'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                : order.status === 'REJECTED'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            }`}>
                              {order.status}
                            </span>
                          </td>

                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setActionNotes(order.complianceNotes || order.adminNotes || '');
                                  setIsDetailModalOpen(true);
                                }}
                                title="Manage & Review Order"
                                className="p-1.5 bg-neutral-100 hover:bg-brand-800 hover:text-white rounded text-neutral-600 transition-colors cursor-pointer"
                              >
                                <Eye size={13} />
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsReceiptModalOpen(true);
                                }}
                                title="Print Certificate"
                                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 rounded text-neutral-600 transition-colors cursor-pointer"
                              >
                                <Printer size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Exchange Rates & Fees Control */}
        {activeTab === 'RATES' && rateForm && (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-700 pb-4">
              <div>
                <h3 className="text-lg font-bold font-black text-brand-800 dark:text-white">
                  Exchange Rate & Fee Parameter Configuration
                </h3>
                <p className="text-xs text-neutral-500">
                  Direct control of PBOC e-CNY / CBI IQD spread, retail fees, and clearing thresholds.
                </p>
              </div>

              <button
                type="button"
                onClick={() => simulateTickMutation.mutate()}
                disabled={simulateTickMutation.isPending}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <TrendingUp size={14} />
                <span>{simulateTickMutation.isPending ? 'Ticking...' : 'Simulate Live Market Tick'}</span>
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                saveRatesMutation.mutate(rateForm);
              }}
              className="space-y-6"
            >
              {/* Rate Sliders & Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <label className="block text-[11px] font-medium font-bold uppercase text-neutral-500 mb-1">
                    Official Base Rate (IQD per 1 e-CNY)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={rateForm.baseRate}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setRateForm({
                        ...rateForm,
                        baseRate: val,
                        bidRate: +(val - 0.70).toFixed(2),
                        askRate: +(val + 0.70).toFixed(2)
                      });
                    }}
                    className="w-full text-xl font-medium font-black p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-ink-900 dark:text-white"
                  />
                  <span className="text-xs text-neutral-400 block mt-1">
                    Sets baseline for retail & wholesale quoting
                  </span>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <label className="block text-[11px] font-medium font-bold uppercase text-neutral-500 mb-1">
                    Wholesale Bid Rate (e-CNY → IQD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={rateForm.bidRate}
                    onChange={(e) => setRateForm({ ...rateForm, bidRate: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xl font-medium font-black p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-ink-900 dark:text-white"
                  />
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <label className="block text-[11px] font-medium font-bold uppercase text-neutral-500 mb-1">
                    Wholesale Ask Rate (IQD → e-CNY)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={rateForm.askRate}
                    onChange={(e) => setRateForm({ ...rateForm, askRate: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xl font-medium font-black p-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg text-ink-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Fee Percentages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <label className="block text-[11px] font-medium font-bold uppercase text-neutral-500 mb-1">
                    Retail Consumer Fee (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.05"
                      min="0.1"
                      max="5"
                      value={rateForm.retailFeePercent}
                      onChange={(e) => setRateForm({ ...rateForm, retailFeePercent: parseFloat(e.target.value) || 0 })}
                      className="w-32 text-lg font-medium font-bold p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                    />
                    <span className="text-xs text-neutral-500">Default: 0.75% (Tuition & Family Remittances)</span>
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <label className="block text-[11px] font-medium font-bold uppercase text-neutral-500 mb-1">
                    Corporate Wholesale Fee (%)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.05"
                      min="0.05"
                      max="3"
                      value={rateForm.businessFeePercent}
                      onChange={(e) => setRateForm({ ...rateForm, businessFeePercent: parseFloat(e.target.value) || 0 })}
                      className="w-32 text-lg font-medium font-bold p-2 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                    />
                    <span className="text-xs text-neutral-500">Default: 0.35% (Bulk trade & customs)</span>
                  </div>
                </div>
              </div>

              {/* Gateway Operational Statuses */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-medium uppercase text-neutral-500 mb-1">
                    mBridge CBDC Protocol
                  </label>
                  <select
                    value={rateForm.mbridgeStatus}
                    onChange={(e) => setRateForm({ ...rateForm, mbridgeStatus: e.target.value })}
                    className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                  >
                    <option value="ACTIVE">ACTIVE (Full Speed)</option>
                    <option value="DEGRADED">DEGRADED (Queued)</option>
                    <option value="MAINTENANCE">MAINTENANCE (Paused)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase text-neutral-500 mb-1">
                    CIPS Interbank Node
                  </label>
                  <select
                    value={rateForm.cipsGatewayStatus}
                    onChange={(e) => setRateForm({ ...rateForm, cipsGatewayStatus: e.target.value })}
                    className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                  >
                    <option value="ONLINE">ONLINE (Direct Sync)</option>
                    <option value="OFFLINE">OFFLINE (Batch Clearing)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase text-neutral-500 mb-1">
                    CBI Direct Clearance
                  </label>
                  <select
                    value={rateForm.cbiClearingStatus}
                    onChange={(e) => setRateForm({ ...rateForm, cbiClearingStatus: e.target.value })}
                    className="w-full text-xs p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg"
                  >
                    <option value="SYNCHRONIZED">SYNCHRONIZED (Real-Time)</option>
                    <option value="QUEUED">QUEUED (EOD Batch)</option>
                  </select>
                </div>
              </div>

              {/* Submit Save */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saveRatesMutation.isPending}
                  className="px-6 py-2.5 bg-brand-800 hover:bg-brand-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save size={14} />
                  <span>{saveRatesMutation.isPending ? 'Saving...' : 'Save & Publish Rates'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Order Detail & Action Modal */}
        {isDetailModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
            <div className="bg-white dark:bg-neutral-900 border-2 border-ink-900 dark:border-neutral-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
              
              <div className="bg-ink-900 text-white p-5 flex items-center justify-between border-b-2 border-brand-800">
                <div className="flex items-center gap-2 font-medium text-xs">
                  <Coins size={16} className="text-amber-400" />
                  <span className="font-bold">{selectedOrder.reference}</span>
                  <span className="text-neutral-400">({selectedOrder.orderType})</span>
                </div>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-1 rounded hover:bg-white/10 text-neutral-300"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
                
                {/* Financial Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-medium">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <span className="text-xs text-neutral-400 uppercase block">Source Amount</span>
                    <span className="font-bold text-ink-900 dark:text-white text-sm">
                      {selectedOrder.sourceAmount.toLocaleString()} {selectedOrder.sourceCurrency}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
                    <span className="text-xs text-neutral-400 uppercase block">Exchange Rate</span>
                    <span className="font-bold text-ink-900 dark:text-white text-sm">
                      {selectedOrder.exchangeRate.toFixed(2)}
                    </span>
                  </div>

                  <div className="p-3 bg-brand-50/50 dark:bg-brand-950/40 rounded-lg border border-brand-200 dark:border-brand-800">
                    <span className="text-xs text-brand-800 dark:text-brand-300 uppercase block">Net Target</span>
                    <span className="font-bold text-brand-800 dark:text-brand-300 text-sm">
                      {selectedOrder.targetAmount.toLocaleString()} {selectedOrder.targetCurrency}
                    </span>
                  </div>
                </div>

                {/* Parties */}
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl divide-y divide-neutral-200 dark:divide-neutral-700">
                  <div className="p-3">
                    <span className="text-neutral-500 font-bold block text-xs uppercase">Remitter:</span>
                    <div className="font-bold text-ink-900 dark:text-white">
                      {selectedOrder.senderCompany ? `${selectedOrder.senderCompany} • ${selectedOrder.senderName}` : selectedOrder.senderName}
                    </div>
                    <div className="text-neutral-500">{selectedOrder.senderEmail} • {selectedOrder.senderPhone}</div>
                    {selectedOrder.taxRegistrationNumber && (
                      <div className="font-medium text-neutral-400">TIN: {selectedOrder.taxRegistrationNumber}</div>
                    )}
                  </div>

                  <div className="p-3">
                    <span className="text-neutral-500 font-bold block text-xs uppercase">Beneficiary:</span>
                    <div className="font-bold text-ink-900 dark:text-white">{selectedOrder.recipientName}</div>
                    <div className="font-medium text-brand-800 dark:text-brand-400">Wallet/ID: {selectedOrder.recipientIdentifier}</div>
                    <div className="text-neutral-500">{selectedOrder.recipientBankOrBureau}</div>
                  </div>

                  <div className="p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-bold text-xs uppercase">Local Payment & Funding Rail:</span>
                      <span className="font-bold text-ink-900 dark:text-white">
                        {selectedOrder.settlementMethod === 'mBridge CBDC Direct' ? 'mBridge CBDC Protocol (Corporate Wholesale)' : selectedOrder.settlementMethod}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">
                      Source funding rail in Iraq, converted & cleared via sovereign bilateral corridors
                    </span>
                  </div>

                  {selectedOrder.commercialInvoiceRef && (
                    <div className="p-3 flex justify-between">
                      <span className="text-neutral-500">Invoice Ref:</span>
                      <span className="font-medium font-bold text-ink-900 dark:text-white">{selectedOrder.commercialInvoiceRef}</span>
                    </div>
                  )}

                  {selectedOrder.billOfLading && (
                    <div className="p-3 flex justify-between">
                      <span className="text-neutral-500">Bill of Lading:</span>
                      <span className="font-medium font-bold text-ink-900 dark:text-white">{selectedOrder.billOfLading}</span>
                    </div>
                  )}

                  {selectedOrder.customsDeclarationNo && (
                    <div className="p-3 flex justify-between">
                      <span className="text-neutral-500">Customs Clearance Code:</span>
                      <span className="font-medium font-bold text-ink-900 dark:text-white">{selectedOrder.customsDeclarationNo}</span>
                    </div>
                  )}
                </div>

                {/* Compliance / Officer Action Notes */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    Compliance & Officer Action Notes
                  </label>
                  <textarea
                    rows={3}
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Enter approval details, customs clearance notes, or hold justification..."
                    className="w-full p-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg text-xs"
                  />
                </div>

                {/* Status Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isProcessingAction}
                      onClick={() => handleStatusChange('COMPLETED')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} />
                      <span>Approve & Settle</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessingAction}
                      onClick={() => handleStatusChange('COMPLIANCE_HOLD')}
                      className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <AlertTriangle size={14} />
                      <span>Put on Hold</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessingAction}
                      onClick={() => handleStatusChange('REJECTED')}
                      className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <XCircle size={14} />
                      <span>Reject</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-600 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Certificate / Receipt Modal */}
        <PaymentReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          order={selectedOrder}
          lang={lang}
        />

      </div>
    </ErrorBoundary>
  );
}
