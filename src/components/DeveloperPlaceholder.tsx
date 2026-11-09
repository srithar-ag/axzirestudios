import React, { useState } from 'react';
import { Camera, CheckCircle2, Info } from 'lucide-react';
import { studioConfig } from '../config/studioConfig.ts';

interface DeveloperPlaceholderProps {
  className?: string;
  size?: 'compact' | 'full';
}

export const DeveloperPlaceholder: React.FC<DeveloperPlaceholderProps> = ({
  className = '',
  size = 'full',
}) => {
  const [imageError, setImageError] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Portrait Frame */}
      <div
        className={`relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-xl group ${
          size === 'compact' ? 'w-48 h-56 sm:w-56 sm:h-64' : 'w-full max-w-sm sm:max-w-md aspect-[4/5]'
        }`}
      >
        {!imageError ? (
          <img
            src={studioConfig.developerPhoto}
            alt={studioConfig.developerName}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          /* Polished Studio Portrait Monogram Placeholder */
          <div className="w-full h-full relative flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-neutral-900 via-neutral-900 to-black select-none text-white">
            {/* Top Badge */}
            <div className="relative z-10 w-full flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase font-bold">
                Studio Founder
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E50914] shadow-[0_0_8px_#E50914]" />
            </div>

            {/* Central Monogram */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-lg">
                <div className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
                  S<span className="text-[#E50914]">AG</span>
                </div>
              </div>

              <h4 className="mt-4 text-base font-bold text-white tracking-tight">
                {studioConfig.developerName}
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                {studioConfig.developerRole}
              </p>
            </div>

            {/* Bottom Photo Upload Indicator */}
            <div className="relative z-10 w-full pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span className="text-[11px]">Portrait Area</span>
              </div>
              <button
                onClick={() => setShowGuide(!showGuide)}
                className="text-[11px] text-[#E50914] hover:underline flex items-center gap-1 font-semibold"
                title="How to replace photo"
              >
                <Info className="w-3 h-3" />
                <span>Upload Guide</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload Instructions Helper Drawer */}
      {showGuide && (
        <div className="mt-3 p-4 rounded-2xl bg-white border border-neutral-200 text-left text-xs max-w-sm sm:max-w-md w-full animate-in fade-in duration-200 shadow-lg text-neutral-800">
          <div className="flex items-start gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
            <h5 className="font-bold text-[#111827]">How to upload your official photograph</h5>
          </div>
          <p className="text-neutral-600 leading-relaxed mb-2">
            To display your official portrait, simply place your photo file at:
          </p>
          <code className="block px-2.5 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono text-[11px] mb-2 select-all">
            /public/assets/developer.jpg
          </code>
          <p className="text-neutral-500 text-[11px]">
            Or configure the file path in <span className="font-semibold text-neutral-700">src/config/studioConfig.ts</span>.
          </p>
        </div>
      )}
    </div>
  );
};
