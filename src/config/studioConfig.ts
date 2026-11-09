/**
 * AxZire Studios — Studio and Extension Configuration
 * Central source of truth for branding, developer identity, and extension catalogue.
 */

export interface ExtensionItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  features: string[];
  icon: string;
  posterImage: string;
  promotionalVideo: string;
  screenshots: {
    url: string;
    caption: string;
    label: string;
  }[];
  chromeStoreUrl: string;
  braveStoreUrl: string;
  firefoxStoreUrl: string;
  supportedBrowsers: {
    name: 'Google Chrome' | 'Brave' | 'Mozilla Firefox';
    status: 'available';
    badge: string;
    url: string;
  }[];
  version: string;
  category: string;
  releaseStatus: string;
}

export const studioConfig = {
  studioName: 'AxZire Studios',
  brandWordmark: 'AxZire Studios',
  tagline: 'BUILD. EXTEND. EXPERIENCE.',
  headline: 'Make Your Browser Work Better.',
  subheadline:
    'Thoughtfully engineered browser extensions that make everyday browsing smarter, simpler, and more enjoyable.',
  studioStatement:
    'Independent browser extension development for Chrome, Brave, and Firefox.',
  officialLogo: '/assets/aistudio/AXZIRE_STUDIOS_LOGO_8d228309.jpg',
  developerName: 'Srithar AG',
  developerRole: 'Founder & Developer, AxZire Studios',
  developerBio:
    "I'm Srithar AG, the founder and developer behind AxZire Studios. I focus on creating browser extensions and digital experiences that solve practical problems through thoughtful engineering and intuitive design.",
  developerHeadline: 'Building Experiences, One Extension at a Time.',
  developerPhoto: '/assets/developer.jpg',
  contactEmail: 'sritharag17@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/praveen-r-1b6629373/',
  githubUrl: 'https://github.com/srithar-ag',
  githubSponsorsUrl: 'https://github.com/sponsors/srithar-ag',
  razorpayMeUrl: 'https://razorpay.me/@axzirestudios',
  platforms: ['Google Chrome', 'Brave Browser', 'Mozilla Firefox'],
  razorpayKeyId: 'rzp_test_placeholder_key',
  suggestedAmounts: [49, 99, 199, 499],
};

const OFFICIAL_YT_STORE_URL =
  'https://chromewebstore.google.com/detail/youtube-timestamps/piacejljehjoedfpidohegljphkfkppi?authuser=0&hl=en';

const GMAIL_THEMES_STORE_URL =
  'https://chromewebstore.google.com/detail/youtube-timestamps/piacejljehjoedfpidohegljphkfkppi?authuser=0&hl=en';

