import React, { useState, useRef } from 'react';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

export interface ScreenshotItem {
  url: string;
  label: string;
  caption?: string;
}

interface MediaCarouselPlayerProps {
  // Support both legacy props and new clean screenshot props
  screenshots?: ScreenshotItem[];
  posterSrc?: string;
  title?: string;
  videoSrc?: string; // ignored as requested
}

export const MediaCarouselPlayer: React.FC<MediaCarouselPlayerProps> = ({
  screenshots = [],
  posterSrc,
  title = 'Extension Showcase',
}) => {
  // Ensure we have valid screenshots; fallback to posterSrc if screenshots array is empty
  const slides: ScreenshotItem[] =
    screenshots && screenshots.length > 0
      ? screenshots
      : posterSrc
      ? [{ url: posterSrc, label: title, caption: 'Official Extension Capture' }]
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentIndex] || slides[0];

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col gap-3 w-full select-none">
      {/* Main Showcase Stage */}
      <div
        ref={containerRef}
        className="relative group rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-950 shadow-xl aspect-video w-full flex flex-col justify-end"
      >
        {/* Active Image */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center bg-black">
          <img
            key={currentSlide.url}
            src={currentSlide.url}
            alt={currentSlide.label}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Bottom Gradient Overlay for Captions */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/45 to-transparent text-white z-20">
            <span className="text-[11px] font-mono text-[#E50914] uppercase font-bold tracking-wider block mb-0.5">
              Official Web Store Capture
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              {currentSlide.label}
            </h4>
            {currentSlide.caption && (
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2 max-w-xl">
                {currentSlide.caption}
              </p>
            )}
          </div>
        </div>

        {/* Top Floating Badge with Slide Counter */}
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md text-xs font-semibold text-white shadow-md border border-white/10">
            <ImageIcon className="w-3.5 h-3.5 text-zinc-300" />
            <span>
              Image {currentIndex + 1} of {slides.length}
            </span>
          </div>
        </div>

        {/* Top Right Fullscreen Button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-lg bg-black/60 hover:bg-black/85 text-zinc-300 hover:text-white backdrop-blur-md border border-white/10 transition-colors shadow-md"
            title="View Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Previous / Next Arrow Controls */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/15 shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Bottom Thumbnails Strip (Clickable image previews) */}
      {slides.length > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 rounded-xl bg-neutral-100 border border-neutral-200">
          {slides.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all p-0.5 text-left group/thumb ${
                currentIndex === idx
                  ? 'border-[#E50914] bg-white shadow-sm ring-2 ring-red-100'
                  : 'border-transparent bg-neutral-200/50 hover:border-neutral-300'
              }`}
            >
              <div className="aspect-[16/9] w-full rounded overflow-hidden bg-neutral-900 relative">
                <img
                  src={item.url}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                />
                {currentIndex === idx && (
                  <div className="absolute inset-0 bg-[#E50914]/15 flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  </div>
                )}
              </div>
              <p
                className={`text-[11px] font-semibold truncate px-1.5 py-1 ${
                  currentIndex === idx ? 'text-[#E50914]' : 'text-neutral-700'
                }`}
              >
                {item.label}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
