import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLight?: boolean;
}

export const AxZireLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  isLight = false,
}) => {
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`inline-flex items-center select-none group focus:outline-none ${className}`}>
      <span className={`${textSizes[size]} font-black tracking-tight flex items-center ${isLight ? 'text-zinc-950' : 'text-white'}`}>
        AX<span className="text-[#E50914]">Z</span>IRE
        <span className={`font-semibold ml-1.5 text-xs tracking-widest uppercase ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
          Studios
        </span>
      </span>
    </div>
  );
};
