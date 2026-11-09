import React from 'react';

interface BrowserIconProps {
  className?: string;
  size?: number;
}

export const ChromeIcon: React.FC<BrowserIconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Google Chrome"
  >
    <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" fill="#4285F4" />
    <path d="M12 2C15.5 2 18.5 4 20.3 7L12 7" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 12C22 16.5 19 20.2 15 21.6L11 14.5" stroke="#34A853" strokeWidth="2" strokeLinecap="round" />
    <path d="M2 12C2 7.5 5 3.8 9 2.4L13 9.5" stroke="#FBBC05" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BraveIcon: React.FC<BrowserIconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Brave Browser"
  >
    <path
      d="M12 2L4 6V11C4 16.5 7.4 21.6 12 22C16.6 21.6 20 16.5 20 11V6L12 2Z"
      stroke="#FF5500"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 10.5L12 8L15.5 10.5L14 15.5H10L8.5 10.5Z"
      fill="#FF5500"
      opacity="0.8"
    />
  </svg>
);

export const FirefoxIcon: React.FC<BrowserIconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Mozilla Firefox"
  >
    <circle cx="12" cy="12" r="9.5" stroke="#FF7139" strokeWidth="1.5" />
    <path
      d="M7 15C7 10 11 6 16 5C14 8 16 11 14 14C12 17 9 17 7 15Z"
      fill="#FF7139"
      opacity="0.9"
    />
    <circle cx="12" cy="12" r="3.5" fill="#FFE15D" />
  </svg>
);
