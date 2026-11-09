import React from 'react';
import { ShieldCheck, Mail, Lock, Database, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioConfig } from '../config/studioConfig.ts';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#111827] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold block mb-1">
            Trust & Security
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-neutral-500 font-mono">
            Last Updated: November 2026 · AxZire Studios
          </p>
        </div>

        {/* Studio Disclaimer Notice */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-700 leading-relaxed space-y-1 shadow-sm">
          <p className="font-bold text-[#111827]">Independent Studio Notice</p>
          <p>
            AxZire Studios is an independent software studio founded by Srithar AG. We are not affiliated with, endorsed by, or sponsored by Google LLC, Brave Software, Inc., Mozilla Corporation, or YouTube LLC.
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-700 leading-relaxed bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E50914]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              AxZire Studios adheres to strict data minimization. We only collect information that is strictly necessary:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-600">
              <li>
                <strong className="text-neutral-900">Contact Information:</strong> When you send an inquiry via our contact form, we collect your name, email address, and message so we can reply directly.
              </li>
              <li>
                <strong className="text-neutral-900">Contribution Details:</strong> When you support us via Razorpay, we receive the Razorpay order ID, payment ID, amount contributed, and timestamp. We never receive or store card numbers, UPI PINs, or banking passwords.
              </li>
              <li>
                <strong className="text-neutral-900">Browser Extension Data:</strong> Our extensions (such as YouTube Timestamps and Gmail Themes) operate locally on your device. We do not track browsing history, emails, or personal bookmarks.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <Database className="w-5 h-5 text-[#E50914]" />
              <span>2. Storage & Zero Data Selling</span>
            </h2>
            <p>
              Verified contribution references and submitted contact forms are stored in secure server databases. We never sell, rent, or trade your contact or contribution data to data brokers or advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#E50914]" />
              <span>3. Payment Processing</span>
            </h2>
            <p>
              Domestic payments from India are processed securely by Razorpay. International sponsorships via GitHub Sponsors are handled directly through GitHub's platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#E50914]" />
              <span>4. Contacting Us About Your Data</span>
            </h2>
            <p>
              If you have any questions about this Privacy Policy, contact founder & developer Srithar AG at:
            </p>
            <div className="p-3.5 rounded-xl bg-neutral-100 border border-neutral-200 font-mono text-xs text-neutral-900 font-semibold">
              {studioConfig.contactEmail}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
