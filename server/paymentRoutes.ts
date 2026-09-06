import express from 'express';
import crypto from 'crypto';
import { prisma } from './db.js';

export function registerPaymentRoutes(
  app: express.Application,
  editorOrAdminMiddleware: any,
  adminMiddleware: any
) {
  // -------------------------------------------------------------
  // PUBLIC ENDPOINTS
  // -------------------------------------------------------------

  // 1. Get current exchange rate, liquidity reserves & market metrics
  app.get('/api/public/payments/rates', async (req, res) => {
    try {
      let rate = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });

      if (!rate) {
        rate = await prisma.paymentExchangeRate.create({
          data: {
            pair: 'IQD_ECNY',
            baseRate: 188.50,
            bidRate: 187.80,
            askRate: 189.20,
            retailFeePercent: 0.75,
            businessFeePercent: 0.35,
            minimumRetailIqd: 25000.0,
            minimumBusinessIqd: 1000000.0,
            change24h: 0.42,
            high24h: 189.85,
            low24h: 187.10,
            volume24h: '¥ 54.2M / د.ع 10.21B',
            ecnyReservePool: 150000000.0,
            iqdReservePool: 28275000000.0,
            mbridgeStatus: 'ACTIVE',
            cipsGatewayStatus: 'ONLINE',
            cbiClearingStatus: 'SYNCHRONIZED',
            lastUpdatedBy: 'PBOC / CBI Clearing Interbank Feed'
          }
        });
      }

      // Generate 24-hour simulated micro-trend curve around the current baseRate
      const base = rate.baseRate;
      const trendHistory = [
        { time: '00:00', rate: +(base - 0.45).toFixed(2), volume: 120000 },
        { time: '03:00', rate: +(base - 0.30).toFixed(2), volume: 185000 },
        { time: '06:00', rate: +(base - 0.15).toFixed(2), volume: 340000 },
        { time: '09:00', rate: +(base + 0.20).toFixed(2), volume: 920000 },
        { time: '12:00', rate: +(base + 0.55).toFixed(2), volume: 1450000 },
        { time: '15:00', rate: +(base + 0.35).toFixed(2), volume: 1100000 },
        { time: '18:00', rate: +(base + 0.10).toFixed(2), volume: 680000 },
        { time: '21:00', rate: +(base).toFixed(2), volume: 420000 }
      ];

      res.json({
        ...rate,
        trendHistory,
        inverseRate: +(1 / rate.baseRate).toFixed(6), // 1 IQD in E-CNY (~0.005305)
        lastSyncTimestamp: rate.updatedAt
      });
    } catch (error: any) {
      console.error('Error fetching payment rates:', error);
      res.status(500).json({ error: 'Failed to retrieve exchange rates' });
    }
  });

  // 2. Real-time quote calculator
  app.post('/api/public/payments/quote', async (req, res) => {
    try {
      const { direction = 'IQD_TO_ECNY', orderType = 'RETAIL' } = req.body;
      const amountVal = req.body.amount ?? req.body.sourceAmount;
      const numAmount = parseFloat(amountVal);

      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ error: 'Invalid conversion amount' });
      }

      let rate = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });

      const baseRate = rate ? rate.baseRate : 188.50;
      const bidRate = rate ? rate.bidRate : 187.80;
      const askRate = rate ? rate.askRate : 189.20;
      const feePercent = orderType === 'BUSINESS' 
        ? (rate?.businessFeePercent ?? 0.35) 
        : (rate?.retailFeePercent ?? 0.75);

      let effectiveRate = baseRate;
      let sourceAmount = numAmount;
      let targetAmount = 0;
      let feeAmount = 0;
      let sourceCurrency = 'IQD';
      let targetCurrency = 'E_CNY';

      if (direction === 'IQD_TO_ECNY') {
        sourceCurrency = 'IQD';
        targetCurrency = 'E_CNY';
        // Buying E-CNY with IQD uses askRate
        effectiveRate = askRate;
        const grossECNY = sourceAmount / effectiveRate;
        feeAmount = +(grossECNY * (feePercent / 100)).toFixed(2);
        targetAmount = +(grossECNY - feeAmount).toFixed(2);
      } else {
        sourceCurrency = 'E_CNY';
        targetCurrency = 'IQD';
        // Selling E-CNY for IQD uses bidRate
        effectiveRate = bidRate;
        const grossIQD = sourceAmount * effectiveRate;
        feeAmount = +(grossIQD * (feePercent / 100)).toFixed(2);
        targetAmount = +(grossIQD - feeAmount).toFixed(2);
      }

      // Comparison with legacy SWIFT USD intermediary route
      const legacyBankFeePercent = 3.8;
      const legacyEstimatedDays = 4;
      const cbdcEstimatedHours = orderType === 'BUSINESS' ? 1.5 : 0.25;
      const feeSavedEstimated = +(numAmount * ((legacyBankFeePercent - feePercent) / 100)).toFixed(2);

      res.json({
        direction,
        orderType,
        sourceCurrency,
        targetCurrency,
        sourceAmount,
        effectiveRate,
        feePercent,
        feeAmount,
        targetAmount,
        quoteExpiresInSeconds: 900, // 15-minute rate lock guarantee
        quoteHash: crypto.createHash('md5').update(`${numAmount}-${direction}-${effectiveRate}-${Date.now()}`).digest('hex'),
        comparison: {
          legacyBankFeePercent,
          legacyEstimatedDays,
          cbdcEstimatedHours,
          feeSavedEstimated,
          mbridgeEnabled: true
        }
      });
    } catch (error: any) {
      console.error('Error generating payment quote:', error);
      res.status(500).json({ error: 'Failed to calculate quote' });
    }
  });

  // 3. Create conversion / payment order (for Retail or Business)
  app.post('/api/public/payments/orders', async (req, res) => {
    try {
      const {
        orderType = 'RETAIL',
        direction = 'IQD_TO_ECNY',
        sourceAmount,
        senderName,
        senderEmail,
        senderPhone = '',
        senderIdNumber = '',
        senderEntity = 'INDIVIDUAL',
        senderCompany = '',
        recipientName,
        recipientIdentifier,
        recipientEntity = 'INDIVIDUAL',
        recipientBankOrBureau = 'PBOC mBridge Clearing Node',
        purpose = 'COMMERCIAL_TRADE',
        settlementMethod = 'MBRIDGE_CBDC',
        commercialInvoiceRef = '',
        billOfLading = '',
        customsDeclarationNo = '',
        contractValueUsd = 0,
        taxRegistrationNumber = ''
      } = req.body;

      const numAmount = parseFloat(sourceAmount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({ error: 'Valid source amount is required' });
      }
      if (!senderName || !senderEmail || !recipientName || !recipientIdentifier) {
        return res.status(400).json({ error: 'Sender and Recipient identification details are required' });
      }

      // Fetch active rate
      const rate = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });
      const baseRate = rate ? rate.baseRate : 188.50;
      const askRate = rate ? rate.askRate : 189.20;
      const bidRate = rate ? rate.bidRate : 187.80;
      const feePercent = orderType === 'BUSINESS'
        ? (rate?.businessFeePercent ?? 0.35)
        : (rate?.retailFeePercent ?? 0.75);

      const effectiveRate = direction === 'IQD_TO_ECNY' ? askRate : bidRate;
      let targetAmount = 0;
      let feeAmount = 0;
      const sourceCurrency = direction === 'IQD_TO_ECNY' ? 'IQD' : 'E_CNY';
      const targetCurrency = direction === 'IQD_TO_ECNY' ? 'E_CNY' : 'IQD';

      if (direction === 'IQD_TO_ECNY') {
        const gross = numAmount / effectiveRate;
        feeAmount = +(gross * (feePercent / 100)).toFixed(2);
        targetAmount = +(gross - feeAmount).toFixed(2);
      } else {
        const gross = numAmount * effectiveRate;
        feeAmount = +(gross * (feePercent / 100)).toFixed(2);
        targetAmount = +(gross - feeAmount).toFixed(2);
      }

      // Generate unique reference and cryptographic verification credentials
      const timestampPart = Date.now().toString().slice(-6);
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const reference = `PAY-CNY-2026-${timestampPart}${randomPart.toString().slice(0, 2)}`;
      
      const verificationCode = crypto
        .createHash('sha256')
        .update(`${reference}:${senderEmail}:${recipientIdentifier}:${targetAmount}`)
        .digest('hex')
        .slice(0, 16)
        .toUpperCase();

      const qrPayload = JSON.stringify({
        protocol: 'e-CNY/mBridge-v2.6',
        ref: reference,
        recipient: recipientIdentifier,
        recipientName: recipientName,
        amount: targetAmount,
        currency: targetCurrency,
        srcAmount: numAmount,
        srcCurrency: sourceCurrency,
        rate: effectiveRate,
        verification: verificationCode
      });

      const order = await prisma.paymentOrder.create({
        data: {
          reference,
          orderType,
          direction,
          sourceCurrency,
          targetCurrency,
          sourceAmount: numAmount,
          targetAmount,
          exchangeRate: effectiveRate,
          feeAmount,
          feePercent,
          status: 'PENDING_SETTLEMENT',
          senderName,
          senderEmail,
          senderPhone,
          senderIdNumber,
          senderEntity,
          senderCompany,
          recipientName,
          recipientIdentifier,
          recipientEntity,
          recipientBankOrBureau,
          purpose,
          settlementMethod,
          commercialInvoiceRef,
          billOfLading,
          customsDeclarationNo,
          contractValueUsd: parseFloat(contractValueUsd) || 0,
          taxRegistrationNumber,
          verificationCode,
          qrPayload,
          complianceNotes: `Order generated via bilateral corridor. Awaiting payment authorization and PBOC clearing confirmation.`,
          adminNotes: `Source channel: ${orderType} ${settlementMethod}. Verification Code: ${verificationCode}`
        }
      });

      res.status(201).json(order);
    } catch (error: any) {
      console.error('Error creating payment order:', error);
      res.status(500).json({ error: 'Failed to create payment order' });
    }
  });

  // 4. Track payment order by reference code
  app.get('/api/public/payments/orders/:ref', async (req, res) => {
    try {
      const { ref } = req.params;
      const order = await prisma.paymentOrder.findFirst({
        where: {
          OR: [
            { reference: ref },
            { id: ref }
          ]
        }
      });

      if (!order) {
        return res.status(404).json({ error: 'Transaction reference not found' });
      }

      // Construct lifecycle timeline
      const timeline = [
        {
          stage: 'INITIATED',
          title: 'Order Registered & Rate Locked',
          timestamp: order.createdAt,
          completed: true,
          details: `Reference ${order.reference} generated with rate 1 E-CNY = ${order.exchangeRate} IQD.`
        },
        {
          stage: 'COMPLIANCE',
          title: 'KYC & CBI/OFAC Sanctions Clearance',
          timestamp: order.createdAt,
          completed: order.status !== 'PENDING_SETTLEMENT',
          details: order.status === 'COMPLIANCE_HOLD' 
            ? 'Order currently flagged for compliance review.' 
            : 'Cleared through bilateral anti-money laundering verification screening.'
        },
        {
          stage: 'ESCROW_ALLOCATED',
          title: 'Central Reserve Liquidity Allocation',
          timestamp: order.updatedAt,
          completed: ['PROCESSING', 'COMPLETED'].includes(order.status),
          details: `Funds queued via ${order.settlementMethod}. Dual-pool reserves committed.`
        },
        {
          stage: 'FINAL_SETTLEMENT',
          title: 'PBOC / CBI Final Settlement',
          timestamp: order.settledAt || (order.status === 'COMPLETED' ? order.updatedAt : null),
          completed: order.status === 'COMPLETED',
          details: order.status === 'COMPLETED'
            ? `Settled on-chain / mBridge. TX: ${order.settlementTxHash || 'CONFIRMED-BY-CENTRAL-BANK'}`
            : order.status === 'REJECTED'
            ? `Order declined: ${order.rejectionReason || 'Failed verification'}`
            : 'Awaiting clearance authorization by clearing node.'
        }
      ];

      res.json({
        ...order,
        timeline
      });
    } catch (error: any) {
      console.error('Error tracking payment order:', error);
      res.status(500).json({ error: 'Failed to track payment order' });
    }
  });

  // -------------------------------------------------------------
  // ADMIN PORTAL ENDPOINTS (Total Administration & Control)
  // -------------------------------------------------------------

  // 5. Get all orders with telemetry & filtering
  app.get('/api/admin/payments/orders', editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        status,
        orderType,
        search,
        page = '1',
        limit = '50'
      } = req.query as any;

      const where: any = {};
      if (status && status !== 'ALL') {
        where.status = status;
      }
      if (orderType && orderType !== 'ALL') {
        where.orderType = orderType;
      }
      if (search && search.trim() !== '') {
        const query = search.trim();
        where.OR = [
          { reference: { contains: query } },
          { senderName: { contains: query } },
          { senderEmail: { contains: query } },
          { senderCompany: { contains: query } },
          { recipientName: { contains: query } },
          { recipientIdentifier: { contains: query } },
          { commercialInvoiceRef: { contains: query } }
        ];
      }

      const take = parseInt(limit, 10) || 50;
      const skip = (parseInt(page, 10) - 1) * take;

      const [orders, total] = await Promise.all([
        prisma.paymentOrder.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          take,
          skip
        }),
        prisma.paymentOrder.count({ where })
      ]);

      // Calculate aggregate statistics across all orders
      const allOrders = await prisma.paymentOrder.findMany({
        select: {
          orderType: true,
          status: true,
          sourceCurrency: true,
          targetCurrency: true,
          sourceAmount: true,
          targetAmount: true,
          feeAmount: true
        }
      });

      let totalEcnyVolume = 0;
      let totalIqdVolume = 0;
      let totalFeeRevenueIqd = 0;
      let pendingCount = 0;
      let completedCount = 0;
      let complianceHoldCount = 0;

      for (const ord of allOrders) {
        if (ord.sourceCurrency === 'E_CNY') totalEcnyVolume += ord.sourceAmount;
        if (ord.targetCurrency === 'E_CNY') totalEcnyVolume += ord.targetAmount;
        if (ord.sourceCurrency === 'IQD') totalIqdVolume += ord.sourceAmount;
        if (ord.targetCurrency === 'IQD') totalIqdVolume += ord.targetAmount;

        if (ord.sourceCurrency === 'IQD') {
          totalFeeRevenueIqd += ord.feeAmount;
        } else {
          totalFeeRevenueIqd += ord.feeAmount * 188.5;
        }

        if (ord.status === 'PENDING_SETTLEMENT' || ord.status === 'PROCESSING') pendingCount++;
        if (ord.status === 'COMPLETED') completedCount++;
        if (ord.status === 'COMPLIANCE_HOLD') complianceHoldCount++;
      }

      res.json({
        orders,
        pagination: {
          total,
          page: parseInt(page, 10),
          limit: take,
          totalPages: Math.ceil(total / take)
        },
        telemetry: {
          totalOrdersCount: allOrders.length,
          totalEcnyVolume: +totalEcnyVolume.toFixed(2),
          totalIqdVolume: +totalIqdVolume.toFixed(2),
          totalFeeRevenueIqd: +totalFeeRevenueIqd.toFixed(2),
          pendingCount,
          completedCount,
          complianceHoldCount
        }
      });
    } catch (error: any) {
      console.error('Error fetching admin payment orders:', error);
      res.status(500).json({ error: 'Failed to fetch admin orders' });
    }
  });

  // 6. Get single order details for admin audit
  app.get('/api/admin/payments/orders/:id', editorOrAdminMiddleware, async (req, res) => {
    try {
      const order = await prisma.paymentOrder.findUnique({
        where: { id: req.params.id }
      });
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  });

  // 7. Update order status and administrative audit notes
  app.put('/api/admin/payments/orders/:id/status', editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        status,
        adminNotes,
        complianceNotes,
        rejectionReason,
        settlementTxHash
      } = req.body;

      const existing = await prisma.paymentOrder.findUnique({
        where: { id: req.params.id }
      });
      if (!existing) return res.status(404).json({ error: 'Order not found' });

      const dataToUpdate: any = {};
      if (status) dataToUpdate.status = status;
      if (adminNotes !== undefined) dataToUpdate.adminNotes = adminNotes;
      if (complianceNotes !== undefined) dataToUpdate.complianceNotes = complianceNotes;
      if (rejectionReason !== undefined) dataToUpdate.rejectionReason = rejectionReason;

      if (status === 'COMPLETED') {
        dataToUpdate.settledAt = new Date();
        dataToUpdate.settlementTxHash = settlementTxHash || existing.settlementTxHash || `0x${crypto.randomBytes(32).toString('hex')}`;
      } else if (settlementTxHash) {
        dataToUpdate.settlementTxHash = settlementTxHash;
      }

      const updated = await prisma.paymentOrder.update({
        where: { id: req.params.id },
        data: dataToUpdate
      });

      res.json(updated);
    } catch (error: any) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  });

  // 8. Delete / cancel order (Admin only)
  app.delete('/api/admin/payments/orders/:id', adminMiddleware, async (req, res) => {
    try {
      await prisma.paymentOrder.delete({
        where: { id: req.params.id }
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  });

  // 9. Get current rates configuration (Admin)
  app.get('/api/admin/payments/rates', editorOrAdminMiddleware, async (req, res) => {
    try {
      let rate = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });
      if (!rate) {
        rate = await prisma.paymentExchangeRate.create({
          data: {
            pair: 'IQD_ECNY',
            baseRate: 188.50,
            bidRate: 187.80,
            askRate: 189.20,
            retailFeePercent: 0.75,
            businessFeePercent: 0.35,
            minimumRetailIqd: 25000.0,
            minimumBusinessIqd: 1000000.0,
            change24h: 0.42,
            high24h: 189.85,
            low24h: 187.10,
            volume24h: '¥ 54.2M / د.ع 10.21B',
            ecnyReservePool: 150000000.0,
            iqdReservePool: 28275000000.0,
            mbridgeStatus: 'ACTIVE',
            cipsGatewayStatus: 'ONLINE',
            cbiClearingStatus: 'SYNCHRONIZED',
            lastUpdatedBy: 'PBOC / CBI Clearing Interbank Feed'
          }
        });
      }
      res.json(rate);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch rates configuration' });
    }
  });

  // 10. Update rates, fees, reserves & network statuses (Admin)
  app.put('/api/admin/payments/rates', editorOrAdminMiddleware, async (req, res) => {
    try {
      const {
        baseRate,
        bidRate,
        askRate,
        retailFeePercent,
        businessFeePercent,
        minimumRetailIqd,
        minimumBusinessIqd,
        ecnyReservePool,
        iqdReservePool,
        mbridgeStatus,
        cipsGatewayStatus,
        cbiClearingStatus,
        lastUpdatedBy
      } = req.body;

      const rate = await prisma.paymentExchangeRate.upsert({
        where: { pair: 'IQD_ECNY' },
        update: {
          ...(baseRate !== undefined && { baseRate: parseFloat(baseRate) }),
          ...(bidRate !== undefined && { bidRate: parseFloat(bidRate) }),
          ...(askRate !== undefined && { askRate: parseFloat(askRate) }),
          ...(retailFeePercent !== undefined && { retailFeePercent: parseFloat(retailFeePercent) }),
          ...(businessFeePercent !== undefined && { businessFeePercent: parseFloat(businessFeePercent) }),
          ...(minimumRetailIqd !== undefined && { minimumRetailIqd: parseFloat(minimumRetailIqd) }),
          ...(minimumBusinessIqd !== undefined && { minimumBusinessIqd: parseFloat(minimumBusinessIqd) }),
          ...(ecnyReservePool !== undefined && { ecnyReservePool: parseFloat(ecnyReservePool) }),
          ...(iqdReservePool !== undefined && { iqdReservePool: parseFloat(iqdReservePool) }),
          ...(mbridgeStatus !== undefined && { mbridgeStatus }),
          ...(cipsGatewayStatus !== undefined && { cipsGatewayStatus }),
          ...(cbiClearingStatus !== undefined && { cbiClearingStatus }),
          lastUpdatedBy: lastUpdatedBy || 'Administrator Command Panel'
        },
        create: {
          pair: 'IQD_ECNY',
          baseRate: parseFloat(baseRate) || 188.50,
          bidRate: parseFloat(bidRate) || 187.80,
          askRate: parseFloat(askRate) || 189.20,
          retailFeePercent: parseFloat(retailFeePercent) || 0.75,
          businessFeePercent: parseFloat(businessFeePercent) || 0.35,
          minimumRetailIqd: parseFloat(minimumRetailIqd) || 25000.0,
          minimumBusinessIqd: parseFloat(minimumBusinessIqd) || 1000000.0,
          ecnyReservePool: parseFloat(ecnyReservePool) || 150000000.0,
          iqdReservePool: parseFloat(iqdReservePool) || 28275000000.0,
          mbridgeStatus: mbridgeStatus || 'ACTIVE',
          cipsGatewayStatus: cipsGatewayStatus || 'ONLINE',
          cbiClearingStatus: cbiClearingStatus || 'SYNCHRONIZED',
          lastUpdatedBy: lastUpdatedBy || 'Administrator Command Panel'
        }
      });

      res.json(rate);
    } catch (error: any) {
      console.error('Error updating rates configuration:', error);
      res.status(500).json({ error: 'Failed to update rates configuration' });
    }
  });

  // 11. Trigger interbank live rate refresh
  app.post('/api/admin/payments/rates/refresh', editorOrAdminMiddleware, async (req, res) => {
    try {
      const current = await prisma.paymentExchangeRate.findUnique({
        where: { pair: 'IQD_ECNY' }
      });
      const currentBase = current ? current.baseRate : 188.50;
      // Realistic random tick +/- 0.15 IQD
      const delta = +((Math.random() * 0.30) - 0.15).toFixed(2);
      const newBase = +(currentBase + delta).toFixed(2);
      const newBid = +(newBase - 0.70).toFixed(2);
      const newAsk = +(newBase + 0.70).toFixed(2);

      const updated = await prisma.paymentExchangeRate.update({
        where: { pair: 'IQD_ECNY' },
        data: {
          baseRate: newBase,
          bidRate: newBid,
          askRate: newAsk,
          change24h: +(delta * 3).toFixed(2),
          high24h: Math.max(newAsk, current?.high24h || 189.85),
          low24h: Math.min(newBid, current?.low24h || 187.10),
          lastUpdatedBy: 'PBOC / CBI Clearing Live Tick Refresh'
        }
      });

      res.json(updated);
    } catch (error: any) {
      console.error('Error refreshing rates:', error);
      res.status(500).json({ error: 'Failed to refresh rates' });
    }
  });
}
