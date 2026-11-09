import React, { useState, useEffect } from 'react';
import {
  Check,
  Github,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Loader2,
  Info,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioConfig, extensionCatalogue } from '../config/studioConfig.ts';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export const SupportPage: React.FC = () => {
  // Amount selection state (in INR)
  const [selectedAmount, setSelectedAmount] = useState<number>(99);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [showAmountModal, setShowAmountModal] = useState<boolean>(false);

  // Supporter details
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Processing & verification states
  const [loading, setLoading] = useState<boolean>(false);
  const [statusDialog, setStatusDialog] = useState<{
    open: boolean;
    type: 'success' | 'failure' | 'pending';
    title: string;
    description: string;
    transactionRef?: string;
  }>({
    open: false,
    type: 'pending',
    title: '',
    description: '',
  });

  // Config fetched from server
  const [serverConfig, setServerConfig] = useState<{
    isTestMode: boolean;
    razorpayKeyId: string;
  }>({
    isTestMode: true,
    razorpayKeyId: studioConfig.razorpayKeyId,
  });

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setServerConfig({
            isTestMode: data.isTestMode,
            razorpayKeyId: data.razorpayKeyId,
          });
        }
      })
      .catch(() => {});
  }, []);

  const effectiveAmount = isCustom ? Number(customAmount) || 0 : selectedAmount;

  // Handle Razorpay Payment flow
  const executePayment = async (amountToPay: number) => {
    if (amountToPay < 10) {
      alert('Minimum contribution amount is ₹10.');
      return;
    }

    setLoading(true);
    setShowAmountModal(false);

    try {
      // 1. Create order on backend
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountToPay,
          supporterName: name,
          supporterEmail: email,
          message: message,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment order.');
      }

      const { orderId, amount: amountInPaise, keyId, isTestMode } = orderData;

      // 2. Open Razorpay Standard Checkout
      if (typeof window.Razorpay !== 'undefined') {
        const options = {
          key: keyId,
          amount: amountInPaise,
          currency: 'INR',
          name: studioConfig.studioName,
          description: `Support AxZire Studios extensions`,
          image: studioConfig.officialLogo,
          order_id: orderId,
          prefill: {
            name: name || undefined,
            email: email || undefined,
          },
          theme: {
            color: '#18181b',
          },
          handler: async function (response: any) {
            setStatusDialog({
              open: true,
              type: 'pending',
              title: 'Verifying Contribution...',
              description: 'Confirming cryptographically signed payment with server.',
            });

            try {
              const verifyRes = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount: amountInPaise,
                  supporterName: name,
                  supporterEmail: email,
                  message: message,
                }),
              });

              const verifyData = await verifyRes.json();

              if (verifyRes.ok && verifyData.success) {
                setStatusDialog({
                  open: true,
                  type: 'success',
                  title: 'Thank you for supporting my extensions.',
                  description:
                    'Your contribution has been verified successfully. It helps keep these tools free and actively maintained.',
                  transactionRef: verifyData.transactionRef,
                });
                setName('');
                setEmail('');
                setMessage('');
              } else {
                setStatusDialog({
                  open: true,
                  type: 'failure',
                  title: 'Verification Failed',
                  description:
                    verifyData.error ||
                    'Your contribution could not be verified by the server. You can safely try again.',
                });
              }
            } catch (err: any) {
              setStatusDialog({
                open: true,
                type: 'failure',
                title: 'Verification Error',
                description: err.message || 'Network error while verifying payment.',
              });
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp: any) {
          setStatusDialog({
            open: true,
            type: 'failure',
            title: 'Payment Incomplete',
            description:
              resp.error?.description ||
              'Your contribution could not be completed. You can safely try again.',
          });
        });
        rzp.open();
      } else {
        // Fallback in sandbox if external checkout script is blocked
        const simulatedPaymentId = 'pay_sim_' + Math.random().toString(36).substring(2, 10);
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderId,
            razorpay_payment_id: simulatedPaymentId,
            razorpay_signature: 'simulated_test_sig',
            amount: amountInPaise,
            supporterName: name,
            supporterEmail: email,
            message: message,
          }),
        });

        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.success) {
          setStatusDialog({
            open: true,
            type: 'success',
            title: 'Thank you for supporting my extensions.',
            description: isTestMode
              ? '[Test Mode] Simulated Razorpay order created and verified successfully.'
              : 'Your contribution has been verified successfully.',
            transactionRef: verifyData.transactionRef,
          });
          setName('');
          setEmail('');
          setMessage('');
        }
      }
    } catch (err: any) {
      console.error(err);
      setStatusDialog({
        open: true,
        type: 'failure',
        title: 'Payment Initialization Failed',
        description: err.message || 'Could not communicate with the payment processor.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8f9fa] text-zinc-900 flex flex-col justify-between selection:bg-zinc-200 selection:text-zinc-900">
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-24">
        {/* Header (Clean, Light Theme matching screenshot) */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight flex items-center justify-center gap-3">
            <span>Support</span>
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#E50914] fill-[#E50914] shrink-0 inline-block" />
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Every contribution helps us build new browser extensions, improve existing products, and invest more time into useful technology.
          </p>
        </div>

        {/* Dual Support Cards Grid (Identical to screenshot layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* =========================================================================
              CARD 1: IN INDIA — RAZORPAY
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
            <div>
              {/* Header: Rupee Icon & Stacked Text */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-800 text-lg font-bold shrink-0">
                  ₹
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-medium block">
                    In India
                  </span>
                  <h2 className="text-xl font-bold text-zinc-900 tracking-tight leading-tight">
                    Razorpay
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 mb-6 font-normal">
                Pay once, in rupees.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-zinc-600" />
                  <span>One-time</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-zinc-600" />
                  <span>In rupees (₹)</span>
                </span>
              </div>
            </div>

            {/* Bottom Button (Solid Black Rounded with hover effects) */}
            <div className="pt-6 space-y-2">
              <a
                href="https://razorpay.me/@axzirestudios"
                target="_blank"
                rel="noreferrer"
                className="group w-full py-3.5 px-6 rounded-full bg-zinc-950 hover:bg-black text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-zinc-950/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pay with Razorpay</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <div className="flex items-center justify-center pt-1 text-[11px] font-mono text-zinc-400">
                <span>razorpay.me/@axzirestudios</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CARD 2: OUTSIDE INDIA — GITHUB SPONSORS
             ========================================================================= */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between">
            <div>
              {/* Header: GitHub Icon & Stacked Text */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-11 h-11 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-800 shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-medium block">
                    Outside India
                  </span>
                  <h2 className="text-xl font-bold text-zinc-900 tracking-tight leading-tight">
                    GitHub Sponsors
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 mb-6 font-normal">
                Sponsor through GitHub, from any country.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Monthly or one-time</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-zinc-600" />
                  <span>In US dollars ($)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-medium">
                  <Check className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Needs a GitHub account</span>
                </span>
              </div>
            </div>

            {/* Bottom Button (Single Clean Button matching Razorpay card) */}
            <div className="pt-6 space-y-2">
              <a
                href="https://github.com/sponsors/srithar-ag"
                target="_blank"
                rel="noreferrer"
                className="group w-full py-3.5 px-6 rounded-full bg-white hover:bg-zinc-50 border border-zinc-300 hover:border-zinc-500 text-zinc-900 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-zinc-900/10 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#E50914] fill-[#E50914] transition-transform duration-200 group-hover:scale-125" />
                <span>Sponsor on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 transition-colors" />
              </a>

              <div className="flex items-center justify-center pt-1 text-[11px] font-mono text-zinc-400">
                <span>github.com/sponsors/srithar-ag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Bottom Footer Section (matching screenshot) */}
      <footer className="w-full border-t border-zinc-200/80 bg-white py-12 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-900 text-sm">
              Extensions by {studioConfig.developerName}
            </h4>
            <p className="text-zinc-500 leading-relaxed">
              Free browser extensions, made because I wanted them to exist. Part of{' '}
              <Link to="/" className="text-zinc-900 underline underline-offset-2">
                AxZire Studios
              </Link>
              .
            </p>
            <p className="pt-1">
              <a
                href={`mailto:${studioConfig.contactEmail}`}
                className="text-zinc-600 hover:text-zinc-900 underline underline-offset-2"
              >
                {studioConfig.contactEmail}
              </a>
            </p>
            <p>
              <Link to="/support" className="text-zinc-900 font-medium">
                Support the work
              </Link>
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-900 text-sm">Extensions</h4>
            <ul className="space-y-1.5">
              {extensionCatalogue.map((ext) => (
                <li key={ext.id} className="flex items-center gap-2">
                  <Link
                    to={`/extensions/${ext.slug}`}
                    className="text-zinc-600 hover:text-zinc-900"
                  >
                    {ext.name}
                  </Link>
                  <Link
                    to="/privacy"
                    className="text-[11px] text-zinc-400 hover:text-zinc-600"
                  >
                    Privacy
                  </Link>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span className="text-zinc-500">Tab Recall & Speed</span>
                <span className="text-[11px] text-zinc-400">Lab</span>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-900 text-sm">Elsewhere</h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="text-zinc-600 hover:text-zinc-900">
                  axzire.com
                </Link>
              </li>
              <li>
                <a
                  href={studioConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:text-zinc-900"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={studioConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-600 hover:text-zinc-900"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Payment Confirmation Dialog */}
      {statusDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white border border-zinc-200 p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            {statusDialog.type === 'success' && (
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            )}

            {statusDialog.type === 'failure' && (
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
                <AlertCircle className="w-8 h-8" />
              </div>
            )}

            {statusDialog.type === 'pending' && (
              <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-800">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
            )}

            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
              {statusDialog.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {statusDialog.description}
            </p>

            {statusDialog.transactionRef && (
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-left text-xs font-mono">
                <span className="text-zinc-500 block text-[10px] uppercase font-sans">
                  Confirmed Transaction Reference
                </span>
                <span className="text-zinc-900 font-semibold select-all">
                  {statusDialog.transactionRef}
                </span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setStatusDialog({ ...statusDialog, open: false })}
                className="w-full py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
