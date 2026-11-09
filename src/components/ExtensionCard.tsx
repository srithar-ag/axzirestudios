import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Bookmark } from 'lucide-react';
import { ExtensionItem } from '../config/studioConfig.ts';
import { ChromeIcon, BraveIcon, FirefoxIcon } from './BrowserIcons.tsx';

interface ExtensionCardProps {
  extension: ExtensionItem;
  featured?: boolean;
}

export const ExtensionCard: React.FC<ExtensionCardProps> = ({ extension, featured = false }) => {
  return (
    <div
      className={`group relative rounded-3xl bg-white border border-neutral-200 hover:border-[#E50914] transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${
        featured ? 'ring-1 ring-red-100' : ''
      }`}
    >
      {/* Top Banner / Screenshot Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-900 border-b border-neutral-200">
        <img
          src={extension.posterImage}
          alt={extension.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Category & Version tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold text-neutral-800 shadow-sm">
            {extension.category}
          </span>
          <span className="px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono text-white">
            v{extension.version}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-700 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{extension.releaseStatus}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Icon Header */}
          <div className="flex items-center gap-3 mb-3">
            {extension.id === 'gmail-themes' ? (
              <img
                src={extension.icon}
                alt={extension.name}
                className="w-10 h-10 rounded-xl object-cover border border-neutral-200 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[#E50914] shrink-0">
                <Bookmark className="w-5 h-5 fill-[#E50914]" />
              </div>
            )}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#111827] tracking-tight group-hover:text-[#E50914] transition-colors">
                {extension.name}
              </h3>
              <p className="text-xs text-neutral-500 line-clamp-1">{extension.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed mb-5 line-clamp-3">
            {extension.description}
          </p>

          {/* Browser Compatibility List */}
          <div className="pt-2 pb-4 border-t border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-500 block mb-2 uppercase tracking-wider">
              Available For
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={extension.chromeStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors font-medium"
              >
                <ChromeIcon size={14} />
                <span>Chrome</span>
              </a>
              <a
                href={extension.braveStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors font-medium"
              >
                <BraveIcon size={14} />
                <span>Brave</span>
              </a>
              <a
                href={extension.firefoxStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 transition-colors font-medium"
              >
                <FirefoxIcon size={14} />
                <span>Firefox</span>
              </a>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <Link
            to={`/extensions/${extension.slug}`}
            className="text-xs font-bold text-neutral-700 hover:text-black transition-colors inline-flex items-center gap-1 py-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {extension.chromeStoreUrl && (
            <a
              href={extension.chromeStoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#E50914] hover:bg-[#c80812] active:scale-[0.98] transition-all rounded-xl shadow-sm"
            >
              <ChromeIcon size={13} className="brightness-200" />
              <span>Add to Chrome</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