export const extensionCatalogue: ExtensionItem[] = [
  {
    id: 'yt-timestamps',
    slug: 'youtube-timestamps',
    name: 'YouTube Timestamps',
    tagline: 'Organize and revisit important YouTube video moments.',
    description:
      'Never lose an important moment in a video. Organize and revisit the timestamps that matter, with a dedicated browsing experience designed around YouTube.',
    fullDescription:
      'YouTube Timestamps is designed specifically for students, researchers, developers, and curious video consumers. Seamlessly bookmark key moments, write inline notes, categorize timestamps into custom tags, and jump directly back to critical explanations without scrubbing or losing context.',
    features: [
      'Single-click instant timestamp capture while watching',
      'Custom annotations, titles, and topic tagging',
      'Fast inline search across all bookmarked video moments',
      'Native YouTube player integration with responsive drawer',
      'Local-first privacy architecture — no remote surveillance or data tracking',
      'Instant export to Markdown, text, and JSON formats',
    ],
    icon: '/assets/aistudio/image_689fe5d8.png',
    posterImage: '/assets/aistudio/image_689fe5d8.png',
    promotionalVideo: '',
    screenshots: [
      {
        url: '/assets/aistudio/image_689fe5d8.png',
        label: 'In-Player Extension View',
        caption: 'Full browser extension active right beside the YouTube player with live timestamp capture.',
      },
      {
        url: '/assets/aistudio/image_ec5a21f3.png',
        label: 'How It Works (3 Steps)',
        caption: '1. Open any video, 2. Name it & save, 3. Jump back anytime with zero sign-up.',
      },
      {
        url: '/assets/aistudio/image_6d329584.png',
        label: 'Instant 1-Click Timestamping',
        caption: 'Stamp the exact time you need with live timecode precision and optional labels.',
      },
    ],
    chromeStoreUrl: OFFICIAL_YT_STORE_URL,
    braveStoreUrl: OFFICIAL_YT_STORE_URL,
    firefoxStoreUrl: OFFICIAL_YT_STORE_URL,
    supportedBrowsers: [
      {
        name: 'Google Chrome',
        status: 'available',
        badge: 'Available Now',
        url: OFFICIAL_YT_STORE_URL,
      },
      {
        name: 'Brave',
        status: 'available',
        badge: 'Web Store Compatible',
        url: OFFICIAL_YT_STORE_URL,
      },
      {
        name: 'Mozilla Firefox',
        status: 'available',
        badge: 'Web Store Compatible',
        url: OFFICIAL_YT_STORE_URL,
      },
    ],
    version: '1.0.4',
    category: 'Productivity & Video Tools',
    releaseStatus: 'Live on Chrome Web Store',
  },
  {
    id: 'gmail-themes',
    slug: 'gmail-themes',
    name: 'Gmail Themes - Custom Themes for GMail',
    tagline: 'Transform your Gmail with custom themes, cinematic Red Dead-inspired looks, and aesthetic styles.',
    description:
      'Transform your Gmail experience with cinematic Red Dead-inspired looks, custom themes, dark mode, and aesthetic palettes. Built with zero email data access for complete privacy.',
    fullDescription:
      'Gmail Themes gives your Gmail inbox a stunning cinematic transformation. Switch between default Gmail and the signature Red Dead-inspired sunset western theme with a single click. Enjoy high-contrast legibility, custom accent colors, dark mode, and curated palettes designed for everyday email productivity without ever accessing or reading your email content.',
    features: [
      'Cinematic Red Dead-inspired theme with custom warm western dark aesthetic',
      'Before & After instant comparison with 1-click apply toggle',
      'Curated artistic & anime palettes (Misty Mountain, Twilight Sakura)',
      'Light & Dark mode flexibility for comfortable day and night reading',
      'Zero permission access to email content — 100% client-side privacy',
      'Lightweight Manifest V3 extension with zero inbox slowdown',
    ],
    icon: '/assets/aistudio/Gmail_Brushstroke_Over_Misty_Anime_Mountains_e24964df.png',
    posterImage: '/assets/aistudio/Gmail_Red_Dead_Theme_Transformation_cb9b699c.png',
    promotionalVideo: '',
    screenshots: [
      {
        url: '/assets/aistudio/Gmail_Red_Dead_Theme_Transformation_cb9b699c.png',
        label: 'Cinematic Red Dead Theme Transformation',
        caption: 'Before (default light Gmail) vs After (cinematic Red Dead-inspired theme).',
      },
      {
        url: '/assets/aistudio/Gmail_Red_Dead_Theme_Before___After_eef5e854.png',
        label: 'Custom Gmail Theme & Light/Dark Modes',
        caption: 'Custom Gmail theme with cinematic look, light & dark modes, and one-click apply.',
      },
      {
        url: '/assets/aistudio/Gmail_Brushstroke_Over_Misty_Anime_Mountains_e24964df.png',
        label: 'Aesthetic Japanese Anime & Scenic Themes',
        caption: 'Curated artistic themes with Mt. Fuji, cherry blossoms, and twilight gradients.',
      },
    ],
    chromeStoreUrl: GMAIL_THEMES_STORE_URL,
    braveStoreUrl: GMAIL_THEMES_STORE_URL,
    firefoxStoreUrl: GMAIL_THEMES_STORE_URL,
    supportedBrowsers: [
      {
        name: 'Google Chrome',
        status: 'available',
        badge: 'Available Now',
        url: GMAIL_THEMES_STORE_URL,
      },
      {
        name: 'Brave',
        status: 'available',
        badge: 'Web Store Compatible',
        url: GMAIL_THEMES_STORE_URL,
      },
      {
        name: 'Mozilla Firefox',
        status: 'available',
        badge: 'Web Store Compatible',
        url: GMAIL_THEMES_STORE_URL,
      },
    ],
    version: '1.1.0',
    category: 'Customization & Workflow',
    releaseStatus: 'Live on Chrome Web Store',
  },
];
