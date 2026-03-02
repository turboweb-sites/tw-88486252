import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import { PageType } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-6" />
          <h2 className="text-xl font-display text-primary-500 tracking-widest uppercase">
            Miami Auto Detailing
          </h2>
          <p className="text-gray-500 text-sm mt-2">Loading excellence...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigateTo={navigateTo} />;
      case 'services':
        return <Services navigateTo={navigateTo} />;
      case 'pricing':
        return <Pricing navigateTo={navigateTo} />;
      case 'gallery':
        return <Gallery navigateTo={navigateTo} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main>{renderPage()}</main>
      <Footer navigateTo={navigateTo} />
      <FloatingCallButton />
    </div>
  );
}