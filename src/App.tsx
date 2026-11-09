import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ExtensionsPage } from './pages/ExtensionsPage.tsx';
import { ExtensionDetailPage } from './pages/ExtensionDetailPage.tsx';
import { SupportPage } from './pages/SupportPage.tsx';
import { PrivacyPage } from './pages/PrivacyPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';

// Scroll to top helper on route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const isSupportPage = location.pathname === '/support';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isSupportPage ? 'bg-[#f8f9fa] text-zinc-900' : 'bg-[#080808] text-white selection:bg-[#E50914] selection:text-white'
      }`}
    >
      {/* Sticky Global Top Bar */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/extensions" element={<ExtensionsPage />} />
          <Route path="/extensions/:slug" element={<ExtensionDetailPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Footer (shown on dark/standard pages; SupportPage has its own dedicated light footer) */}
      {!isSupportPage && <Footer onOpenContact={() => setIsContactOpen(true)} />}

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
}
