import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import { extensionCatalogue } from '../config/studioConfig.ts';
import { ChromeIcon, BraveIcon, FirefoxIcon } from '../components/BrowserIcons.tsx';
import { MediaCarouselPlayer } from '../components/MediaCarouselPlayer.tsx';

export const ExtensionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const extension = extensionCatalogue.find((item) => item.slug === slug) || extensionCatalogue[0];
  const isGmailThemes = extension.id === 'gmail-themes';

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] text-[#111827] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back navigation */}
        <div>
          <Link
            to="/extensions"
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-black uppercase tracking-wider transition-colors py-1 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Extensions</span>
          </Link>
        </div>

        {/* Extension Header Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
            <div className="flex items-start sm:items-center gap-5">
              {isGmailThemes ? (
                <img
                  src={extension.icon}
                  alt={extension.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-200 shadow-sm shrink-0"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0 shadow-sm">
                  <Bookmark className="w-9 h-9 fill-[#E50914]" />
                </div>
              )}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight">
                    {extension.name}
                  </h1>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {extension.releaseStatus}
                  </span>
                </div>
                <p className="text-sm text-neutral-600">{extension.tagline}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-600">
              <div className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-sans font-bold">
                  Version
                </span>
                <span className="text-neutral-900 font-bold">{extension.version}</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] uppercase font-sans font-bold">
                  Category
                </span>
                <span className="text-neutral-900 font-bold">{extension.category}</span>
              </div>
            </div>
          </div>

          {/* Installation Actions */}
          <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <span className="font-bold text-neutral-900">Supported Platforms:</span>
              <span>Chrome · Brave · Firefox (Via Chrome Web Store)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={extension.chromeStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <ChromeIcon size={16} />
                <span>Add to Chrome</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <a
                href={extension.braveStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider border border-neutral-300 transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <BraveIcon size={14} />
                <span>Get for Brave</span>
              </a>

              <a
                href={extension.firefoxStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider border border-neutral-300 transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
              >
                <FirefoxIcon size={14} />
                <span>Get for Firefox</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dedicated Screenshots Showcase (Pure Image Gallery, NO Video) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#111827] tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E50914]" />
              <span>Official Extension Screenshots</span>
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              {extension.screenshots.length} HD Captures
            </span>
          </div>
          <MediaCarouselPlayer
            screenshots={extension.screenshots}
            posterSrc={extension.posterImage}
            title={extension.name}
          />
        </div>

        {/* Feature Matrix & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                About {extension.name}
              </h3>
              <p className="text-base text-neutral-700 leading-relaxed font-normal">
                {extension.fullDescription}
              </p>

              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Key Capabilities
                </h4>
                <div className="space-y-2.5">
                  {extension.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-800 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-[#111827] font-bold text-sm">
                <Shield className="w-4 h-4 text-[#E50914]" />
                <span>Privacy & Data Security</span>
              </div>
              <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
                {isGmailThemes ? (
                  <>
                    <li>• Zero email content access. The extension never reads or transmits emails.</li>
                    <li>• Pure styling and visual theme injection on client-side.</li>
                    <li>• Manifest V3 compliance with minimal permissions.</li>
                    <li>• 100% private and independent.</li>
                  </>
                ) : (
                  <>
                    <li>• 100% local browser storage. No accounts required.</li>
                    <li>• No remote data harvesting, trackers, or cookies.</li>
                    <li>• Manifest V3 compliance with minimal permissions.</li>
                    <li>• Fast, responsive in-player overlay.</li>
                  </>
                )}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#111827] font-bold text-sm">
                <Layers className="w-4 h-4 text-[#E50914]" />
                <span>Google Chrome Web Store</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Reviewed and published directly under Chrome Web Store safety guidelines.
              </p>
              <a
                href={extension.chromeStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-bold text-neutral-900 flex items-center justify-between transition-colors shadow-sm"
              >
                <span>Open Chrome Web Store Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
