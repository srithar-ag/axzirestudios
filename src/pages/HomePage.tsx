import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Heart,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  CreditCard,
  Globe,
} from 'lucide-react';
import { studioConfig, extensionCatalogue } from '../config/studioConfig.ts';
import { ChromeIcon, BraveIcon, FirefoxIcon } from '../components/BrowserIcons.tsx';
import { MediaCarouselPlayer } from '../components/MediaCarouselPlayer.tsx';
import { ExtensionCard } from '../components/ExtensionCard.tsx';

export const HomePage: React.FC = () => {
  const featuredExtension = extensionCatalogue[0];

  return (
    <div className="w-full flex flex-col bg-[#FAFAFC] text-[#111827]">
      {/* =========================================================================
          SECTION 1: HERO (CLEAN BRIGHT THEME)
         ========================================================================= */}
      <section className="relative min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden bg-white border-b border-neutral-200">
        {/* Subtle Warm Grid Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-100 rounded-full blur-[140px] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Studio Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-bold tracking-widest text-neutral-800 uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E50914]" />
            <span>{studioConfig.tagline}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111827] tracking-tight leading-[1.08] text-balance">
            Make Your Browser <br />
            <span className="text-[#E50914]">Work Better.</span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {studioConfig.subheadline}
          </p>

          <p className="mt-2 text-xs sm:text-sm font-semibold text-neutral-500 tracking-wide">
            {studioConfig.studioStatement}
          </p>

          {/* Primary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/extensions"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] text-white text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Extensions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/support"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] text-neutral-800 text-sm font-bold tracking-wide border border-neutral-300 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#E50914]" />
              <span>Support Our Work</span>
            </Link>
          </div>

          {/* Browser Icons Row */}
          <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-600 font-medium">
            <span className="uppercase tracking-wider font-mono text-[11px] text-neutral-500">
              Compatible Platforms:
            </span>
            <div className="flex items-center gap-1.5 text-neutral-800">
              <ChromeIcon size={16} />
              <span>Google Chrome</span>
            </div>
            <span className="text-neutral-400">·</span>
            <div className="flex items-center gap-1.5 text-neutral-800">
              <BraveIcon size={16} />
              <span>Brave</span>
            </div>
            <span className="text-neutral-400">·</span>
            <div className="flex items-center gap-1.5 text-neutral-800">
              <FirefoxIcon size={16} />
              <span>Firefox</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FEATURED EXTENSION & UNIFIED MEDIA CAROUSEL
         ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col items-start">
            <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1">
              Featured Flagship Product
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
              YouTube Timestamps
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Product Info & 3 Store Action Buttons */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-neutral-200 text-xs text-neutral-700 font-semibold w-fit shadow-sm">
                <Bookmark className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Dedicated YouTube Extension</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight leading-snug">
                Never lose an important moment in a video again.
              </h3>

              <p className="text-neutral-600 text-base leading-relaxed">
                {featuredExtension.description}
              </p>

              {/* Product Key Points */}
              <ul className="space-y-2.5 pt-1 text-sm text-neutral-800">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <span>Instant 1-click bookmarking of active playback timecodes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <span>Searchable personal index for research, code, and lectures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                  <span>100% local and private — zero remote telemetry or ad tracking</span>
                </li>
              </ul>

              {/* 3 Store Actions - All linking to official Web Store */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5">
                <a
                  href={featuredExtension.chromeStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-[#E50914] hover:bg-[#c80812] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md inline-flex items-center justify-center gap-2"
                >
                  <ChromeIcon size={16} />
                  <span>Add to Chrome</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <a
                  href={featuredExtension.braveStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold tracking-wider uppercase border border-neutral-300 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <BraveIcon size={16} />
                  <span>Get for Brave</span>
                </a>

                <a
                  href={featuredExtension.firefoxStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold tracking-wider uppercase border border-neutral-300 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <FirefoxIcon size={16} />
                  <span>Get for Firefox</span>
                </a>
              </div>

              <div>
                <Link
                  to={`/extensions/${featuredExtension.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E50914] hover:underline transition-colors group"
                >
                  <span>Explore Extension Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Unified Media Carousel (Video + Screenshots) */}
            <div className="lg:col-span-7">
              <MediaCarouselPlayer
                videoSrc={featuredExtension.promotionalVideo}
                posterSrc={featuredExtension.posterImage}
                title="YouTube Timestamps Official Walkthrough"
                screenshots={featuredExtension.screenshots}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: EXTENSIONS CATALOGUE (BRIGHT THEME)
         ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1 block">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                Tools Built for Better Browsing.
              </h2>
            </div>
            <Link
              to="/extensions"
              className="text-xs font-bold uppercase tracking-wider text-[#E50914] hover:underline transition-colors inline-flex items-center gap-1.5"
            >
              <span>View All Extensions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {extensionCatalogue.map((extension) => (
              <ExtensionCard key={extension.id} extension={extension} featured />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SUPPORTED BROWSERS (BRIGHT THEME)
         ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] border-b border-neutral-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1 block">
            Cross-Browser Support
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight mb-4">
            One studio. Multiple browsers. Better experiences everywhere.
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            We develop using modern Manifest V3 standards, guaranteeing broad compatibility across Chromium and Gecko architectures.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  <ChromeIcon size={26} />
                </div>
                <h4 className="text-lg font-bold text-[#111827]">Google Chrome</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Full Chrome Web Store distribution, verified sandboxing, and instant updates.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Live
                </span>
                <a
                  href={featuredExtension.chromeStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#E50914] hover:underline flex items-center gap-1"
                >
                  <span>Install</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  <BraveIcon size={26} />
                </div>
                <h4 className="text-lg font-bold text-[#111827]">Brave Browser</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Optimized for privacy-shielded Chromium browsing with zero conflicts.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                  Web Store Ready
                </span>
                <a
                  href={featuredExtension.braveStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#E50914] hover:underline flex items-center gap-1"
                >
                  <span>Install</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
                  <FirefoxIcon size={26} />
                </div>
                <h4 className="text-lg font-bold text-[#111827]">Mozilla Firefox</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                  Cross-engine Gecko compatibility designed for Firefox power users.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                  Compatible
                </span>
                <a
                  href={featuredExtension.firefoxStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#E50914] hover:underline flex items-center gap-1"
                >
                  <span>Install</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHY AXZIRE STUDIOS? (BRIGHT THEME)
         ========================================================================= */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-1 block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
              Why AxZire Studios?
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Browser extensions run right inside where you spend your day. They should be built with rigorous standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-2">User-Focused Design</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every extension starts with a real browsing problem. We build intuitive solutions that integrate seamlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-2">Performance First</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Lightweight experiences designed to work smoothly. Minimal bundle sizes, zero memory leaks, and instant startup times.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-2">Thoughtful Engineering</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Careful attention to functionality, reliability, and usability. Modern Manifest V3 compliance with zero unnecessary permissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFC] border border-neutral-200 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#111827] mb-2">Continuous Improvement</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We refine and improve our products as browser technology evolves. Active updates, prompt bug fixes, and community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================================
          SECTION 7: STREAMLINED SUPPORT SECTION (TWO SIMPLE BUTTONS)
         ========================================================================= */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] mx-auto shadow-sm">
            <Heart className="w-6 h-6 fill-[#E50914]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
              Support AxZire Studios
            </h2>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              Your contribution directly accelerates independent browser extension development.
            </p>
          </div>

          {/* Just Two Clear Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/support"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Razorpay (India)</span>
            </Link>

            <a
              href={studioConfig.githubSponsorsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] text-neutral-900 border border-neutral-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Globe className="w-4 h-4 text-neutral-700" />
              <span>International Payment</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
