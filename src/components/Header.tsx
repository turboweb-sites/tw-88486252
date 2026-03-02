import { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight } from 'lucide-react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
}

const navItems: { label: string; page: PageType }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Services', page: 'services' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact', page: 'contact' },
];

export default function Header({ currentPage, navigateTo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNav = (page: PageType) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-black font-display font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-display font-bold text-lg leading-none">
                MIAMI <span className="text-primary-500">DETAILING</span>
              </h1>
              <p className="text-gray-500 text-[10px] tracking-[0.25em] uppercase">Premium Auto Care</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'text-primary-500 bg-primary-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+13055550199"
              className="flex items-center gap-2 text-gray-300 hover:text-primary-500 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(305) 555-0199</span>
            </a>
            <button onClick={() => handleNav('contact')} className="btn-primary !py-2.5 !px-6 !text-xs">
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:+13055550199"
              className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center text-primary-500"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-dark-200 shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <nav className="space-y-1">
              {navItems.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-primary-500/10 text-primary-500'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{label}</span>
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <a
                href="tel:+13055550199"
                className="flex items-center gap-3 text-white hover:text-primary-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">(305) 555-0199</span>
              </a>
              <button
                onClick={() => handleNav('contact')}
                className="btn-primary w-full !text-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}