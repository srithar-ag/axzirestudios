import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';
import { AxZireLogo } from './AxZireLogo.tsx';
import { studioConfig } from '../config/studioConfig.ts';
import { ChromeIcon, BraveIcon, FirefoxIcon } from './BrowserIcons.tsx';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#F8F9FB] border-t border-neutral-200 text-neutral-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-200">
          {/* Brand Lockup & Studio Statement */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block focus:outline-none">
              <AxZireLogo size="lg" />
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">
              Independent browser extension development studio. We engineer focused, privacy-conscious tools that make your everyday browsing smarter, simpler, and more enjoyable.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={studioConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors shadow-sm"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={studioConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#0077b5] hover:border-neutral-400 transition-colors shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${studioConfig.contactEmail}`}
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors shadow-sm"
                aria-label="Email Contact"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={studioConfig.githubSponsorsUrl}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3.5 rounded-xl bg-white border border-neutral-200 flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-black hover:border-neutral-400 transition-colors shadow-sm"
                aria-label="GitHub Sponsors"
              >
                <Heart className="w-3.5 h-3.5 text-[#E50914] fill-[#E50914]" />
                <span>Sponsor</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/extensions" className="text-neutral-600 hover:text-black transition-colors">
                  Extensions
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-[#E50914] font-bold hover:underline transition-colors">
                  Support Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
              Platforms
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-neutral-700">
                <ChromeIcon size={16} />
                <span>Google Chrome</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <BraveIcon size={16} />
                <span>Brave Browser</span>
              </li>
              <li className="flex items-center gap-2 text-neutral-700">
                <FirefoxIcon size={16} />
                <span>Mozilla Firefox</span>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 tracking-wider uppercase">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-neutral-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-600 hover:text-black transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                {onOpenContact ? (
                  <button
                    onClick={onOpenContact}
                    className="text-neutral-600 hover:text-black transition-colors text-left"
                  >
                    Direct Contact
                  </button>
                ) : (
                  <a
                    href={`mailto:${studioConfig.contactEmail}`}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    Direct Contact
                  </a>
                )}
              </li>
              <li>
                <a
                  href="https://chromewebstore.google.com/detail/youtube-timestamps/piacejljehjoedfpidohegljphkfkppi?authuser=0&hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-600 hover:text-black transition-colors inline-flex items-center gap-1"
                >
                  <span>Chrome Web Store</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {currentYear} AxZire Studios. All rights reserved. Founded by Srithar AG.
          </p>
          <p className="max-w-xl text-neutral-500 text-xs">
            AxZire Studios is an independent browser extension development studio. Google Chrome, Brave, Mozilla Firefox, YouTube, and Gmail are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};
