import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Circle } from 'lucide-react';
import { PageType } from '../types';

interface FooterProps {
  navigateTo: (page: PageType) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  return (
    <footer className="bg-dark-600 border-t border-white/5">
      <div className="container-custom section-padding !pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-display font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg leading-none">
                  MIAMI <span className="text-primary-500">DETAILING</span>
                </h3>
                <p className="text-gray-500 text-[10px] tracking-[0.25em] uppercase">Premium Auto Care</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Miami's premier auto detailing service. We deliver showroom-quality results for luxury and exotic vehicles.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: 'https://instagram.com' },
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Youtube, href: 'https://youtube.com' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', page: 'home' as PageType },
                { label: 'Our Services', page: 'services' as PageType },
                { label: 'Pricing', page: 'pricing' as PageType },
                { label: 'Gallery', page: 'gallery' as PageType },
                { label: 'Contact Us', page: 'contact' as PageType },
              ].map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => navigateTo(page)}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Exterior Detail',
                'Interior Detail',
                'Ceramic Coating',
                'Paint Correction',
                'Mobile Detailing',
                'Engine Bay Cleaning',
              ].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => navigateTo('services')}
                    className="text-gray-400 hover:text-primary-500 transition-colors text-sm"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-semibold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">1234 Brickell Ave<br />Miami, FL 33131</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="tel:+13055550199" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  (305) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="mailto:info@miamidetailingpro.com" className="text-gray-400 hover:text-primary-500 transition-colors text-sm">
                  info@miamidetailingpro.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
                  <p>Saturday: 9:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Miami Auto Detailing Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <span className="hover:text-primary-500 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary-500 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}