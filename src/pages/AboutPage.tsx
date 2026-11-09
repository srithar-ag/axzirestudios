import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2,
  CheckCircle2,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { studioConfig } from '../config/studioConfig.ts';
import { ContactModal } from '../components/ContactModal.tsx';

export const AboutPage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#111827]">
      {/* Hero & Studio Mission */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-2 block">
              About AxZire Studios
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight leading-[1.1]">
              Technology Should Feel Effortless.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
              AxZire Studios is an independent development studio focused on creating practical, thoughtfully designed browser extensions.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-8 rounded-3xl bg-[#F8F9FB] border border-neutral-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">Our Mission</h3>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                "To create useful, accessible, and beautifully designed tools that improve everyday digital experiences."
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8F9FB] border border-neutral-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#111827]">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                "To build a growing ecosystem of browser tools that people genuinely enjoy using."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Short Consolidated Developer Section */}
      <section id="founder" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Monogram Frame */}
            <div className="w-32 h-36 sm:w-40 sm:h-44 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-white shrink-0 shadow-lg relative overflow-hidden select-none">
              <div className="text-4xl font-extrabold tracking-tighter">
                S<span className="text-[#E50914]">AG</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 mt-2 uppercase tracking-widest">
                Srithar AG
              </span>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E50914]" />
            </div>

            {/* Bio Content */}
            <div className="space-y-4 flex-1 text-left">
              <div>
                <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold block mb-1">
                  Founder & Primary Developer
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                  {studioConfig.developerName}
                </h2>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  {studioConfig.developerRole}
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                "I'm Srithar AG, the founder and developer behind AxZire Studios. I focus on creating browser extensions and digital experiences that solve practical problems through thoughtful engineering and intuitive design."
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={studioConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={studioConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold border border-neutral-300 flex items-center gap-2 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#c80812] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Founder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build & Philosophy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight">
              What We Build
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Productivity Extensions',
                  desc: 'Workflow accelerations that eliminate repetitive scrubbing and keep you in deep work.',
                },
                {
                  title: 'Customization Tools',
                  desc: 'Tailored interfaces and ergonomics adapted to your specific viewing habits.',
                },
                {
                  title: 'Video Utilities',
                  desc: 'Deep integrations like YouTube Timestamps that elevate video learning and research.',
                },
                {
                  title: 'Workflow Improvements',
                  desc: 'Annotation tools, quick note tags, and smart snippet organization.',
                },
                {
                  title: 'Experimental Browser Experiences',
                  desc: 'Explorations in browser APIs, local AI inference, and emerging web capabilities.',
                },
                {
                  title: 'Privacy-First Architecture',
                  desc: 'All notes and data remain local on your device with zero cloud tracking.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 space-y-2 shadow-sm"
                >
                  <h4 className="text-base font-bold text-[#111827]">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1 block">
              Principles
            </span>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight">
              Development Philosophy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827]">Simplicity Over Complexity</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
                    Every extra button or setting adds cognitive tax. We prioritize minimal, sharp controls that work out of the box.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827]">Performance and Reliability</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
                    Zero lag, negligible memory overhead, and clean background service worker lifecycles following strict Manifest V3 specifications.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827]">Privacy-Conscious Engineering</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
                    We don't collect, track, or sell user browsing history. Your bookmarks, settings, and notes live securely on your own device.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#111827]">User-Centered Product Design</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-1">
                    Engineered from real daily workflows. We listen closely to user feedback and iterate rapidly to resolve real user pain points.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl font-black text-[#111827] tracking-tight">
            Better browsing starts with better tools.
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto">
            Experience our extensions today on Chrome, Brave, and Firefox.
          </p>
          <div>
            <Link
              to="/extensions"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c80812] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md group"
            >
              <span>Explore Our Extensions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};
