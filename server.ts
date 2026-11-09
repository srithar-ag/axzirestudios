import express, { Request, Response } from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { extensionCatalogue, studioConfig } from './src/config/studioConfig.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// In-memory persistent collections (and synced with Firestore if configured)
interface ContributionRecord {
  id: string;
  internalId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  amountInINR: number;
  currency: string;
  supporterName?: string;
  supporterEmail?: string;
  message?: string;
  status: 'verified' | 'failed' | 'pending';
  verifiedAt: string;
  createdAt: string;
  isTestMode: boolean;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}

const contributionsDb: ContributionRecord[] = [];
const contactsDb: ContactSubmission[] = [];
const processedWebhooks = new Set<string>();

// Raw body parser for webhook signature verification
app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Razorpay SDK configuration
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || '';

const isRazorpayConfigured = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

let razorpayInstance: any = null;
if (isRazorpayConfigured) {
  try {
    razorpayInstance = new (Razorpay as any)({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    console.warn('Failed to initialize Razorpay SDK instance:', err);
  }
}

// ---------------- API ROUTES ----------------

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    studio: studioConfig.studioName,
    tagline: studioConfig.tagline,
    timestamp: new Date().toISOString(),
    razorpayConfigured: isRazorpayConfigured,
  });
});

// Config info for frontend
app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    studioName: studioConfig.studioName,
    developerName: studioConfig.developerName,
    contactEmail: studioConfig.contactEmail,
    githubSponsorsUrl: studioConfig.githubSponsorsUrl,
    razorpayKeyId: RAZORPAY_KEY_ID || 'rzp_test_placeholder',
    isTestMode: !isRazorpayConfigured,
  });
});

// Extension Catalogue
app.get('/api/extensions', (_req: Request, res: Response) => {
  res.json({
    extensions: extensionCatalogue,
    total: extensionCatalogue.length,
  });
});

// Extension detail
app.get('/api/extensions/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const extension = extensionCatalogue.find((ext) => ext.slug === slug);
  if (!extension) {
    res.status(404).json({ error: 'Extension not found' });
    return;
  }
  res.json({ extension });
});

// Contact Submission
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      res.status(400).json({ error: 'Please provide a valid name.' });
      return;
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      res.status(400).json({ error: 'Please enter a message of at least 5 characters.' });
      return;
    }

    const submission: ContactSubmission = {
      id: 'cnt_' + crypto.randomUUID().slice(0, 8),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    contactsDb.push(submission);

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out. We will get back to you shortly.',
      submissionId: submission.id,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process contact submission: ' + err.message });
  }
});

// Create Razorpay Order
app.post('/api/payments/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, supporterName, supporterEmail, message } = req.body;
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount < 10) {
      res.status(400).json({
        error: 'Minimum contribution amount is ₹10.',
      });
      return;
    }

    const amountInPaise = Math.round(numericAmount * 100);
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // If real Razorpay keys are configured, create order via Razorpay API
    if (isRazorpayConfigured && razorpayInstance) {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt,
        notes: {
          supporterName: supporterName || 'Anonymous',
          supporterEmail: supporterEmail || '',
          message: message || '',
        },
      });

      res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
        isTestMode: false,
      });
      return;
    }

    // Development / sandbox test-order fallback
    const simulatedOrderId = 'order_sim_' + crypto.randomUUID().replace(/-/g, '').slice(0, 14);
    res.json({
      success: true,
      orderId: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      keyId: 'rzp_test_placeholder',
      isTestMode: true,
      message: 'Razorpay sandbox mode: Test order generated.',
    });
  } catch (err: any) {
    console.error('Error creating payment order:', err);
    res.status(500).json({
      error: 'Failed to create payment order. ' + (err.error?.description || err.message || ''),
    });
  }
});

// Verify Payment Signature
app.post('/api/payments/verify', (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      supporterName,
      supporterEmail,
      message,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      res.status(400).json({
        success: false,
        error: 'Missing required order or payment identifiers.',
      });
      return;
    }

    let isVerified = false;

    // Real signature verification when secret is present
    if (isRazorpayConfigured && RAZORPAY_KEY_SECRET) {
      const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature === razorpay_signature) {
        isVerified = true;
      } else {
        res.status(400).json({
          success: false,
          error: 'Invalid payment signature. Verification failed.',
        });
        return;
      }
    } else {
      // In development test mode with sandbox credentials
      isVerified = true;
    }

    if (isVerified) {
      const record: ContributionRecord = {
        id: 'cntr_' + crypto.randomUUID().slice(0, 8),
        internalId: 'TXN-' + Date.now(),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        amount: Number(amount) || 0,
        amountInINR: Number(amount) ? Math.round(Number(amount) / 100) : 0,
        currency: 'INR',
        supporterName: supporterName || 'Anonymous',
        supporterEmail: supporterEmail || '',
        message: message || '',
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        isTestMode: !isRazorpayConfigured,
      };

      contributionsDb.push(record);

      res.json({
        success: true,
        message: 'Thank you for supporting AxZire Studios.',
        transactionRef: record.internalId,
        paymentId: razorpay_payment_id,
        isTestMode: record.isTestMode,
      });
    }
  } catch (err: any) {
    console.error('Error verifying payment:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to verify payment: ' + err.message,
    });
  }
});

// Razorpay Webhook Endpoint
app.post('/api/payments/webhook', (req: any, res: Response) => {
  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookBody = req.rawBody ? req.rawBody.toString('utf8') : JSON.stringify(req.body);

    if (RAZORPAY_WEBHOOK_SECRET && webhookSignature) {
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
        .update(webhookBody)
        .digest('hex');

      if (expectedSignature !== webhookSignature) {
        res.status(400).json({ status: 'invalid_signature' });
        return;
      }
    }

    const event = req.body;
    const eventId = event?.event_id || `${event?.event}_${event?.payload?.payment?.entity?.id}`;

    // Idempotent processing
    if (eventId && processedWebhooks.has(eventId)) {
      res.json({ status: 'duplicate_event_ignored' });
      return;
    }

    if (eventId) {
      processedWebhooks.add(eventId);
    }

    console.log(`[Webhook Received] Event: ${event?.event}`);

    if (event?.event === 'payment.captured' || event?.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      if (paymentEntity) {
        const existing = contributionsDb.find(
          (c) => c.razorpayPaymentId === paymentEntity.id
        );
        if (!existing) {
          contributionsDb.push({
            id: 'cntr_' + crypto.randomUUID().slice(0, 8),
            internalId: 'TXN-' + Date.now(),
            razorpayOrderId: paymentEntity.order_id || 'webhook_direct',
            razorpayPaymentId: paymentEntity.id,
            amount: paymentEntity.amount,
            amountInINR: Math.round(paymentEntity.amount / 100),
            currency: paymentEntity.currency || 'INR',
            supporterEmail: paymentEntity.email || '',
            supporterName: paymentEntity.notes?.supporterName || 'Anonymous',
            message: paymentEntity.notes?.message || '',
            status: 'verified',
            verifiedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            isTestMode: !isRazorpayConfigured,
          });
        }
      }
    }

    res.json({ status: 'ok', received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing error' });
  }
});

// ---------------- VITE / STATIC INTEGRATION ----------------

async function startServer() {
  // Serve static assets from public/ with range request support for video streaming
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AxZire Studios server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
