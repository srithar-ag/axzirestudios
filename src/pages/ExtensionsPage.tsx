import React from 'react';
import {
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  Bookmark,
  Palette,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { extensionCatalogue } from '../config/studioConfig.ts';
import { ChromeIcon, BraveIcon, FirefoxIcon } from '../components/BrowserIcons.tsx';
import { MediaCarouselPlayer } from '../components/MediaCarouselPlayer.tsx';

export const ExtensionsPage: React.FC = () => {
  const ytExtension = extensionCatalogue.find((ext) => ext.id === 'yt-timestamps') || extensionCatalogue[0];
  const gmailExtension = extensionCatalogue.find((ext) => ext.id === 'gmail-themes') || extensionCatalogue[1];

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#111827]">
      {/* Header Introduction */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <span className="text-xs font-mono text-[#E50914] uppercase tracking-widest font-bold mb-2 block">
            Studio Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
            Browser Extensions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Thoughtfully crafted browser tools for Google Chrome, Brave, and Mozilla Firefox. Sectioned below with dedicated screenshot showcases and direct installation links.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: 1ST EXTENSION — YOUTUBE TIMESTAMPS
         ========================================================================= */}
      <section id="youtube-timestamps" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-red-50 text-[#E50914] text-xs font-mono font-bold uppercase tracking-wider">
                  01 · Video Productivity
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {ytExtension.releaseStatus}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                {ytExtension.name}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal">
                {ytExtension.tagline}
              </p>
            </div>

            <Link
              to={`/extensions/${ytExtension.slug}`}
              className="text-xs font-bold uppercase tracking-wider text-[#E50914] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Side-by-side Showcase: Images on Left, Features & Actions on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Dedicated Screenshots Showcase for 1st Extension ONLY */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span className="font-bold text-neutral-700">YouTube Timestamps Screenshots</span>
                  <span>3 Captures</span>
                </div>
                <MediaCarouselPlayer
                  screenshots={ytExtension.screenshots}
                  posterSrc={ytExtension.posterImage}
                  title="YouTube Timestamps Extension View"
                />
              </div>
            </div>

            {/* Features & Install Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FB] border border-neutral-200 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100/70 border border-red-200 flex items-center justify-center text-[#E50914] shrink-0">
                    <Bookmark className="w-5 h-5 fill-[#E50914]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827]">
                      Install YouTube Timestamps
                    </h3>
                    <p className="text-xs text-neutral-500">v{ytExtension.version} · Chrome Web Store</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {ytExtension.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {ytExtension.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 Store Action Buttons with unified Chrome Web Store link */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={ytExtension.chromeStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ChromeIcon size={16} />
                    <span>Add to Chrome (Free)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={ytExtension.braveStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 shadow-sm"
                    >
                      <BraveIcon size={14} />
                      <span>Get for Brave</span>
                    </a>

                    <a
                      href={ytExtension.firefoxStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 shadow-sm"
                    >
                      <FirefoxIcon size={14} />
                      <span>Get for Firefox</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200 text-xs text-neutral-500 flex items-center justify-between font-medium">
                  <span>100% Local Storage</span>
                  <span>Zero Telemetry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: 2ND EXTENSION — GMAIL THEMES - CUSTOM THEMES FOR GMAIL
         ========================================================================= */}
      <section id="gmail-themes" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FB] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-zinc-900 text-white text-xs font-mono font-bold uppercase tracking-wider">
                  02 · Customization & Workspaces
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {gmailExtension.releaseStatus}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                {gmailExtension.name}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl font-normal">
                {gmailExtension.tagline}
              </p>
            </div>

            <Link
              to={`/extensions/${gmailExtension.slug}`}
              className="text-xs font-bold uppercase tracking-wider text-[#E50914] hover:underline inline-flex items-center gap-1.5"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Side-by-side Showcase: Images on Left, Features & Actions on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Dedicated Screenshots Showcase for 2nd Extension ONLY */}
            <div className="lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span className="font-bold text-neutral-700">Gmail Themes Official Captures</span>
                  <span>3 Captures</span>
                </div>
                <MediaCarouselPlayer
                  screenshots={gmailExtension.screenshots}
                  posterSrc={gmailExtension.posterImage}
                  title="Gmail Themes Showcase"
                />
              </div>
            </div>

            {/* Features & Install Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 space-y-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={gmailExtension.icon}
                    alt="Gmail Themes icon"
                    className="w-11 h-11 rounded-xl object-cover border border-neutral-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#111827]">
                      Install Gmail Themes
                    </h3>
                    <p className="text-xs text-neutral-500">v{gmailExtension.version} · Chrome Web Store</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {gmailExtension.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {gmailExtension.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 Store Action Buttons with unified Chrome Web Store link */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={gmailExtension.chromeStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <ChromeIcon size={16} />
                    <span>Add to Chrome (Free)</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={gmailExtension.braveStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 shadow-sm"
                    >
                      <BraveIcon size={14} />
                      <span>Get for Brave</span>
                    </a>

                    <a
                      href={gmailExtension.firefoxStoreUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-neutral-300 shadow-sm"
                    >
                      <FirefoxIcon size={14} />
                      <span>Get for Firefox</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-xs text-neutral-500 flex items-center justify-between font-medium">
                  <span>Zero Email Content Access</span>
                  <span>100% Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Guarantee Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F8F9FB] border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-[#111827]">
              Studio Engineering Guarantee
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-600">
              <div className="space-y-1">
                <span className="font-bold text-[#111827] block text-sm">Local-First Privacy</span>
                <p>We do not harvest or sell user data. Your notes, bookmarks, and visual preferences stay on your device.</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#111827] block text-sm">Manifest V3 Compliant</span>
                <p>Built according to modern browser sandboxing standards with strictly minimal required permissions.</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#111827] block text-sm">Multi-Browser Ready</span>
                <p>Engineered to work smoothly across Google Chrome, Brave, and Mozilla Firefox.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
