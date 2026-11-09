import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { AxZireLogo } from './AxZireLogo.tsx';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Extensions', path: '/extensions' },
    { label: 'Support', path: '/support' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isLightPage = location.pathname === '/support';

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 py-2.5 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 h-16 flex items-center justify-between gap-6 sm:gap-8 ${
          isLightPage
            ? scrolled
              ? 'bg-white/90 backdrop-blur-2xl border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-white/75 backdrop-blur-xl border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : scrolled
            ? 'bg-[#09090b]/80 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
            : 'bg-[#101014]/65 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Top edge sheen */}
        <div
          className={`absolute inset-x-6 top-0 h-[1px] pointer-events-none rounded-t-2xl ${
            isLightPage
              ? 'bg-gradient-to-r from-transparent via-zinc-300/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
          }`}
        />

        {/* Zone 1: Official Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914] rounded-lg p-1"
          aria-label="AxZire Studios Home"
        >
          <AxZireLogo size="md" isLight={isLightPage} />
        </Link>

        {/* Zone 2: Glassmorphic Nav Links */}
        <nav
          className={`hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-xl text-sm font-medium border ${
            isLightPage
              ? 'bg-zinc-100/60 backdrop-blur-md border-zinc-200/60 text-zinc-700'
              : 'bg-black/30 backdrop-blur-md border-white/5 text-zinc-300'
          }`}
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isLightPage
                    ? active
                      ? 'text-zinc-950 font-bold bg-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50'
                    : active
                    ? 'text-white font-semibold bg-white/10 shadow-inner'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#E50914] rounded-full shadow-[0_0_8px_#E50914]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/support"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-xl shadow-sm whitespace-nowrap shrink-0 ${
              isLightPage
                ? 'bg-zinc-900 hover:bg-black text-white'
                : 'text-white bg-gradient-to-r from-[#E50914] to-[#B80F19] hover:from-[#f0141f] hover:to-[#c8141f] shadow-[0_0_20px_rgba(229,9,20,0.4)] border border-white/20'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Support Us</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors focus:outline-none border ${
              isLightPage
                ? 'text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 border-zinc-200'
                : 'text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphism Drawer */}
      {isOpen && (
        <div
          className={`md:hidden mt-2 max-w-7xl mx-auto rounded-2xl border px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-2xl ${
            isLightPage
              ? 'border-zinc-200 bg-white/95 backdrop-blur-2xl text-zinc-900'
              : 'border-white/15 bg-[#0e0e12]/95 backdrop-blur-2xl text-white'
          }`}
        >
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isLightPage
                      ? active
                        ? 'bg-zinc-100 text-zinc-950 font-bold border border-zinc-200'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                      : active
                      ? 'bg-white/10 text-white border border-white/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200">
            <Link
              to="/support"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-black rounded-xl shadow-sm"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Our Development</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
