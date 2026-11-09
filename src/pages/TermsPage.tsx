import React from 'react';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studioConfig } from '../config/studioConfig.ts';

export const TermsPage: React.FC = () => {
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
            Legal Terms
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-neutral-500 font-mono">
            Last Updated: November 2026 · AxZire Studios
          </p>
        </div>

        <div className="space-y-8 text-sm text-neutral-700 leading-relaxed bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E50914]" />
              <span>1. Agreement to Terms</span>
            </h2>
            <p>
              By accessing the AxZire Studios website or using our browser extensions, you agree to these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#E50914]" />
              <span>2. License & Intellectual Property</span>
            </h2>
            <p>
              All software, brand marks, and site designs belonging to AxZire Studios are the intellectual property of Srithar AG and AxZire Studios. Browser extensions installed from official web stores are licensed for personal and professional daily browsing under standard store terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E50914]" />
              <span>3. Voluntary Contributions</span>
            </h2>
            <p>
              Contributions made via Razorpay or GitHub Sponsors are voluntary gifts provided to support independent software research and extension development.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E50914]" />
              <span>4. Contact & Inquiries</span>
            </h2>
            <p>
              For legal inquiries regarding these terms, contact:
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
